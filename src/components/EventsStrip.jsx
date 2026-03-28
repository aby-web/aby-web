export default function EventsStrip() {
  const events = [
    {
      date: 'September 2026',
      title: 'London Bootcamp',
      location: 'London, UK',
    },
    {
      date: '2026 — Date TBC',
      title: 'Hong Kong Workshop',
      location: 'Hong Kong',
    },
    {
      date: '2026 — Date TBC',
      title: 'Vienna Retreat',
      location: 'Vienna, Austria',
    },
  ];

  return (
    <section id="events" className="bg-[#EAE0CF] px-8 md:px-12 py-18">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#9C7F5C] mb-4">
            Upcoming
          </p>
          <h2 className="text-4xl md:text-5xl font-light text-[#1C1410]">
            Workshops & retreats
          </h2>
        </div>

        {/* Event Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {events.map((event, index) => (
            <div
              key={index}
              className="bg-[#F4EFE6] border border-[#C9B99A] rounded-md overflow-hidden hover:border-[#9C7F5C] transition-colors"
            >
              {/* Image Placeholder */}
              <div className="h-44 bg-gradient-to-br from-[#9C7F5C] to-[#6B5740]" />

              {/* Content */}
              <div className="p-6">
                <p className="text-xs uppercase tracking-wide text-[#9C7F5C] mb-2">
                  {event.date}
                </p>
                <h3 className="text-xl font-light text-[#1C1410] mb-2">
                  {event.title}
                </h3>
                <p className="text-sm text-[#6B5740]">
                  {event.location}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* See All Link */}
        <div className="text-center">
          <a
            href="#"
            className="inline-block text-[13px] text-[#1C1410] border-b border-[#9C7F5C] hover:text-[#9C7F5C] transition-colors"
          >
            See all events & past workshops →
          </a>
        </div>
      </div>
    </section>
  );
}
