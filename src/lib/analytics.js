// Click and form events for Google Analytics (the gtag snippet in index.html).
//
// Every event carries only two parameters: the page's path (no query string)
// and where on the page the control sits. Nothing about the visitor is sent.
// Nothing is sent from /admin.
//
// Analytics is not started on private pages (see index.html). If an event
// is sent from one (the /onboard form), it is started then, without a page view.
//
// Events (keep the names stable; Analytics reports are keyed on them):
//   book_call_click         any "book a free call" button
//   whatsapp_enquiry_click  "Message me on WhatsApp" for private sessions
//   whatsapp_group_click    "Join the WhatsApp group" for the Saturday class
//   new_client_form_submit  the /onboard form, once it has been saved
//
// Positions: 'hero', 'header', 'menu', 'booking_bar', 'page_end', 'footer', 'form'.
export function track(eventName, position) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  const path = window.location.pathname;
  if (path.startsWith('/admin')) return;
  try {
    if (!window.gaStarted) window.gaStart?.({ send_page_view: false });
    window.gtag('event', eventName, { page_path: path, button_position: position });
  } catch {
    // Analytics must never break a button.
  }
}
