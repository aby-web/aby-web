import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function EventsStrip() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    // Parse the date string (YYYY-MM-DD format)
    const [year, month, day] = dateString.split('-');
    const date = new Date(year, month - 1, day); // month is 0-indexed
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  };

  const fetchEvents = async () => {
    try {
      const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

      const { data, error } = await supabase
        .from('events')
        .select('*')
        .gte('date', today) // Greater than or equal to today
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
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#785E3D] mb-4">
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
                  onClick={() => setSelectedEvent(event)}
                  className="bg-[#F4EFE6] border border-[#C9B99A] rounded-md overflow-hidden hover:border-[#785E3D] transition-colors cursor-pointer"
                >
                  {/* Image or Placeholder */}
                  {event.image_url ? (
                    <div className="relative h-44 w-full">
                      <img
                        src={event.image_url}
                        alt={event.title}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1C1410]/20 to-transparent"></div>
                    </div>
                  ) : (
                    <div className="h-44 bg-gradient-to-br from-[#785E3D] to-[#6B5740]" />
                  )}

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-xs uppercase tracking-wide text-[#785E3D] mb-2">
                      {formatDate(event.date)}
                    </p>
                    <h3 className="text-xl font-light text-[#1C1410] mb-2">
                      {event.title}
                    </h3>
                    <p className="text-sm text-[#6B5740] mb-4">
                      {event.location}
                    </p>
                    <p className="text-xs text-[#785E3D]">
                      Click for details →
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* See All Link */}
            <div className="text-center">
              <a
                href="/events"
                className="inline-block text-[13px] text-[#1C1410] border-b border-[#785E3D] hover:text-[#785E3D] transition-colors"
              >
                See all events & past workshops →
              </a>
            </div>
          </>
        )}

        {/* Event Details Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto" onClick={() => setSelectedEvent(null)}>
            <div className="bg-[#F4EFE6] rounded-lg max-w-2xl w-full my-8 relative" onClick={(e) => e.stopPropagation()}>
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
      </div>
    </section>
  );
}
