-- NOT APPLIED. Written 22 Nov 2026 for Ammar to review.
-- Do not move into supabase/migrations until it has been run.
--
-- WHAT THIS FIXES
-- The private_enquiries table has two triggers that both call the
-- notify-enquiry Edge Function when an enquiry arrives:
--
--   on_private_enquiry_insert   -> notify_enquiry_on_insert()   works (200)
--   on_private_enquiry_created  -> notify_private_enquiry()     refused (401)
--
-- The function logs for the last two enquiries (1 Sep and 5 Nov 2026) show
-- one accepted call and one refused call each time. So today each enquiry
-- sends ONE email, not two: the second trigger fails because the key written
-- inside it has a line break in the middle. It is still a problem:
--   - every enquiry makes a call that is refused, and
--   - if that key were ever "corrected", every enquiry email would arrive twice;
--   - the function body holds an old service-role key in plain text.
--
-- This removes the broken trigger and its function. The working trigger is
-- not touched.
--
-- Dry run on 22 Nov 2026 (inside a transaction, rolled back): one trigger
-- left, and one enquiry queued exactly one call to notify-enquiry.
--
-- HOW TO TEST
-- Before applying: send a message through the form on /private-sessions.
--   One email should reach gammar@gmail.com and the message should appear in
--   /admin > Private Enquiries. (This is the behaviour to preserve.)
-- After applying: send another. Still exactly one email, still in /admin.
-- To undo: nothing needs undoing unless the email stops arriving, in which
--   case tell Claude; the working trigger's definition is unchanged.
--
-- NOT COVERED HERE (needs Ammar's decision; see the 22 Nov notes):
-- the working trigger function also holds a Supabase secret key in plain
-- text. Replace that key in the Supabase dashboard, then the function should
-- read the new one from Vault instead.

BEGIN;

DROP TRIGGER IF EXISTS on_private_enquiry_created ON public.private_enquiries;
DROP FUNCTION IF EXISTS public.notify_private_enquiry();

COMMIT;
