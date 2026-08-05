// Single entry point for every signup form.
//
// The browser no longer touches Supabase or Kit directly: it posts to the
// `subscribe` Edge Function, which holds the Kit API key and the service-role
// key server-side. That keeps credentials out of the client bundle and means
// the anon key needs no write access to the subscribers table.

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

/**
 * @returns {Promise<'success'|'exists'|'error'>}
 */
export async function subscribeEmail({ email, fullName = '', source, honeypot = '', elapsedMs }) {
  try {
    const res = await fetch(`${SUPABASE_URL}/functions/v1/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Supabase requires an apikey to route to the function; the function
        // itself does the real authorisation.
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'apikey': SUPABASE_ANON_KEY,
      },
      // Infinity would serialise to null; omit it so the server skips the
      // timing check rather than seeing a bogus value.
      body: JSON.stringify({
        email,
        fullName,
        source,
        honeypot,
        ...(Number.isFinite(elapsedMs) ? { elapsedMs } : {}),
      }),
    });

    if (!res.ok) return 'error';

    const data = await res.json();
    if (!data.success) return 'error';
    return data.alreadySubscribed ? 'exists' : 'success';
  } catch (error) {
    console.error('Subscription error:', error);
    return 'error';
  }
}
