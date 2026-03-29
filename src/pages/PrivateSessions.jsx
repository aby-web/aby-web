import { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabase';

export default function PrivateSessions() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Load Calendly widget script and styles
  useEffect(() => {
    // Load CSS
    const link = document.createElement('link');
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Load Script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const { error: insertError } = await supabase
        .from('private_enquiries')
        .insert([{
          name: formData.name,
          email: formData.email.toLowerCase(),
          message: formData.message
        }]);

      if (insertError) throw insertError;

      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('Error submitting enquiry:', err);
      setError('Something went wrong. Please try emailing me directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Nav theme="light" />

      {/* Hero Section */}
      <section className="bg-[#F4EFE6] text-[#1C1410] pt-32 pb-24 px-8 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#9C7F5C] mb-6">
            One to one
          </p>
          <h1 className="text-5xl md:text-6xl font-light leading-tight mb-6">
            Private sessions tailored to you.
          </h1>
          <p className="text-lg text-[#6B5740] max-w-2xl mx-auto">
            Whether you are working towards a specific goal, recovering from injury, or simply want more focused attention on your practice — private sessions give you exactly that.
          </p>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="bg-[#EAE0CF] px-8 md:px-12 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Column 1 */}
            <div>
              <p className="text-xs uppercase tracking-[0.12em] text-[#9C7F5C] mb-4">
                01 / Assessment
              </p>
              <p className="text-[15px] font-light leading-relaxed text-[#6B5740]">
                We start by understanding where you are, what you want, and what is holding you back.
              </p>
            </div>

            {/* Column 2 */}
            <div>
              <p className="text-xs uppercase tracking-[0.12em] text-[#9C7F5C] mb-4">
                02 / Progression
              </p>
              <p className="text-[15px] font-light leading-relaxed text-[#6B5740]">
                Every session is built around your specific goals — handstands, arm balances, strength, flexibility or all of the above.
              </p>
            </div>

            {/* Column 3 */}
            <div>
              <p className="text-xs uppercase tracking-[0.12em] text-[#9C7F5C] mb-4">
                03 / Results
              </p>
              <p className="text-[15px] font-light leading-relaxed text-[#6B5740]">
                Structured, progressive training that actually moves you forward. Not just a good class — a plan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Discovery Call Section */}
      <section className="bg-[#F4EFE6] px-8 md:px-12 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light text-[#1C1410] mb-4">
            Not sure where to start?
          </h2>
          <p className="text-lg text-[#6B5740] mb-12">
            Book a free 15 minute call. We will have a chat about your goals and I will let you know if I can help.
          </p>

          {/* Calendly Popup Button */}
          <a
            href=""
            className="inline-block px-8 py-4 rounded-full bg-[#1C1410] text-[#F4EFE6] hover:bg-[#2A1E16] transition-colors text-sm uppercase tracking-wide cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              if (window.Calendly) {
                window.Calendly.initPopupWidget({ url: 'https://calendly.com/ammar-ammarbass/30min' });
              }
              return false;
            }}
          >
            Book Discovery Call
          </a>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-[#EAE0CF] px-8 md:px-12 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-light text-[#1C1410] mb-4">
              Sessions
            </h2>
            <p className="text-lg text-[#6B5740]">
              Get in touch to discuss rates and availability.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1 */}
            <div className="bg-[#F4EFE6] border border-[#C9B99A] rounded-md p-8">
              <h3 className="text-2xl font-light text-[#1C1410] mb-4">
                One to one
              </h3>
              <p className="text-[15px] text-[#6B5740] mb-2">
                60 or 90 minutes
              </p>
              <p className="text-[15px] text-[#6B5740]">
                Fully personalised to your goals
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#F4EFE6] border border-[#C9B99A] rounded-md p-8">
              <h3 className="text-2xl font-light text-[#1C1410] mb-4">
                Small group
              </h3>
              <p className="text-[15px] text-[#6B5740] mb-2">
                Up to 3 people
              </p>
              <p className="text-[15px] text-[#6B5740]">
                Shared focus, reduced cost
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="bg-[#F4EFE6] px-8 md:px-12 py-20">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-light text-[#1C1410] mb-4">
              Send me a message
            </h2>
            <p className="text-lg text-[#6B5740]">
              I'll get back to you within 24 hours
            </p>
          </div>

          {submitted ? (
            <div className="bg-[#F4EFE6] border border-[#C9B99A] rounded-md p-12 text-center">
              <p className="text-[#9C7F5C] text-lg">
                Thanks! I'll be in touch soon. ✓
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-[#F4EFE6] border border-[#C9B99A] rounded-md p-8 space-y-4">
              <div>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                  required
                  className="w-full px-4 py-3 bg-white text-[#1C1410] border border-[#C9B99A] rounded-md outline-none focus:border-[#9C7F5C] placeholder-[#9C7F5C]"
                />
              </div>

              <div>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Your email"
                  required
                  className="w-full px-4 py-3 bg-white text-[#1C1410] border border-[#C9B99A] rounded-md outline-none focus:border-[#9C7F5C] placeholder-[#9C7F5C]"
                />
              </div>

              <div>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your goals"
                  required
                  rows="5"
                  className="w-full px-4 py-3 bg-white text-[#1C1410] border border-[#C9B99A] rounded-md outline-none focus:border-[#9C7F5C] placeholder-[#9C7F5C]"
                />
              </div>

              {error && (
                <p className="text-red-700 text-sm">{error}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full px-8 py-4 rounded-full bg-[#1C1410] text-[#F4EFE6] hover:bg-[#2A1E16] transition-colors text-sm uppercase tracking-wide disabled:opacity-50"
              >
                {submitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
