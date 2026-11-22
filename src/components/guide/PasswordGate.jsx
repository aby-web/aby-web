import { useRef, useState } from 'react';

const accent = 'oklch(56% 0.1 38)';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export default function PasswordGate({
  onSuccess,
  guideSlug = 'handstandguide',
  titleTop = 'Handstand Fundamentals',
  titleEm = 'Guide',
}) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // null | 'wrong' | 'server'
  const [checking, setChecking] = useState(false);
  const inFlight = useRef(false); // set at once, so a second submit in the same instant is ignored

  // The password is verified by an Edge Function rather than fetched and
  // compared here, so it is never exposed to the browser.
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inFlight.current) return;
    inFlight.current = true;

    setChecking(true);
    setError(null);
    let valid = false;
    let reached = false;

    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/check-guide-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'apikey': SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({ slug: guideSlug, password }),
      });
      // The function answers 200 with { valid } for a right or wrong password;
      // anything else means it failed.
      if (res.ok) {
        valid = (await res.json()).valid === true;
        reached = true;
      }
    } catch (err) {
      console.error('Error verifying guide password:', err);
    }

    inFlight.current = false;
    setChecking(false);

    if (valid) {
      sessionStorage.setItem('guide_access', 'granted');
      onSuccess();
    } else if (reached) {
      // Stays under the form until the next attempt.
      setError('wrong');
      setPassword('');
    } else {
      setError('server');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'oklch(93% 0.025 78)',
        padding: '48px 24px',
      }}
    >
      <div
        style={{
          maxWidth: 460,
          width: '100%',
          background: 'oklch(99% 0.006 75)',
          border: '1px solid oklch(88% 0.018 78)',
          borderRadius: 8,
          padding: '48px 40px',
          textAlign: 'center',
        }}
      >
        <a href="/" style={{ display: 'inline-block', marginBottom: 32 }}>
          <img
            src="/images/logo.png"
            alt="Ammar Bass logo"
            style={{ height: 22, width: 'auto' }}
          />
        </a>

        <h1
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontWeight: 300,
            fontSize: 36,
            lineHeight: 1.2,
            margin: '0 0 12px',
            letterSpacing: '-0.01em',
            color: 'oklch(17% 0.015 55)',
          }}
        >
          {titleTop}
          <br />
          <em style={{ fontStyle: 'italic' }}>{titleEm}</em>
        </h1>

        <p
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontWeight: 300,
            fontSize: 14,
            lineHeight: 1.7,
            color: 'oklch(45% 0.012 65)',
            margin: '0 0 32px',
          }}
        >
          This guide is password protected.
          <br />
          Enter your password to continue.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            aria-label="Guide password"
            autoComplete="current-password"
            autoFocus
            style={{
              width: '100%',
              padding: '14px 18px',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 14,
              border: `1px solid ${error ? 'oklch(55% 0.15 25)' : 'oklch(88% 0.018 78)'}`,
              borderRadius: 6,
              outline: 'none',
              marginBottom: 16,
              transition: 'border-color 0.2s',
              color: 'oklch(17% 0.015 55)',
            }}
            onFocus={(e) => {
              if (!error) e.target.style.borderColor = accent;
            }}
            onBlur={(e) => {
              if (!error) e.target.style.borderColor = 'oklch(88% 0.018 78)';
            }}
          />

          <button
            type="submit"
            disabled={checking}
            className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1C1410]"
            style={{
              width: '100%',
              padding: '14px 20px',
              background: accent,
              border: 'none',
              borderRadius: 6,
              color: 'white',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 14,
              fontWeight: 500,
              cursor: checking ? 'wait' : 'pointer',
              letterSpacing: '0.02em',
              transition: 'all 0.2s',
              opacity: checking ? 0.6 : 1,
            }}
            onMouseEnter={(e) => {
              if (!checking) e.target.style.background = 'oklch(50% 0.1 38)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = accent;
            }}
          >
            {checking ? 'Checking…' : 'Access Guide'}
          </button>

          {error && (
            <p
              role="alert"
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 13,
                color: 'oklch(55% 0.15 25)',
                margin: '16px 0 0',
              }}
            >
              {error === 'wrong' ? 'Wrong password.' : "Couldn't reach the server. Try again."}
            </p>
          )}
        </form>

        <p
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 12,
            color: 'oklch(55% 0.012 65)',
            margin: '24px 0 0',
          }}
        >
          Don't have access?{' '}
          <a
            href="mailto:ammar@ammarbass.com"
            style={{
              color: accent,
              textDecoration: 'none',
              fontWeight: 500,
            }}
          >
            Get in touch
          </a>
        </p>
      </div>
    </div>
  );
}
