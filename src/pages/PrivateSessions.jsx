import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Nav from '../components/Nav';
import VacationBanner from '../components/VacationBanner';
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
  const [showContactModal, setShowContactModal] = useState(false);

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
      <Helmet>
        <title>Private Yoga Sessions London | One-to-One Training | Ammar Bass</title>
        <meta name="description" content="Personalized yoga training in London. Work one-on-one with Ammar Bass to master arm balances, inversions, and build strength. Tailored programs for injury recovery, specific goals, and skill progression." />
        <meta name="keywords" content="private yoga London, one to one yoga, personal yoga training, arm balance coaching, inversion training, yoga injury recovery, personalized yoga program, private yoga instructor London" />

        {/* Open Graph */}
        <meta property="og:title" content="Private Yoga Sessions London | Ammar Bass" />
        <meta property="og:description" content="Private sessions tailored to you. Work towards specific goals, recover from injury, or get focused attention on your practice with structured, progressive training." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ammarbass.com/private-sessions" />
        <meta property="og:image" content="https://ammarbass.com/images/about.webp" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Private Yoga Sessions London | Ammar Bass" />
        <meta name="twitter:description" content="Private sessions tailored to you. Structured, progressive training that actually moves you forward." />
        <meta name="twitter:image" content="https://ammarbass.com/images/about.webp" />

        <link rel="canonical" href="https://ammarbass.com/private-sessions" />

        {/* Schema.org structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Private Yoga Training",
            "provider": {
              "@type": "Person",
              "name": "Ammar Bass",
              "jobTitle": "Yoga Instructor"
            },
            "areaServed": {
              "@type": "City",
              "name": "London",
              "addressCountry": "GB"
            },
            "availableChannel": {
              "@type": "ServiceChannel",
              "serviceUrl": "https://ammarbass.com/private-sessions"
            },
            "description": "Personalized yoga training in London. Work one-on-one with Ammar Bass to master arm balances, inversions, and build strength. Tailored programs for injury recovery, specific goals, and skill progression.",
            "offers": [
              {
                "@type": "Offer",
                "name": "One to One Session",
                "description": "60 or 90 minutes fully personalized to your goals",
                "availability": "https://schema.org/InStock"
              },
              {
                "@type": "Offer",
                "name": "Small Group Session",
                "description": "Up to 3 people, shared focus, reduced cost",
                "availability": "https://schema.org/InStock"
              }
            ],
            "category": [
              "Yoga Training",
              "Personal Training",
              "Movement Coaching",
              "Arm Balance Training",
              "Inversion Training",
              "Injury Recovery"
            ],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Private Session Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Goal-Specific Training",
                    "description": "Handstands, arm balances, strength, or flexibility"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Injury Recovery Program",
                    "description": "Return to full practice after chronic pain or injuries"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Competition Preparation",
                    "description": "Athletes improving flexibility and recovery"
                  }
                }
              ]
            }
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What happens in a private yoga session?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We start by understanding where you are, what you want, and what is holding you back. Every session is built around your specific goals — handstands, arm balances, strength, flexibility or all of the above. You get structured, progressive training that actually moves you forward."
                }
              },
              {
                "@type": "Question",
                "name": "How long does it take to see results?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "It depends on your goal and how consistently you practice. Most students see significant progress within a few months when combining regular sessions with independent practice."
                }
              },
              {
                "@type": "Question",
                "name": "Do you offer small group sessions?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, small group sessions are available for up to 3 people with shared focus and reduced cost per person."
                }
              }
            ]
          })}
        </script>
      </Helmet>

      <Nav theme="light" />
      <VacationBanner />

      {/* Hero Section */}
      <section className="bg-[#F4EFE6] text-[#1C1410] pt-32 pb-24 px-8 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#785E3D] mb-6">
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
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-light text-[#1C1410]">
              What to Expect
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Column 1 */}
            <div>
              <p className="text-xs uppercase tracking-[0.12em] text-[#785E3D] mb-4">
                01 / Assessment
              </p>
              <p className="text-[15px] font-light leading-relaxed text-[#6B5740]">
                We start by understanding where you are, what you want, and what is holding you back.
              </p>
            </div>

            {/* Column 2 */}
            <div>
              <p className="text-xs uppercase tracking-[0.12em] text-[#785E3D] mb-4">
                02 / Progression
              </p>
              <p className="text-[15px] font-light leading-relaxed text-[#6B5740]">
                Every session is built around your specific goals — handstands, arm balances, strength, flexibility or all of the above.
              </p>
            </div>

            {/* Column 3 */}
            <div>
              <p className="text-xs uppercase tracking-[0.12em] text-[#785E3D] mb-4">
                03 / Results
              </p>
              <p className="text-[15px] font-light leading-relaxed text-[#6B5740]">
                Structured, progressive training that actually moves you forward. Not just a good class — a plan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#F4EFE6] px-8 md:px-12 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light text-[#1C1410] mb-4">
            Let's discuss your goals.
          </h2>
          <p className="text-lg text-[#6B5740] mb-12">
            Book a free 15-minute discovery call or send me a message about your goals.
          </p>

          {/* Side-by-Side CTAs */}
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
            <button
              onClick={() => setShowContactModal(false)}
              className="absolute top-4 right-4 text-[#6B5740] hover:text-[#1C1410] text-2xl"
            >
              ×
            </button>

            <h3 className="text-3xl font-light text-[#1C1410] mb-2">
              Get in touch
            </h3>
            <p className="text-sm text-[#6B5740] mb-6">
              Tell me about your goals and I'll respond within 24 hours.
            </p>

            {submitted ? (
              <div className="text-center py-8">
                <p className="text-[#785E3D] text-lg">
                  Thanks! I'll be in touch soon. ✓
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    required
                    className="w-full px-4 py-3 bg-white text-[#1C1410] border border-[#C9B99A] rounded-md outline-none focus:border-[#785E3D] placeholder-[#785E3D]"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Your email"
                    required
                    className="w-full px-4 py-3 bg-white text-[#1C1410] border border-[#C9B99A] rounded-md outline-none focus:border-[#785E3D] placeholder-[#785E3D]"
                  />
                </div>

                <div>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your goals"
                    required
                    rows="5"
                    className="w-full px-4 py-3 bg-white text-[#1C1410] border border-[#C9B99A] rounded-md outline-none focus:border-[#785E3D] placeholder-[#785E3D]"
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
        </div>
      )}

      <Footer />
    </div>
  );
}
