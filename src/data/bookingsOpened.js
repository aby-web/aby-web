// The day bookings opened for each thing that can be booked. It goes into the
// search data as offers.validFrom (Search Console asks for it on Event data).
// Dates are given by Ammar; nothing here is guessed. An event with no entry
// simply has no validFrom.

export const NORFOLK_BOOKINGS_OPENED = '2026-11-20';
export const SATURDAY_BOOKINGS_OPENED = '2026-11-21';

// Events from the admin, by their page address (the slug, which never changes).
// Add a line when a new event's bookings open.
export const EVENT_BOOKINGS_OPENED = {
  'spring-yoga-immersion-may-2027': NORFOLK_BOOKINGS_OPENED,
  '120-power-january-2027': '2026-11-14',
};
