import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function EmailCapture() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error, exists
  const [message, setMessage] = useState('');

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
        // PGRST116 means no rows found, which is what we want
        throw checkError;
      }

      if (existing) {
        setStatus('exists');
        setMessage('You are already subscribed!');
        setEmail('');
        setTimeout(() => setStatus('idle'), 4000);
        return;
      }

      // Insert new subscriber
      const { error: insertError } = await supabase
        .from('subscribers')
        .insert([{ email: email.toLowerCase(), source: 'website' }]);

      if (insertError) throw insertError;

      setStatus('success');
      setMessage('You are on the list!');
      setEmail('');
      setTimeout(() => setStatus('idle'), 4000);

    } catch (error) {
      console.error('Subscription error:', error);
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <section id="contact" className="bg-[#F4EFE6] px-8 md:px-12 py-18">
      <div className="max-w-2xl mx-auto text-center">
        {/* Section Header */}
        <p className="text-[11px] uppercase tracking-[0.2em] text-[#785E3D] mb-4">
          Stay in the loop
        </p>
        <h2 className="text-4xl md:text-5xl font-light text-[#1C1410] mb-4">
          Don't miss out.
        </h2>
        <p className="text-base text-[#6B5740] mb-8">
          Get first access to new classes, workshops, and international retreats before they fill up.
        </p>

        {/* Form */}
        {status === 'success' || status === 'exists' ? (
          <div className="text-[#785E3D] text-lg mb-4">
            {message} ✓
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="flex items-center border border-[#C9B99A] rounded-full overflow-hidden max-w-md mx-auto bg-white">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                disabled={status === 'loading'}
                className="flex-1 px-6 py-3 bg-transparent outline-none text-[#1C1410] placeholder-[#6B5740] disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-6 py-3 bg-[#1C1410] text-[#F4EFE6] rounded-full hover:bg-[#2A2018] transition-colors disabled:opacity-50"
              >
                {status === 'loading' ? 'Joining...' : 'Join Now'}
              </button>
            </div>
            {status === 'error' && (
              <p className="text-red-600 text-sm mt-2">{message}</p>
            )}
          </form>
        )}

        {/* Disclaimer */}
        <p className="text-[11px] text-[#785E3D]">
          No spam. Unsubscribe any time.
        </p>
      </div>
    </section>
  );
}
