import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
import { corsHeaders, verifyToken } from "../_shared/auth.ts";

// Reads and writes for the admin portal.
//
// Admin-only tables are restricted to the `authenticated` role, but the admin
// portal signs in against admin-login rather than Supabase Auth, so the
// browser's anon client cannot see them. This function performs the query with
// the service role once the session token checks out.
//
// It also performs every WRITE to the tables the public site reads (events,
// vacations) and issues upload links for event images, so that changing what
// the website shows always requires the admin login.
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

// Only these tables may be reached, so a caller cannot name an arbitrary one.
const READABLE = ['private_enquiries', 'client_intakes', 'guides', 'guide_views', 'subscribers'];
const WRITABLE = ['private_enquiries', 'client_intakes', 'events', 'vacations'];

// For tables the public site reads, the only columns a caller may set. Anything
// else in `values` (id, created_at, slug, ...) is dropped. These tables may
// also be inserted into.
const COLUMNS: Record<string, string[]> = {
  events: ['title', 'date', 'location', 'description', 'image_url', 'booking_link', 'button_label', 'status'],
  vacations: ['start_date', 'end_date', 'reason', 'updated_at'],
};

const clean = (table: string, values: Record<string, unknown>) =>
  COLUMNS[table]
    ? Object.fromEntries(Object.entries(values).filter(([key]) => COLUMNS[table].includes(key)))
    : values;

const IMAGE_BUCKET = 'event-images';
const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp'];

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
    const { action, table, columns, orderBy, ascending, id, values, extension } = await req.json();
    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

    if (action === 'select') {
      if (!READABLE.includes(table)) return json({ error: 'table not allowed' }, 400);

      // Guides: always read whole rows here, then strip the password (below).
      let q = supabase.from(table).select(table === 'guides' ? '*' : (columns || '*'));
      if (orderBy) q = q.order(orderBy, { ascending: ascending ?? false });

      const { data, error } = await q;
      if (error) throw error;

      // A guide's stored password (a hash) never leaves the server. The admin
      // page only learns whether one is set.
      if (table === 'guides') {
        const rows = ((data ?? []) as unknown as Record<string, unknown>[]).map(({ password, ...rest }) => ({
          ...rest,
          has_password: typeof password === 'string' && password.length > 0,
        }));
        return json({ data: rows });
      }

      return json({ data });
    }

    // View counts per guide, counted in the database (so there is no row limit),
    // with the time of the latest view.
    if (action === 'guide-views') {
      const { data: guideRows, error } = await supabase.from('guides').select('slug');
      if (error) throw error;

      const views: Record<string, { count: number; last: string | null }> = {};
      for (const { slug } of guideRows ?? []) {
        const { count, error: countError } = await supabase
          .from('guide_views')
          .select('id', { count: 'exact', head: true })
          .eq('guide_slug', slug);
        if (countError) throw countError;

        const { data: latest, error: latestError } = await supabase
          .from('guide_views')
          .select('viewed_at')
          .eq('guide_slug', slug)
          .order('viewed_at', { ascending: false })
          .limit(1);
        if (latestError) throw latestError;

        views[slug] = { count: count ?? 0, last: latest?.[0]?.viewed_at ?? null };
      }
      return json({ views });
    }

    if (action === 'update') {
      if (!WRITABLE.includes(table)) return json({ error: 'table not allowed' }, 400);
      if (!id || typeof values !== 'object' || values === null) return json({ error: 'bad request' }, 400);

      const cleaned = clean(table, values) as Record<string, unknown>;
      // A blank photo link never erases a stored photo. Taking a photo off needs
      // an explicit null, which only the form's "Remove photo" control sends.
      if (table === 'events' && cleaned.image_url === '') delete cleaned.image_url;
      if (Object.keys(cleaned).length === 0) return json({ success: true });

      const { error } = await supabase.from(table).update(cleaned).eq('id', id);
      if (error) throw error;
      return json({ success: true });
    }

    if (action === 'insert') {
      if (!COLUMNS[table]) return json({ error: 'table not allowed' }, 400);
      if (typeof values !== 'object' || values === null) return json({ error: 'bad request' }, 400);

      const { data, error } = await supabase.from(table).insert(clean(table, values)).select().single();
      if (error) throw error;
      return json({ success: true, data });
    }

    // A one-off link the browser can upload one event image to.
    if (action === 'upload-url') {
      const ext = String(extension || '').toLowerCase();
      if (!IMAGE_EXTENSIONS.includes(ext)) return json({ error: 'file type not allowed' }, 400);

      const path = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${ext}`;
      const { data, error } = await supabase.storage.from(IMAGE_BUCKET).createSignedUploadUrl(path);
      if (error) throw error;
      return json({ path: data.path, token: data.token });
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
