/*
 * /llms.txt — a short plain-text summary of the site for AI assistants and
 * other tools that read text, not pages. scripts/prerender.js writes it to
 * dist/llms.txt at build time.
 *
 * Everything here is built from the same constants the pages use (prices,
 * class times, the schedule, the events list), so it cannot drift from the
 * site. Links go to pages on the site; the WhatsApp links stay on the pages.
 */
import { SITE } from './pages';
import { PRICE_60, PRICE_75, PACK_SIZE, PACK_DISCOUNT } from './privateSessions';
import {
  SATURDAY_PAGE,
  SATURDAY_PRICE,
  SATURDAY_START,
  SATURDAY_VENUE_NAME,
  studios,
  longDate,
  saturdayWhere,
} from './classes';

export function llmsText({ events, today }) {
  const upcoming = events.filter((e) => e.date >= today);
  const studioList = studios(today);
  const saturdayStarted = today >= SATURDAY_START;

  const lines = [
    '# Ammar Bass',
    '',
    '> Ammar Bass is a yoga teacher in London. He teaches private one-to-one yoga sessions in his loft studio in West Hampstead (NW6), online or at your home, runs his own Saturday class in Marylebone, and teaches weekly classes at HOME Wellness, BXR, Flo and Yogarise. His classes are strong, alignment-focused vinyasa with arm balances, handstands and inversions.',
    '',
    `This file was generated on ${longDate(today)} from the same data as the website.`,
    '',
    '## Private yoga sessions',
    '',
    '- Where: a private loft studio in West Hampstead, London NW6, about 15 minutes\' walk from West Hampstead station, with free parking. Also online, or at your home (a travel fee may apply).',
    `- Prices: £${PRICE_60} for 60 minutes, £${PRICE_75} for 75 minutes. ${PACK_DISCOUNT}% off a pre-paid pack of ${PACK_SIZE} sessions. Online sessions are the same price. Small groups of friends or colleagues: price on request.`,
    '- Who they are for: complete beginners are welcome, and a private session is the recommended place to start. Also for people working towards handstands, arm balances or other specific skills.',
    '- How to book: start with a free 15-minute discovery call, booked from the private sessions page.',
    `- Details, how it works and booking: ${SITE}/private-sessions`,
    '',
    '## Saturday yoga class in Marylebone',
    '',
    `- When: every Saturday, 11:30–13:00 (90 minutes)${saturdayStarted ? '' : `, starting ${longDate(SATURDAY_START)}`}.`,
    `- Where: ${saturdayWhere()}, London.${SATURDAY_VENUE_NAME ? '' : ' The exact address is shared in the class WhatsApp group.'}`,
    `- Price: £${SATURDAY_PRICE} drop-in.`,
    '- What to expect: a strong vinyasa class with time for arm balances and inversions, taught without music. Suitable for people with some yoga experience. Bring your own mat.',
    '- How to join: join the class WhatsApp group from the Saturday class page.',
    `- Details: ${SITE}${SATURDAY_PAGE}`,
    '',
    '## Weekly studio classes',
    '',
    'Booked through each studio.',
    '',
    ...studioList.map(
      (studio) =>
        `- ${studio.location} (${studio.address || studio.area}): ` +
        studio.classes.map((c) => `${c.day} ${c.time} ${c.name}`).join('; ') +
        '.'
    ),
    `- Full schedule with booking links: ${SITE}/schedule`,
    '',
    '## Upcoming events and retreats',
    '',
    ...(upcoming.length
      ? upcoming.map((e) => `- ${longDate(e.date)}: ${e.title}, ${e.location}. ${SITE}/events/${e.slug}`)
      : ['- None scheduled at the moment.']),
    `- All events, including past ones: ${SITE}/events`,
    `- Spring Yoga Immersion, a three-night retreat in Norfolk, 6–9 May 2027: ${SITE}/norfolk-retreat`,
    '',
    '## More',
    '',
    `- About Ammar: ${SITE}/about`,
    `- Frequently asked questions: ${SITE}/faq`,
    `- Free full-length class videos: ${SITE}/practice`,
    '- Contact: ammar@ammarbass.com',
    '- Instagram: https://www.instagram.com/ammarbass',
    '',
  ];

  return lines.join('\n');
}
