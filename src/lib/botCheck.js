import { useEffect, useRef } from 'react';

// Lightweight bot filtering for the public signup forms.
//
// Two passive signals, neither of which a real visitor ever trips:
//   1. A honeypot field, hidden from view but visible to naive form-fillers.
//      Bots parse the DOM and populate every input they find.
//   2. Time-to-submit. A human needs a moment to read the form and type;
//      a script posts almost instantly.
//
// Both fail silently — the form reports success so the bot has no signal to
// tune against, but nothing is written to Supabase or Kit.

// Bots fill this field; humans never see it.
export const HONEYPOT_NAME = 'company_website';

// Fastest plausible human submission. Generous on purpose: a fast typist with
// autofill can be quick, and a false positive silently drops a real signup.
const MIN_SUBMIT_MS = 2500;

// Applied to the honeypot input. Kept off-screen rather than `display: none`,
// since some bots skip inputs that are explicitly hidden.
export const honeypotStyle = {
  position: 'absolute',
  left: '-9999px',
  width: '1px',
  height: '1px',
  opacity: 0,
  pointerEvents: 'none',
};

// Props shared by every honeypot input. `tabIndex: -1` and `autoComplete: 'off'`
// keep keyboard users and password managers away from it.
export const honeypotProps = {
  type: 'text',
  name: HONEYPOT_NAME,
  tabIndex: -1,
  autoComplete: 'off',
  'aria-hidden': true,
  style: honeypotStyle,
};

/**
 * Decide whether a submission looks automated.
 *
 * @param {string} honeypotValue Current value of the honeypot input.
 * @param {number} formLoadedAt  Timestamp (ms) from when the form mounted.
 * @returns {boolean} true when the submission should be silently discarded.
 */
export function isLikelyBot(honeypotValue, formLoadedAt) {
  if (honeypotValue) return true;
  if (formLoadedAt && Date.now() - formLoadedAt < MIN_SUBMIT_MS) return true;
  return false;
}

/**
 * Records when the form became interactive.
 *
 * Stamped in an effect rather than a ref initializer: `Date.now()` during
 * render is impure, and React may render without committing.
 *
 * @returns {{ elapsedMs: () => number }}
 */
export function useFormTimer() {
  const loadedAt = useRef(null);

  useEffect(() => {
    loadedAt.current = Date.now();
  }, []);

  return {
    // Infinity when the timer never started, so an unstamped form is treated
    // as human rather than silently swallowing a genuine signup.
    elapsedMs: () =>
      loadedAt.current === null ? Number.POSITIVE_INFINITY : Date.now() - loadedAt.current,
  };
}
