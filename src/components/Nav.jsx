import { useState, useEffect } from 'react';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        scrolled ? 'backdrop-blur-md' : 'bg-transparent'
      }`}
      style={{
        backgroundColor: scrolled ? 'rgba(28, 20, 16, 0.85)' : 'transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-8 lg:px-12 py-5 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center">
          <img
            src="/images/logo.png"
            alt="Ammar Bass"
            className="w-auto"
            style={{ height: '22px', filter: 'brightness(0) invert(1)' }}
          />
        </a>

        {/* Right Side: Nav Links + Book Button */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#about"
            className="text-white/80 text-[13px] uppercase tracking-[0.06em] hover:text-white transition-colors"
          >
            About
          </a>
          <a
            href="#schedule"
            className="text-white/80 text-[13px] uppercase tracking-[0.06em] hover:text-white transition-colors"
          >
            Classes & Schedule
          </a>
          <a
            href="#events"
            className="text-white/80 text-[13px] uppercase tracking-[0.06em] hover:text-white transition-colors"
          >
            Events
          </a>

          {/* Book Button */}
          <a
            href="#schedule"
            className={`bg-transparent text-white text-xs uppercase tracking-[0.08em] px-5 py-2 rounded-full border transition-all hover:bg-white/10 ${
              scrolled ? 'border-white/40' : 'border-white/60'
            }`}
          >
            Book
          </a>
        </div>
      </div>
    </nav>
  );
}
