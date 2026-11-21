import { createElement, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { routes, pageFor } from './routes';

function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      // Remove the # from the hash
      const id = location.hash.replace('#', '');
      // Wait for the page to render
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else if (location.pathname === '/') {
      // Scroll to top when navigating to home page without hash
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return null;
}

// The routes, without a router around them, so the same table is used in the
// browser (src/main.jsx wraps it in BrowserRouter) and at build time
// (src/entry-server.jsx wraps it in StaticRouter to pre-render each page).
// The table itself is in src/routes.js.
function AppRoutes() {
  return (
    <>
      <ScrollToHash />
      {/* Only an in-site link to a page whose code isn't loaded yet suspends,
          and React keeps the current page on screen while it loads. */}
      <Suspense fallback={null}>
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={createElement(pageFor(route))} />
          ))}
        </Routes>
      </Suspense>
    </>
  );
}

export default AppRoutes;
