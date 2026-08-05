import "jsr:@supabase/functions-js/edge-runtime.d.ts";

// Server-side only. Proxies the admin portal's subscriber list so the Kit API
// key never reaches the browser.
const KIT_API_KEY = Deno.env.get('KIT_API_KEY');
// Shared secret the admin page sends. Set to the same value as the site's
// VITE_ADMIN_PASSWORD so only the password holder can list subscribers.
const ADMIN_PASSWORD = Deno.env.get('ADMIN_PASSWORD');

const ALLOWED_ORIGINS = [
  'https://ammarbass.com',
  'https://www.ammarbass.com',
  'http://localhost:5173',
];

function corsHeaders(origin: string | null) {
  const allowed = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-admin-password',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Vary': 'Origin',
  };
}

Deno.serve(async (req) => {
  const cors = corsHeaders(req.headers.get('Origin'));

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: cors });
  }

  const supplied = req.headers.get('x-admin-password');
  if (!ADMIN_PASSWORD || supplied !== ADMIN_PASSWORD) {
    return new Response(JSON.stringify({ error: 'unauthorized' }), {
      headers: { ...cors, 'Content-Type': 'application/json' },
      status: 401,
    });
  }

  try {
    const res = await fetch('https://api.kit.com/v4/subscribers?per_page=1000', {
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
