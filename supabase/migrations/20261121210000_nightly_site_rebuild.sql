-- Nightly rebuild of the website.
--
-- The public pages are pre-rendered at build time, so wording that depends on
-- the date ("From Sat 5 Dec", upcoming vs past events) is only as fresh as the
-- last build. This job asks the rebuild-site Edge Function to start a build
-- just after midnight, so the stored HTML is never more than a day old.
--
-- The Vercel deploy hook URL is NOT here. It lives only in the rebuild-site
-- function's environment. This job proves itself to that function with a
-- shared secret kept in Supabase Vault (name: rebuild_cron_secret) and in the
-- function's environment (REBUILD_CRON_SECRET). Neither value is in the repo;
-- both were generated and stored when this migration was applied.

CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA pg_catalog;
CREATE EXTENSION IF NOT EXISTS pg_net;

SELECT cron.unschedule(jobid) FROM cron.job WHERE jobname = 'nightly-site-rebuild';

-- 00:10 UTC every day (00:10 in winter, 01:10 in summer, London time).
SELECT cron.schedule(
  'nightly-site-rebuild',
  '10 0 * * *',
  $job$
  SELECT net.http_post(
    url := 'https://kfwqxmhxmclsdbvncrre.supabase.co/functions/v1/rebuild-site',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-cron-secret', (SELECT decrypted_secret FROM vault.decrypted_secrets WHERE name = 'rebuild_cron_secret')
    ),
    body := '{}'::jsonb
  );
  $job$
);
