-- APPLIED 22 Nov 2026, after Ammar ran the /admin checks. Written 21 Nov 2026.
--
-- Drops the sign-up table behind the old product page (the app is now called
-- Yorigam and lives at yorigam.com). The page and its form were removed from
-- the site on 21 Nov 2026, and the admin tab that listed sign-ups was removed
-- the same night, so nothing reads or writes this table any more.
--
-- The table had 0 rows when this was written. The check below refuses to drop
-- it if that has changed, so no sign-up can be lost by accident.
--
-- Nothing to test in /admin: no part of the site or admin portal uses it.
-- This is also the last place in the database that carries the old name.

BEGIN;

DO $$
DECLARE
  n bigint;
BEGIN
  SELECT count(*) INTO n FROM public.yogami_interest;
  IF n > 0 THEN
    RAISE EXCEPTION 'The table has % row(s). Export them first; nothing was dropped.', n;
  END IF;
END;
$$;

DROP TABLE public.yogami_interest;  -- its two policies go with it

COMMIT;
