-- Auto-assign admin role for seddayoub77@gmail.com
-- Function to ensure admin role for a specific email (bypasses RLS via SECURITY DEFINER)
CREATE OR REPLACE FUNCTION public.ensure_admin_for_email(target_email text) RETURNS void LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public AS $$
DECLARE v_user_id uuid;
BEGIN
SELECT id INTO v_user_id
FROM auth.users
WHERE email = target_email;
IF v_user_id IS NULL THEN RAISE NOTICE 'User with email % not found yet',
target_email;
RETURN;
END IF;
INSERT INTO public.user_roles (user_id, role)
VALUES (v_user_id, 'admin') ON CONFLICT (user_id, role) DO NOTHING;
END;
$$;
REVOKE ALL ON FUNCTION public.ensure_admin_for_email(text)
FROM PUBLIC,
    anon;
GRANT EXECUTE ON FUNCTION public.ensure_admin_for_email(text) TO authenticated,
    service_role;
-- Function to assign admin role to the calling user (bypasses RLS)
CREATE OR REPLACE FUNCTION public.assign_admin_role() RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public AS $$ BEGIN
INSERT INTO public.user_roles (user_id, role)
VALUES (auth.uid(), 'admin') ON CONFLICT (user_id, role) DO NOTHING;
RETURN FOUND;
END;
$$;
REVOKE ALL ON FUNCTION public.assign_admin_role()
FROM PUBLIC,
    anon;
GRANT EXECUTE ON FUNCTION public.assign_admin_role() TO authenticated,
    service_role;
-- Auto-assign admin on user creation for seddayoub77@gmail.com
CREATE OR REPLACE FUNCTION public.handle_new_user_admin() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public AS $$ BEGIN IF NEW.email = 'seddayoub77@gmail.com' THEN
INSERT INTO public.user_roles (user_id, role)
VALUES (NEW.id, 'admin') ON CONFLICT (user_id, role) DO NOTHING;
END IF;
RETURN NEW;
END;
$$;
DROP TRIGGER IF EXISTS on_auth_user_created_admin ON auth.users;
CREATE TRIGGER on_auth_user_created_admin
AFTER
INSERT ON auth.users FOR EACH ROW
    WHEN (NEW.email = 'seddayoub77@gmail.com') EXECUTE FUNCTION public.handle_new_user_admin();