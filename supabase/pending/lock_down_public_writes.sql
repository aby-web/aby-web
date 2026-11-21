-- NOT YET APPLIED. Do not move into supabase/migrations until it has been run.
--
-- Found on 21 Nov 2026: the `events` and `vacations` tables and the
-- `event-images` storage bucket accept INSERT / UPDATE / DELETE from anyone
-- holding the site's public (anon) key, which ships in the website. So anyone
-- could add, edit or delete events, the holiday banner, or event photos
-- without the admin login.
--
-- From 21 Nov 2026 the admin portal no longer relies on that: it saves events,
-- vacations and event images through the admin-data Edge Function, which
-- checks the admin login and writes with the service role.
--
-- Apply this ONLY after Ammar has confirmed that, in /admin, he can (1) add an
-- event with a photo, (2) edit it, (3) delete it, and (4) add and delete a
-- vacation. Applying it earlier would lock him out if that path had a fault.
-- Public READ access is unchanged.

BEGIN;

DROP POLICY IF EXISTS "Anyone can insert events" ON public.events;
DROP POLICY IF EXISTS "Anyone can update events" ON public.events;
DROP POLICY IF EXISTS "Anyone can delete events" ON public.events;

DROP POLICY IF EXISTS "Allow authenticated users to insert" ON public.vacations;
DROP POLICY IF EXISTS "Allow authenticated users to update" ON public.vacations;
DROP POLICY IF EXISTS "Allow authenticated users to delete" ON public.vacations;

DROP POLICY IF EXISTS "Anyone can upload to event-images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can update event-images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can delete from event-images" ON storage.objects;

COMMIT;
