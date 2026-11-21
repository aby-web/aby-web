import { currentSchedule, londonToday, shortDate, SATURDAY_PAGE } from '../data/classes';

// The timetable lives in src/data/classes.js. Classes past their `until`
// date drop off and "From …" labels disappear on the start date, on their own.

function ClassRow({ classItem, today }) {
  const upcoming = classItem.from && today < classItem.from;
  return (
    <div className="flex items-center justify-between gap-4 py-4 border-b border-[#C9B99A]">
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
        </div>
      </div>

      {/* Book Button (the Saturday card has one button under the row instead) */}
      {classItem.cta !== 'details' && (
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
}

function BlockHeader({ block }) {
  return (
    <div className="pb-4 mb-2 border-b border-[#C9B99A]">
      <h3 className="text-2xl md:text-[28px] font-light text-[#1C1410]">
        {block.location}
      </h3>
      {block.area && (
        <p className="text-[11px] uppercase tracking-[0.15em] text-[#9B8366] mt-1">
          {block.area}
        </p>
      )}
    </div>
  );
}

export default function Schedule() {
  const today = londonToday();
  const [featured, ...studios] = currentSchedule(today);

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

        {/* My own Saturday class: full-width card linking to its own page */}
        <div
          id={featured.id}
          className="scroll-mt-24 mb-16 bg-[#EAE0CF] rounded-lg p-6 md:p-10 grid gap-8 lg:grid-cols-2 lg:gap-12 lg:items-center"
        >
          <div>
            <h3 className="text-2xl md:text-[28px] font-light text-[#1C1410]">
              {featured.location}
            </h3>
            <p className="text-[11px] uppercase tracking-[0.15em] text-[#9B8366] mt-1 mb-4">
              {featured.area}
            </p>
            {featured.note?.map((line) => (
              <p key={line} className="text-[15px] text-[#6B5740] leading-relaxed mt-2">{line}</p>
            ))}
          </div>
          <div>
            <div className="border-t border-[#C9B99A]">
              {featured.classes.map((c) => (
                <ClassRow key={c.day + c.time} classItem={c} today={today} />
              ))}
            </div>
            <a
              href={SATURDAY_PAGE}
              className="mt-6 w-full sm:w-auto inline-flex items-center justify-center min-h-[44px] px-6 rounded-full bg-[#1C1410] text-[#F4EFE6] hover:bg-[#2A1E16] transition-colors text-xs uppercase tracking-wide"
            >
              Class details and how to join
            </a>
          </div>
        </div>

        {/* Studio classes, two per row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-14">
          {studios.map((block) => (
            <div key={block.location}>
              <BlockHeader block={block} />
              {block.classes.map((c) => (
                <ClassRow key={c.day + c.time} classItem={c} today={today} />
              ))}
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
