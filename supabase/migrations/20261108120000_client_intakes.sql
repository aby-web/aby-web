-- New client intake form (/onboard), moved into this project.
--
-- The form used to post to the Yogami project, which switched that route off
-- on 30 Oct 2026, so /onboard has been failing since. It now posts to the
-- new-client-intake Edge Function here.
--
-- Written ONLY by that function with the service role: there is no anon or
-- authenticated policy, because the anon key ships in the page and a policy
-- would let anyone skip the function's bot checks and validation. Read in
-- /admin through admin-data, which also uses the service role.
--
-- health_notes is special category data under UK GDPR. It is stored only
-- with explicit consent (enforced by the CHECK below) and is never sent in
-- the notification email.

CREATE TABLE IF NOT EXISTS client_intakes (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at        timestamptz NOT NULL DEFAULT now(),
  name              text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 200),
  email             text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 320),
  phone             text CHECK (char_length(phone) <= 50),
  goals             text NOT NULL CHECK (char_length(goals) BETWEEN 1 AND 2000),
  experience        text NOT NULL CHECK (experience IN ('complete_beginner', 'some', 'regular', 'experienced')),
  availability      text NOT NULL CHECK (char_length(availability) BETWEEN 1 AND 1000),
  format            text NOT NULL CHECK (format IN ('studio', 'online', 'home')),
  home_area         text CHECK (char_length(home_area) <= 200),
  health_notes      text CHECK (char_length(health_notes) <= 2000),
  health_consent    boolean NOT NULL DEFAULT false,
  disclaimer_agreed boolean NOT NULL CHECK (disclaimer_agreed),
  followed_up       boolean NOT NULL DEFAULT false,
  CONSTRAINT health_notes_need_consent CHECK (health_notes IS NULL OR health_consent),
  CONSTRAINT home_area_only_for_home   CHECK (home_area IS NULL OR format = 'home')
);

ALTER TABLE client_intakes ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_client_intakes_created_at ON client_intakes (created_at DESC);

COMMENT ON TABLE client_intakes IS
  'New client forms from /onboard. Written only by the new-client-intake function (service role); no anon or authenticated policies. health_notes is special category data: stored only with consent, never emailed.';
