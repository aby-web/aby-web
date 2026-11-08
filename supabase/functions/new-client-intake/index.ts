import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

// The new client form at /onboard.
//
// Deployed with --no-verify-jwt: the person filling this in has no account.
// Protections, in the same spirit as `subscribe`:
//   * honeypot and time-to-submit checks; a bot gets the same 200 as a person
//   * a global cap per hour, so a flood cannot bury the inbox or the table
//   * every field length-checked here AND by CHECK constraints in the table
//   * writes with the service role; client_intakes has no anon policy
//   * everything in the email is HTML-escaped
//
// HEALTH NOTES are special category data under UK GDPR. They are stored only
// with consent (enforced by the table too) and NEVER leave the database here:
// the email says that notes were added, not what they say. Never logged.

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');

const NOTIFY_TO = 'ammar@ammarbass.com';
const MIN_SUBMIT_MS = 2500;
const MAX_PER_HOUR = 20;

const ALLOWED_ORIGINS = [
  'https://ammarbass.com',
  'https://www.ammarbass.com',
  'http://localhost:5173',
];
// Vercel preview deployments of this project, so the form can be tested
// before merging.
const PREVIEW_ORIGIN = /^https:\/\/aby-[a-z0-9-]+-aby-webs-projects\.vercel\.app$/;

const originAllowed = (o: string | null) => !!o && (ALLOWED_ORIGINS.includes(o) || PREVIEW_ORIGIN.test(o));

function corsHeaders(origin: string | null) {
  return {
    'Access-Control-Allow-Origin': originAllowed(origin) ? origin! : ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Vary': 'Origin',
  };
}

const EXPERIENCE: Record<string, string> = {
  complete_beginner: 'Complete beginner',
  some: 'Some experience (a few classes or on and off)',
  regular: 'Practise regularly',
  experienced: 'Experienced (several years, working on advanced skills)',
};
const FORMAT: Record<string, string> = {
  studio: 'In the studio (West Hampstead)',
  online: 'Online (WhatsApp video)',
  home: 'At their home',
};

const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '');
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(v: unknown): string {
  return String(v ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

Deno.serve(async (req) => {
  const origin = req.headers.get('Origin');
  const cors = corsHeaders(origin);
  const json = (body: Record<string, unknown>, status = 200) =>
    new Response(JSON.stringify(body), { headers: { ...cors, 'Content-Type': 'application/json' }, status });

  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ error: 'Something went wrong. Please try again.' }, 400);
  }

  // Bot signals: answer as if it worked, write nothing.
  if (origin && !originAllowed(origin)) return json({ ok: true });
  if (str(body.honeypot)) return json({ ok: true });
  if (typeof body.elapsedMs === 'number' && body.elapsedMs < MIN_SUBMIT_MS) return json({ ok: true });

  const format = str(body.format);
  const c = {
    name: str(body.name),
    email: str(body.email).toLowerCase(),
    phone: str(body.phone),
    goals: str(body.goals),
    experience: str(body.experience),
    availability: str(body.availability),
    format,
    home_area: format === 'home' ? str(body.home_area) : '',
    health_notes: str(body.health_notes),
    health_consent: body.health_consent === true,
    disclaimer_agreed: body.disclaimer_agreed === true,
  };

  // Plain sentences, so the form can show them as they are.
  if (!c.name) return json({ error: 'Please give your name.' }, 400);
  if (!EMAIL_RE.test(c.email)) return json({ error: 'Please check your email address.' }, 400);
  if (!c.goals) return json({ error: 'Please tell me a little about your goals.' }, 400);
  if (!(c.experience in EXPERIENCE)) return json({ error: 'Please choose your experience level.' }, 400);
  if (!c.availability) return json({ error: 'Please tell me when you are usually free.' }, 400);
  if (!(c.format in FORMAT)) return json({ error: 'Please choose where you would like to practise.' }, 400);
  if (c.health_notes && !c.health_consent) {
    return json({ error: 'Please tick the box so I can store your health notes.' }, 400);
  }
  if (!c.disclaimer_agreed) return json({ error: 'Please agree to the disclaimer to continue.' }, 400);
  if (
    c.name.length > 200 || c.email.length > 320 || c.phone.length > 50 || c.goals.length > 2000 ||
    c.availability.length > 1000 || c.home_area.length > 200 || c.health_notes.length > 2000
  ) {
    return json({ error: 'One of your answers is too long. Please shorten it.' }, 400);
  }

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

  const hourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const { count } = await supabase
    .from('client_intakes')
    .select('id', { count: 'exact', head: true })
    .gte('created_at', hourAgo);
  if ((count ?? 0) >= MAX_PER_HOUR) {
    return json({ error: 'Too many forms right now. Please try again later or email me.' }, 429);
  }

  const { error: insertError } = await supabase.from('client_intakes').insert([{
    name: c.name,
    email: c.email,
    phone: c.phone || null,
    goals: c.goals,
    experience: c.experience,
    availability: c.availability,
    format: c.format,
    home_area: c.home_area || null,
    health_notes: c.health_notes || null,
    health_consent: c.health_consent,
    disclaimer_agreed: c.disclaimer_agreed,
  }]);
  if (insertError) {
    // Never log the row: it may carry health notes.
    console.error('new-client-intake: insert failed:', insertError.code);
    return json({ error: 'Something went wrong. Please email me directly.' }, 500);
  }

  // Best-effort: the form is already saved.
  if (RESEND_API_KEY) {
    try {
      const row = (label: string, value: string) =>
        value ? `<p><strong>${label}:</strong> ${escapeHtml(value)}</p>` : '';
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${RESEND_API_KEY}` },
        body: JSON.stringify({
          from: 'noreply@ammarbass.com',
          to: [NOTIFY_TO],
          reply_to: c.email,
          subject: `New client form from ${c.name.replace(/[\r\n]+/g, ' ')}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #1C1410;">New client form</h2>
              <div style="background: #F4EFE6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                ${row('Name', c.name)}
                ${row('Email', c.email)}
                ${row('Phone', c.phone)}
                ${row('Format', FORMAT[c.format])}
                ${row('Area / postcode', c.home_area)}
                ${row('Experience', EXPERIENCE[c.experience])}
                <p><strong>Goals:</strong></p>
                <p style="white-space: pre-wrap;">${escapeHtml(c.goals)}</p>
                <p><strong>Availability:</strong></p>
                <p style="white-space: pre-wrap;">${escapeHtml(c.availability)}</p>
                <p><strong>Health notes:</strong> ${c.health_notes ? 'Added — read them in /admin under New clients.' : 'None given.'}</p>
              </div>
              <p style="color: #6B5740; font-size: 14px;">Reply to this email to reach ${escapeHtml(c.name)} directly.</p>
            </div>
          `,
        }),
      });
    } catch (err) {
      console.error('new-client-intake: email failed:', (err as Error).message);
    }
  }

  return json({ ok: true });
});
