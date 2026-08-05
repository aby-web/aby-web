import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

// Verifies a guide password without ever sending it to the browser.
// Previously PasswordGate fetched `guides.password` client-side and compared
// in JS, which meant the password was readable by anyone via the network tab
// or a direct PostgREST query.
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const ALLOWED_ORIGINS = [
  'https://ammarbass.com',
  'https://www.ammarbass.com',
  'http://localhost:5173',
];

function corsHeaders(origin: string | null) {
  const allowed = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Vary': 'Origin',
  };
}

// Constant-time comparison, so response latency does not leak how much of the
// password was correct.
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

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

  try {
    const { slug, password } = await req.json();

    if (typeof slug !== 'string' || typeof password !== 'string') {
      return json({ valid: false });
    }

    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

    const { data, error } = await supabase
      .from('guides')
      .select('password')
      .eq('slug', slug)
      .maybeSingle();

    if (error || !data) return json({ valid: false });

    return json({ valid: safeEqual(password, data.password ?? '') });
  } catch (error) {
    console.error('check-guide-password error:', error);
    return json({ valid: false }, 500);
  }
});
