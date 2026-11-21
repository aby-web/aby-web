import { Helmet } from 'react-helmet-async';
import PageMeta from '../components/PageMeta';
import Nav from '../components/Nav';
import VacationBanner from '../components/VacationBanner';
import Footer from '../components/Footer';
import { longDate } from '../data/classes';
import { SITE } from '../data/pages';
import { eventPath, useEvents } from '../lib/events';
import useToday from '../lib/useToday';

// The events list. Each card links to the event's own page (/events/<slug>).
// The list is written into the page at build time and refreshed from Supabase
// once the page has loaded; see src/lib/events.jsx.

function EventCard({ event }) {
  return (
    <a
      href={eventPath(event)}
      className="block bg-[#F4EFE6] border border-[#C9B99A] rounded-md overflow-hidden hover:border-[#785E3D] transition-colors"
    >
      {event.image_url ? (
        <div className="relative h-56 w-full">
          <img
            src={event.image_url}
            alt={`${event.title} at ${event.location}`}
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1410]/20 to-transparent"></div>
        </div>
      ) : (
        <div className="h-56 bg-gradient-to-br from-[#785E3D] to-[#6B5740]" />
      )}
      <div className="p-6">
        <p className="text-xs uppercase tracking-wide text-[#785E3D] mb-2">
          {longDate(event.date)}
        </p>
        <h3 className="text-2xl font-light text-[#1C1410] mb-3">
          {event.title}
        </h3>
        <p className="text-sm text-[#6B5740] mb-2">
          {event.location}
        </p>
        <p className="text-xs text-[#785E3D] mt-4">
          Details →
        </p>
      </div>
    </a>
  );
}

export default function Events() {
  const { events } = useEvents();
  const today = useToday();
  const loading = events === null;

  const upcomingEvents = (events || []).filter((e) => e.date >= today);
  const pastEvents = (events || []).filter((e) => e.date < today).reverse();

  // Schema.org list of upcoming events, each pointing at its own page.
  const eventsSchema = upcomingEvents.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": upcomingEvents.map((event, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `${SITE}${eventPath(event)}`,
      "name": event.title
    }))
  } : null;

  return (
    <div className="min-h-screen bg-[#F4EFE6]">
      <PageMeta path="/events" />
      <Helmet>
        <meta name="keywords" content="yoga workshops London, yoga retreats UK, arm balance workshop, inversion workshop, yoga events London, vinyasa intensive, yoga teacher workshop" />

        {eventsSchema && (
          <script type="application/ld+json">
            {JSON.stringify(eventsSchema)}
          </script>
        )}
      </Helmet>

      <Nav theme="light" />
      <VacationBanner />

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-8 md:px-12 bg-[#F4EFE6]">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#785E3D] mb-4">
            Workshops & Retreats
          </p>
          <h1 className="text-5xl md:text-6xl font-light text-[#1C1410] mb-6">
            Events
          </h1>
          <p className="text-lg text-[#6B5740] max-w-2xl mx-auto">
            Workshops, retreats, and specialty sessions to develop specific skills and deepen your practice.
          </p>
        </div>
      </section>

      {loading ? (
        <div className="text-center py-20 text-[#6B5740]">
          Loading events...
        </div>
      ) : (
        <>
          {/* Upcoming Events */}
          {upcomingEvents.length > 0 && (
            <section className="py-18 px-8 md:px-12 bg-[#EAE0CF]">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-light text-[#1C1410] mb-8">
                  Upcoming Events
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Past Events */}
          {pastEvents.length > 0 && (
            <section className="py-18 px-8 md:px-12 bg-[#F4EFE6]">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-light text-[#1C1410] mb-8">
                  Past Events
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pastEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </div>
            </section>
          )}

          {upcomingEvents.length === 0 && pastEvents.length === 0 && (
            <section className="py-20 px-8 text-center">
              <p className="text-[#6B5740]">No events at the moment. Check back soon!</p>
            </section>
          )}
        </>
      )}

      <Footer />
    </div>
  );
}
