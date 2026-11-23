/* eslint-disable react-refresh/only-export-components -- data helpers live beside their provider */
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { supabase } from './supabase';

// Events come from the public `events` table in Supabase.
//
// At build time scripts/prerender.js fetches them once (public key, public
// columns only) and writes them into the Events page and one page per event,
// so crawlers can read them. In the browser the same list is fetched again
// after the page loads, so an event added since the last build still shows.

// Only the columns the site displays.
export const EVENT_COLUMNS =
  'id, slug, title, date, location, description, image_url, booking_link, button_label, price, price_high';

export async function fetchEvents() {
  const { data, error } = await supabase
    .from('events')
    .select(EVENT_COLUMNS)
    .order('date', { ascending: true });
  if (error) throw error;
  return data || [];
}

export const eventPath = (event) => `/events/${event.slug}`;

// Prices are optional and in pounds. `price` is the price, or the lowest one
// when `price_high` is also set (a range, e.g. a retreat with several rooms).
const hasPrice = (value) => value !== null && value !== undefined && value !== '';
const pounds = (value) => {
  const n = Number(value);
  const [whole, pence] = (Number.isInteger(n) ? String(n) : n.toFixed(2)).split('.');
  return '£' + whole.replace(/\B(?=(\d{3})+$)/g, ',') + (pence ? `.${pence}` : '');
};

// "£30", "£625 to £1,195", or null when the event has no price.
export function eventPriceText(event) {
  if (!hasPrice(event?.price)) return null;
  return hasPrice(event.price_high) ? `${pounds(event.price)} to ${pounds(event.price_high)}` : pounds(event.price);
}

// The "offers" part of an event's search data, for an event that has not yet
// happened: price (or lowest and highest price), currency, the day bookings
// opened (when Ammar has given it), availability and where to book.
// `pageUrl` is used when the event has no booking link.
export function eventOffers(event, { pageUrl, validFrom }) {
  if (!event.booking_link && !hasPrice(event.price)) return null;
  const range = hasPrice(event.price) && hasPrice(event.price_high);
  return {
    '@type': range ? 'AggregateOffer' : 'Offer',
    ...(range
      ? { lowPrice: String(event.price), highPrice: String(event.price_high), priceCurrency: 'GBP' }
      : hasPrice(event.price)
        ? { price: String(event.price), priceCurrency: 'GBP' }
        : {}),
    ...(validFrom ? { validFrom } : {}),
    availability: 'https://schema.org/InStock',
    url: event.booking_link || pageUrl,
  };
}

const EventsContext = createContext(null);

// `initial` is the list the page was built with (or null). `fresh` turns true
// once the browser has fetched the current list.
export function EventsProvider({ initial = null, children }) {
  const [state, setState] = useState({ events: initial, fresh: false, failed: false });
  const started = useRef(false);

  const refresh = useCallback(() => {
    if (started.current) return;
    started.current = true;
    fetchEvents()
      .then((events) => setState({ events, fresh: true, failed: false }))
      .catch((error) => {
        console.error('Error fetching events:', error);
        setState((s) => ({ ...s, fresh: true, failed: true }));
      });
  }, []);

  return <EventsContext.Provider value={{ ...state, refresh }}>{children}</EventsContext.Provider>;
}

// { events, fresh, failed }. Fetches the current list the first time a page
// that shows events is mounted; pages that don't use events never fetch.
export function useEvents() {
  const ctx = useContext(EventsContext);
  const refresh = ctx?.refresh;
  useEffect(() => {
    refresh?.();
  }, [refresh]);
  return ctx ?? { events: null, fresh: false, failed: false };
}
