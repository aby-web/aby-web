import { currentSchedule, londonToday, shortDate } from '../data/classes';
import WhatsAppGroupButton from './WhatsAppGroupButton';

// The timetable lives in src/data/classes.js. Classes past their `until`
// date drop off and "From …" labels disappear on the start date, on their own.
export default function Schedule() {
  const today = londonToday();
  const blocks = currentSchedule(today);

  return (
    <section id="schedule" className="bg-[#F4EFE6] px-8 md:px-12 py-18 scroll-mt-20">
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
          {blocks.map((block) => (
            <div key={block.location} id={block.id} className="scroll-mt-24">
              {/* Location Header with Subtitle */}
              <div className="pb-4 mb-2 border-b border-[#C9B99A]">
                <h3 className="text-2xl md:text-[28px] font-light text-[#1C1410]">
                  {block.location}
                </h3>
                {block.area && (
                  <p className="text-[11px] uppercase tracking-[0.15em] text-[#9B8366] mt-1">
                    {block.area}
                  </p>
                )}
                {block.note?.map((line) => (
                  <p key={line} className="text-sm text-[#6B5740] mt-2 leading-relaxed">{line}</p>
                ))}
              </div>

              {/* Classes */}
              <div>
                {block.classes.map((classItem) => {
                  const upcoming = classItem.from && today < classItem.from;
                  return (
                    <div
                      key={classItem.day + classItem.time}
                      className="flex items-center justify-between gap-4 py-4 border-b border-[#C9B99A]"
                    >
                      <div className="flex items-center gap-6 flex-1 min-w-0">
                        {/* Day & Time */}
                        <div className="min-w-[96px] sm:min-w-[120px]">
                          <p className="text-[11px] uppercase tracking-wide text-[#785E3D] mb-1">
                            {classItem.day}
                          </p>
                          <p className="text-xs text-[#6B5740]">
                            {classItem.time}
                          </p>
                        </div>

                        {/* Class Name */}
                        <div className="min-w-0">
                          <p className="text-base text-[#1C1410]">
                            {classItem.name}
                          </p>
                          {upcoming && (
                            <p className="text-[11px] uppercase tracking-wide text-[#785E3D] mt-1">
                              From {shortDate(classItem.from)}
                            </p>
                          )}
                          {classItem.until && (
                            <p className="text-[11px] uppercase tracking-wide text-[#9B8366] mt-1">
                              Until {shortDate(classItem.until)}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Book Button */}
                      {classItem.cta !== 'whatsapp' && (
                        <a
                          href={classItem.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 px-4 py-2 text-xs uppercase tracking-wide border border-[#785E3D] text-[#6B5740] rounded-full hover:bg-[#EAE0CF] transition-colors"
                        >
                          Book
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Joining the group is how you book the Saturday class */}
              {block.classes.some((c) => c.cta === 'whatsapp') && (
                <WhatsAppGroupButton className="mt-6 w-full sm:w-auto" />
              )}
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
