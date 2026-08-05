// Admin session handling.
//
// Credentials are verified by the admin-login Edge Function, which compares
// against a bcrypt hash and returns a signed, expiring session token. The
// browser never receives the stored password or its hash.

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const TOKEN_KEY = 'admin_token';
const EXPIRY_KEY = 'admin_token_expires';

function baseHeaders() {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    'apikey': SUPABASE_ANON_KEY,
  };
}

export function getToken() {
  const token = localStorage.getItem(TOKEN_KEY);
  const expires = Number(localStorage.getItem(EXPIRY_KEY) || 0);
  if (!token || !expires || Date.now() > expires) {
    clearSession();
    return null;
  }
  return token;
}

export function isLoggedIn() {
  return getToken() !== null;
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(EXPIRY_KEY);
  localStorage.removeItem('admin_authenticated');
}

/**
 * @returns {Promise<boolean>} true when the credentials were accepted.
 */
export async function login(username, password) {
  try {
    const res = await fetch(`${SUPABASE_URL}/functions/v1/admin-login`, {
      method: 'POST',
      headers: baseHeaders(),
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) return false;

    const data = await res.json();
    if (!data.valid || !data.token) return false;

    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(EXPIRY_KEY, String(Date.now() + data.expiresIn * 1000));
    return true;
  } catch (error) {
    console.error('Admin login error:', error);
    return false;
  }
}

/** POST to an admin-only Edge Function with the session token attached. */
export async function adminFetch(fnName, body = {}) {
  const token = getToken();
  if (!token) return { ok: false, status: 401, data: null };

  try {
    const res = await fetch(`${SUPABASE_URL}/functions/v1/${fnName}`, {
      method: 'POST',
      headers: { ...baseHeaders(), 'x-admin-token': token },
      body: JSON.stringify(body),
    });
    const data = res.ok ? await res.json() : null;
    return { ok: res.ok, status: res.status, data };
  } catch (error) {
    console.error(`Admin request to ${fnName} failed:`, error);
    return { ok: false, status: 0, data: null };
  }
}
