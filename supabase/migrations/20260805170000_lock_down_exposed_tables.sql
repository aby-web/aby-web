-- Lock down tables that were readable by anyone holding the anon key.
--
-- The anon key ships in the public browser bundle by design, so every
-- "anon"/"public" SELECT policy below was effectively world-readable:
--
--   admin_settings     -> admin password, stored in plaintext
--   private_enquiries  -> contact form submissions (names, emails, messages)
--   guides             -> guide passwords, stored in plaintext
--   guide_views        -> analytics rows
--
-- Public INSERT is preserved where the site genuinely needs it (the contact
-- form and the guide view counter). Reads move to authenticated-only, and the
-- guide password check moves to the check-guide-password Edge Function, which
-- uses the service role and never returns the password itself.

-- Drop the policies this migration creates, so it can be re-run safely.
DROP POLICY IF EXISTS "Authenticated can read admin_settings" ON admin_settings;
DROP POLICY IF EXISTS "Authenticated can insert admin_settings" ON admin_settings;
DROP POLICY IF EXISTS "Authenticated can update admin_settings" ON admin_settings;
DROP POLICY IF EXISTS "Public can submit enquiries" ON private_enquiries;
DROP POLICY IF EXISTS "Authenticated can read private_enquiries" ON private_enquiries;
DROP POLICY IF EXISTS "Authenticated can update private_enquiries" ON private_enquiries;
DROP POLICY IF EXISTS "Authenticated can delete private_enquiries" ON private_enquiries;
DROP POLICY IF EXISTS "Authenticated can read guides" ON guides;
DROP POLICY IF EXISTS "Authenticated can insert guides" ON guides;
DROP POLICY IF EXISTS "Authenticated can update guides" ON guides;
DROP POLICY IF EXISTS "Authenticated can delete guides" ON guides;
DROP POLICY IF EXISTS "Public can record guide views" ON guide_views;
DROP POLICY IF EXISTS "Authenticated can read guide_views" ON guide_views;
DROP POLICY IF EXISTS "Public can register interest" ON yogami_interest;
DROP POLICY IF EXISTS "Authenticated can read yogami_interest" ON yogami_interest;

-- ---------------------------------------------------------------- admin_settings
DROP POLICY IF EXISTS "Anyone can read admin settings"   ON admin_settings;
DROP POLICY IF EXISTS "Anyone can insert admin settings" ON admin_settings;
DROP POLICY IF EXISTS "Anyone can update admin settings" ON admin_settings;

ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated can read admin_settings"
  ON admin_settings FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can insert admin_settings"
  ON admin_settings FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can update admin_settings"
  ON admin_settings FOR UPDATE TO authenticated USING (true);

-- ------------------------------------------------------------- private_enquiries
DROP POLICY IF EXISTS "Anyone can read private enquiries"   ON private_enquiries;
DROP POLICY IF EXISTS "Anyone can insert private enquiries" ON private_enquiries;
DROP POLICY IF EXISTS "Anyone can update private enquiries" ON private_enquiries;
DROP POLICY IF EXISTS "Anyone can delete private enquiries" ON private_enquiries;
DROP POLICY IF EXISTS "Public can submit enquiries"          ON private_enquiries;

ALTER TABLE private_enquiries ENABLE ROW LEVEL SECURITY;

-- The public contact form still needs to submit.
CREATE POLICY "Public can submit enquiries"
  ON private_enquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated can read private_enquiries"
  ON private_enquiries FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can update private_enquiries"
  ON private_enquiries FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated can delete private_enquiries"
  ON private_enquiries FOR DELETE TO authenticated USING (true);

-- ---------------------------------------------------------------------- guides
DROP POLICY IF EXISTS "Allow public read access"     ON guides;
DROP POLICY IF EXISTS "Allow authenticated updates"  ON guides;

ALTER TABLE guides ENABLE ROW LEVEL SECURITY;

-- No anon SELECT: the password lives in this table. Guide access is verified
-- by the check-guide-password Edge Function instead.
CREATE POLICY "Authenticated can read guides"
  ON guides FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can insert guides"
  ON guides FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can update guides"
  ON guides FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated can delete guides"
  ON guides FOR DELETE TO authenticated USING (true);

-- ----------------------------------------------------------------- guide_views
DROP POLICY IF EXISTS "Allow public reads"   ON guide_views;
DROP POLICY IF EXISTS "Allow public inserts" ON guide_views;

ALTER TABLE guide_views ENABLE ROW LEVEL SECURITY;

-- The guide pages still record a view; only reading is restricted.
CREATE POLICY "Public can record guide views"
  ON guide_views FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated can read guide_views"
  ON guide_views FOR SELECT TO authenticated USING (true);

-- ------------------------------------------------------------- yogami_interest
DROP POLICY IF EXISTS "allow_insert" ON yogami_interest;

ALTER TABLE yogami_interest ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can register interest"
  ON yogami_interest FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated can read yogami_interest"
  ON yogami_interest FOR SELECT TO authenticated USING (true);

-- events and testimonials are intentionally left public-readable: they are
-- the site's own content and contain nothing sensitive.
