import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { supabase } from '../lib/supabase';
import Nav from '../components/Nav';
import VacationBanner from '../components/VacationBanner';
import Footer from '../components/Footer';

export default function Events() {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedEvent) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedEvent]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    const date = new Date(year, month - 1, day);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  };

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

      // Fetch upcoming events (date >= today)
      const { data: upcoming, error: upcomingError } = await supabase
        .from('events')
        .select('*')
        .gte('date', today)
        .order('date', { ascending: true });

      if (upcomingError) throw upcomingError;
      setUpcomingEvents(upcoming || []);

      // Fetch past events (date < today)
      const { data: past, error: pastError } = await supabase
        .from('events')
        .select('*')
        .lt('date', today)
        .order('date', { ascending: false });

      if (pastError) throw pastError;
      setPastEvents(past || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const EventCard = ({ event }) => (
    <div
      onClick={() => setSelectedEvent(event)}
      className="bg-[#F4EFE6] border border-[#C9B99A] rounded-md overflow-hidden hover:border-[#785E3D] transition-colors cursor-pointer"
    >
      {event.image_url ? (
        <div className="relative h-56 w-full">
          <img
            src={event.image_url}
            alt={event.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1410]/20 to-transparent"></div>
        </div>
      ) : (
        <div className="h-56 bg-gradient-to-br from-[#785E3D] to-[#6B5740]" />
      )}
      <div className="p-6">
        <p className="text-xs uppercase tracking-wide text-[#785E3D] mb-2">
          {formatDate(event.date)}
        </p>
        <h3 className="text-2xl font-light text-[#1C1410] mb-3">
          {event.title}
        </h3>
        <p className="text-sm text-[#6B5740] mb-2">
          {event.location}
        </p>
        <p className="text-xs text-[#785E3D] mt-4">
          Click for details →
        </p>
      </div>
    </div>
  );

  // Generate schema for events
  const eventsSchema = upcomingEvents.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": upcomingEvents.map((event, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Event",
        "name": event.title,
        "description": event.description || "Yoga workshop with Ammar Bass",
        "startDate": event.date,
        "location": {
          "@type": "Place",
          "name": event.location,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "London",
            "addressCountry": "GB"
          }
        },
        "image": event.image_url || "https://ammarbass.com/images/about.webp",
        "organizer": {
          "@type": "Person",
          "name": "Ammar Bass",
          "url": "https://ammarbass.com"
        },
        "performer": {
          "@type": "Person",
          "name": "Ammar Bass"
        },
        "offers": event.booking_link ? {
          "@type": "Offer",
          "url": event.booking_link,
          "availability": "https://schema.org/InStock"
        } : undefined,
        "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
        "eventStatus": "https://schema.org/EventScheduled"
      }
    }))
  } : null;

  return (
    <div className="min-h-screen bg-[#F4EFE6]">
      <Helmet>
        <title>Yoga Workshops & Retreats London | Ammar Bass Events</title>
        <meta name="description" content="Join Ammar Bass for yoga workshops, arm balance intensives, and transformative retreats in London. Deepen your practice with specialized events focusing on alignment, inversions, and strength." />
        <meta name="keywords" content="yoga workshops London, yoga retreats UK, arm balance workshop, inversion workshop, yoga events London, vinyasa intensive, yoga teacher workshop" />

        {/* Open Graph */}
        <meta property="og:title" content="Yoga Workshops & Retreats | Ammar Bass" />
        <meta property="og:description" content="Transformative workshops, retreats, and special events designed to deepen your yoga practice and connect with community." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ammarbass.com/events" />
        <meta property="og:image" content="https://ammarbass.com/images/about.webp" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Yoga Workshops & Retreats | Ammar Bass" />
        <meta name="twitter:description" content="Transformative workshops, retreats, and special events designed to deepen your yoga practice." />
        <meta name="twitter:image" content="https://ammarbass.com/images/about.webp" />

        <link rel="canonical" href="https://ammarbass.com/events" />

        {/* Schema.org structured data for events */}
        {eventsSchema && (
          <script type="application/ld+json">
            {JSON.stringify(eventsSchema)}
          </script>
        )}
      </Helmet>

      <Nav theme="light" />
      <VacationBanner />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-8 md:px-12 bg-[#F4EFE6]">
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
            <section className="py-16 px-8 md:px-12 bg-[#EAE0CF]">
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
            <section className="py-16 px-8 md:px-12 bg-[#F4EFE6]">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-light text-[#1C1410] mb-8">
                  Past Workshops
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

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedEvent(null)}>
          <div className="bg-[#F4EFE6] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto relative" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 z-10 text-white bg-black/50 hover:bg-black/70 rounded-full w-8 h-8 flex items-center justify-center text-2xl"
            >
              ×
            </button>

            {/* Event Image */}
            {selectedEvent.image_url ? (
              <div className="relative h-64 w-full rounded-t-lg overflow-hidden">
                <img
                  src={selectedEvent.image_url}
                  alt={selectedEvent.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1410]/20 to-transparent"></div>
              </div>
            ) : (
              <div className="h-64 bg-gradient-to-br from-[#785E3D] to-[#6B5740] rounded-t-lg" />
            )}

            {/* Event Details */}
            <div className="p-8">
              <p className="text-xs uppercase tracking-wide text-[#785E3D] mb-3">
                {formatDate(selectedEvent.date)}
              </p>
              <h2 className="text-3xl md:text-4xl font-light text-[#1C1410] mb-4">
                {selectedEvent.title}
              </h2>
              <p className="text-base text-[#6B5740] mb-6">
                {selectedEvent.location}
              </p>
              {selectedEvent.description && (
                <p className="text-[15px] leading-relaxed text-[#6B5740] mb-8 whitespace-pre-wrap">
                  {selectedEvent.description}
                </p>
              )}
              {selectedEvent.booking_link && (
                <a
                  href={selectedEvent.booking_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-4 rounded-full bg-[#1C1410] text-[#F4EFE6] hover:bg-[#2A1E16] transition-colors text-sm uppercase tracking-wide"
                >
                  Secure Your Spot
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
