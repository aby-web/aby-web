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

  const pricing = [
    { label: '60-minute session', price: '£70' },
    { label: '75-minute session', price: '£80' },
    { label: '5-class pack', price: '15% off, pre-paid' },
    { label: 'Couples / duo', price: '+20%' },
    { label: 'Discovery call', price: 'Free — 15 min' },
  ];

  return (
    <div className="min-h-screen">
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
            "provider": { "@type": "Person", "name": "Ammar Bass", "url": "https://www.ammarbass.com" },
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
      <section className="bg-[#F4EFE6] text-[#1C1410] pt-32 pb-12 px-8 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#785E3D] mb-6">
            One to one · West Hampstead
          </p>
          <h1 className="text-5xl md:text-6xl font-light leading-tight mb-6">
            One-to-one yoga, built entirely around you.
          </h1>
          <p className="text-lg text-[#6B5740] max-w-2xl mx-auto">
            Private sessions in West Hampstead for students who want focused, progressive coaching — whether that's building a strong foundation or working toward a specific skill like a handstand or arm balance.
          </p>
        </div>
      </section>

      {/* Studio image — full bleed, same treatment as existing page */}
      <section className="hidden md:block relative overflow-hidden h-[650px]">
        <img
          src="/images/homestudio1.webp"
          alt="Home studio — West Hampstead"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/0 via-black/10 to-black/65" />

        <div className="absolute inset-y-0 right-0 w-[40%] flex items-center justify-center">
          <div className="px-10 py-16 max-w-lg">
            <div className="mb-12">
              <h2 className="text-4xl md:text-5xl font-light text-white">
                What to Expect
              </h2>
            </div>
            <div className="space-y-8">
              <div>
                <p className="text-base uppercase tracking-[0.2em] text-[#F4EFE6] mb-3 font-medium">01 / Assessment</p>
                <p className="text-base font-light leading-relaxed text-white">
                  An honest look at where you are, what your body needs, and what's actually holding you back.
                </p>
              </div>
              <div>
                <p className="text-base uppercase tracking-[0.2em] text-[#F4EFE6] mb-3 font-medium">02 / Structure</p>
                <p className="text-base font-light leading-relaxed text-white">
                  Drills and progressions targeting your individual limiting factors — with homework if you want to work between sessions.
                </p>
              </div>
              <div>
                <p className="text-base uppercase tracking-[0.2em] text-[#F4EFE6] mb-3 font-medium">03 / A real plan</p>
                <p className="text-base font-light leading-relaxed text-white">
                  Not just a good class. Every session is designed around you — your goals, your pace, your progress.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile: What to Expect */}
      <section className="md:hidden bg-[#EAE0CF] px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light text-[#1C1410]">What to Expect</h2>
          </div>
          <div className="grid grid-cols-1 gap-8">
            <div>
              <p className="text-xs uppercase tracking-[0.12em] text-[#785E3D] mb-4">01 / Assessment</p>
              <p className="text-[15px] font-light leading-relaxed text-[#6B5740]">
                An honest look at where you are, what your body needs, and what's actually holding you back.
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.12em] text-[#785E3D] mb-4">02 / Structure</p>
              <p className="text-[15px] font-light leading-relaxed text-[#6B5740]">
                Drills and progressions targeting your individual limiting factors — with homework if you want to work between sessions.
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.12em] text-[#785E3D] mb-4">03 / A real plan</p>
              <p className="text-[15px] font-light leading-relaxed text-[#6B5740]">
                Not just a good class. Every session is designed around you — your goals, your pace, your progress.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About section — photo left, copy right */}
      <section className="bg-[#F4EFE6] px-8 md:px-12 py-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <img
              src="/images/BBB08980.webp"
              alt="Ammar Bass"
              className="w-full h-[560px] object-cover object-top rounded-lg"
            />
          </div>
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
              <p className="text-sm text-[#C9B99A] pt-2">
                Sessions are 60 or 75 minutes, in person at my home studio in West Hampstead (NW6).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-[#EAE0CF] px-8 md:px-12 py-24">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#785E3D] mb-4">Pricing</p>
            <h2 className="text-3xl md:text-4xl font-light text-[#1C1410]">Simple and transparent.</h2>
          </div>
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
      <section className="bg-[#F4EFE6] px-8 md:px-12 py-18">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light text-[#1C1410] mb-4">
            Let's discuss your goals
          </h2>
          <p className="text-lg text-[#6B5740] mb-12">
            A free 15-minute discovery call to talk through your goals and make sure it's the right fit — no commitment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
            <button
              onClick={() => setShowContactModal(true)}
              className="inline-block px-8 py-4 rounded-full bg-transparent border-2 border-[#1C1410] text-[#1C1410] hover:bg-[#1C1410] hover:text-[#F4EFE6] transition-colors text-sm uppercase tracking-wide"
            >
              Send Message
            </button>
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowContactModal(false)}>
          <div className="bg-[#F4EFE6] rounded-lg max-w-lg w-full p-8 relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowContactModal(false)} className="absolute top-4 right-4 text-[#6B5740] hover:text-[#1C1410] text-2xl">×</button>
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
