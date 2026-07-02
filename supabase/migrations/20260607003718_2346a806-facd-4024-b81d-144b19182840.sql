CREATE OR REPLACE FUNCTION public.log_interaction(p_session_id uuid, p_token uuid, p_action text, p_metadata jsonb)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_ok boolean;
BEGIN
  SELECT true INTO v_ok FROM public.sessions WHERE id = p_session_id AND update_token = p_token;
  IF NOT v_ok THEN RAISE EXCEPTION 'invalid_session'; END IF;

  IF length(coalesce(p_action,'')) = 0 OR length(p_action) > 64 THEN
    RAISE EXCEPTION 'invalid_action';
  END IF;

  IF p_metadata IS NOT NULL AND octet_length(p_metadata::text) > 4096 THEN
    RAISE EXCEPTION 'metadata_too_large';
  END IF;

  INSERT INTO public.interactions (session_id, action_type, metadata)
  VALUES (p_session_id, p_action, coalesce(p_metadata, '{}'::jsonb));
END;
$function$;

CREATE OR REPLACE FUNCTION public.upsert_slide_view(p_session_id uuid, p_token uuid, p_slide_number integer, p_add_seconds integer)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_ok boolean;
  v_add integer := GREATEST(0, LEAST(coalesce(p_add_seconds,0), 3600));
BEGIN
  SELECT true INTO v_ok FROM public.sessions WHERE id = p_session_id AND update_token = p_token;
  IF NOT v_ok THEN RAISE EXCEPTION 'invalid_session'; END IF;

  IF p_slide_number IS NULL OR p_slide_number < 0 OR p_slide_number > 999 THEN
    RAISE EXCEPTION 'invalid_slide_number';
  END IF;

  INSERT INTO public.slide_views (session_id, slide_number, time_spent_seconds)
  VALUES (p_session_id, p_slide_number, v_add)
  ON CONFLICT (session_id, slide_number)
  DO UPDATE SET time_spent_seconds = LEAST(public.slide_views.time_spent_seconds + v_add, 86400);
END;
$function$;