import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import PageMeta from '../components/PageMeta';
import Nav from '../components/Nav';
import VacationBanner from '../components/VacationBanner';
import Footer from '../components/Footer';
import NotFound from './NotFound';
import { longDate } from '../data/classes';
import { SITE } from '../data/pages';
import { personRef } from '../data/schema';
import { eventPath, useEvents } from '../lib/events';
import useToday from '../lib/useToday';

// One event, at /events/<slug>.
//
// Events that existed at the last build have this page written out as static
// HTML. An event added since then is served the empty shell and loads here
// from Supabase; the rebuild triggered by saving it in /admin replaces that
// with the static page about a minute later.

// A one-line description for search results and link previews.
function summary(event) {
  const text = (event.description || '').replace(/\s+/g, ' ').trim();
  if (!text) return `${event.title} with Ammar Bass, ${longDate(event.date)}, ${event.location}.`;
  if (text.length <= 160) return text;
  return text.slice(0, 157).replace(/\s+\S*$/, '') + '…';
}

export default function EventPage() {
  const { slug } = useParams();
  const { events, fresh } = useEvents();
  const today = useToday();

  const event = events?.find((e) => e.slug === slug);

  if (!event) {
    // Not in the list we have. Once the current list has loaded, it doesn't exist.
    if (fresh) return <NotFound />;
    return (
      <div className="min-h-screen bg-[#F4EFE6]">
        <Nav theme="light" />
        <div className="pt-40 pb-24 text-center text-[#6B5740]">Loading event...</div>
      </div>
    );
  }

  const isPast = event.date < today;
  const url = `${SITE}${eventPath(event)}`;
  const date = longDate(event.date);
  const description = summary(event);

  return (
    <div className="min-h-screen bg-[#F4EFE6]">
      <PageMeta
        page={{
          path: eventPath(event),
          title: `${event.title}, ${date} | Ammar Bass`,
          description,
          image: event.image_url || `${SITE}/images/og-home.jpg`,
          imageAlt: `${event.title} at ${event.location}`,
          // Event photos are uploaded at their own size, not 1200x630.
          imageSize: event.image_url ? false : undefined,
          index: true,
        }}
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            "name": event.title,
            "description": description,
            "url": url,
            "startDate": event.date,
            "endDate": event.date,
            "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
            "eventStatus": "https://schema.org/EventScheduled",
            "location": { "@type": "Place", "name": event.location, "address": event.location },
            "image": event.image_url || `${SITE}/images/og-home.jpg`,
            "organizer": personRef,
            "performer": { "@type": "Person", "name": "Ammar Bass" },
            ...(event.booking_link && !isPast
              ? { "offers": { "@type": "Offer", "url": event.booking_link, "availability": "https://schema.org/InStock" } }
              : {})
          })}
        </script>
      </Helmet>

      <Nav theme="light" />
      <VacationBanner />

      <main className="pt-28 pb-20 px-8 md:px-12">
        <article className="max-w-3xl mx-auto">
          <a
            href="/events"
            className="inline-flex items-center min-h-[44px] text-[13px] text-[#785E3D] hover:text-[#1C1410] transition-colors"
          >
            ← All events
          </a>

          {event.image_url && (
            <img
              src={event.image_url}
              alt={`${event.title} at ${event.location}`}
              className="w-full max-h-[480px] object-cover rounded-lg mt-4 mb-10"
            />
          )}

          <p className="text-xs uppercase tracking-[0.15em] text-[#785E3D] mb-4">
            {date}
            {isPast ? ' · Past event' : ''}
          </p>
          <h1 className="text-4xl sm:text-5xl font-light leading-tight text-[#1C1410] mb-4">
            {event.title}
          </h1>
          <p className="text-lg text-[#1C1410] mb-8">{event.location}</p>

          {event.description && (
            <p className="text-[17px] leading-relaxed text-[#6B5740] mb-10 whitespace-pre-wrap">
              {event.description}
            </p>
          )}

          {isPast ? (
            <p className="text-[15px] text-[#6B5740]">
              This event has taken place.{' '}
              <a href="/events" className="text-[#785E3D] underline underline-offset-4 hover:text-[#1C1410]">
                See what's coming up
              </a>.
            </p>
          ) : (
            event.booking_link && (
              <a
                href={event.booking_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center min-h-[48px] px-8 rounded-full bg-[#1C1410] text-[#F4EFE6] hover:bg-[#2A1E16] transition-colors text-sm uppercase tracking-wide"
              >
                {event.button_label || 'Secure Your Spot'}
              </a>
            )
          )}
        </article>
      </main>

      <Footer />
    </div>
  );
}
