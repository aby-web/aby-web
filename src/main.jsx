import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import AppRoutes from './App.jsx'

const container = document.getElementById('root')

const app = (
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
)

// Public pages are pre-rendered at build time (scripts/prerender.js), which
// stamps the page's own path on the root element. When that matches the
// address we are on, take over the HTML that is already there (hydrate).
// Otherwise — the empty shell used for /admin and other private pages, or
// `npm run dev` — build the page from scratch as before.
const samePath = (a, b) => a.replace(/\/+$/, '') === b.replace(/\/+$/, '')
const prerenderedPath = container.dataset.prerendered

if (prerenderedPath !== undefined && samePath(prerenderedPath, window.location.pathname)) {
  hydrateRoot(container, app, {
    // The built HTML and the browser's first render should be identical.
    // If they ever differ, React repairs the page; make the reason visible.
    onRecoverableError(error, info) {
      console.error('[hydration]', error, info?.componentStack ?? '')
    },
  })
} else {
  container.replaceChildren()
  createRoot(container).render(app)
}
