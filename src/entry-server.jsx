/* eslint-disable react-refresh/only-export-components -- a build script entry, not a component module */
// Build-time entry: renders one page to an HTML string, with no browser.
// Built by `vite build --ssr` into dist-ssr/ and used only by
// scripts/prerender.js. It never ships to visitors.
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import AppRoutes from './App.jsx'
import { EventsProvider } from './lib/events.jsx'
import { preloadAllRoutes, routeFor } from './routes.js'

export { pages, SITE } from './data/pages.js'
export { londonToday } from './data/classes.js'
export { llmsText } from './data/llms.js'
// The same fetch the browser uses: public key, public columns only.
export { fetchEvents, eventPath } from './lib/events.jsx'

// Load every page's code before anything is rendered.
export const prepare = preloadAllRoutes

// The source file of the page a path lands on, e.g. 'src/pages/Home.jsx'.
export const pageFileFor = (path) => routeFor(path).file

// Returns the page's markup. With React 19 the head tags a page renders
// (<title>, <meta>, <link>) come out at the front of the string;
// scripts/prerender.js moves them into <head>.
//
// `events` is the list the page should be built with (the Events page and
// each event's own page); other pages pass nothing.
export function render(path, { events = null } = {}) {
  return renderToString(
    <HelmetProvider>
      <EventsProvider initial={events}>
        <StaticRouter location={path}>
          <AppRoutes />
        </StaticRouter>
      </EventsProvider>
    </HelmetProvider>
  )
}
