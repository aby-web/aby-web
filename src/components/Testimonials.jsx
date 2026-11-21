import { testimonialsFor } from '../data/testimonials';

// Stacked testimonial cards for one page. The quotes live in
// src/data/testimonials.js; `page` picks which ones show.
// (A swipeable version is planned for Stage 4 of docs/site-review.md.)
export default function Testimonials({ page, heading = 'What people say', background = 'bg-[#F4EFE6]' }) {
  const items = testimonialsFor(page);
  if (items.length === 0) return null;

  return (
    <section className={`${background} px-8 md:px-12 py-18`}>
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#785E3D] mb-4">
            From students
          </p>
          <h2 className="text-3xl md:text-4xl font-light text-[#1C1410]">
            {heading}
          </h2>
        </div>

        {/* Testimonial Cards */}
        <div className="space-y-6">
          {items.map((t) => (
            <figure key={t.name} className="border border-[#C9B99A] rounded-md p-7">
              <blockquote className="text-[19px] font-light italic leading-relaxed text-[#1C1410] mb-6">
                “{t.quote}”
              </blockquote>
              <figcaption className="text-[11px] uppercase tracking-[0.12em] text-[#785E3D]">
                {t.name} · {t.context}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
