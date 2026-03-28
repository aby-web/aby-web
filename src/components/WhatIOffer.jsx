export default function WhatIOffer() {
  const offerings = [
    {
      number: '01',
      title: 'Classes',
      description: 'Strong vinyasa and handstand-based group classes across London studios. Physically demanding, mentally focused.',
    },
    {
      number: '02',
      title: 'Private Sessions',
      description: 'One-to-one and small group training tailored to your goals — technique, progressions, or building a consistent practice.',
    },
    {
      number: '03',
      title: 'Workshops',
      description: 'Skill-based deep dives into arm balances, inversions, and the mechanics behind them. London and internationally.',
    },
    {
      number: '04',
      title: 'Retreats',
      description: 'Immersive experiences away from the city. Upcoming: Vienna and Hong Kong. September bootcamp in London.',
    },
  ];

  return (
    <section className="bg-[#F4EFE6] px-8 md:px-12 py-20 md:py-24">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#9C7F5C] mb-4">
            What I offer
          </p>
          <h2 className="text-4xl md:text-5xl font-light text-[#1C1410]">
            Ways to practice
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#C9B99A]">
          {offerings.map((item, index) => (
            <div
              key={index}
              className="bg-[#EAE0CF] p-8 hover:bg-[#E0D6C5] transition-colors"
            >
              <p className="text-sm font-medium text-[#9C7F5C] mb-3">
                {item.number}
              </p>
              <h3 className="text-2xl font-light text-[#1C1410] mb-4">
                {item.title}
              </h3>
              <p className="text-[15px] font-light leading-relaxed text-[#6B5740]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
