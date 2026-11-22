import { useState } from 'react';
import { honeypotProps, isLikelyBot, useFormTimer } from '../lib/botCheck';
import { subscribeEmail } from '../lib/subscribe';
import { SATURDAY_PAGE, WHATSAPP_GROUP_URL, YORIGAM_URL } from '../data/classes';

// The footer is where everything on the site can be found.
// Five blocks: Practise with me, About, Connect, Where, Yorigam.

const linkClass = 'inline-flex items-center min-h-[36px] text-[15px] text-[#E5D5B7] hover:text-white transition-colors';
const headingClass = 'text-xs uppercase tracking-[0.15em] text-[#C9A878] mb-3';

// Email-only newsletter sign-up. Same server function as the homepage form.
function FooterSignup() {
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | exists | error
  const formTimer = useFormTimer();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    // Fake success for bots: nothing is written, and they get no signal.
    if (isLikelyBot(honeypot, null)) {
      setStatus('success');
      return;
    }
    setStatus('loading');
    setStatus(await subscribeEmail({ email, source: 'footer', honeypot, elapsedMs: formTimer.elapsedMs() }));
  };

  if (status === 'success' || status === 'exists') {
    return (
      <p className="text-[15px] text-[#E5D5B7]" role="status">
        {status === 'exists' ? 'You are already on the list.' : 'You are on the list.'} ✓
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-1">
      <label htmlFor="footer-email" className="block text-[15px] text-[#E5D5B7] mb-2">
        One email a month
      </label>
      <input {...honeypotProps} value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
      <div className="flex gap-2">
        <input
          id="footer-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          required
          autoComplete="email"
          disabled={status === 'loading'}
          className="min-w-0 flex-1 min-h-[44px] px-4 rounded-full bg-[#3A2A1E] text-[#F4EFE6] placeholder-[#B8A584] border border-[#5A4632] outline-none focus:border-[#C9A878]"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="shrink-0 min-h-[44px] px-5 rounded-full bg-[#F4EFE6] text-[#1C1410] hover:bg-white transition-colors text-xs uppercase tracking-wide disabled:opacity-50"
        >
          {status === 'loading' ? 'Joining' : 'Join'}
        </button>
      </div>
      {status === 'error' && (
        <p className="mt-2 text-sm text-[#F0B8A8]" role="alert">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#2A1E16] px-8 md:px-12 pt-12 md:pt-16 pb-10">
      <div className="max-w-6xl mx-auto">
        {/* Phones: the two link lists sit side by side to keep the footer short. */}
        <div className="grid grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1.3fr] gap-x-8 sm:gap-x-10 gap-y-10 sm:gap-y-12 mb-10 sm:mb-12">
          {/* Brand and where */}
          <div className="col-span-2 lg:col-span-1">
            <img
              loading="lazy"
              src="/images/logo.png"
              alt="Ammar Bass logo"
              className="w-auto mb-5"
              style={{ height: '20px', filter: 'brightness(0) invert(1)' }}
            />
            <p className="text-[15px] leading-relaxed text-[#E5D5B7] mb-6">
              Ammar Bass is a yoga teacher in London. Private sessions in West Hampstead (NW6), a Saturday class in Marylebone, and weekly classes at HOME Wellness, BXR, Flo and Yogarise.
            </p>
            <h2 className={headingClass}>Where</h2>
            <p className="text-[15px] leading-relaxed text-[#E5D5B7]">
              Private studio in West Hampstead, London NW6. Saturday class in Marylebone.
            </p>
          </div>

          {/* Practise with me */}
          <nav aria-label="Practise with me">
            <h2 className={headingClass}>Practise with me</h2>
            <ul>
              <li><a href="/private-sessions" className={linkClass}>Private sessions</a></li>
              <li><a href={SATURDAY_PAGE} className={linkClass}>Saturday class</a></li>
              <li><a href="/schedule" className={linkClass}>Weekly schedule</a></li>
              <li><a href="/events" className={linkClass}>Events & retreats</a></li>
              <li><a href="/norfolk-retreat" className={linkClass}>Norfolk retreat 2027</a></li>
              <li><a href="/practice" className={linkClass}>Free videos</a></li>
            </ul>
          </nav>

          {/* About */}
          <nav aria-label="About">
            <h2 className={headingClass}>About</h2>
            <ul>
              <li><a href="/about" className={linkClass}>About Ammar</a></li>
              <li><a href="/faq" className={linkClass}>FAQ</a></li>
              <li><a href="/onboard" className={linkClass}>New client form</a></li>
            </ul>
          </nav>

          {/* Connect */}
          <div className="col-span-2 sm:col-span-1">
            <h2 className={headingClass}>Connect</h2>
            <ul className="mb-4">
              <li>
                <a href={WHATSAPP_GROUP_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  Saturday WhatsApp group
                </a>
              </li>
              <li>
                <a href="https://instagram.com/ammarbass" target="_blank" rel="noopener noreferrer" className={linkClass}>
                  Instagram @ammarbass
                </a>
              </li>
              <li><a href="mailto:ammar@ammarbass.com" className={linkClass}>ammar@ammarbass.com</a></li>
            </ul>
            <FooterSignup />
          </div>
        </div>

        {/* Yorigam */}
        <div className="border-t border-[#4A3828] pt-8 pb-8 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
          <a
            href={YORIGAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl font-light tracking-[0.08em] text-[#F4EFE6] hover:text-white transition-colors"
          >
            Yorigam
          </a>
          <p className="text-[15px] leading-relaxed text-[#E5D5B7] max-w-xl">
            Bookings and invoicing run on{' '}
            <a href={YORIGAM_URL} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-white transition-colors">
              Yorigam
            </a>
            , the app I built for yoga teachers.
          </p>
        </div>

        <div className="border-t border-[#4A3828] pt-6 flex justify-between gap-2">
          <p className="text-xs text-[#B8A584]">© 2026 Ammar Bass</p>
          <p className="text-xs text-[#B8A584]">London, UK</p>
        </div>
      </div>
    </footer>
  );
}
