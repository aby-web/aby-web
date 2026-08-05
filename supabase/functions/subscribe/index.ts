import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

// Server-side only. These never reach the browser.
const KIT_API_KEY = Deno.env.get('KIT_API_KEY');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

// Origins allowed to call this function.
const ALLOWED_ORIGINS = [
  'https://ammarbass.com',
  'https://www.ammarbass.com',
  'http://localhost:5173',
];

// Sources the client may claim, so a caller cannot invent arbitrary values.
const ALLOWED_SOURCES = ['website', 'instagram', 'handstand_guide', 'practice_videos'];

const MIN_SUBMIT_MS = 2500;

// Deliberately stricter than the browser's `type="email"`: no consecutive dots,
// no leading/trailing dot in the local part, sane length bounds.
const EMAIL_RE = /^[^\s@.][^\s@]*[^\s@.]@[^\s@.]+(\.[^\s@.]+)+$/;

function corsHeaders(origin: string | null) {
  const allowed = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Vary': 'Origin',
  };
}

// Gmail ignores dots and everything after '+', so `j.o.h.n+a@gmail.com` and
// `john@gmail.com` are the same inbox. Normalising catches the dot-trick
// enumeration that flooded the list, since the UNIQUE index then rejects them.
function canonicalize(email: string): string {
  const lower = email.trim().toLowerCase();
  const [local, domain] = lower.split('@');
  if (!local || !domain) return lower;

  if (domain === 'gmail.com' || domain === 'googlemail.com') {
    const stripped = local.split('+')[0].replace(/\./g, '');
    return `${stripped}@gmail.com`;
  }
  // Most providers honour '+' addressing as the same mailbox.
  return `${local.split('+')[0]}@${domain}`;
}

Deno.serve(async (req) => {
  const origin = req.headers.get('Origin');
  const cors = corsHeaders(origin);

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: cors });
  }

  // Reply shape is identical for bot rejections and real successes, so a
  // scripted caller gets no signal about what tripped the filter.
  const ok = (body: Record<string, unknown> = {}) =>
    new Response(JSON.stringify({ success: true, ...body }), {
      headers: { ...cors, 'Content-Type': 'application/json' },
      status: 200,
    });

  try {
    if (origin && !ALLOWED_ORIGINS.includes(origin)) {
      return ok();
    }

    const { email, fullName, source, honeypot, elapsedMs } = await req.json();

    if (honeypot) return ok();
    if (typeof elapsedMs === 'number' && elapsedMs < MIN_SUBMIT_MS) return ok();

    if (!email || typeof email !== 'string' || email.length > 254 || !EMAIL_RE.test(email)) {
      return ok();
    }

    const storedEmail = canonicalize(email);
    const safeSource = ALLOWED_SOURCES.includes(source) ? source : 'website';
    const name = typeof fullName === 'string' ? fullName.trim().slice(0, 100) : '';

    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

    const { data: existing } = await supabase
      .from('subscribers')
      .select('email')
      .eq('email', storedEmail)
      .maybeSingle();

    if (existing) {
      return ok({ alreadySubscribed: true });
    }

    const { error: insertError } = await supabase
      .from('subscribers')
      .insert([{ email: storedEmail, source: safeSource }]);

    // A duplicate losing a race against the UNIQUE index is not a real failure.
    if (insertError && insertError.code !== '23505') throw insertError;
    if (insertError) return ok({ alreadySubscribed: true });

    // Kit and the welcome email are best-effort: the subscriber is already
    // persisted, so neither failure should surface to the visitor.
    if (KIT_API_KEY) {
      try {
        await fetch('https://api.kit.com/v4/subscribers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Kit-Api-Key': KIT_API_KEY,
          },
          body: JSON.stringify({
            email_address: storedEmail,
            first_name: name ? name.split(' ')[0] : undefined,
            fields: name && name.split(' ').length > 1
              ? { last_name: name.split(' ').slice(1).join(' ') }
              : undefined,
          }),
        });
      } catch { /* non-blocking */ }
    }

    try {
      await fetch(`${SUPABASE_URL}/functions/v1/welcome-subscriber`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
        },
        body: JSON.stringify({ record: { email: storedEmail } }),
      });
    } catch { /* non-blocking */ }

    return ok({ subscribed: true });
  } catch (error) {
    console.error('subscribe error:', error);
    return new Response(JSON.stringify({ success: false }), {
      headers: { ...cors, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
