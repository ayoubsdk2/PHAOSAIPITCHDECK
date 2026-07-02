
-- PROSPECTS
CREATE TABLE public.prospects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  business text NOT NULL,
  prefix_slug text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.prospects TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.prospects TO authenticated;
GRANT ALL ON public.prospects TO service_role;
ALTER TABLE public.prospects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can lookup prospect by slug" ON public.prospects
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins manage prospects" ON public.prospects
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin'))
  WITH CHECK (public.has_role(auth.uid(),'admin'));

-- SESSIONS
CREATE TABLE public.sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  prospect_id uuid NOT NULL REFERENCES public.prospects(id) ON DELETE CASCADE,
  ip_address text,
  device_type text,
  user_agent text,
  start_time timestamptz NOT NULL DEFAULT now(),
  last_heartbeat timestamptz NOT NULL DEFAULT now(),
  end_time timestamptz,
  total_duration_seconds integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  summary_sent_at timestamptz
);
GRANT SELECT, INSERT, UPDATE ON public.sessions TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.sessions TO authenticated;
GRANT ALL ON public.sessions TO service_role;
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create session" ON public.sessions
  FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Anyone can update session" ON public.sessions
  FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins read sessions" ON public.sessions
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));

CREATE INDEX sessions_prospect_idx ON public.sessions(prospect_id);
CREATE INDEX sessions_active_idx ON public.sessions(is_active, last_heartbeat) WHERE is_active = true;

-- SLIDE VIEWS
CREATE TABLE public.slide_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES public.sessions(id) ON DELETE CASCADE,
  slide_number integer NOT NULL,
  time_spent_seconds integer NOT NULL DEFAULT 0,
  timestamp timestamptz NOT NULL DEFAULT now(),
  UNIQUE (session_id, slide_number)
);
GRANT SELECT, INSERT, UPDATE ON public.slide_views TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.slide_views TO authenticated;
GRANT ALL ON public.slide_views TO service_role;
ALTER TABLE public.slide_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can upsert slide views" ON public.slide_views
  FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Anyone can update slide views" ON public.slide_views
  FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins read slide views" ON public.slide_views
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));

CREATE INDEX slide_views_session_idx ON public.slide_views(session_id);

-- INTERACTIONS
CREATE TABLE public.interactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES public.sessions(id) ON DELETE CASCADE,
  action_type text NOT NULL,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  timestamp timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.interactions TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.interactions TO authenticated;
GRANT ALL ON public.interactions TO service_role;
ALTER TABLE public.interactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert interactions" ON public.interactions
  FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins read interactions" ON public.interactions
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));

CREATE INDEX interactions_session_idx ON public.interactions(session_id);

-- Enable extensions for scheduled session sweep
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;
