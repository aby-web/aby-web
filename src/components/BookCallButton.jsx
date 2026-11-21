import { CALENDLY_URL } from '../data/privateSessions';
import { openCalendly } from '../lib/calendly';
import { btn } from './ui';

// The site's main action: book the free 15-minute discovery call.
// A real link to Calendly (works without JavaScript) that opens the booking
// pop-up when JavaScript is available.
export default function BookCallButton({ variant = 'primary', size = 'md', className = '', children, onClick }) {
  return (
    <a
      href={CALENDLY_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        onClick?.(e);
        openCalendly(e);
      }}
      className={`${btn(variant, size)} ${className}`}
    >
      {children ?? 'Book a free 15-minute call'}
    </a>
  );
}
