import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Nav from '../components/Nav';
import VacationBanner from '../components/VacationBanner';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabase';

export default function PrivateSessions2() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [showContactModal, setShowContactModal] = useState(false);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  }, []);

  const openCalendly = (e) => {
    e.preventDefault();
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: 'https://calendly.com/ammar-ammarbass/30min' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const { error: insertError } = await supabase
        .from('private_enquiries')
        .insert([{ name: formData.name, email: formData.email.toLowerCase(), message: formData.message }]);
      if (insertError) throw insertError;
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setError('Something went wrong. Please try emailing me directly.');
    } finally {
      setSubmitting(false);
    }
  };

  const whatToExpect = [
    'An honest assessment of your movement and practice',
    'Sessions structured around your specific goals',
    'Drills and progressions targeting your individual limiting factors',
    'Homework for those who want to work between sessions',
    'A clear plan, not just a good class',
  ];

  const pricing = [
    { label: '60-minute session', price: '£70' },
    { label: '75-minute session', price: '£80' },
    { label: '5-class pack', price: '15% off, pre-paid' },
    { label: 'Couples / duo', price: '+20%' },
    { label: 'Discovery call', price: 'Free — 15 min' },
  ];

  return (
    <div className="min-h-screen bg-[#F4EFE6]">
      <Helmet>
        <title>Private Yoga Sessions in West Hampstead | Ammar Bass</title>
        <meta name="description" content="One-to-one yoga in West Hampstead, London. Build strong foundations or work toward handstands and arm balances — sessions designed around you. Free 15-min discovery call." />
        <meta name="keywords" content="private yoga West Hampstead, 1-to-1 yoga London, handstand coaching, arm balance tuition, NW6 yoga teacher" />
        <meta property="og:title" content="Private Yoga Sessions in West Hampstead | Ammar Bass" />
        <meta property="og:description" content="One-to-one yoga in West Hampstead, London. Build strong foundations or work toward handstands and arm balances." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ammarbass.com/private-sessions2" />
        <meta property="og:image" content="https://ammarbass.com/images/homestudio1.webp" />
        <link rel="canonical" href="https://ammarbass.com/private-sessions2" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Private one-to-one yoga tuition",
            "provider": {
              "@type": "Person",
              "name": "Ammar Bass",
              "url": "https://www.ammarbass.com"
            },
            "areaServed": { "@type": "Place", "name": "West Hampstead, London NW6" },
            "offers": [
              { "@type": "Offer", "name": "60-minute session", "price": "70", "priceCurrency": "GBP" },
              { "@type": "Offer", "name": "75-minute session", "price": "80", "priceCurrency": "GBP" }
            ]
          })}
        </script>
      </Helmet>

      <Nav theme="light" />
      <VacationBanner />

      {/* Hero */}
      <section className="relative w-full h-screen overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/images/homestudio1-crop.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/50" />

        {/* Content */}
        <div className="relative h-full flex items-center">
          <div className="pl-12 md:pl-16 lg:pl-[72px] max-w-xl">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#C9A878] mb-6" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>
              One to one · West Hampstead
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-[72px] font-light leading-none text-white mb-6">
              One-to-one yoga, built entirely around you.
            </h1>
            <p className="text-base text-white/85 leading-relaxed max-w-[420px] mb-10">
              Private sessions in West Hampstead for students who want focused, progressive coaching — whether that's building a strong foundation or working toward a specific skill like a handstand or arm balance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <a
                href=""
                onClick={openCalendly}
                className="px-6 py-3 rounded-full bg-white text-[#1C1410] hover:bg-white/90 transition-colors text-sm uppercase tracking-wide"
              >
                Book a free discovery call
              </a>
              <button
                onClick={() => setShowContactModal(true)}
                className="px-6 py-3 rounded-full border-2 border-white text-white hover:bg-white/10 transition-colors text-sm uppercase tracking-wide"
              >
                Send a message
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About the sessions */}
      <section className="py-24 px-8 md:px-12 bg-[#F4EFE6]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#785E3D] mb-6">The approach</p>
            <h2 className="text-3xl md:text-4xl font-light text-[#1C1410] mb-8 leading-snug">
              Focused, progressive work with a teacher who's paying full attention.
            </h2>
            <div className="space-y-5 text-[15px] text-[#6B5740] leading-relaxed">
              <p>
                I offer one-to-one sessions for two kinds of students: those who want to build a strong, intelligent yoga practice from the ground up, and those working toward a specific goal, like a handstand, arm balance, or more advanced postures.
              </p>
              <p>
                Both start in the same place: understanding where you are, what your body needs, and what's actually holding you back. From there, every session is designed around you — your alignment, your restrictions, your pace.
              </p>
              <p>
                Whether you're relatively new to yoga and want a solid foundation, or you've been practising for years and want to push into more complex territory, this is focused, progressive work with a teacher who's paying full attention.
              </p>
            </div>
          </div>

          {/* Action shot */}
          <div className="relative">
            <img
              src="/images/about-teaching.jpg"
              alt="Ammar Bass arm balance"
              className="w-full h-[520px] object-cover object-top rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* What to expect */}
      <section className="py-24 px-8 md:px-12 bg-[#EAE0CF]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#785E3D] mb-6">What to expect</p>
            <h2 className="text-3xl md:text-4xl font-light text-[#1C1410] mb-10 leading-snug">
              Every session is different.<br />The structure isn't.
            </h2>
            <ul className="space-y-5">
              {whatToExpect.map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="text-[11px] text-[#785E3D] uppercase tracking-widest pt-1 shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[15px] text-[#6B5740] leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-10 text-sm text-[#6B5740]">
              Sessions are 60 or 75 minutes, in person at my home studio in West Hampstead (NW6).
            </p>
          </div>

          {/* Studio image 2 */}
          <div>
            <img
              src="/images/homestudio2.webp"
              alt="Home studio space — West Hampstead"
              className="w-full h-[520px] object-cover object-center rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-8 md:px-12 bg-[#F4EFE6]">
        <div className="max-w-3xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#785E3D] mb-6 text-center">Pricing</p>
          <h2 className="text-3xl md:text-4xl font-light text-[#1C1410] mb-12 text-center">Simple and transparent.</h2>
          <div className="divide-y divide-[#C9B99A]">
            {pricing.map((item, i) => (
              <div key={i} className="flex justify-between items-center py-5">
                <span className="text-[15px] text-[#1C1410]">{item.label}</span>
                <span className="text-[15px] text-[#785E3D] font-light">{item.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-8 md:px-12 bg-[#1C1410]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light text-[#F4EFE6] mb-4">
            Ready to get started?
          </h2>
          <p className="text-[#C9B99A] mb-10 leading-relaxed">
            A free 15-minute call to talk through your goals and make sure it's the right fit — no commitment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href=""
              onClick={openCalendly}
              className="inline-block px-8 py-4 rounded-full bg-[#F4EFE6] text-[#1C1410] hover:bg-[#EAE0CF] transition-colors text-sm uppercase tracking-wide"
            >
              Book a free discovery call
            </a>
            <button
              onClick={() => setShowContactModal(true)}
              className="inline-block px-8 py-4 rounded-full border border-[#F4EFE6]/40 text-[#F4EFE6] hover:border-[#F4EFE6] transition-colors text-sm uppercase tracking-wide"
            >
              Send a message
            </button>
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowContactModal(false)}>
          <div className="bg-[#F4EFE6] rounded-lg max-w-lg w-full p-8 relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowContactModal(false)}
              className="absolute top-4 right-4 text-[#6B5740] hover:text-[#1C1410] text-2xl"
            >
              ×
            </button>
            <h3 className="text-3xl font-light text-[#1C1410] mb-2">Get in touch</h3>
            <p className="text-sm text-[#6B5740] mb-6">Tell me about your goals and I'll respond within 24 hours.</p>
            {submitted ? (
              <div className="text-center py-8">
                <p className="text-[#785E3D] text-lg">Thanks! I'll be in touch soon. ✓</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                  required
                  className="w-full px-4 py-3 bg-white text-[#1C1410] border border-[#C9B99A] rounded-md outline-none focus:border-[#785E3D] placeholder-[#785E3D]"
                />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Your email"
                  required
                  className="w-full px-4 py-3 bg-white text-[#1C1410] border border-[#C9B99A] rounded-md outline-none focus:border-[#785E3D] placeholder-[#785E3D]"
                />
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your goals"
                  required
                  rows="5"
                  className="w-full px-4 py-3 bg-white text-[#1C1410] border border-[#C9B99A] rounded-md outline-none focus:border-[#785E3D] placeholder-[#785E3D]"
                />
                {error && <p className="text-red-700 text-sm">{error}</p>}
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
        </div>
      )}

      <Footer />
    </div>
  );
}
