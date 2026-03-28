import { useState, useEffect } from 'react';

export default function Nav({ theme = 'dark' }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDark = theme === 'dark';
  const textColor = isDark ? 'text-white' : 'text-[#1C1410]';
  const textColorHover = isDark ? 'hover:text-white' : 'hover:text-[#9C7F5C]';
  const textOpacity = isDark ? 'text-white/80' : 'text-[#1C1410]/80';
  const logoFilter = isDark ? 'brightness(0) invert(1)' : 'none';
  const bgColor = isDark ? 'rgba(28, 20, 16, 0.85)' : 'rgba(244, 239, 230, 0.85)';
  const borderColor = isDark
    ? (scrolled ? 'border-white/40' : 'border-white/60')
    : (scrolled ? 'border-[#1C1410]/40' : 'border-[#1C1410]/60');
  const hoverBg = isDark ? 'hover:bg-white/10' : 'hover:bg-[#1C1410]/10';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        scrolled ? 'backdrop-blur-md' : 'bg-transparent'
      }`}
      style={{
        backgroundColor: scrolled ? bgColor : 'transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-8 lg:px-12 py-5 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <img
            src="/images/logo.png"
            alt="Ammar Bass"
            className="w-auto"
            style={{ height: '22px', filter: logoFilter }}
          />
        </a>

        {/* Right Side: Nav Links + Book Button */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="/#about"
            className={`${textOpacity} text-[13px] uppercase tracking-[0.06em] ${textColorHover} transition-colors`}
          >
            About
          </a>
          <a
            href="/#schedule"
            className={`${textOpacity} text-[13px] uppercase tracking-[0.06em] ${textColorHover} transition-colors`}
          >
            Classes & Schedule
          </a>
          <a
            href="/events"
            className={`${textOpacity} text-[13px] uppercase tracking-[0.06em] ${textColorHover} transition-colors`}
          >
            Events
          </a>

          {/* Book Button */}
          <a
            href="/#schedule"
            className={`bg-transparent ${textColor} text-xs uppercase tracking-[0.08em] px-5 py-2 rounded-full border transition-all ${hoverBg} ${borderColor}`}
          >
            Book
          </a>
        </div>
      </div>
    </nav>
  );
}
