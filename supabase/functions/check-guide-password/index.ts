import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
import { corsHeaders, hashPassword, verifyPassword } from "../_shared/auth.ts";

// Verifies a guide password without ever sending it to the browser.
// Passwords are stored as bcrypt hashes; a legacy plaintext row is upgraded
// in place the first time someone successfully unlocks with it.
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

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
      .select('id, password')
      .eq('slug', slug)
      .maybeSingle();

    if (error || !data) return json({ valid: false });

    const { valid, needsRehash } = verifyPassword(password, data.password ?? '');

    if (valid && needsRehash) {
      await supabase
        .from('guides')
        .update({ password: hashPassword(password), updated_at: new Date().toISOString() })
        .eq('id', data.id);
    }

    return json({ valid });
  } catch (error) {
    console.error('check-guide-password error:', error);
    return json({ valid: false }, 500);
  }
});
