import { useState } from 'react';
import { supabase } from '../lib/supabase';

const KIT_API_KEY = import.meta.env.VITE_KIT_API_KEY;

export default function EmailCapture() {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error, exists
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) return;

    setStatus('loading');

    try {
      // Check if email already exists in Supabase
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
        setMessage('You are already subscribed!');
        setEmail('');
        setFirstName('');
        setTimeout(() => setStatus('idle'), 4000);
        return;
      }

      // Insert into Supabase
      const { error: insertError } = await supabase
        .from('subscribers')
        .insert([{ email: email.toLowerCase(), source: 'website' }]);

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
      setMessage('You are on the list!');
      setEmail('');
      setFirstName('');
      setTimeout(() => setStatus('idle'), 4000);

    } catch (error) {
      console.error('Subscription error:', error);
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
      setTimeout(() => setStatus('idle'), 4000);
    }
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
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-3">
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name"
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
