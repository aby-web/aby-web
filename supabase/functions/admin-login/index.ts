import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
import {
  corsHeaders,
  hashPassword,
  issueToken,
  timingSafeEqual,
  verifyPassword,
  SESSION_TTL_SECONDS,
} from "../_shared/auth.ts";

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
// Fallback for a first login before any row exists in admin_settings.
const ADMIN_PASSWORD = Deno.env.get('ADMIN_PASSWORD');

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
    const { username, password } = await req.json();

    if (typeof username !== 'string' || typeof password !== 'string') {
      return json({ valid: false }, 401);
    }

    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

    const { data: rows } = await supabase
      .from('admin_settings')
      .select('setting_key, setting_value')
      .in('setting_key', ['admin_username', 'admin_password']);

    const get = (k: string) => rows?.find((r) => r.setting_key === k)?.setting_value ?? null;

    const expectedUsername = get('admin_username') ?? 'admin';
    const storedPassword = get('admin_password') ?? ADMIN_PASSWORD ?? '';

    const userOk = timingSafeEqual(username, expectedUsername);
    const { valid: passOk, needsRehash } = verifyPassword(password, storedPassword);

    // Check both regardless of the username result, so response timing does not
    // reveal whether the username alone was correct.
    if (!userOk || !passOk) {
      return json({ valid: false }, 401);
    }

    // Transparently upgrade a legacy plaintext row on successful login.
    if (needsRehash) {
      const hashed = hashPassword(password);
      const { data: existing } = await supabase
        .from('admin_settings')
        .select('id')
        .eq('setting_key', 'admin_password')
        .maybeSingle();

      if (existing) {
        await supabase
          .from('admin_settings')
          .update({ setting_value: hashed, updated_at: new Date().toISOString() })
          .eq('setting_key', 'admin_password');
      } else {
        await supabase
          .from('admin_settings')
          .insert([{ setting_key: 'admin_password', setting_value: hashed }]);
      }
    }

    return json({
      valid: true,
      token: await issueToken(expectedUsername),
      expiresIn: SESSION_TTL_SECONDS,
    });
  } catch (error) {
    console.error('admin-login error:', error);
    return json({ valid: false }, 500);
  }
});
