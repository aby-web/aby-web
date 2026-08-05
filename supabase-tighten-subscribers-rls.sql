-- Tighten RLS on the subscribers table.
--
-- Supersedes supabase-fix-subscribers-rls.sql, which granted anonymous
-- INSERT / SELECT / UPDATE / DELETE with USING (true). Because the anon key
-- ships in the client bundle, anyone who viewed the site could read, modify,
-- or delete the entire subscriber list.
--
-- Writes now go exclusively through the `subscribe` Edge Function, which uses
-- the service-role key. The service role bypasses RLS, so no anon policy is
-- needed for the signup form to keep working.
--
-- Run this AFTER the subscribe function is deployed and the site is updated,
-- otherwise the live signup forms will fail.

-- 1. Remove the permissive anonymous policies.
DROP POLICY IF EXISTS "Anyone can insert subscribers" ON subscribers;
DROP POLICY IF EXISTS "Anyone can read subscribers"   ON subscribers;
DROP POLICY IF EXISTS "Anyone can update subscribers" ON subscribers;
DROP POLICY IF EXISTS "Anyone can delete subscribers" ON subscribers;

-- Also drop the earlier names from supabase-setup.sql, if still present.
DROP POLICY IF EXISTS "Public can subscribe"                    ON subscribers;
DROP POLICY IF EXISTS "Authenticated users can read subscribers" ON subscribers;

-- 2. Ensure RLS is on. With RLS enabled and no permissive policy for `anon`,
--    the public key can do nothing to this table.
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- 3. Signed-in admins keep full read access for the admin portal.
CREATE POLICY "Authenticated can read subscribers"
  ON subscribers FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated can delete subscribers"
  ON subscribers FOR DELETE
  TO authenticated
  USING (true);

-- 4. Prevent the Gmail dot-trick from creating duplicate rows for one mailbox.
--    The Edge Function canonicalises before insert; this is the safety net.
CREATE UNIQUE INDEX IF NOT EXISTS subscribers_email_lower_idx
  ON subscribers (lower(email));

-- Verify: should return only the two `authenticated` policies above.
--   SELECT policyname, roles, cmd FROM pg_policies WHERE tablename = 'subscribers';
