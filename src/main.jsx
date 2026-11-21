import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import AppRoutes from './App.jsx'
import { pages } from './data/pages.js'
import { EventsProvider } from './lib/events.jsx'

const container = document.getElementById('root')

const app = (
  <StrictMode>
    <HelmetProvider>
      {/* window.__EVENTS__ is written into pre-rendered event pages at build time */}
      <EventsProvider initial={window.__EVENTS__ ?? null}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </EventsProvider>
    </HelmetProvider>
  </StrictMode>
)

// Public pages are pre-rendered at build time (scripts/prerender.js), which
// stamps the page's own path on the root element. When the HTML we were
// served is the page the router is about to show, take it over (hydrate).
// Otherwise — the empty shell used for /admin and other private pages, or
// `npm run dev` — build the page from scratch as before.
const samePath = (a, b) => a.replace(/\/+$/, '') === b.replace(/\/+$/, '')
const here = window.location.pathname
const prerenderedPath = container.dataset.prerendered

// The "page not found" HTML is served for any address without a page; the
// router shows the same not-found page for it, so that can be taken over too.
const isKnownPage = pages.some((p) => p.path !== '/404' && samePath(p.path, here))
const canHydrate =
  prerenderedPath !== undefined &&
  (samePath(prerenderedPath, here) || (prerenderedPath === '/404' && !isKnownPage))

if (canHydrate) {
  hydrateRoot(container, app, {
    // The built HTML and the browser's first render should be identical.
    // If they ever differ, React repairs the page; make the reason visible.
    onRecoverableError(error, info) {
      console.error('[hydration]', error, info?.componentStack ?? '')
    },
  })
} else {
  // Starting from scratch: clear any pre-rendered markup and the head tags
  // that came with it, so the page's own tags aren't duplicated.
  const start = [...document.head.childNodes].find(
    (n) => n.nodeType === Node.COMMENT_NODE && n.data === 'prerender-head'
  )
  for (let n = start; n; ) {
    const next = n.nextSibling
    const end = n.nodeType === Node.COMMENT_NODE && n.data === '/prerender-head'
    n.remove()
    if (end) break
    n = next
  }
  delete window.__PRERENDER_DATE__
  container.replaceChildren()
  createRoot(container).render(app)
}
