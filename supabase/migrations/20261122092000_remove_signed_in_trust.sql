-- APPLIED 22 Nov 2026, after Ammar ran the /admin checks. Written 21 Nov 2026.
--
-- WHAT THIS FIXES
-- Several tables and the event-images bucket grant access to "any signed-in
-- user" (the Supabase `authenticated` role). The site never signs anyone in to
-- Supabase: the admin portal logs in through the admin-login Edge Function and
-- every admin read and write goes through Edge Functions that use the service
-- role, which ignores these policies. So the policies below do nothing for the
-- site. All they do is hand access to anyone who manages to obtain a Supabase
-- account on this project:
--
--   admin_settings     read, insert, update   (the admin login's password hash)
--   guides             read, insert, update, delete   (guide password hashes)
--   private_enquiries  read, update, delete   (clients' names, emails, messages)
--   subscribers        read, delete           (newsletter emails)
--   guide_views        read
--   storage: event-images   upload, overwrite, delete
--
-- Public sign-ups were switched off on 21 Nov 2026 and no account has ever
-- existed, so nothing is exposed today. This removes the door rather than
-- relying on it staying locked.
--
-- It also removes "anyone can insert / update / delete" on the old
-- `testimonials` table. Nothing on the site reads that table any more
-- (testimonials come from src/data/testimonials.js), so those policies only
-- let strangers write junk into the database. Reading it stays allowed.
--
-- WHAT STAYS (deliberately)
--   private_enquiries  "Public can submit enquiries"   (the contact form)
--   guide_views        "Public can record guide views" (the guides)
--   events, vacations, event-images: public read
--
-- BEFORE APPLYING, check these still work in /admin (they all go through Edge
-- Functions today; if they work now they will work afterwards):
--   1. Log out and log back in.
--   2. Subscribers tab loads.
--   3. Private Enquiries tab loads; tick and untick "followed up" on one.
--   4. New Clients tab loads.
--   5. Guides tab loads and shows view counts.
--   6. Open /handstandguide in a private window and get in with the guide
--      password.
--   7. Send yourself a message through the form on /private-sessions and see
--      it arrive in the Private Enquiries tab.
-- AFTER APPLYING, repeat 1 to 7. To undo, re-run the CREATE POLICY statements
-- in supabase/migrations/20260805170000_lock_down_exposed_tables.sql.

BEGIN;

-- admin_settings
DROP POLICY IF EXISTS "Authenticated can read admin_settings"   ON public.admin_settings;
DROP POLICY IF EXISTS "Authenticated can insert admin_settings" ON public.admin_settings;
DROP POLICY IF EXISTS "Authenticated can update admin_settings" ON public.admin_settings;

-- guides
DROP POLICY IF EXISTS "Authenticated can read guides"   ON public.guides;
DROP POLICY IF EXISTS "Authenticated can insert guides" ON public.guides;
DROP POLICY IF EXISTS "Authenticated can update guides" ON public.guides;
DROP POLICY IF EXISTS "Authenticated can delete guides" ON public.guides;

-- private_enquiries (the public INSERT policy for the contact form stays)
DROP POLICY IF EXISTS "Authenticated can read private_enquiries"   ON public.private_enquiries;
DROP POLICY IF EXISTS "Authenticated can update private_enquiries" ON public.private_enquiries;
DROP POLICY IF EXISTS "Authenticated can delete private_enquiries" ON public.private_enquiries;

-- subscribers
DROP POLICY IF EXISTS "Authenticated can read subscribers"   ON public.subscribers;
DROP POLICY IF EXISTS "Authenticated can delete subscribers" ON public.subscribers;

-- guide_views (the public INSERT policy stays)
DROP POLICY IF EXISTS "Authenticated can read guide_views" ON public.guide_views;

-- storage: event images (public read stays; admin uploads use signed links)
DROP POLICY IF EXISTS "Authenticated users can upload event images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update event images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete event images" ON storage.objects;

-- testimonials: no longer used by the site; stop anyone writing to it
DROP POLICY IF EXISTS "Anyone can insert testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Anyone can update testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Anyone can delete testimonials" ON public.testimonials;

COMMIT;
