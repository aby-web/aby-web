export default function Testimonials() {
  const testimonials = [
    {
      quote: 'Challenging positions in a positive way. Great pace, attentive and helpful instructor.',
      source: 'Flo Yoga · Experienced Flow',
    },
    {
      quote: 'Very calm, attentive and knowledgeable. The class flew smoothly with amazing vinyasas.',
      source: 'Hotpod · Notting Hill',
    },
    {
      quote: 'Brilliant teaching. Mixture of deep breaths with pace picking up for deep stretches and holds.',
      source: 'Studio Society · Vinyasa Flow',
    },
  ];

  return (
    <section className="bg-[#F4EFE6] px-8 md:px-12 py-18">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#9C7F5C] mb-4">
            From students
          </p>
          <h2 className="text-4xl md:text-5xl font-light text-[#1C1410]">
            What people say
          </h2>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-[#F4EFE6] border border-[#C9B99A] rounded-md p-7 hover:border-[#9C7F5C] transition-colors"
            >
              <p className="text-[19px] font-light italic leading-relaxed text-[#1C1410] mb-6">
                "{testimonial.quote}"
              </p>
              <p className="text-[10px] uppercase tracking-[0.12em] text-[#9C7F5C]">
                {testimonial.source}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
