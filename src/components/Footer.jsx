export default function Footer() {
  return (
    <footer className="bg-[#2A1E16] px-8 md:px-12 pt-14 pb-8">
      <div className="max-w-6xl mx-auto">
        {/* Top Section: 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Column 1: Brand */}
          <div>
            <img
              src="/images/logo.png"
              alt="Ammar Bass"
              className="w-auto mb-4"
              style={{ height: '20px', filter: 'brightness(0) invert(1)' }}
            />
            <p className="text-sm font-light leading-relaxed text-[#8A6F4C]">
              Yoga teacher based in London. Structured, progressive practice centred around building strength, control and longevity.
            </p>
          </div>

          {/* Column 2: Navigate */}
          <div>
            <h4 className="text-xs uppercase tracking-wide text-[#785E3D] mb-4">
              Navigate
            </h4>
            <nav className="flex flex-col gap-3">
              <a href="/#schedule" className="text-sm text-[#785E3D] hover:text-[#C9A878] transition-colors">
                Schedule
              </a>
              <a href="/private-sessions" className="text-sm text-[#785E3D] hover:text-[#C9A878] transition-colors">
                Private sessions
              </a>
              <a href="/events" className="text-sm text-[#785E3D] hover:text-[#C9A878] transition-colors">
                Events
              </a>
              <a href="/about" className="text-sm text-[#785E3D] hover:text-[#C9A878] transition-colors">
                About
              </a>
              <a href="/faq" className="text-sm text-[#785E3D] hover:text-[#C9A878] transition-colors">
                FAQ
              </a>
            </nav>
          </div>

          {/* Column 3: Connect */}
          <div>
            <h4 className="text-xs uppercase tracking-wide text-[#785E3D] mb-4">
              Connect
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href="https://instagram.com/ammarbass"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#785E3D] hover:text-[#C9A878] transition-colors"
              >
                @ammarbass
              </a>
              <a
                href="mailto:ammar@ammarbass.com"
                className="text-sm text-[#785E3D] hover:text-[#C9A878] transition-colors"
              >
                ammar@ammarbass.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#4A3828] pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#6B5740]">
            © 2026 Ammar Bass
          </p>
          <p className="text-xs text-[#6B5740]">
            London, UK
          </p>
        </div>
      </div>
    </footer>
  );
}
