import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { corsHeaders, timingSafeEqual, verifyToken } from "../_shared/auth.ts";

// Starts a rebuild of the website on Vercel.
//
// The site's pages are pre-rendered at build time, so new content (an event,
// tomorrow's date) only reaches the stored HTML when the site is rebuilt.
// Vercel offers a "deploy hook": a URL that starts a build when it receives a
// POST. Anyone holding that URL can trigger builds, so it is a secret:
//
//   - it lives ONLY in this function's environment (VERCEL_DEPLOY_HOOK_URL,
//     set in Supabase → Edge Functions → Secrets). It is never in the repo,
//     the website's code or the browser.
//   - this function calls it only for (a) a logged-in admin, when an event is
//     saved in /admin, or (b) the nightly scheduled job, which proves itself
//     with REBUILD_CRON_SECRET.
//
// The response never includes the hook URL.
const HOOK_URL = Deno.env.get('VERCEL_DEPLOY_HOOK_URL');
const CRON_SECRET = Deno.env.get('REBUILD_CRON_SECRET');

Deno.serve(async (req) => {
  const cors = corsHeaders(req.headers.get('Origin'));

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: cors });
  }

  const json = (body: Record<string, unknown>, status = 200) =>
    new Response(JSON.stringify(body), {
      headers: { ...cors, 'Content-Type': 'application/json' },
      status,
    });

  if (req.method !== 'POST') return json({ error: 'method not allowed' }, 405);

  const isAdmin = await verifyToken(req.headers.get('x-admin-token'));
  const cronHeader = req.headers.get('x-cron-secret');
  const isSchedule = !!CRON_SECRET && !!cronHeader && timingSafeEqual(cronHeader, CRON_SECRET);

  if (!isAdmin && !isSchedule) {
    return json({ error: 'unauthorized' }, 401);
  }

  if (!HOOK_URL) {
    return json({ error: 'not_configured' }, 503);
  }

  // Only ever call Vercel.
  if (!HOOK_URL.startsWith('https://api.vercel.com/v1/integrations/deploy/')) {
    console.error('rebuild-site: VERCEL_DEPLOY_HOOK_URL is not a Vercel deploy hook');
    return json({ error: 'not_configured' }, 503);
  }

  try {
    const res = await fetch(HOOK_URL, { method: 'POST' });
    if (!res.ok) {
      console.error('rebuild-site: Vercel responded', res.status);
      return json({ error: 'hook_failed' }, 502);
    }
    return json({ ok: true, source: isAdmin ? 'admin' : 'schedule' });
  } catch (error) {
    console.error('rebuild-site error:', error instanceof Error ? error.message : 'unknown');
    return json({ error: 'hook_failed' }, 502);
  }
});
