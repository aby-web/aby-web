import { CALENDLY_URL } from '../data/privateSessions';
import { openCalendly } from '../lib/calendly';
import { track } from '../lib/analytics';
import { btn } from './ui';

// The site's main action: book the free 15-minute discovery call.
// A real link to Calendly (works without JavaScript) that opens the booking
// pop-up when JavaScript is available.
//
// `position` says where on the page this button sits (see src/lib/analytics.js);
// each press is counted as book_call_click.
export default function BookCallButton({ position, variant = 'primary', size = 'md', className = '', children, onClick }) {
  return (
    <a
      href={CALENDLY_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        track('book_call_click', position);
        onClick?.(e);
        openCalendly(e);
      }}
      className={`${btn(variant, size)} ${className}`}
    >
      {children ?? 'Book a free 15-minute call'}
    </a>
  );
}
