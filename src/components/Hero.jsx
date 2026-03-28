export default function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#3A2E26] via-[#2A1E16] to-[#1C1410]"
        style={{
          backgroundImage: 'url(/images/hero.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Gradient overlay for nav legibility (right side) */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/50" />

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="pl-12 md:pl-16 lg:pl-[72px] max-w-xl">
          {/* Eyebrow */}
          <p
            className="text-xs font-medium uppercase tracking-[0.25em] text-[#C9A878] mb-6"
            style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)', fontWeight: 500 }}
          >
            London · Yoga Teacher
          </p>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-[72px] font-light leading-none text-white mb-6">
            Strong, structured yoga.
          </h1>

          {/* Subheading */}
          <p className="text-base font-normal text-white/85 leading-relaxed max-w-[420px] mb-10">
            Build real strength, control and focus through progressive vinyasa, handstands and arm balances. Classes across London.
          </p>

          {/* CTA Link */}
          <a
            href="#schedule"
            className="inline-block text-[13px] uppercase tracking-[0.1em] text-white border-b border-white/50 hover:border-white transition-colors pb-1"
          >
            View Schedule →
          </a>
        </div>
      </div>
    </section>
  );
}
