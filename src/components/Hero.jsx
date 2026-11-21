import BookCallButton from './BookCallButton';
import { BTN } from './ui';
import { SATURDAY_PAGE } from '../data/classes';

// Homepage hero: who Ammar is, where, the two offers, one main action.
//
// On phones the photo sits above the text, so no words run across Ammar's
// body; from tablet width up the text sits over the dark left side of the
// photo, as before.
export default function Hero() {
  return (
    <section className="relative w-full bg-[#1C1410] md:h-screen md:min-h-[640px] overflow-hidden">
      {/* Photo. Phones in portrait get a centred portrait crop (hero-phone.webp);
          everything else the 1600px version. Both are cut from
          public/images/hero.webp, the full-size original. */}
      <div className="relative h-[52svh] min-h-[340px] md:absolute md:inset-0 md:h-auto bg-gradient-to-br from-[#3A2E26] via-[#2A1E16] to-[#1C1410]">
        <picture>
          <source media="(max-width: 640px) and (orientation: portrait)" srcSet="/images/hero-phone.webp" />
          <img
            src="/images/hero-1600.webp"
            alt="Ammar Bass seated in meditation at the Barbican, London"
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover object-[50%_78%] md:object-center"
          />
        </picture>
        {/* Phones: darken the top for the menu, and fade the photo into the text block */}
        <div className="md:hidden absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-[#1C1410]" />
        {/* Tablet and up: darken the left for the text and the right for the menu */}
        <div className="hidden md:block absolute inset-0 bg-black/20" />
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-black/65 via-transparent to-transparent" />
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/50" />
      </div>

      <div className="relative md:h-full md:flex md:items-center">
        <div className="px-8 pt-2 pb-12 md:py-0 md:pl-16 lg:pl-[72px] max-w-xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#C9A878] mb-5">
            Ammar Bass · Yoga teacher, London
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-[72px] font-light leading-none text-white mb-6">
            Strong, structured yoga.
          </h1>
          <p className="text-[17px] text-white/90 leading-relaxed max-w-[400px] mb-9">
            Private sessions in my West Hampstead studio, and my own Saturday class in Marylebone. I also teach weekly at HOME Wellness, BXR, Flo and Yogarise.
          </p>
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:items-center">
            <BookCallButton variant="primaryOnDark" />
            <a href={SATURDAY_PAGE} className={BTN.secondaryOnDark}>Join the Saturday class</a>
          </div>
        </div>
      </div>
    </section>
  );
}
