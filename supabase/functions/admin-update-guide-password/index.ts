import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
import { corsHeaders, hashPassword, verifyToken } from "../_shared/auth.ts";

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

  if (!(await verifyToken(req.headers.get('x-admin-token')))) {
    return json({ error: 'unauthorized' }, 401);
  }

  try {
    const { guideId, password } = await req.json();

    if (!guideId || typeof password !== 'string' || password.length < 6) {
      return json({ error: 'password must be at least 6 characters' }, 400);
    }

    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

    // Only the hash is stored.
    const { error } = await supabase
      .from('guides')
      .update({ password: hashPassword(password), updated_at: new Date().toISOString() })
      .eq('id', guideId);

    if (error) throw error;

    return json({ success: true });
  } catch (error) {
    console.error('admin-update-guide-password error:', error);
    return json({ error: 'failed' }, 500);
  }
});
