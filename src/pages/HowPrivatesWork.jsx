import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Nav from '../components/Nav';
import VacationBanner from '../components/VacationBanner';
import Footer from '../components/Footer';
import { pricing, offers, formats, CALENDLY_URL } from '../data/privateSessions';

const TITLE = 'How Private Yoga Works in West Hampstead | Ammar Bass';
const DESCRIPTION =
  'How private yoga in West Hampstead works: prices, a free 15-minute discovery call, a short form before your first session, and what a one-to-one session looks like.';

export default function HowPrivatesWork() {
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
      window.Calendly.initPopupWidget({ url: CALENDLY_URL });
    }
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ammarbass.com/how-privates-work" />
        <meta property="og:image" content="https://ammarbass.com/images/og-private.jpg" />
        <link rel="canonical" href="https://ammarbass.com/how-privates-work" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Private one-to-one yoga tuition",
            "provider": { "@type": "Person", "name": "Ammar Bass", "url": "https://www.ammarbass.com" },
            "areaServed": { "@type": "Place", "name": "West Hampstead, London NW6" },
            "offers": offers
          })}
        </script>
      </Helmet>

      <Nav theme="light" />
      <VacationBanner />

      {/* Hero */}
      <section className="bg-[#F4EFE6] text-[#1C1410] pt-32 pb-12 px-8 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#785E3D] mb-6">
            Private sessions
          </p>
          <h1 className="text-5xl md:text-6xl font-light leading-tight mb-6">
            How privates work
          </h1>
          <p className="text-lg text-[#6B5740] max-w-2xl mx-auto">
            Everything you need to know before we start: what it costs, how to book, and what happens when you arrive. If you're looking for private yoga in West Hampstead, this is the whole picture in one place.
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-[#EAE0CF] px-8 md:px-12 py-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#785E3D] mb-4">01 / Pricing</p>
            <h2 className="text-3xl md:text-4xl font-light text-[#1C1410]">Simple and transparent.</h2>
          </div>
          <div className="divide-y divide-[#C9B99A]">
            {pricing.map((item) => (
              <div key={item.label} className="flex justify-between items-center gap-6 py-5">
                <span className="text-[15px] text-[#1C1410]">{item.label}</span>
                <span className="text-[15px] text-[#785E3D] font-light text-right">{item.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Discovery call */}
      <section className="bg-[#F4EFE6] px-8 md:px-12 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#785E3D] mb-4">02 / Discovery call</p>
          <h2 className="text-3xl md:text-4xl font-light text-[#1C1410] mb-6">Start with a free 15-minute chat.</h2>
          <div className="space-y-4 text-[15px] text-[#6B5740] leading-relaxed mb-10">
            <p>
              Tell me where you are with your practice and what you'd like to work on. I'll tell you honestly how I can help, and we'll pick the format and session length that suit you. No pressure to book.
            </p>
            <p>
              Never done yoga before? That's absolutely fine — a private session is the most comfortable place to start.
            </p>
          </div>
          <a
            href={CALENDLY_URL}
            onClick={openCalendly}
            className="inline-block px-8 py-4 rounded-full bg-[#1C1410] text-[#F4EFE6] hover:bg-[#2A1E16] transition-colors text-sm uppercase tracking-wide cursor-pointer"
          >
            Book Discovery Call
          </a>
        </div>
      </section>

      {/* Before your first session */}
      <section className="bg-[#EAE0CF] px-8 md:px-12 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#785E3D] mb-4">03 / Before your first session</p>
          <h2 className="text-3xl md:text-4xl font-light text-[#1C1410] mb-6">A short form, so I can plan for you.</h2>
          <p className="text-[15px] text-[#6B5740] leading-relaxed mb-10">
            Once we've booked your first session, please fill in my new client form. It asks what you'd like to work on, your experience (complete beginners very welcome), when you're free, whether you'd like the studio, online or at home, and about any injuries or health conditions, so I can keep you safe and plan a session that fits you. It only takes a few minutes.
          </p>
          <a
            href="/onboard"
            className="inline-block px-8 py-4 rounded-full bg-transparent border-2 border-[#1C1410] text-[#1C1410] hover:bg-[#1C1410] hover:text-[#F4EFE6] transition-colors text-sm uppercase tracking-wide"
          >
            New Client Form
          </a>
        </div>
      </section>

      {/* What a session looks like */}
      <section className="bg-[#F4EFE6] px-8 md:px-12 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#785E3D] mb-4">04 / What a session looks like</p>
            <h2 className="text-3xl md:text-4xl font-light text-[#1C1410] mb-6">One-to-one, built around you.</h2>
            <p className="text-[15px] text-[#6B5740] leading-relaxed">
              We start with a short chat about how you're feeling and what you're working on. Then we practise, at your pace, with clear cues and plenty of explanation — whether that's learning the foundations, easing a stiff back or working towards a handstand. You leave with one or two things to practise before we next meet.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {formats.map((f) => (
              <div key={f.name}>
                <p className="text-xs uppercase tracking-[0.12em] text-[#785E3D] mb-3">{f.name}</p>
                <p className="text-[15px] font-light leading-relaxed text-[#6B5740]">{f.text}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-[15px] text-[#6B5740] mt-14">
            Want the full picture? <a href="/private-sessions" className="text-[#785E3D] underline underline-offset-4 hover:text-[#1C1410]">Read more about private sessions</a> or browse the <a href="/faq" className="text-[#785E3D] underline underline-offset-4 hover:text-[#1C1410]">FAQ</a>.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
