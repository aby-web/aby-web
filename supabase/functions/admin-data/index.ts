import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
import { corsHeaders, verifyToken } from "../_shared/auth.ts";

// Reads and writes for admin-only tables.
//
// These tables are restricted to the `authenticated` role, but the admin portal
// signs in against admin-login rather than Supabase Auth, so the browser's anon
// client cannot see them. This function performs the query with the service
// role once the session token checks out.
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

// Only these tables may be reached, so a caller cannot name an arbitrary one.
const READABLE = ['private_enquiries', 'guides', 'guide_views', 'yogami_interest', 'subscribers'];
const WRITABLE = ['private_enquiries'];

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
    const { action, table, columns, orderBy, ascending, id, values } = await req.json();
    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

    if (action === 'select') {
      if (!READABLE.includes(table)) return json({ error: 'table not allowed' }, 400);

      let q = supabase.from(table).select(columns || '*');
      if (orderBy) q = q.order(orderBy, { ascending: ascending ?? false });

      const { data, error } = await q;
      if (error) throw error;
      return json({ data });
    }

    if (action === 'update') {
      if (!WRITABLE.includes(table)) return json({ error: 'table not allowed' }, 400);
      if (!id || typeof values !== 'object') return json({ error: 'bad request' }, 400);

      const { error } = await supabase.from(table).update(values).eq('id', id);
      if (error) throw error;
      return json({ success: true });
    }

    if (action === 'delete') {
      if (!WRITABLE.includes(table)) return json({ error: 'table not allowed' }, 400);
      if (!id) return json({ error: 'bad request' }, 400);

      const { error } = await supabase.from(table).delete().eq('id', id);
      if (error) throw error;
      return json({ success: true });
    }

    return json({ error: 'unknown action' }, 400);
  } catch (error) {
    console.error('admin-data error:', error);
    return json({ error: 'failed' }, 500);
  }
});
