import { useState } from 'react';
import { honeypotProps, isLikelyBot, useFormTimer } from '../lib/botCheck';
import { subscribeEmail } from '../lib/subscribe';

export default function Join() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [honeypot, setHoneypot] = useState('');
  const formTimer = useFormTimer();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    // Fake success for bots — nothing is written, and they get no signal.
    if (isLikelyBot(honeypot, null)) {
      setStatus('success');
      return;
    }

    setStatus('loading');

    const result = await subscribeEmail({
      email,
      fullName,
      source: 'instagram',
      honeypot,
      elapsedMs: formTimer.elapsedMs(),
    });

    setStatus(result);
  };

  return (
    <div className="min-h-screen bg-[#F4EFE6] flex flex-col items-center justify-center px-6">

      <p className="text-[11px] uppercase tracking-[0.3em] text-[#785E3D] mb-12">
        Ammar Bass
      </p>

      {status === 'success' ? (
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-light text-[#1C1410] mb-4">
            You're on the list
          </h1>
          <p className="text-[#6B5740]">
            I'll be in touch with classes, workshops, and retreats.
          </p>
        </div>
      ) : status === 'exists' ? (
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-light text-[#1C1410] mb-4">
            Already subscribed
          </h1>
          <p className="text-[#6B5740]">
            You're already on the list — I'll be in touch soon.
          </p>
        </div>
      ) : (
        <div className="w-full max-w-sm text-center">
          <h1 className="text-4xl md:text-5xl font-light text-[#1C1410] mb-4">
            Join my mailing list
          </h1>
          <p className="text-[#6B5740] mb-10">
            First access to classes, workshops, and retreats.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              {...honeypotProps}
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full name"
              disabled={status === 'loading'}
              className="w-full px-6 py-4 bg-white border border-[#C9B99A] rounded-full text-[#1C1410] placeholder-[#C9B99A] outline-none focus:border-[#785E3D] text-center disabled:opacity-50"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              required
              disabled={status === 'loading'}
              className="w-full px-6 py-4 bg-white border border-[#C9B99A] rounded-full text-[#1C1410] placeholder-[#C9B99A] outline-none focus:border-[#785E3D] text-center disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full px-6 py-4 bg-[#1C1410] text-[#F4EFE6] rounded-full hover:bg-[#2A1E16] transition-colors disabled:opacity-50 uppercase tracking-wide text-sm"
            >
              {status === 'loading' ? 'Joining...' : 'Join'}
            </button>
            {status === 'error' && (
              <p className="text-red-600 text-sm">Something went wrong. Please try again.</p>
            )}
          </form>

          <p className="text-[11px] text-[#785E3D] mt-6">
            No spam. Unsubscribe any time.
          </p>
        </div>
      )}

      <a
        href="/"
        className="absolute bottom-8 text-xs text-[#C9B99A] hover:text-[#785E3D] transition-colors tracking-wide"
      >
        ammarbass.com
      </a>
    </div>
  );
}
