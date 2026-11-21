-- Event pages: each event gets its own address, /events/<slug>.
--
-- The slug is set ONCE, when the event is created, from its title and date
-- ("120 Power" on 2027-01-31 -> "120-power-january-2027"). It does not change
-- when the title is edited later, so links that have been shared keep working.
-- The site reads it at build time (scripts/prerender.js) to write one static
-- page per event, and in the browser for events added since the last build.

ALTER TABLE public.events ADD COLUMN IF NOT EXISTS slug text;

-- "Handstand Mechanics: Build..." + '2026-04-18' -> 'handstand-mechanics-build-...-april-2026'
CREATE OR REPLACE FUNCTION public.event_slug(p_title text, p_date text)
RETURNS text
LANGUAGE plpgsql
IMMUTABLE
SET search_path = public
AS $$
DECLARE
  base text;
  d date;
BEGIN
  base := regexp_replace(lower(coalesce(nullif(trim(p_title), ''), 'event')), '[^a-z0-9]+', '-', 'g');
  base := trim(both '-' from left(trim(both '-' from base), 60));
  IF base = '' THEN base := 'event'; END IF;

  -- events.date is text ('YYYY-MM-DD'); ignore anything that isn't a date.
  IF p_date ~ '^\d{4}-\d{2}-\d{2}$' THEN
    BEGIN
      d := p_date::date;
      base := base || '-' || trim(lower(to_char(d, 'FMMonth'))) || '-' || to_char(d, 'YYYY');
    EXCEPTION WHEN others THEN
      NULL;
    END;
  END IF;

  RETURN base;
END;
$$;

CREATE OR REPLACE FUNCTION public.events_set_slug()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE
  base text;
  candidate text;
  n int := 2;
BEGIN
  -- An edit never clears or regenerates the address.
  IF TG_OP = 'UPDATE' THEN
    IF NEW.slug IS NULL OR trim(NEW.slug) = '' THEN
      NEW.slug := OLD.slug;
    END IF;
    RETURN NEW;
  END IF;

  IF NEW.slug IS NOT NULL AND trim(NEW.slug) <> '' THEN
    RETURN NEW;
  END IF;

  base := public.event_slug(NEW.title, NEW.date);
  candidate := base;
  WHILE EXISTS (SELECT 1 FROM public.events WHERE slug = candidate) LOOP
    candidate := base || '-' || n;
    n := n + 1;
  END LOOP;
  NEW.slug := candidate;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS events_set_slug ON public.events;
CREATE TRIGGER events_set_slug
  BEFORE INSERT OR UPDATE ON public.events
  FOR EACH ROW EXECUTE FUNCTION public.events_set_slug();

-- Backfill existing events, oldest first, with the same rule.
DO $$
DECLARE
  r record;
  base text;
  candidate text;
  n int;
BEGIN
  FOR r IN SELECT id, title, date FROM public.events WHERE slug IS NULL OR trim(slug) = '' ORDER BY date, created_at LOOP
    base := public.event_slug(r.title, r.date);
    candidate := base;
    n := 2;
    WHILE EXISTS (SELECT 1 FROM public.events WHERE slug = candidate) LOOP
      candidate := base || '-' || n;
      n := n + 1;
    END LOOP;
    UPDATE public.events SET slug = candidate WHERE id = r.id;
  END LOOP;
END;
$$;

ALTER TABLE public.events ALTER COLUMN slug SET NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS events_slug_key ON public.events (slug);

COMMENT ON COLUMN public.events.slug IS
  'Address of the event page: /events/<slug>. Set once on insert by the events_set_slug trigger; stable across edits.';
