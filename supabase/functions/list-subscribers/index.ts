import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { corsHeaders, verifyToken } from "../_shared/auth.ts";

// Server-side only. Proxies the admin portal's subscriber list so the Kit API
// key never reaches the browser. Authorised by the signed session token that
// admin-login issues, rather than by the admin password itself.
const KIT_API_KEY = Deno.env.get('KIT_API_KEY');

Deno.serve(async (req) => {
  const cors = corsHeaders(req.headers.get('Origin'));

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: cors });
  }

  if (!(await verifyToken(req.headers.get('x-admin-token')))) {
    return new Response(JSON.stringify({ error: 'unauthorized' }), {
      headers: { ...cors, 'Content-Type': 'application/json' },
      status: 401,
    });
  }

  try {
    // status=active: the unfiltered endpoint also returns cancelled and
    // bounced subscribers, which made the portal's count look inflated.
    const res = await fetch('https://api.kit.com/v4/subscribers?per_page=1000&status=active', {
      headers: {
        'Content-Type': 'application/json',
        'X-Kit-Api-Key': KIT_API_KEY!,
      },
    });
    const data = await res.json();

    return new Response(JSON.stringify({ subscribers: data.subscribers || [] }), {
      headers: { ...cors, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('list-subscribers error:', error);
    return new Response(JSON.stringify({ error: 'failed' }), {
      headers: { ...cors, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
