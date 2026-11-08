/*
 * Single source of truth for private session prices and formats.
 *
 * Used by /private-sessions, /how-privates-work and the FAQ. Change a price
 * here and every page (and the search-engine data) picks it up.
 */

export const PRICE_60 = 80;
export const PRICE_75 = 90;
export const PACK_SIZE = 5;
export const PACK_DISCOUNT = 15; // per cent

export const CALENDLY_URL = 'https://calendly.com/ammar-ammarbass/30min';

// Rows for the visible price list.
export const pricing = [
  { label: '60-minute session', price: `£${PRICE_60}` },
  { label: '75-minute session', price: `£${PRICE_75}` },
  { label: `${PACK_SIZE}-session pack`, price: `${PACK_DISCOUNT}% off, pre-paid` },
  { label: 'Online, over WhatsApp video', price: 'Same prices' },
  { label: 'At your home', price: 'Same prices, travel fee may apply' },
  { label: 'Small group (friends or colleagues)', price: 'Price on request' },
  { label: 'Discovery call', price: 'Free — 15 min' },
];

// Offers for the JSON-LD block.
export const offers = [
  { '@type': 'Offer', name: '60-minute session', price: String(PRICE_60), priceCurrency: 'GBP' },
  { '@type': 'Offer', name: '75-minute session', price: String(PRICE_75), priceCurrency: 'GBP' },
];

// One-sentence summary for FAQ answers.
export const priceSummary =
  `£${PRICE_60} for 60 minutes or £${PRICE_75} for 75 minutes, ` +
  `with ${PACK_DISCOUNT}% off a pre-paid pack of ${PACK_SIZE} sessions`;

// The three ways to have a session.
export const formats = [
  {
    name: 'In the studio',
    text: 'My quiet loft studio in West Hampstead, NW6, set up for one-to-one practice. Mats and props are provided, and the address is sent when you book.',
  },
  {
    name: 'Online',
    text: 'Over WhatsApp video, from wherever you are. Same structure, same attention, same prices.',
  },
  {
    name: 'At your home',
    text: 'I come to you, as long as you have room for a mat. Same prices; a travel fee may apply depending on where you are.',
  },
];
