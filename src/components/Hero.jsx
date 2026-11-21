import WhatsAppGroupButton from './WhatsAppGroupButton';
import { SATURDAY_AREA, SATURDAY_START, londonToday, shortDate } from '../data/classes';

export default function Hero() {
  const startsLater = londonToday() < SATURDAY_START;

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

      {/* Gradient overlay for text contrast (left side) */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

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
            Build real strength, control and focus through progressive vinyasa, handstands and arm balances. Classes across London or private sessions tailored to your goals.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <a
              href="/private-sessions"
              className="px-6 py-3 rounded-full bg-white text-[#1C1410] hover:bg-white/90 transition-colors text-sm uppercase tracking-wide text-center"
            >
              Book a Private Session
            </a>
            <a
              href="#schedule"
              className="px-6 py-3 rounded-full bg-transparent border-2 border-white text-white hover:bg-white/10 transition-colors text-sm uppercase tracking-wide text-center"
            >
              Find a Class
            </a>
          </div>

          {/* New Saturday class: you join via the WhatsApp group */}
          <div className="mt-8 pt-6 border-t border-white/25 max-w-[420px]">
            <p className="text-sm text-white/90 leading-relaxed mb-3" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>
              <span className="text-[#C9A878] uppercase tracking-[0.15em] text-[11px] font-medium">New</span>{' '}
              Ammar's Saturday class, 11:30–13:00 in {SATURDAY_AREA}
              {startsLater ? `, from ${shortDate(SATURDAY_START)}` : ''}. Join the WhatsApp group to come.
            </p>
            <WhatsAppGroupButton variant="outline" />
          </div>
        </div>
      </div>
    </section>
  );
}
