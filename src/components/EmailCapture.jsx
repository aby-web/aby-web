import { useState } from 'react';
import { honeypotProps, isLikelyBot, useFormTimer } from '../lib/botCheck';
import { subscribeEmail } from '../lib/subscribe';
import { BTN, TEXT } from './ui';

export default function EmailCapture() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error, exists
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const formTimer = useFormTimer();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) return;

    // Fake success for bots — nothing is written, and they get no signal.
    if (isLikelyBot(honeypot, null)) {
      setStatus('success');
      setMessage('You are on the list!');
      setEmail('');
      setFullName('');
      setTimeout(() => setStatus('idle'), 4000);
      return;
    }

    setStatus('loading');

    const result = await subscribeEmail({
      email,
      fullName,
      source: 'website',
      honeypot,
      elapsedMs: formTimer.elapsedMs(),
    });

    if (result === 'error') {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
      setTimeout(() => setStatus('idle'), 4000);
      return;
    }

    setStatus(result);
    setMessage(result === 'exists' ? 'You are already subscribed!' : 'You are on the list!');
    setEmail('');
    setFullName('');
    setTimeout(() => setStatus('idle'), 4000);
  };

  return (
    <section id="contact" className="bg-[#1C1410] px-8 md:px-12 py-18">
      <div className="max-w-3xl mx-auto">
        <p className={`${TEXT.eyebrowOnDark} mb-4`}>Stay in the loop</p>
        <h2 className="text-3xl md:text-4xl font-light text-[#F4EFE6] mb-4">Stay connected</h2>
        <p className={`${TEXT.bodyOnDark} mb-8`}>
          One email a month: new classes, 120 Power dates and retreat places before they go public.
        </p>

        {status === 'success' || status === 'exists' ? (
          <p className="text-[17px] text-[#F4EFE6]" role="status">{message} ✓</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              {...honeypotProps}
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="First name"
                aria-label="First name"
                autoComplete="given-name"
                disabled={status === 'loading'}
                className="flex-1 min-w-0 min-h-[48px] px-5 rounded-full bg-[#3A2A1E] text-[#F4EFE6] placeholder-[#B8A584] border border-[#5A4632] outline-none focus:border-[#C9A878]"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                aria-label="Email address"
                autoComplete="email"
                required
                disabled={status === 'loading'}
                className="flex-1 min-w-0 min-h-[48px] px-5 rounded-full bg-[#3A2A1E] text-[#F4EFE6] placeholder-[#B8A584] border border-[#5A4632] outline-none focus:border-[#C9A878]"
              />
              <button type="submit" disabled={status === 'loading'} className={BTN.primaryOnDark}>
                {status === 'loading' ? 'Joining...' : 'Join'}
              </button>
            </div>
            {status === 'error' && (
              <p className="text-sm text-[#F0B8A8]" role="alert">{message}</p>
            )}
          </form>
        )}

        <p className="text-sm text-[#B8A584]">No spam. Unsubscribe any time.</p>
      </div>
    </section>
  );
}
