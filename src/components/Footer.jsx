export default function Footer() {
  return (
    <footer className="bg-[#2A1E16] px-8 md:px-12 pt-14 pb-8">
      <div className="max-w-6xl mx-auto">
        {/* Top Section: 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Column 1: Brand */}
          <div>
            <h3 className="text-[13px] font-medium tracking-[0.06em] uppercase text-white mb-4">
              AMMAR BASS
            </h3>
            <p className="text-sm font-light leading-relaxed text-[#4A3828]">
              Yoga teacher based in London. Strong, structured practice for people who take their training seriously.
            </p>
          </div>

          {/* Column 2: Navigate */}
          <div>
            <h4 className="text-xs uppercase tracking-wide text-[#7A5C38] mb-4">
              Navigate
            </h4>
            <nav className="flex flex-col gap-3">
              <a href="#schedule" className="text-sm text-[#7A5C38] hover:text-[#9C7F5C] transition-colors">
                Classes & schedule
              </a>
              <a href="#contact" className="text-sm text-[#7A5C38] hover:text-[#9C7F5C] transition-colors">
                Private sessions
              </a>
              <a href="#events" className="text-sm text-[#7A5C38] hover:text-[#9C7F5C] transition-colors">
                Workshops & retreats
              </a>
              <a href="#about" className="text-sm text-[#7A5C38] hover:text-[#9C7F5C] transition-colors">
                About
              </a>
            </nav>
          </div>

          {/* Column 3: Connect */}
          <div>
            <h4 className="text-xs uppercase tracking-wide text-[#7A5C38] mb-4">
              Connect
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href="https://instagram.com/ammarbass"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#7A5C38] hover:text-[#9C7F5C] transition-colors"
              >
                @ammarbass
              </a>
              <a
                href="mailto:ammar@ammarbass.com"
                className="text-sm text-[#7A5C38] hover:text-[#9C7F5C] transition-colors"
              >
                ammar@ammarbass.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#2A2018] pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#2A2018]">
            © 2026 Ammar Bass
          </p>
          <p className="text-xs text-[#2A2018]">
            London, UK
          </p>
        </div>
      </div>
    </footer>
  );
}
