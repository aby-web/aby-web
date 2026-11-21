import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home';
import Events from './pages/Events';
import EventPage from './pages/EventPage';
import About from './pages/About';
import Practice from './pages/Practice';
import Guide from './pages/Guide';
import PinchaGuide from './pages/PinchaGuide';
import PrivateSessions from './pages/PrivateSessions';
import HowPrivatesWork from './pages/HowPrivatesWork';
import SaturdayClass from './pages/SaturdayClass';
import FAQ from './pages/FAQ';
import Admin from './pages/Admin';
import Join from './pages/Join';
import Bootcamp from './pages/Bootcamp';
import NorfolkRetreat from './pages/NorfolkRetreat';
import NewClientIntake from './pages/NewClientIntake';
import CV from './pages/CV';
import NotFound from './pages/NotFound';
import Story from './pages/Story';

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

// The route table, without a router around it, so the same table is used in
// the browser (src/main.jsx wraps it in BrowserRouter) and at build time
// (src/entry-server.jsx wraps it in StaticRouter to pre-render each page).
// Every route also needs an entry in src/data/pages.js.
function AppRoutes() {
  return (
    <>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:slug" element={<EventPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/handstandguide" element={<Guide />} />
        <Route path="/pinchaguide" element={<PinchaGuide />} />
        <Route path="/private-sessions" element={<PrivateSessions />} />
        <Route path="/how-privates-work" element={<HowPrivatesWork />} />
        <Route path="/saturday-class" element={<SaturdayClass />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/join" element={<Join />} />
        <Route path="/bootcamp" element={<Bootcamp />} />
        <Route path="/norfolk-retreat" element={<NorfolkRetreat />} />
        <Route path="/onboard" element={<NewClientIntake />} />
        <Route path="/cv" element={<CV />} />
        <Route path="/story" element={<Story />} />
        {/* /coaching and /yogami are parked: see the notes at the top of
            src/pages/Coaching.jsx and src/pages/Yogami.jsx. */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
