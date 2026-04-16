export default function Schedule() {
  const scheduleData = [
    {
      location: 'HOME',
      area: 'Primrose Hill',
      classes: [
        { day: 'Friday', time: '18:00', name: 'Vinyasa (75)', url: 'http://homewellness.uk/' },
        { day: 'Sunday', time: '10:00', name: 'Vinyasa (75)', url: 'http://homewellness.uk/' },
      ],
    },
    {
      location: 'Indaba',
      area: 'Marylebone',
      classes: [
        { day: 'Tuesday', time: '07:30', name: 'Morning Vinyasa', url: 'https://indabayoga.com/timetable' },
        { day: 'Saturday', time: '11:30', name: 'Power (75)', url: 'https://indabayoga.com/timetable' },
      ],
    },
    {
      location: 'BLOK',
      area: 'Shoreditch',
      classes: [
        { day: 'Monday', time: '16:00', name: 'Dynamic Vinyasa', url: 'https://www.bloklondon.com/' },
        { day: 'Monday', time: '17:15', name: 'Yin', url: 'https://www.bloklondon.com/' },
      ],
    },
    {
      location: 'BXR',
      area: 'Marylebone',
      classes: [
        { day: 'Wednesday', time: '13:00', name: 'Handstands', url: 'https://www.bxrlondon.com/' },
        { day: 'Thursday', time: '20:00', name: 'Power', url: 'https://www.bxrlondon.com/' },
      ],
    },
    {
      location: 'Flo',
      area: 'Hampstead',
      classes: [
        { day: 'Monday', time: '07:15', name: 'Morning Flow', url: 'https://www.floyogastudio.co.uk/book-a-class' },
        { day: 'Tuesday', time: '10:00', name: 'Handstands', url: 'https://www.floyogastudio.co.uk/book-a-class' },
        { day: 'Saturday', time: '08:15 & 09:30', name: 'Experienced & Power', url: 'https://www.floyogastudio.co.uk/book-a-class' },
      ],
    },
    {
      location: 'MoreYoga',
      area: 'Soho',
      classes: [
        { day: 'Tuesday', time: '19:15', name: 'Power (75)', url: 'https://www.moreyoga.co.uk/timetables-full/' },
      ],
    },
  ];

  return (
    <section id="schedule" className="bg-[#F4EFE6] px-8 md:px-12 py-18">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#785E3D] mb-4">
            Weekly schedule
          </p>
          <h2 className="text-4xl md:text-5xl font-light text-[#1C1410]">
            Find a class
          </h2>
        </div>

        {/* Schedule Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {scheduleData.map((studio, studioIndex) => (
            <div key={studioIndex}>
              {/* Location Header with Subtitle */}
              <div className="pb-4 mb-6 border-b border-[#C9B99A]">
                <h3 className="text-2xl md:text-[28px] font-light text-[#1C1410]">
                  {studio.location}
                </h3>
                {studio.area && (
                  <p className="text-[11px] uppercase tracking-[0.15em] text-[#9B8366] mt-1">
                    {studio.area}
                  </p>
                )}
              </div>

              {/* Classes */}
              <div>
                {studio.classes.map((classItem, classIndex) => (
                  <div
                    key={classIndex}
                    className="flex items-center justify-between py-4 border-b border-[#C9B99A]"
                  >
                    <div className="flex items-center gap-6 flex-1">
                      {/* Day & Time */}
                      <div className="min-w-[120px]">
                        <p className="text-[11px] uppercase tracking-wide text-[#785E3D] mb-1">
                          {classItem.day}
                        </p>
                        <p className="text-xs text-[#6B5740]">
                          {classItem.time}
                        </p>
                      </div>

                      {/* Class Name */}
                      <p className="text-base text-[#1C1410]">
                        {classItem.name}
                      </p>
                    </div>

                    {/* Book Button */}
                    <a
                      href={classItem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 text-xs uppercase tracking-wide border border-[#785E3D] text-[#6B5740] rounded-full hover:bg-[#EAE0CF] transition-colors"
                    >
                      Book
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Learn More Link */}
        <div className="text-center mt-12">
          <a
            href="/about"
            className="inline-block text-[13px] text-[#1C1410] border-b border-[#785E3D] hover:text-[#785E3D] transition-colors"
          >
            Learn more about my approach →
          </a>
        </div>
      </div>
    </section>
  );
}
