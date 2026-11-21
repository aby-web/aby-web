import { CALENDLY_URL } from '../data/privateSessions';

// Opens the Calendly booking pop-up for the free 15-minute call.
//
// Calendly's script and stylesheet are only fetched the first time someone
// presses a booking button, so pages don't pay for them up front. If they
// can't be loaded, the booking page opens in a new tab instead. Buttons are
// real links to the same address, so they also work without JavaScript.
let loading = null;

function loadCalendly() {
  if (window.Calendly) return Promise.resolve();
  if (!loading) {
    loading = new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://assets.calendly.com/assets/external/widget.css';
      document.head.appendChild(link);

      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      script.onload = resolve;
      script.onerror = () => {
        loading = null;
        reject(new Error('Calendly failed to load'));
      };
      document.body.appendChild(script);
    });
  }
  return loading;
}

export function openCalendly(event) {
  event?.preventDefault();
  loadCalendly()
    .then(() => window.Calendly.initPopupWidget({ url: CALENDLY_URL }))
    .catch(() => window.open(CALENDLY_URL, '_blank', 'noopener'));
}
