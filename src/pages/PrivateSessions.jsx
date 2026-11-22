import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import PageMeta from '../components/PageMeta';
import Nav from '../components/Nav';
import VacationBanner from '../components/VacationBanner';
import Footer from '../components/Footer';
import Testimonials from '../components/Testimonials';
import FaqList from '../components/FaqList';
import BookCallButton from '../components/BookCallButton';
import BookingBar from '../components/BookingBar';
import { WhatsAppButton } from '../components/WhatsAppGroupButton';
import { BTN, TEXT } from '../components/ui';
import { supabase } from '../lib/supabase';
import { pricing, offers, formats, PRICE_60, PRIVATE_WHATSAPP_URL } from '../data/privateSessions';
import { privateFaqs } from '../data/faqs';
import { privateService, faqPage } from '../data/schema';

/*
 * /private-sessions — the one page about private sessions.
 *
 * Order (docs/site-review.md, "Private sessions page order"):
 *   hero → who it is for → how it works → where → prices (once) →
 *   testimonials → questions → final booking button.
 *
 * It absorbed the old "how private sessions work" page; that address now
 * redirects to #how-it-works here.
 *
 * TODO(Ammar): the hero uses the studio photo until a photo of a one-to-one
 * session is supplied.
 */

const WHO = [
  {
    title: 'New to yoga',
    text: "Complete beginners are very welcome. In fact, this is where I'd suggest you start. We go at your pace, I explain the why behind each pose, and you learn the foundations properly from the start: how to breathe, how to set up safely, and how to build strength without strain.",
  },
  {
    title: 'Working towards a skill',
    text: 'A handstand, an arm balance, more strength or more flexibility. Every session is built around your goals, and you leave each one with one or two things to practise and a plan for the next.',
  },
  {
    title: 'Wanting individual attention',
    text: "One teacher and your own pace, with clear cues and plenty of explanation. Practising with friends or colleagues at a similar level? I can put together a small group session — just ask.",
  },
];

const STEPS = [
  {
    title: 'A free 15-minute call.',
    text: 'Tell me where you are and what you would like to work on. I will tell you honestly how I can help. No pressure to book.',
  },
  {
    title: 'A short form.',
    text: 'A few minutes on your experience, your goals and any injuries, so I can plan for you.',
    link: { href: '/onboard', label: 'See the new client form' },
  },
  {
    title: 'Your first session.',
    text: 'We talk briefly, then practise at your pace with clear cues and plenty of explanation.',
  },
  {
    title: 'A plan.',
    text: 'You leave with one or two things to practise before we next meet.',
  },
];

const whatsAppLabel = 'Message Ammar on WhatsApp about private sessions (opens WhatsApp)';

