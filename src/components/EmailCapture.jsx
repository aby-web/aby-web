import { useState } from 'react';
import { honeypotProps, isLikelyBot, useFormTimer } from '../lib/botCheck';
import { subscribeEmail } from '../lib/subscribe';

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
    <section id="contact" className="bg-[#EAE0CF] px-8 md:px-12 py-18">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-[11px] uppercase tracking-[0.2em] text-[#785E3D] mb-4">
          Stay in the loop
        </p>
        <h2 className="text-4xl md:text-5xl font-light text-[#1C1410] mb-4">
          Stay connected
        </h2>
        <p className="text-base text-[#6B5740] mb-8">
          Get first access to new classes, workshops, and international retreats before they fill up.
        </p>

        {status === 'success' || status === 'exists' ? (
          <div className="text-[#785E3D] text-lg mb-4">
            {message} ✓
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mb-4">
            <input
              {...honeypotProps}
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-3">
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full name"
                disabled={status === 'loading'}
                className="flex-1 px-6 py-3 bg-white border border-[#C9B99A] rounded-full outline-none text-[#1C1410] placeholder-[#6B5740] disabled:opacity-50"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                required
                disabled={status === 'loading'}
                className="flex-1 px-6 py-3 bg-white border border-[#C9B99A] rounded-full outline-none text-[#1C1410] placeholder-[#6B5740] disabled:opacity-50"
              />
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-8 py-3 bg-[#1C1410] text-[#F4EFE6] rounded-full hover:bg-[#2A2018] transition-colors disabled:opacity-50"
            >
              {status === 'loading' ? 'Joining...' : 'Join Now'}
            </button>
            {status === 'error' && (
              <p className="text-red-600 text-sm mt-2">{message}</p>
            )}
          </form>
        )}

        <p className="text-[11px] text-[#785E3D]">
          No spam. Unsubscribe any time.
        </p>
      </div>
    </section>
  );
}
