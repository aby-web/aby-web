// Weekly class schedule, plus the details of my own Saturday class.
// Edit this file to change the timetable: the schedule page, the homepage,
// the Saturday class page, llms.txt and the menu all read from here.
//
// Dates are 'YYYY-MM-DD' in London time:
//   from  – first class. Before this date the entry shows "From Sat 5 Dec".
//   until – last class (optional). From the next day the entry disappears.
// The schedule is rendered in the visitor's browser, so these switch over on
// the day by themselves. No redeploy or follow-up commit is needed.

// ── Ammar's Saturday class ────────────────────────────────────────────────
// Everything about the class is set here and read by /saturday-class, the
// homepage hero note, the schedule card, the menu and the footer.
export const SATURDAY_PAGE = '/saturday-class';
export const SATURDAY_AREA = 'Marylebone';
export const SATURDAY_START = '2026-12-05';
export const SATURDAY_PRICE = 15; // £, drop-in

// TODO(Ammar): venue name once the school confirms, e.g. 'St Example Hall'.
// While this is null the site says only "Marylebone" and the address is
// shared in the WhatsApp group. Set it and it appears on the page, the
// schedule card and the search-engine data.
export const SATURDAY_VENUE_NAME = null;

// Indaba's last day. Until then the page says Indaba "closes at the end of
// November"; from the next day it says it "has closed". Switches by itself.
export const INDABA_LAST_DAY = '2026-11-30';

export const WHATSAPP_GROUP_URL = 'https://chat.whatsapp.com/CUYlKibLFgpFfFPRXp7O5t?s=qt&p=i&iam=2';
export const WHATSAPP_GROUP_NAME = "Ammar's Saturday 11:30";

// TODO(Ammar): when the Yorigam booking page for the class exists, paste its
// address here (e.g. 'https://yorigam.com/book/...'). The main button on
// /saturday-class then becomes "Book your place" and the WhatsApp group
// becomes the second link. Leave null to keep booking through WhatsApp.
export const SATURDAY_BOOKING_URL = null;

// "Marylebone, W1" or "St Example Hall, Marylebone, W1".
export const saturdayWhere = () =>
  (SATURDAY_VENUE_NAME ? `${SATURDAY_VENUE_NAME}, ` : '') + `${SATURDAY_AREA}, W1`;

export const YORIGAM_URL = 'https://yorigam.com';

const HOME_URL = 'https://homewellness.uk/book-yoga/';
// Flo's West Hampstead studio page: live timetable with booking.
const FLO_URL = 'https://www.floyogastudio.co.uk/west-hampstead';

// Venue addresses, shown on event pages held there.
// `match` is tested against the event's location text.
export const VENUES = [
  {
    match: /home wellness/i,
    name: 'HOME Wellness',
    streetAddress: '7 Erskine Road',
    locality: 'Primrose Hill, London',
    postalCode: 'NW3 3AJ',
    line: '7 Erskine Road, Primrose Hill, NW3 3AJ',
  },
];
export const venueFor = (location) => VENUES.find((v) => v.match.test(location || '')) ?? null;