export default function PrivateSessions() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [showContactModal, setShowContactModal] = useState(false);

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
    <div className="min-h-screen bg-[#F4EFE6]">
      <PageMeta path="/private-sessions" />
      <Helmet>
        <meta name="keywords" content="private yoga West Hampstead, 1-to-1 yoga London, handstand coaching, arm balance tuition, NW6 yoga teacher" />
        <script type="application/ld+json">
          {JSON.stringify(privateService(offers))}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqPage(privateFaqs))}
        </script>
      </Helmet>

      <Nav theme="light" />
      <VacationBanner />

      <main>
        {/* 1. Hero */}
        <section className="pt-28 md:pt-32 pb-16 px-8 md:px-12">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div>
              <p className={`${TEXT.eyebrow} mb-5`}>One to one</p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light leading-tight text-[#1C1410] mb-6">
                Private yoga sessions in West Hampstead
              </h1>
              <p className={`${TEXT.body} mb-8`}>
                One-to-one in my loft studio in NW6, online, or at your home. Whether you have never stepped on a mat or you are working towards a handstand, we build the session around you. From £{PRICE_60}. Free parking.
              </p>
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4">
                <BookCallButton />
                <WhatsAppButton href={PRIVATE_WHATSAPP_URL} ariaLabel={whatsAppLabel} variant="secondary">
                  Message me on WhatsApp
                </WhatsAppButton>
              </div>
            </div>
            <img
              src="/images/homestudio1.webp"
              alt="The loft studio in West Hampstead where private sessions take place, with mats laid out under the skylights"
              width="1200"
              height="953"
              className="w-full aspect-[5/4] object-cover rounded-lg"
            />
          </div>
        </section>

        {/* 2. Who it is for */}
        <section className="bg-[#EAE0CF] px-8 md:px-12 py-12 md:py-18">
          <div className="max-w-6xl mx-auto">
            <p className={`${TEXT.eyebrow} mb-4`}>Who it is for</p>
            <h2 className="text-3xl md:text-4xl font-light text-[#1C1410] mb-10">Wherever you are starting from</h2>
            <div className="grid md:grid-cols-3 gap-8 md:gap-10">
              {WHO.map((item) => (
                <div key={item.title} className="border-t border-[#785E3D] pt-5">
                  <h3 className="text-2xl font-light text-[#1C1410] mb-3">{item.title}</h3>
                  <p className={TEXT.body}>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. How it works */}
        <section id="how-it-works" className="px-8 md:px-12 py-12 md:py-18 scroll-mt-20">
          <div className="max-w-6xl mx-auto grid md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] gap-10 md:gap-16 items-start">
            <div>
              <p className={`${TEXT.eyebrow} mb-4`}>How it works</p>
              <h2 className="text-3xl md:text-4xl font-light text-[#1C1410] mb-8">Four steps, starting with a free call</h2>
              <ol className="border-t border-[#C9B99A]">
                {STEPS.map((step, i) => (
                  <li key={step.title} className="flex gap-5 py-5 border-b border-[#C9B99A]">
                    <span className="text-2xl font-light text-[#785E3D] w-6 shrink-0" aria-hidden="true">{i + 1}</span>
                    <p className={TEXT.body}>
                      <strong className="font-medium text-[#1C1410]">{step.title}</strong> {step.text}
                      {step.link && (
                        <>
                          {' '}
                          <a href={step.link.href} className={TEXT.link}>{step.link.label}</a>.
                        </>
                      )}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
            <img
              loading="lazy"
              src="/images/private-session.webp"
              alt="Ammar Bass holding a handstand, seen from behind"
              className="hidden md:block w-full aspect-[4/5] object-cover rounded-lg"
            />
          </div>
        </section>

        {/* 4. Where */}
        <section className="bg-[#EAE0CF] px-8 md:px-12 py-12 md:py-18">
          <div className="max-w-6xl mx-auto">
            <p className={`${TEXT.eyebrow} mb-4`}>Where</p>
            <h2 className="text-3xl md:text-4xl font-light text-[#1C1410] mb-4">The loft studio, online, or your home</h2>
            <p className={`${TEXT.body} max-w-3xl mb-10`}>
              Free parking, and about 15 minutes' walk from West Hampstead station. No distractions, no drop-ins. Prefer to practise elsewhere? I also teach online and at your home.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {formats.map((f) => (
                <div key={f.name} className="bg-[#F4EFE6] rounded-lg p-6">
                  <h3 className="text-xl font-light text-[#1C1410] mb-2">{f.name}</h3>
                  <p className="text-[16px] leading-relaxed text-[#5C4A36]">{f.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Prices, once */}
        <section id="prices" className="px-8 md:px-12 py-12 md:py-18 scroll-mt-20">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light text-[#1C1410] mb-8">Prices</h2>
            <dl className="border-t border-[#C9B99A]">
              {pricing.map((item) => (
                <div key={item.label} className="flex justify-between items-baseline gap-6 py-4 border-b border-[#C9B99A]">
                  <dt className="text-[17px] text-[#5C4A36]">{item.label}</dt>
                  <dd className="text-[17px] text-[#1C1410] text-right">{item.price}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* 6. Testimonials */}
        <Testimonials page="private-sessions" heading="What private clients say" />

        {/* 7. Questions (moved here from the FAQ page) */}
        <section id="questions" className="bg-[#EAE0CF] px-8 md:px-12 py-12 md:py-18 scroll-mt-20">
          <div className="max-w-4xl mx-auto">
            <p className={`${TEXT.eyebrow} mb-4`}>Questions</p>
            <h2 className="text-3xl md:text-4xl font-light text-[#1C1410] mb-8">Questions about private sessions</h2>
            <FaqList groups={privateFaqs} showCategories={false} />
          </div>
        </section>

        {/* 8. Final booking button */}
        <section id="contact" className="bg-[#1C1410] px-8 md:px-12 py-12 md:py-18 scroll-mt-20">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-light text-[#F4EFE6] mb-4">Let's talk about your goals</h2>
            <p className={`${TEXT.bodyOnDark} mb-8`}>
              Book a free 15-minute call, or message me about what you would like to work on.
            </p>
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4">
              <BookCallButton variant="primaryOnDark" />
              <WhatsAppButton href={PRIVATE_WHATSAPP_URL} ariaLabel={whatsAppLabel} variant="secondaryOnDark">
                Message me on WhatsApp
              </WhatsAppButton>
            </div>
            <p className="mt-6 text-[16px] text-[#E5D5B7]">
              Not on WhatsApp?{' '}
              <button
                onClick={() => setShowContactModal(true)}
                className="min-h-[44px] underline underline-offset-4 text-[#F4EFE6] hover:text-white transition-colors"
              >
                Send me a message here
              </button>
            </p>
          </div>
        </section>
      </main>

      {/* Contact form */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/50 z-[70] flex items-center justify-center p-4" onClick={() => setShowContactModal(false)}>
          <div
            className="bg-[#F4EFE6] rounded-lg max-w-lg w-full p-8 relative"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowContactModal(false)}
              aria-label="Close"
              className="absolute top-2 right-2 w-11 h-11 text-[#5C4A36] hover:text-[#1C1410] text-2xl"
            >
              ×
            </button>
            <h3 id="contact-title" className="text-3xl font-light text-[#1C1410] mb-2">Get in touch</h3>
            <p className="text-[16px] text-[#5C4A36] mb-6">Tell me about your goals and I'll respond within 24 hours.</p>
            {submitted ? (
              <div className="py-8" role="status">
                <p className="text-[#1C1410] text-lg">Thanks! I'll be in touch soon. ✓</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                  aria-label="Your name"
                  autoComplete="name"
                  required
                  className="w-full px-4 py-3 bg-white text-[#1C1410] border border-[#C9B99A] rounded-md outline-none focus:border-[#785E3D] placeholder-[#785E3D]"
                />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Your email"
                  aria-label="Your email"
                  autoComplete="email"
                  required
                  className="w-full px-4 py-3 bg-white text-[#1C1410] border border-[#C9B99A] rounded-md outline-none focus:border-[#785E3D] placeholder-[#785E3D]"
                />
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your goals"
                  aria-label="Tell me about your goals"
                  required
                  rows="5"
                  className="w-full px-4 py-3 bg-white text-[#1C1410] border border-[#C9B99A] rounded-md outline-none focus:border-[#785E3D] placeholder-[#785E3D]"
                />
                {error && <p className="text-red-700 text-sm" role="alert">{error}</p>}
                <button type="submit" disabled={submitting} className={`${BTN.primary} w-full`}>
                  {submitting ? 'Sending...' : 'Send message'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Phones: the booking button is always within reach */}
      <BookingBar>
        <BookCallButton className="flex-1">Book a free call</BookCallButton>
        <WhatsAppButton href={PRIVATE_WHATSAPP_URL} ariaLabel={whatsAppLabel} variant="secondary">
          WhatsApp
        </WhatsAppButton>
      </BookingBar>

      <Footer />
    </div>
  );
}
