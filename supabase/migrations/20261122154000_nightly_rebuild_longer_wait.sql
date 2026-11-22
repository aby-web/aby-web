-- APPLIED 22 Nov 2026.
--
-- The nightly job's call to rebuild-site waited only 5 seconds for an answer
-- (pg_net's default). With the deploy hook now set, the function takes about
-- 8 seconds because it waits for Vercel, so the database gave up waiting and
-- recorded a timeout even though the rebuild had started. This lets it wait
-- 30 seconds, so the recorded answer says what actually happened.
-- Same job name and time (00:10 UTC); cron.schedule replaces the old command.

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
    body := '{}'::jsonb,
    timeout_milliseconds := 30000
  );
  $job$
);
