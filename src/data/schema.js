/*
 * Structured data (JSON-LD) shared between pages: who Ammar is and what the
 * business offers. Pages add their own blocks (Service, Event, FAQPage) and
 * point back at these with "@id".
 *
 * Rules for this file:
 *   - State only facts that are true and visible on the site. No empty
 *     fields, no placeholder phone numbers, no guessed coordinates.
 *   - The studio's street address is deliberately not published; the address
 *     here stops at the area (West Hampstead, NW6).
 *   - Prices come from the same constants the pages use.
 */
import { SITE } from './pages';
import { PRICE_60, PRICE_75 } from './privateSessions';
import { SATURDAY_PRICE, SATURDAY_PAGE } from './classes';

export const PERSON_ID = `${SITE}/#ammar`;
export const BUSINESS_ID = `${SITE}/#business`;

// Studios Ammar currently teaches at (keep in step with src/data/classes.js).
const STUDIOS = [
  { '@type': 'Organization', name: 'HOME Wellness', url: 'https://homewellness.uk/' },
  { '@type': 'Organization', name: 'BXR London', url: 'https://www.bxrlondon.com/' },
  { '@type': 'Organization', name: 'Yogarise', url: 'https://yogarise.london/' },
  { '@type': 'Organization', name: 'Flo Yoga', url: 'https://www.floyogastudio.co.uk/' },
];

const SIVANANDA = { '@type': 'Organization', name: 'Sivananda Kutir' };

// Ammar's training, as approved for the About page (21 Nov 2026). Only the
// Sivananda course is listed below as a credential; the other two are named
// here and in `knowsAbout` as training, not as certificates.
export const TRAINING_SUMMARY =
  'Trained at Sivananda Kutir (200-hour teacher training, 2022), in Rocket with David Kyle, and in alignment and assists with Stewart Gilchrist.';

export const person = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: 'Ammar Bass',
  jobTitle: 'Yoga teacher',
  description:
    'Yoga teacher in London. Private one-to-one sessions in West Hampstead, a Saturday class in Marylebone, and weekly classes at HOME Wellness, BXR, Flo and Yogarise. Strong, alignment-focused vinyasa, arm balances and inversions. ' +
    TRAINING_SUMMARY,
  url: SITE,
  image: `${SITE}/images/about.webp`,
  address: { '@type': 'PostalAddress', addressLocality: 'London', addressCountry: 'GB' },
  knowsAbout: [
    'Vinyasa Yoga',
    'Rocket Yoga',
    'Yoga Alignment',
    'Hands-on Assists',
    'Arm Balances',
    'Inversions',
    'Handstands',
    'Vipassana Meditation',
    'Biomechanics',
    'Strength Training',
  ],
  worksFor: STUDIOS,
  alumniOf: SIVANANDA,
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'certificate',
      name: '200-hour yoga teacher training',
      recognizedBy: SIVANANDA,
    },
  ],
  sameAs: ['https://www.instagram.com/ammarbass'],
};

// A short reference to the person, for use inside other blocks.
export const personRef = { '@type': 'Person', '@id': PERSON_ID, name: 'Ammar Bass', url: SITE };

export const business = {
  '@type': 'LocalBusiness',
  '@id': BUSINESS_ID,
  name: 'Ammar Bass Yoga',
  description:
    'Private one-to-one yoga sessions in a loft studio in West Hampstead, London NW6, online or at your home, and a weekly Saturday class in Marylebone.',
  url: SITE,
  image: `${SITE}/images/og-home.jpg`,
  founder: { '@id': PERSON_ID },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'London',
    addressRegion: 'West Hampstead',
    postalCode: 'NW6',
    addressCountry: 'GB',
  },
  areaServed: [
    { '@type': 'Place', name: 'West Hampstead, London NW6' },
    { '@type': 'Place', name: 'Marylebone, London' },
  ],
  priceRange: `£${SATURDAY_PRICE}–£${PRICE_75}`,
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Yoga with Ammar Bass',
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'Private yoga session, 60 minutes',
        price: String(PRICE_60),
        priceCurrency: 'GBP',
        url: `${SITE}/private-sessions`,
        itemOffered: { '@type': 'Service', name: 'Private one-to-one yoga session' },
      },
      {
        '@type': 'Offer',
        name: 'Private yoga session, 75 minutes',
        price: String(PRICE_75),
        priceCurrency: 'GBP',
        url: `${SITE}/private-sessions`,
        itemOffered: { '@type': 'Service', name: 'Private one-to-one yoga session' },
      },
      {
        '@type': 'Offer',
        name: 'Saturday class in Marylebone, drop-in',
        price: String(SATURDAY_PRICE),
        priceCurrency: 'GBP',
        url: `${SITE}${SATURDAY_PAGE}`,
        itemOffered: { '@type': 'Service', name: 'Saturday yoga class in Marylebone' },
      },
    ],
  },
};

// The private sessions service, used on /private-sessions.
export const privateService = (offers) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Private yoga sessions in West Hampstead',
  serviceType: 'Private one-to-one yoga tuition',
  url: `${SITE}/private-sessions`,
  provider: personRef,
  areaServed: [
    { '@type': 'Place', name: 'West Hampstead, London NW6' },
    { '@type': 'Place', name: 'London' },
  ],
  offers,
});

// FAQPage from [{ category, questions: [{ q, a }] }].
export const faqPage = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.flatMap((group) =>
    group.questions.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    }))
  ),
});
