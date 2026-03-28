import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

export default function Events() {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

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

      // Fetch upcoming events
      const { data: upcoming, error: upcomingError } = await supabase
        .from('events')
        .select('*')
        .eq('status', 'upcoming')
        .order('date', { ascending: true });

      if (upcomingError) throw upcomingError;
      setUpcomingEvents(upcoming || []);

      // Fetch past events
      const { data: past, error: pastError } = await supabase
        .from('events')
        .select('*')
        .eq('status', 'past')
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
    <div className="bg-[#F4EFE6] border border-[#C9B99A] rounded-md overflow-hidden hover:border-[#9C7F5C] transition-colors">
      {event.image_url ? (
        <img
          src={event.image_url}
          alt={event.title}
          className="h-56 w-full object-cover"
        />
      ) : (
        <div className="h-56 bg-gradient-to-br from-[#9C7F5C] to-[#6B5740]" />
      )}
      <div className="p-6">
        <p className="text-xs uppercase tracking-wide text-[#9C7F5C] mb-2">
          {formatDate(event.date)}
        </p>
        <h3 className="text-2xl font-light text-[#1C1410] mb-3">
          {event.title}
        </h3>
        <p className="text-sm text-[#6B5740] mb-2">
          {event.location}
        </p>
        {event.description && (
          <p className="text-sm text-[#6B5740] mb-4">
            {event.description}
          </p>
        )}
        {event.booking_link && (
          <a
            href={event.booking_link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-xs uppercase tracking-wide text-[#9C7F5C] border-b border-[#9C7F5C] hover:text-[#6B5740] transition-colors"
          >
            Book now →
          </a>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F4EFE6]">
      <Nav theme="light" />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-8 md:px-12 bg-[#F4EFE6]">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#9C7F5C] mb-4">
            Workshops & Retreats
          </p>
          <h1 className="text-5xl md:text-6xl font-light text-[#1C1410] mb-6">
            Events
          </h1>
          <p className="text-lg text-[#6B5740] max-w-2xl mx-auto">
            Join me for transformative workshops, retreats, and special events designed to deepen your practice and connect with community.
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

      <Footer />
    </div>
  );
}
