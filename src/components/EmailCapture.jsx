import { useState } from 'react';

export default function EmailCapture() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <section id="contact" className="bg-[#EAE0CF] px-8 md:px-12 py-18">
      <div className="max-w-2xl mx-auto text-center">
        {/* Section Header */}
        <p className="text-[11px] uppercase tracking-[0.2em] text-[#9C7F5C] mb-4">
          Stay in the loop
        </p>
        <h2 className="text-4xl md:text-5xl font-light text-[#1C1410] mb-4">
          Classes, workshops, retreats.
        </h2>
        <p className="text-base text-[#6B5740] mb-8">
          Join the mailing list for updates on new classes, upcoming workshops and international retreats.
        </p>

        {/* Form */}
        {submitted ? (
          <div className="text-[#9C7F5C] text-lg mb-4">
            Thanks, you're on the list! ✓
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
                className="flex-1 px-6 py-3 bg-transparent outline-none text-[#1C1410] placeholder-[#6B5740]"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#1C1410] text-[#F4EFE6] rounded-full hover:bg-[#2A2018] transition-colors"
              >
                Subscribe
              </button>
            </div>
          </form>
        )}

        {/* Disclaimer */}
        <p className="text-[11px] text-[#9C7F5C]">
          No spam. Unsubscribe any time.
        </p>
      </div>
    </section>
  );
}
