import { useState } from 'react';
import { supabase } from '../../lib/supabase';

const accent = 'oklch(56% 0.1 38)';

export default function EmailGate({ onContinue }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error, exists

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) return;

    setStatus('loading');

    try {
      // Check if email already exists
      const { data: existing, error: checkError } = await supabase
        .from('subscribers')
        .select('email')
        .eq('email', email.toLowerCase())
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        throw checkError;
      }

      if (existing) {
        setStatus('exists');
        setTimeout(() => {
          sessionStorage.setItem('guide_email_captured', 'true');
          onContinue();
        }, 1500);
        return;
      }

      // Insert new subscriber
      const { error: insertError } = await supabase
        .from('subscribers')
        .insert([{ email: email.toLowerCase(), source: 'handstand_guide' }]);

      if (insertError) throw insertError;

      setStatus('success');
      setTimeout(() => {
        sessionStorage.setItem('guide_email_captured', 'true');
        onContinue();
      }, 1500);

    } catch (error) {
      console.error('Subscription error:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const handleSkip = () => {
    sessionStorage.setItem('guide_email_captured', 'skipped');
    onContinue();
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
          maxWidth: 480,
          width: '100%',
          background: 'oklch(99% 0.006 75)',
          border: '1px solid oklch(88% 0.018 78)',
          borderRadius: 8,
          padding: '48px 40px',
          textAlign: 'center',
        }}
      >
        <a href="/" style={{ display: 'inline-block', marginBottom: 24 }}>
          <img
            src="/images/logo.png"
            alt="Ammar Bass"
            style={{ height: 22, width: 'auto' }}
          />
        </a>

        <h2
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontWeight: 300,
            fontSize: 32,
            lineHeight: 1.2,
            margin: '0 0 12px',
            letterSpacing: '-0.01em',
            color: 'oklch(17% 0.015 55)',
          }}
        >
          Stay in the loop
        </h2>

        <p
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontWeight: 300,
            fontSize: 14,
            lineHeight: 1.7,
            color: 'oklch(45% 0.012 65)',
            margin: '0 0 28px',
          }}
        >
          Get notified when new guides are released, plus exclusive handstand tips and early access to workshops.
        </p>

        {status === 'success' ? (
          <div
            style={{
              padding: '20px',
              background: 'oklch(95% 0.03 148)',
              borderRadius: 6,
              marginBottom: 20,
            }}
          >
            <p
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 14,
                color: 'oklch(30% 0.015 55)',
                margin: 0,
              }}
            >
              ✓ You're on the list! Taking you to the guide...
            </p>
          </div>
        ) : status === 'exists' ? (
          <div
            style={{
              padding: '20px',
              background: 'oklch(95% 0.03 148)',
              borderRadius: 6,
              marginBottom: 20,
            }}
          >
            <p
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 14,
                color: 'oklch(30% 0.015 55)',
                margin: 0,
              }}
            >
              ✓ You're already subscribed! Taking you to the guide...
            </p>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                disabled={status === 'loading'}
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: 14,
                  border: '1px solid oklch(88% 0.018 78)',
                  borderRadius: 6,
                  outline: 'none',
                  marginBottom: 12,
                  transition: 'border-color 0.2s',
                  color: 'oklch(17% 0.015 55)',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = accent;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'oklch(88% 0.018 78)';
                }}
              />

              {status === 'error' && (
                <p
                  style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: 13,
                    color: 'oklch(55% 0.15 25)',
                    margin: '0 0 12px',
                  }}
                >
                  Something went wrong. Please try again.
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
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
                  cursor: status === 'loading' ? 'default' : 'pointer',
                  letterSpacing: '0.02em',
                  transition: 'all 0.2s',
                  opacity: status === 'loading' ? 0.6 : 1,
                }}
                onMouseEnter={(e) => {
                  if (status !== 'loading') {
                    e.target.style.background = 'oklch(50% 0.1 38)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (status !== 'loading') {
                    e.target.style.background = accent;
                  }
                }}
              >
                {status === 'loading' ? 'Joining...' : 'Join & Continue to Guide'}
              </button>
            </form>

            <button
              onClick={handleSkip}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'oklch(55% 0.012 65)',
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 13,
                cursor: 'pointer',
                textDecoration: 'underline',
                padding: '8px',
              }}
            >
              Skip, take me to the guide →
            </button>
          </>
        )}

        <p
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 11,
            color: 'oklch(55% 0.012 65)',
            margin: '20px 0 0',
          }}
        >
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </div>
  );
}
