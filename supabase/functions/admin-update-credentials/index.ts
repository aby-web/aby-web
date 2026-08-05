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
    const { newUsername, newPassword } = await req.json();

    if (!newUsername && !newPassword) {
      return json({ error: 'nothing to update' }, 400);
    }
    if (newPassword && (typeof newPassword !== 'string' || newPassword.length < 8)) {
      return json({ error: 'password must be at least 8 characters' }, 400);
    }

    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

    const upsert = async (key: string, value: string) => {
      const { data: existing } = await supabase
        .from('admin_settings')
        .select('id')
        .eq('setting_key', key)
        .maybeSingle();

      if (existing) {
        await supabase
          .from('admin_settings')
          .update({ setting_value: value, updated_at: new Date().toISOString() })
          .eq('setting_key', key);
      } else {
        await supabase.from('admin_settings').insert([{ setting_key: key, setting_value: value }]);
      }
    };

    if (newUsername) await upsert('admin_username', newUsername);
    // Only ever the hash is written — the plaintext is discarded here.
    if (newPassword) await upsert('admin_password', hashPassword(newPassword));

    return json({ success: true });
  } catch (error) {
    console.error('admin-update-credentials error:', error);
    return json({ error: 'failed' }, 500);
  }
});
