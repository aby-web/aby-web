export default function Schedule() {
  const scheduleData = [
    {
      location: 'Flo Yoga — West Hampstead',
      classes: [
        { day: 'Monday', time: '07:15', name: 'Morning Flow', url: 'https://www.floyogastudio.co.uk/book-a-class' },
        { day: 'Tuesday', time: '10:00', name: 'Handstands', url: 'https://www.floyogastudio.co.uk/book-a-class' },
        { day: 'Saturday', time: '08:15 & 09:30', name: 'Experienced & Power', url: 'https://www.floyogastudio.co.uk/book-a-class' },
      ],
    },
    {
      location: 'Indaba',
      classes: [
        { day: 'Tuesday', time: '07:30', name: 'Morning Vinyasa', url: 'https://indabayoga.com/timetable' },
        { day: 'Saturday', time: '11:30', name: 'Power (75)', url: 'https://indabayoga.com/timetable' },
      ],
    },
    {
      location: 'MoreYoga — Soho',
      classes: [
        { day: 'Tuesday', time: '19:15', name: 'Power (75)', url: 'https://www.moreyoga.co.uk/timetables-full/' },
      ],
    },
    {
      location: 'BXR',
      classes: [
        { day: 'Wednesday', time: '13:00', name: 'Handstands', url: 'https://www.bxrlondon.com/' },
        { day: 'Thursday', time: '20:05', name: 'Power', url: 'https://www.bxrlondon.com/' },
      ],
    },
    {
      location: 'HOME Wellness',
      classes: [
        { day: 'Friday', time: '18:00', name: 'Vinyasa (75)', url: 'http://homewellness.uk/' },
        { day: 'Sunday', time: '10:00', name: 'Vinyasa (75)', url: 'http://homewellness.uk/' },
      ],
    },
  ];

  return (
    <section id="schedule" className="bg-[#F4EFE6] px-8 md:px-12 py-18">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#9C7F5C] mb-4">
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
              {/* Location Header */}
              <h3 className="text-2xl md:text-[28px] font-light text-[#1C1410] pb-4 mb-6 border-b border-[#C9B99A]">
                {studio.location}
              </h3>

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
                        <p className="text-[11px] uppercase tracking-wide text-[#9C7F5C] mb-1">
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
                      className="px-4 py-2 text-xs uppercase tracking-wide border border-[#9C7F5C] text-[#6B5740] rounded-full hover:bg-[#EAE0CF] transition-colors"
                    >
                      Book
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
