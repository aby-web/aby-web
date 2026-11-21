// Build-time entry: renders one page to an HTML string, with no browser.
// Built by `vite build --ssr` into dist-ssr/ and used only by
// scripts/prerender.js. It never ships to visitors.
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import AppRoutes from './App.jsx'

export { pages, prerenderPaths, SITE } from './data/pages.js'
export { londonToday } from './data/classes.js'

// Returns the page's markup. With React 19 the head tags a page renders
// (<title>, <meta>, <link>) come out at the front of the string;
// scripts/prerender.js moves them into <head>.
export function render(path) {
  return renderToString(
    <HelmetProvider>
      <StaticRouter location={path}>
        <AppRoutes />
      </StaticRouter>
    </HelmetProvider>
  )
}
