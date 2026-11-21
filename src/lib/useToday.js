import { useEffect, useState } from 'react';
import { londonToday } from '../data/classes';

// Today's date in London ('YYYY-MM-DD') for anything that changes by date:
// the schedule's "From Sat 5 Dec" labels, the Saturday page's Indaba wording.
//
// Pages are pre-rendered at build time, so their HTML carries the build
// date's wording. When the browser takes over a pre-rendered page its first
// render must match that HTML exactly, so it starts from the build date
// (window.__PRERENDER_DATE__, written into the page by scripts/prerender.js)
// and switches to the real date straight after. A nightly rebuild keeps the
// stored HTML no more than a day old.
const initialToday = () =>
  (typeof window !== 'undefined' && window.__PRERENDER_DATE__) || londonToday();

export default function useToday() {
  const [today, setToday] = useState(initialToday);
  useEffect(() => {
    // Syncing with the clock once the page is live is the point of this hook.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setToday(londonToday());
  }, []);
  return today;
}
