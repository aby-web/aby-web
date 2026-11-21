import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import BookCallButton from './BookCallButton';
import { SATURDAY_PAGE } from '../data/classes';

// The menu, in the order of what the site is for: private sessions first, my
// own Saturday class second, then everything else, with one always-visible
// action, "Book a free call".
const LINKS = [
  { href: '/private-sessions', label: 'Private sessions' },
  { href: SATURDAY_PAGE, label: 'Saturday class' },
  { href: '/schedule', label: 'Schedule' },
  { href: '/events', label: 'Events & retreats', alsoActive: (p) => p.startsWith('/events/') || p === '/norfolk-retreat' },
  { href: '/about', label: 'About' },
];

export default function Nav({ theme = 'dark' }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (mobileMenuOpen && !e.target.closest('nav') && !e.target.closest('#mobile-menu')) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [mobileMenuOpen]);

  // On a dark page, or once scrolled (when the bar gets its dark backing),
  // everything in the bar is light. On a light page at the top, it is dark.
  const onDark = theme === 'dark' || scrolled;
  const linkColor = onDark ? 'text-white/85 hover:text-white' : 'text-[#1C1410]/85 hover:text-[#785E3D]';
  const activeColor = onDark ? 'text-white' : 'text-[#785E3D]';
  const logoFilter = onDark ? 'brightness(0) invert(1)' : 'none';

  const isActive = (link) => location.pathname === link.href || !!link.alsoActive?.(location.pathname);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
          scrolled ? 'backdrop-blur-md' : 'bg-transparent'
        }`}
        style={{ backgroundColor: scrolled ? 'rgba(28, 20, 16, 0.85)' : 'transparent' }}
        aria-label="Main"
      >
        <div className="max-w-7xl mx-auto px-8 lg:px-12 py-5 flex items-center justify-between gap-6">
          {/* Logo */}
          <a href="/" className="flex items-center shrink-0">
            <img
              src="/images/logo.png"
              alt="Ammar Bass, yoga teacher: home page"
              className="w-auto"
              style={{ height: '22px', filter: logoFilter }}
            />
          </a>

          {/* Desktop links (from 1180px; five items and a button don't fit below that) */}
          <div className="hidden min-[1180px]:flex items-center gap-7 whitespace-nowrap">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive(link) ? 'page' : undefined}
                className={`${isActive(link) ? activeColor : linkColor} text-[13px] uppercase tracking-[0.06em] transition-colors`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-5">
            {/* The one always-visible action. On phones it sits in the menu
                and in the booking bar instead, where there is room for it. */}
            <div className="hidden sm:block">
              <BookCallButton variant={onDark ? 'primaryOnDark' : 'primary'} size="sm">
                Book a free call
              </BookCallButton>
            </div>

            {/* Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`min-[1180px]:hidden flex flex-col justify-center gap-1.5 w-11 h-11 -mr-2.5 items-center ${
                mobileMenuOpen ? 'text-[#C9A878]' : onDark ? 'text-white' : 'text-[#1C1410]'
              } transition-colors relative z-[60]`}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <span className={`w-6 h-0.5 bg-current transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-current transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-current transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu, outside <nav> so it doesn't inherit the bar's blur */}
      <div
        id="mobile-menu"
        className={`min-[1180px]:hidden fixed inset-0 top-[72px] transform transition-transform duration-300 ease-in-out z-[55] overflow-y-auto ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ backgroundColor: 'rgba(28, 20, 16, 0.96)' }}
        inert={!mobileMenuOpen}
      >
        <div className="flex flex-col px-8 py-6">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              aria-current={isActive(link) ? 'page' : undefined}
              className={`${isActive(link) ? 'text-[#C9A878]' : 'text-white/90'} text-lg uppercase tracking-[0.06em] hover:text-white transition-colors py-4 border-b border-white/20`}
            >
              {link.label}
            </a>
          ))}
          <BookCallButton variant="primaryOnDark" className="mt-8" onClick={() => setMobileMenuOpen(false)}>
            Book a free 15-minute call
          </BookCallButton>
        </div>
      </div>
    </>
  );
}
