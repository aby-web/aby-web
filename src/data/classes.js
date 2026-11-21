// Weekly class schedule, plus the details of my own Saturday class.
// Edit this file to change the timetable; Schedule.jsx, the hero and the
// mobile menu all read from here.
//
// Dates are 'YYYY-MM-DD' in London time:
//   from  – first class. Before this date the entry shows "From Sat 5 Dec".
//   until – last class. From the next day the entry disappears.
// The schedule is rendered in the visitor's browser, so these switch over on
// the day by themselves. No redeploy or follow-up commit is needed.

// ── Ammar's Saturday class ────────────────────────────────────────────────
// Swap the venue here once it's confirmed; it's used everywhere.
export const SATURDAY_VENUE = 'Marylebone, venue confirmed in the WhatsApp group';
export const SATURDAY_AREA = 'Marylebone';
export const SATURDAY_START = '2026-12-05';

export const WHATSAPP_GROUP_URL = 'https://chat.whatsapp.com/CUYlKibLFgpFfFPRXp7O5t?s=qt&p=i&iam=2';
export const WHATSAPP_GROUP_NAME = "Ammar's Saturday 11:30";

export const YORIGAM_URL = 'https://yorigam.com';

const HOME_URL = 'http://homewellness.uk/';
const INDABA_URL = 'https://indabayoga.com/timetable';
const INDABA_LAST_DAY = '2026-11-30';
const FLO_URL = 'https://www.floyogastudio.co.uk/book-a-class';

export const schedule = [
  {
    id: 'saturday-class',
    location: "Ammar's Saturday class",
    area: SATURDAY_AREA,
    // Shown under the heading; joining the group is how you book.
    note: [
      SATURDAY_VENUE + '.',
      'Join the WhatsApp group to come along. Bring your own mat.',
    ],
    classes: [
      {
        day: 'Saturday', time: '11:30–13:00', name: 'Vinyasa (90)',
        from: SATURDAY_START, url: WHATSAPP_GROUP_URL, cta: 'whatsapp',
      },
    ],
  },
  {
    location: 'HOME Wellness',
    area: 'Primrose Hill',
    note: ['7 Erskine Road, NW3 3AJ'],
    classes: [
      { day: 'Tuesday', time: '07:15', name: 'Warm Vinyasa', from: '2026-12-01', url: 'https://homewellness.uk/book-yoga/' },
      { day: 'Wednesday', time: '18:00', name: 'Vinyasa', url: HOME_URL },
      { day: 'Friday', time: '18:00', name: 'Vinyasa (75)', url: HOME_URL },
      { day: 'Sunday', time: '10:00', name: 'Vinyasa (75)', url: HOME_URL },
    ],
  },
  {
    // Closing: last classes Mon 30 Nov 2026, then this block disappears.
    location: 'Indaba',
    area: 'Marylebone',
    classes: [
      { day: 'Tuesday', time: '07:30', name: 'Morning Flow', until: INDABA_LAST_DAY, url: INDABA_URL },
      { day: 'Thursday', time: '18:00', name: 'Vinyasa & Meditation (75)', until: INDABA_LAST_DAY, url: INDABA_URL },
      { day: 'Saturday', time: '11:30', name: 'Vinyasa (75)', until: INDABA_LAST_DAY, url: INDABA_URL },
    ],
  },
  {
    location: 'BXR',
    area: 'Marylebone',
    classes: [
      { day: 'Thursday', time: '20:00', name: 'Power', url: 'https://www.bxrlondon.com/' },
    ],
  },
  {
    location: 'Yogarise',
    area: 'Queens Park',
    classes: [
      { day: 'Monday', time: '18:30', name: 'Dynamic Flow', url: 'https://yogarise.london/book/' },
    ],
  },
  {
    location: 'Flo',
    area: 'Hampstead',
    classes: [
      // "Flo" not "Flow" — named after the studio.
      { day: 'Monday', time: '07:15', name: 'Flo', url: FLO_URL },
      { day: 'Thursday', time: '16:30', name: 'Handstands', url: FLO_URL },
      { day: 'Saturday', time: '09:15', name: 'Power (75)', url: FLO_URL },
    ],
  },
];

// Today's date in London as 'YYYY-MM-DD', whatever the visitor's time zone.
export function londonToday(now = new Date()) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/London' }).format(now);
}

// "Sat 5 Dec" from '2026-12-05'.
export function shortDate(iso) {
  return new Date(iso + 'T12:00:00Z').toLocaleDateString('en-GB', {
    weekday: 'short', day: 'numeric', month: 'short', timeZone: 'UTC',
  });
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
