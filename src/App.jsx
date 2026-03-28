import Nav from './components/Nav';
import Hero from './components/Hero';
import Schedule from './components/Schedule';
import EventsStrip from './components/EventsStrip';
import About from './components/About';
import EmailCapture from './components/EmailCapture';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <Hero />
        <Schedule />
        <EventsStrip />
        <About />
        <EmailCapture />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}

export default App;
