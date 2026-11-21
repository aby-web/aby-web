/*
 * Shared styles, so every page uses the same buttons and text.
 *
 * Buttons: ONE filled style for the main action on a screen and ONE outlined
 * style for a second action. The "onDark" versions are the same two buttons
 * for use on the dark espresso sections and over photos.
 *
 * Text: body copy is 17px at normal weight in a brown dark enough to read
 * outdoors on a phone (7.4:1 on the cream background). Small labels are never
 * below 12px.
 */
const SHAPE =
  'inline-flex items-center justify-center gap-2 rounded-full uppercase tracking-wide text-center sm:whitespace-nowrap transition-colors cursor-pointer disabled:opacity-50';
// Sizes are picked here, never overridden with extra classes: two Tailwind
// classes for the same property do not reliably beat each other.
const SIZE = {
  md: 'min-h-[48px] px-7 text-sm',
  sm: 'min-h-[44px] px-5 text-xs',
};
const LOOK = {
  primary: 'bg-[#1C1410] text-[#F4EFE6] hover:bg-[#3A2A1E]',
  secondary: 'border-2 border-[#1C1410] text-[#1C1410] hover:bg-[#1C1410] hover:text-[#F4EFE6]',
  primaryOnDark: 'bg-[#F4EFE6] text-[#1C1410] hover:bg-white',
  secondaryOnDark: 'border-2 border-[#F4EFE6]/80 text-[#F4EFE6] hover:bg-[#F4EFE6]/10',
};

// btn('primary') or btn('secondary', 'sm')
export const btn = (look = 'primary', size = 'md') => `${SHAPE} ${SIZE[size]} ${LOOK[look]}`;

// The four looks at the standard size.
export const BTN = {
  primary: btn('primary'),
  secondary: btn('secondary'),
  primaryOnDark: btn('primaryOnDark'),
  secondaryOnDark: btn('secondaryOnDark'),
};

export const TEXT = {
  // Small uppercase line above a heading.
  eyebrow: 'text-xs uppercase tracking-[0.2em] text-[#785E3D]',
  eyebrowOnDark: 'text-xs uppercase tracking-[0.2em] text-[#C9A878]',
  body: 'text-[17px] leading-relaxed text-[#5C4A36]',
  bodyOnDark: 'text-[17px] leading-relaxed text-[#E5D5B7]',
  // An in-text link.
  link: 'text-[#785E3D] underline underline-offset-4 hover:text-[#1C1410] transition-colors',
};
