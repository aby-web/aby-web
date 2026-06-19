import { useState } from 'react';
import { supabase } from '../lib/supabase';

const KIT_API_KEY = import.meta.env.VITE_KIT_API_KEY;

export default function Join() {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');

    try {
      const { data: existing, error: checkError } = await supabase
        .from('subscribers')
        .select('email')
        .eq('email', email.toLowerCase())
        .single();

      if (checkError && checkError.code !== 'PGRST116') throw checkError;

      if (existing) {
        setStatus('exists');
        return;
      }

      const { error: insertError } = await supabase
        .from('subscribers')
        .insert([{ email: email.toLowerCase(), source: 'instagram' }]);

      if (insertError) throw insertError;

      // Add to Kit
      try {
        await fetch('https://api.kit.com/v4/subscribers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Kit-Api-Key': KIT_API_KEY,
          },
          body: JSON.stringify({
            email_address: email.toLowerCase(),
            first_name: firstName || undefined,
          }),
        });
      } catch (_) {}

      // Send welcome email
      try {
        await fetch('https://kfwqxmhxmclsdbvncrre.functions.supabase.co/welcome-subscriber', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ record: { email: email.toLowerCase() } })
        });
      } catch (_) {}

      setStatus('success');
    } catch (error) {
      console.error('Subscription error:', error);
      setStatus('error');
    }
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
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
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
