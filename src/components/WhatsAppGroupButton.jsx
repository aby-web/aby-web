import { WHATSAPP_GROUP_URL, WHATSAPP_GROUP_NAME } from '../data/classes';

// Plain link (no JS) so one tap on a phone opens WhatsApp straight into the
// group invite. min-h-[44px] keeps it a comfortable tap target.
const VARIANTS = {
  solid: 'bg-[#1C1410] text-[#F4EFE6] hover:bg-[#2A1E16]',
  light: 'bg-white text-[#1C1410] hover:bg-white/90',
  outline: 'border border-white/70 text-white hover:bg-white/10',
};

export default function WhatsAppGroupButton({ variant = 'solid', className = '', children, onClick }) {
  return (
    <a
      href={WHATSAPP_GROUP_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      aria-label={`Join the WhatsApp group "${WHATSAPP_GROUP_NAME}" (opens WhatsApp)`}
      className={`inline-flex items-center justify-center gap-2 min-h-[44px] px-5 rounded-full text-xs uppercase tracking-wide transition-colors ${VARIANTS[variant]} ${className}`}
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="currentColor">
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z" />
      </svg>
      {children ?? 'Join the WhatsApp group'}
    </a>
  );
}
