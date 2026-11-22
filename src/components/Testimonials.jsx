import { testimonialsFor } from '../data/testimonials';
import { TEXT } from './ui';

// Testimonials for one page: quote, first name and who they are. The quotes
// live in src/data/testimonials.js; `page` picks which ones show.
//
// On phones they sit in a row you swipe through (plain CSS scroll-snap, no
// script); from tablet width up they are laid out side by side.
export default function Testimonials({ page, heading = 'What people say', dark = false }) {
  const items = testimonialsFor(page);
  if (items.length === 0) return null;

  const columns = items.length >= 4 ? 'md:grid-cols-2' : items.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2';

  return (
    <section className={`${dark ? 'bg-[#2A1E16]' : 'bg-[#F4EFE6]'} py-12 md:py-18`}>
      <div className="max-w-6xl mx-auto">
        <div className="px-8 md:px-12 mb-8 md:mb-10">
          <p className={`${dark ? TEXT.eyebrowOnDark : TEXT.eyebrow} mb-4`}>From students</p>
          <h2 className={`text-3xl md:text-4xl font-light ${dark ? 'text-[#F4EFE6]' : 'text-[#1C1410]'}`}>{heading}</h2>
        </div>

        <ul
          className={`flex md:grid ${columns} gap-4 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory px-8 md:px-12 pb-4 md:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}
          aria-label={heading}
        >
          {items.map((t) => (
            <li key={t.name} className="snap-center shrink-0 w-[84%] sm:w-[60%] md:w-auto">
              <figure
                className={`h-full flex flex-col justify-between rounded-md p-7 border ${
                  dark ? 'border-[#5A4632]' : 'border-[#C9B99A]'
                }`}
              >
                <blockquote className={`text-[19px] font-light italic leading-relaxed mb-6 ${dark ? 'text-[#F4EFE6]' : 'text-[#1C1410]'}`}>
                  “{t.quote}”
                </blockquote>
                <figcaption className={`text-xs uppercase tracking-[0.12em] ${dark ? 'text-[#C9A878]' : 'text-[#785E3D]'}`}>
                  {t.name} · {t.context}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
        {items.length > 1 && (
          <p className={`md:hidden px-8 mt-2 text-xs ${dark ? 'text-[#B8A584]' : 'text-[#785E3D]'}`} aria-hidden="true">
            Swipe for more →
          </p>
        )}
      </div>
    </section>
  );
}