// The first entry is Ammar's own Saturday class; the rest are the studios,
// each with ONE booking link (`url`).
export const schedule = [
  {
    id: 'saturday-class',
    own: true,
    location: "Ammar's Saturday class",
    area: SATURDAY_AREA,
    url: SATURDAY_PAGE,
    classes: [
      { day: 'Saturday', time: '11:30–13:00', name: 'Vinyasa (90)', from: SATURDAY_START },
    ],
  },
  {
    location: 'HOME Wellness',
    area: 'Primrose Hill',
    address: '7 Erskine Road, Primrose Hill, NW3 3AJ',
    url: HOME_URL,
    classes: [
      { day: 'Tuesday', time: '07:15', name: 'Warm Vinyasa', from: '2026-12-01' },
      { day: 'Wednesday', time: '18:00', name: 'Vinyasa' },
      { day: 'Friday', time: '18:00', name: 'Vinyasa (75)' },
      { day: 'Sunday', time: '10:00', name: 'Vinyasa (75)' },
    ],
  },
  {
    location: 'Flo',
    area: 'West Hampstead',
    url: FLO_URL,
    classes: [
      // "Flo" not "Flow" — named after the studio.
      { day: 'Monday', time: '07:15', name: 'Flo' },
      { day: 'Thursday', time: '16:30', name: 'Handstands' },
      { day: 'Saturday', time: '09:15', name: 'Power (75)' },
    ],
  },
  {
    location: 'BXR',
    area: 'Marylebone',
    url: 'https://www.bxrlondon.com/',
    classes: [
      { day: 'Thursday', time: '20:00', name: 'Power' },
    ],
  },
  {
    location: 'Yogarise',
    area: 'Queens Park',
    url: 'https://yogarise.london/book/',
    classes: [
      { day: 'Monday', time: '18:30', name: 'Dynamic Flow' },
    ],
  },
];

// Today's date in London as 'YYYY-MM-DD', whatever the visitor's time zone.
export function londonToday(now = new Date()) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/London' }).format(now);
}

// Dates are formatted by hand, not with toLocaleDateString: the pages are
// pre-rendered at build time and browsers format dates slightly differently
// ("Sat 5 Dec" vs "Sat, 5 Dec"), which would make the built page and the
// browser's version disagree.
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const parts = (iso) => {
  const d = new Date(iso + 'T12:00:00Z');
  return { day: DAYS[d.getUTCDay()], date: d.getUTCDate(), month: MONTHS[d.getUTCMonth()], year: d.getUTCFullYear() };
};

// "Sat 5 Dec" from '2026-12-05'.
export function shortDate(iso) {
  const { day, date, month } = parts(iso);
  return `${day} ${date} ${month.slice(0, 3)}`;
}

// "5 December 2026" from '2026-12-05'; pass false to leave the year off.
export function longDate(iso, withYear = true) {
  const { date, month, year } = parts(iso);
  return `${date} ${month}` + (withYear ? ` ${year}` : '');
}

// Blocks with only the classes still running today; empty blocks dropped.
export function currentSchedule(today = londonToday()) {
  return schedule
    .map((block) => ({
      ...block,
      classes: block.classes.filter((c) => !c.until || today <= c.until),
    }))
    .filter((block) => block.classes.length > 0);
}

export const WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// The week by day, for the schedule page and the homepage:
// [{ day, classes: [{ time, name, studio, area, own, from }] }], days with no
// class left out, each day's classes in time order.
export function weekByDay(today = londonToday()) {
  const all = currentSchedule(today).flatMap((block) =>
    block.classes.map((c) => ({
      ...c,
      studio: block.own ? 'My own class' : block.location,
      area: block.area,
      own: !!block.own,
    }))
  );
  return WEEK.map((day) => ({
    day,
    classes: all.filter((c) => c.day === day).sort((x, y) => x.time.localeCompare(y.time)),
  })).filter((d) => d.classes.length > 0);
}

// The next `count` days that have a class, starting today, for the homepage:
// [{ date, label, classes }] with label "Mon 23 Nov" (always the date, never
// "Today": the built page can be a day old before the browser refreshes it).
// A class is listed on a date only if it is running by then.
export function nextClassDays(today = londonToday(), count = 3) {
  const days = [];
  for (let i = 0; i < 21 && days.length < count; i++) {
    const d = new Date(today + 'T12:00:00Z');
    d.setUTCDate(d.getUTCDate() + i);
    const date = d.toISOString().slice(0, 10);
    const weekday = WEEK[(d.getUTCDay() + 6) % 7];
    const classes = (weekByDay(date).find((w) => w.day === weekday)?.classes ?? []).filter(
      (c) => !c.from || date >= c.from
    );
    if (classes.length > 0) days.push({ date, label: shortDate(date), classes });
  }
  return days;
}

// The studios, each with its one booking link.
export const studios = (today = londonToday()) => currentSchedule(today).filter((b) => !b.own);
