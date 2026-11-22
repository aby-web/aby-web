import { weekByDay, nextClassDays, studios, shortDate, SATURDAY_PAGE, SATURDAY_PRICE, SATURDAY_START, saturdayWhere, SATURDAY_VENUE_NAME } from '../data/classes';
import useToday from '../lib/useToday';
import { BTN, TEXT, btn } from './ui';

// The weekly schedule, by day ("when can I come?"), with Ammar's own Saturday
// class set apart from the studio classes. Data: src/data/classes.js.

// Ammar's own class: a card with a photo, unlike the plain studio rows.
// `photo={false}` is the short version for the homepage, where the photo is
// already used on the Saturday class offer further up.
export function SaturdayCard({ photo = true }) {
  const today = useToday();
  const notStartedYet = today < SATURDAY_START;
  return (
    <a
      href={SATURDAY_PAGE}
      className={`group grid ${photo ? 'md:grid-cols-2' : ''} rounded-lg overflow-hidden bg-[#2A1E16] text-[#F4EFE6]`}
    >
      {photo && (
        <img
          loading="lazy"
          src="/images/saturday/class-savasana.webp"
          alt="Students resting in savasana at the end of class while Ammar sits at the front of the room"
          width="1086"
          height="724"
          className="w-full h-56 md:h-full object-cover"
        />
      )}
      <div className={photo ? 'p-7 md:p-10' : 'p-6 md:p-8'}>
        <p className={`${TEXT.eyebrowOnDark} mb-3`}>My own class</p>
        <h3 className="text-2xl md:text-3xl font-light mb-3">Saturday class in Marylebone</h3>
        <p className={`${TEXT.bodyOnDark} ${photo ? 'mb-1' : 'mb-5'}`}>
          Saturdays, 11:30–13:00{notStartedYet ? `, from ${shortDate(SATURDAY_START)}` : ''}. £{SATURDAY_PRICE} drop-in.
        </p>
        {photo && (
          <p className={`${TEXT.bodyOnDark} mb-6`}>
            {saturdayWhere()}.{SATURDAY_VENUE_NAME ? '' : ' The exact address is shared in the WhatsApp group.'} Bring your own mat.
          </p>
        )}
        <span className={`${BTN.primaryOnDark} group-hover:bg-white`}>Class details and how to join</span>
      </div>
    </a>
  );
}

// One class on one line: time, name, where. `short` leaves the area off.
function ClassLine({ c, short = false, note = null }) {
  const line = (
    <>
      <span className="tabular-nums text-[#1C1410]">{c.time}</span>
      <span className="text-[#1C1410]"> · {c.name}</span>
      <span className="text-[#5C4A36]">
        {' '}· {c.own ? `My own class, ${c.area}` : short ? c.studio : `${c.studio}, ${c.area}`}
      </span>
      {note && <span className="text-[#785E3D]"> · {note}</span>}
    </>
  );
  return (
    <li className="text-[16px] leading-snug">
      {c.own ? (
        <a href={SATURDAY_PAGE} className="inline-block border-l-2 border-[#785E3D] pl-3 hover:bg-[#EAE0CF] transition-colors">
          {line}
        </a>
      ) : (
        line
      )}
    </li>
  );
}

const rowClass = 'grid grid-cols-[5.5rem_1fr] sm:grid-cols-[9rem_1fr] gap-x-4 py-4 border-b border-[#C9B99A]';
const dayClass = 'text-xs uppercase tracking-[0.12em] text-[#785E3D] pt-1';

// Monday to Sunday, for the schedule page.
export function WeekByDay() {
  const today = useToday();
  return (
    <dl className="border-t border-[#C9B99A]">
      {weekByDay(today).map(({ day, classes }) => (
        <div key={day} className={rowClass}>
          <dt className={dayClass}>
            <span className="sm:hidden">{day.slice(0, 3)}</span>
            <span className="hidden sm:inline">{day}</span>
          </dt>
          <dd>
            <ul className="space-y-3">
              {classes.map((c) => (
                <ClassLine
                  key={c.time + c.name}
                  c={c}
                  note={c.from && today < c.from ? `from ${shortDate(c.from)}` : null}
                />
              ))}
            </ul>
          </dd>
        </div>
      ))}
    </dl>
  );
}

// The next three days with a class, for the homepage.
export function NextClasses() {
  const today = useToday();
  return (
    <dl className="border-t border-[#C9B99A]">
      {nextClassDays(today, 3).map(({ date, label, classes }) => (
        <div key={date} className={rowClass}>
          <dt className={dayClass}>{label}</dt>
          <dd>
            <ul className="space-y-3">
              {classes.map((c) => (
                <ClassLine key={c.time + c.name} c={c} short />
              ))}
            </ul>
          </dd>
        </div>
      ))}
    </dl>
  );
}

// One booking link per studio.
export function StudioLinks() {
  const today = useToday();
  return (
    <ul className="grid sm:grid-cols-2 gap-4">
      {studios(today).map((studio) => (
        <li key={studio.location} className="border border-[#C9B99A] rounded-md p-5 flex flex-col">
          <p className="text-xl font-light text-[#1C1410]">{studio.location}</p>
          <p className="text-[17px] text-[#5C4A36] mb-4">{studio.address || studio.area}</p>
          <a
            href={studio.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${btn('secondary', 'sm')} mt-auto self-start`}
          >
            Book at {studio.location}
          </a>
        </li>
      ))}
    </ul>
  );
}
