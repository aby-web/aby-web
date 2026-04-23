import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

const accent = 'oklch(56% 0.1 38)';

export default function PasswordGate({ onSuccess, guideSlug = 'handstandguide' }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [correctPassword, setCorrectPassword] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGuidePassword();
  }, []);

  const fetchGuidePassword = async () => {
    try {
      const { data, error } = await supabase
        .from('guides')
        .select('password')
        .eq('slug', guideSlug)
        .single();

      if (error) throw error;

      setCorrectPassword(data.password);
    } catch (error) {
      console.error('Error fetching guide password:', error);
      // Fallback to default password if database fetch fails
      setCorrectPassword(import.meta.env.VITE_GUIDE_PASSWORD || 'handstand2026');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === correctPassword) {
      sessionStorage.setItem('guide_access', 'granted');
      onSuccess();
    } else {
      setError(true);
      setPassword('');
      setTimeout(() => setError(false), 3000);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'oklch(93% 0.025 78)',
        }}
      >
        <p style={{ color: 'oklch(45% 0.012 65)', fontFamily: 'DM Sans, sans-serif' }}>
          Loading...
        </p>
      </div>
    );
  }

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
            alt="Ammar Bass"
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
          Handstand Fundamentals
          <br />
          <em style={{ fontStyle: 'italic' }}>Guide</em>
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

          {error && (
            <p
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 13,
                color: 'oklch(55% 0.15 25)',
                margin: '0 0 16px',
              }}
            >
              Incorrect password. Please try again.
            </p>
          )}

          <button
            type="submit"
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
              cursor: 'pointer',
              letterSpacing: '0.02em',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'oklch(50% 0.1 38)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = accent;
            }}
          >
            Access Guide
          </button>
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
