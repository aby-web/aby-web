import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

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
      if (mobileMenuOpen && !e.target.closest('nav')) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [mobileMenuOpen]);

  const isDark = theme === 'dark';

  // On mobile, always use solid background when isDark (to keep hamburger visible)
  // On desktop, can use transparent background at top
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const textColor = isDark ? 'text-white' : (scrolled ? 'text-white' : 'text-[#1C1410]');
  const textColorHover = isDark ? 'hover:text-white' : (scrolled ? 'hover:text-white' : 'hover:text-[#785E3D]');
  const textOpacity = isDark ? 'text-white/80' : (scrolled ? 'text-white/80' : 'text-[#1C1410]/80');
  const logoFilter = isDark ? 'brightness(0) invert(1)' : (scrolled ? 'brightness(0) invert(1)' : 'none');

  // Mobile always gets solid bg when dark theme, desktop can be transparent at top
  const bgColor = (isDark && isMobile) ? 'rgba(28, 20, 16, 0.95)' : (isDark ? 'rgba(28, 20, 16, 0.85)' : (scrolled ? 'rgba(28, 20, 16, 0.85)' : 'transparent'));

  const borderColor = isDark
    ? (scrolled ? 'border-white/40' : 'border-white/60')
    : (scrolled ? 'border-[#1C1410]/40' : 'border-[#1C1410]/60');
  const hoverBg = isDark ? 'hover:bg-white/10' : 'hover:bg-[#1C1410]/10';

  // Helper function to check if link is active
  const isActive = (path) => location.pathname === path;

  // Active link color - white when dark/scrolled, accent when light
  const getActiveColor = () => {
    if (isDark || scrolled) return 'text-white';
    return 'text-[#785E3D]';
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        scrolled || (isDark && isMobile) ? 'backdrop-blur-md' : 'bg-transparent'
      }`}
      style={{
        backgroundColor: bgColor,
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

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="/practice"
            className={`${isActive('/practice') ? getActiveColor() : textOpacity} text-[13px] uppercase tracking-[0.06em] ${textColorHover} transition-colors`}
          >
            Practice
          </a>
          <a
            href="/#schedule"
            className={`${textOpacity} text-[13px] uppercase tracking-[0.06em] ${textColorHover} transition-colors`}
          >
            Schedule
          </a>
          <a
            href="/events"
            className={`${isActive('/events') ? getActiveColor() : textOpacity} text-[13px] uppercase tracking-[0.06em] ${textColorHover} transition-colors`}
          >
            Events
          </a>
          <a
            href="/about"
            className={`${isActive('/about') ? getActiveColor() : textOpacity} text-[13px] uppercase tracking-[0.06em] ${textColorHover} transition-colors`}
          >
            About
          </a>
          <a
            href="/private-sessions"
            className={`${isActive('/private-sessions') ? getActiveColor() : textOpacity} text-[13px] uppercase tracking-[0.06em] ${textColorHover} transition-colors`}
          >
            Privates
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`md:hidden flex flex-col gap-1.5 ${textColor} transition-colors`}
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-0.5 transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2 bg-white' : 'bg-current'}`}></span>
          <span className={`w-6 h-0.5 transition-all ${mobileMenuOpen ? 'opacity-0' : 'bg-current'}`}></span>
          <span className={`w-6 h-0.5 transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2 bg-white' : 'bg-current'}`}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 top-[72px] bg-[#1C1410] transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col gap-6 px-8 py-8">
          <a
            href="/practice"
            onClick={() => setMobileMenuOpen(false)}
            className={`${isActive('/practice') ? 'text-[#C9A878]' : 'text-white/80'} text-lg uppercase tracking-[0.06em] hover:text-white transition-colors py-3 border-b border-white/10`}
          >
            Practice
          </a>
          <a
            href="/#schedule"
            onClick={() => setMobileMenuOpen(false)}
            className="text-white/80 text-lg uppercase tracking-[0.06em] hover:text-white transition-colors py-3 border-b border-white/10"
          >
            Schedule
          </a>
          <a
            href="/events"
            onClick={() => setMobileMenuOpen(false)}
            className={`${isActive('/events') ? 'text-[#C9A878]' : 'text-white/80'} text-lg uppercase tracking-[0.06em] hover:text-white transition-colors py-3 border-b border-white/10`}
          >
            Events
          </a>
          <a
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className={`${isActive('/about') ? 'text-[#C9A878]' : 'text-white/80'} text-lg uppercase tracking-[0.06em] hover:text-white transition-colors py-3 border-b border-white/10`}
          >
            About
          </a>
          <a
            href="/private-sessions"
            onClick={() => setMobileMenuOpen(false)}
            className={`${isActive('/private-sessions') ? 'text-[#C9A878]' : 'text-white/80'} text-lg uppercase tracking-[0.06em] hover:text-white transition-colors py-3 border-b border-white/10`}
          >
            Privates
          </a>
        </div>
      </div>
    </nav>
  );
}
