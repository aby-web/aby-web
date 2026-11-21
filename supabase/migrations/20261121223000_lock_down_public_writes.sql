-- Applied 21 Nov 2026.
--
-- Until this ran, the `events` and `vacations` tables and the `event-images`
-- storage bucket accepted INSERT / UPDATE / DELETE from anyone holding the
-- site's public (anon) key, which ships in the website. Anyone could add,
-- edit or delete events, the holiday banner, or event photos without the
-- admin login.
--
-- The admin portal saves all three through the admin-data Edge Function,
-- which checks the admin login and writes with the service role (confirmed
-- working by Ammar before this was applied). Public READ access is unchanged.
--
-- Verified after applying, using only the public key: insert, update and
-- delete on both tables and an upload to the bucket were all refused.

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
