import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function EventsStrip() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('status', 'upcoming')
        .order('date', { ascending: true });

      if (error) throw error;

      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="events" className="bg-[#EAE0CF] px-8 md:px-12 py-18">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#9C7F5C] mb-4">
            Upcoming
          </p>
          <h2 className="text-4xl md:text-5xl font-light text-[#1C1410]">
            Workshops & retreats
          </h2>
        </div>

        {loading ? (
          <div className="text-center py-12 text-[#6B5740]">
            Loading events...
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-12 text-[#6B5740]">
            No upcoming events at the moment. Check back soon!
          </div>
        ) : (
          <>
            {/* Event Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="bg-[#F4EFE6] border border-[#C9B99A] rounded-md overflow-hidden hover:border-[#9C7F5C] transition-colors"
                >
                  {/* Image or Placeholder */}
                  {event.image_url ? (
                    <img
                      src={event.image_url}
                      alt={event.title}
                      className="h-44 w-full object-cover"
                    />
                  ) : (
                    <div className="h-44 bg-gradient-to-br from-[#9C7F5C] to-[#6B5740]" />
                  )}

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-xs uppercase tracking-wide text-[#9C7F5C] mb-2">
                      {event.date}
                    </p>
                    <h3 className="text-xl font-light text-[#1C1410] mb-2">
                      {event.title}
                    </h3>
                    <p className="text-sm text-[#6B5740] mb-4">
                      {event.location}
                    </p>
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
              ))}
            </div>

            {/* See All Link */}
            <div className="text-center">
              <a
                href="/events"
                className="inline-block text-[13px] text-[#1C1410] border-b border-[#9C7F5C] hover:text-[#9C7F5C] transition-colors"
              >
                See all events & past workshops →
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
