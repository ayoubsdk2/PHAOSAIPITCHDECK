
-- 1. Add update token column to sessions
ALTER TABLE public.sessions ADD COLUMN IF NOT EXISTS update_token uuid NOT NULL DEFAULT gen_random_uuid();

-- 2. Drop overly permissive policies
DROP POLICY IF EXISTS "Anyone can lookup prospect by slug" ON public.prospects;
DROP POLICY IF EXISTS "Anyone can create session" ON public.sessions;
DROP POLICY IF EXISTS "Anyone can update session" ON public.sessions;
DROP POLICY IF EXISTS "Anyone can upsert slide views" ON public.slide_views;
DROP POLICY IF EXISTS "Anyone can update slide views" ON public.slide_views;
DROP POLICY IF EXISTS "Anyone can insert interactions" ON public.interactions;

-- 3. Revoke direct anon access; writes now go through RPCs
REVOKE INSERT, UPDATE ON public.sessions FROM anon;
REVOKE INSERT, UPDATE ON public.slide_views FROM anon;
REVOKE INSERT ON public.interactions FROM anon;
REVOKE SELECT ON public.prospects FROM anon;

-- 4. start_session: validates slug, creates session, returns session id + token
CREATE OR REPLACE FUNCTION public.start_session(
  p_slug text,
  p_ip text,
  p_device text,
  p_user_agent text
) RETURNS TABLE (session_id uuid, update_token uuid)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_prospect_id uuid;
  v_session_id uuid;
  v_token uuid;
BEGIN
  SELECT id INTO v_prospect_id FROM public.prospects WHERE prefix_slug = p_slug;
  IF v_prospect_id IS NULL THEN
    RAISE EXCEPTION 'prospect_not_found';
  END IF;

  INSERT INTO public.sessions (prospect_id, ip_address, device_type, user_agent)
  VALUES (v_prospect_id, left(coalesce(p_ip,''), 64), left(coalesce(p_device,''), 32), left(coalesce(p_user_agent,''), 512))
  RETURNING id, sessions.update_token INTO v_session_id, v_token;

  RETURN QUERY SELECT v_session_id, v_token;
END;
$$;

-- 5. session_heartbeat
CREATE OR REPLACE FUNCTION public.session_heartbeat(
  p_session_id uuid,
  p_token uuid,
  p_total_seconds integer
) RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.sessions
  SET last_heartbeat = now(),
      total_duration_seconds = GREATEST(total_duration_seconds, LEAST(p_total_seconds, 86400)),
      is_active = true
  WHERE id = p_session_id AND update_token = p_token;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'invalid_session';
  END IF;
END;
$$;

-- 6. upsert_slide_view
CREATE OR REPLACE FUNCTION public.upsert_slide_view(
  p_session_id uuid,
  p_token uuid,
  p_slide_number integer,
  p_add_seconds integer
) RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_ok boolean;
  v_add integer := GREATEST(0, LEAST(coalesce(p_add_seconds,0), 3600));
BEGIN
  SELECT true INTO v_ok FROM public.sessions WHERE id = p_session_id AND update_token = p_token;
  IF NOT v_ok THEN RAISE EXCEPTION 'invalid_session'; END IF;

  INSERT INTO public.slide_views (session_id, slide_number, time_spent_seconds)
  VALUES (p_session_id, p_slide_number, v_add)
  ON CONFLICT (session_id, slide_number)
  DO UPDATE SET time_spent_seconds = LEAST(public.slide_views.time_spent_seconds + v_add, 86400);
END;
$$;

-- 7. log_interaction
CREATE OR REPLACE FUNCTION public.log_interaction(
  p_session_id uuid,
  p_token uuid,
  p_action text,
  p_metadata jsonb
) RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_ok boolean;
BEGIN
  SELECT true INTO v_ok FROM public.sessions WHERE id = p_session_id AND update_token = p_token;
  IF NOT v_ok THEN RAISE EXCEPTION 'invalid_session'; END IF;

  IF length(coalesce(p_action,'')) = 0 OR length(p_action) > 64 THEN
    RAISE EXCEPTION 'invalid_action';
  END IF;

  INSERT INTO public.interactions (session_id, action_type, metadata)
  VALUES (p_session_id, p_action, coalesce(p_metadata, '{}'::jsonb));
END;
$$;

-- 8. Ensure unique constraint exists for slide_views upsert
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'slide_views_session_slide_uniq'
  ) THEN
    BEGIN
      ALTER TABLE public.slide_views ADD CONSTRAINT slide_views_session_slide_uniq UNIQUE (session_id, slide_number);
    EXCEPTION WHEN duplicate_table THEN NULL; WHEN unique_violation THEN NULL; END;
  END IF;
END $$;

-- 9. Grants on the RPCs to anon (the deck viewer is anonymous)
REVOKE ALL ON FUNCTION public.start_session(text, text, text, text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.session_heartbeat(uuid, uuid, integer) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.upsert_slide_view(uuid, uuid, integer, integer) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.log_interaction(uuid, uuid, text, jsonb) FROM PUBLIC;

GRANT EXECUTE ON FUNCTION public.start_session(text, text, text, text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.session_heartbeat(uuid, uuid, integer) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.upsert_slide_view(uuid, uuid, integer, integer) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.log_interaction(uuid, uuid, text, jsonb) TO anon, authenticated;
