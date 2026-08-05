// Shared password hashing and session-token helpers for the admin functions.
//
// Passwords are stored as bcrypt hashes. Session tokens are HMAC-signed with a
// server-only secret, so the client cannot mint or tamper with one.

import * as bcrypt from "jsr:@da/bcrypt@1";

const encoder = new TextEncoder();

// Signing key for session tokens. Set via `supabase secrets set AUTH_SECRET=...`.
const AUTH_SECRET = Deno.env.get('AUTH_SECRET');

export const SESSION_TTL_SECONDS = 60 * 60 * 12; // 12 hours

export function hashPassword(plain: string): string {
  return bcrypt.hashSync(plain, bcrypt.genSaltSync(10));
}

/**
 * Verify a password against a stored value.
 *
 * Accepts a legacy plaintext value so existing rows keep working until they are
 * migrated; the caller can use the `needsRehash` flag to upgrade them in place.
 */
export function verifyPassword(plain: string, stored: string): { valid: boolean; needsRehash: boolean } {
  if (!stored) return { valid: false, needsRehash: false };

  const looksHashed = stored.startsWith('$2a$') || stored.startsWith('$2b$') || stored.startsWith('$2y$');

  if (looksHashed) {
    try {
      return { valid: bcrypt.compareSync(plain, stored), needsRehash: false };
    } catch {
      return { valid: false, needsRehash: false };
    }
  }

  // Legacy plaintext row — constant-time compare, then flag for upgrade.
  return { valid: timingSafeEqual(plain, stored), needsRehash: true };
}

/** Constant-time string comparison, so latency does not leak prefix matches. */
export function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function b64url(bytes: Uint8Array): string {
  return btoa(String.fromCharCode(...bytes)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromB64url(s: string): Uint8Array {
  const pad = s.replace(/-/g, '+').replace(/_/g, '/');
  const bin = atob(pad + '='.repeat((4 - (pad.length % 4)) % 4));
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
}

async function hmacKey(): Promise<CryptoKey> {
  if (!AUTH_SECRET) throw new Error('AUTH_SECRET is not set');
  return crypto.subtle.importKey(
    'raw',
    encoder.encode(AUTH_SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  );
}

/** Issue a signed `<payload>.<signature>` session token. */
export async function issueToken(subject: string): Promise<string> {
  const payload = b64url(encoder.encode(JSON.stringify({
    sub: subject,
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
  })));
  const sig = await crypto.subtle.sign('HMAC', await hmacKey(), encoder.encode(payload));
  return `${payload}.${b64url(new Uint8Array(sig))}`;
}

/** Verify a session token's signature and expiry. */
export async function verifyToken(token: string | null): Promise<boolean> {
  if (!token) return false;
  const [payload, sig] = token.split('.');
  if (!payload || !sig) return false;

  try {
    const ok = await crypto.subtle.verify(
      'HMAC',
      await hmacKey(),
      fromB64url(sig),
      encoder.encode(payload),
    );
    if (!ok) return false;

    const { exp } = JSON.parse(new TextDecoder().decode(fromB64url(payload)));
    return typeof exp === 'number' && exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

export const ALLOWED_ORIGINS = [
  'https://ammarbass.com',
  'https://www.ammarbass.com',
  'http://localhost:5173',
];

export function corsHeaders(origin: string | null) {
  const allowed = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-admin-token',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Vary': 'Origin',
  };
}
