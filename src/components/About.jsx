export default function About() {
  return (
    <section id="about" className="bg-[#F4EFE6] px-8 md:px-12 py-18">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div>
            {/* Eyebrow */}
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#9C7F5C] mb-4">
              About
            </p>

            {/* Headline */}
            <h2 className="text-4xl md:text-5xl font-light text-[#1C1410] leading-tight mb-8">
              Yoga should be challenging. That's the point.
            </h2>

            {/* Paragraphs */}
            <p className="text-[15px] font-light leading-loose text-[#6B5740] mb-6">
              I teach because I believe most people are capable of far more than a typical yoga class asks of them. My classes are physically demanding, technically precise, and built around progressive movement — the kind that actually changes how your body works.
            </p>

            <p className="text-[15px] font-light leading-loose text-[#6B5740] mb-8">
              I came to teaching through a serious personal practice, not the other way around. That shapes everything — the sequencing, the cues, the standards I hold in the room.
            </p>

            {/* CTA Button */}
            <a
              href="#"
              className="inline-block px-7 py-3 rounded-full bg-transparent border-2 border-[#1C1410] text-[#1C1410] hover:bg-[#1C1410] hover:text-[#F4EFE6] transition-colors"
            >
              More about me
            </a>
          </div>

          {/* Right: Image */}
          <div className="h-[440px] bg-[#EAE0CF] border border-[#C9B99A] rounded-md overflow-hidden">
            <img
              src="/images/about.webp"
              alt="Ammar Bass"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
