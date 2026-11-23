-- APPLIED 23 Nov 2026, at Ammar's request.
--
-- Search Console reported the Event data on two event pages as missing a price
-- and currency. Events come from this table, which had nowhere to keep a price.
--
-- 1. Two optional columns, in pounds (GBP):
--      price       the price, or the lowest price when there is a range
--      price_high  the highest price; only set for a range
--    Both empty = no price, which is how every existing event starts.
--    The public site may read them (the table's existing read permission covers
--    new columns); writing still goes only through the admin-data function.
--
-- 2. The two events open for booking today, with the figures Ammar gave:
--      120 Power, 31 Jan 2027       £30, booked at HOME Wellness (link unchanged)
--      Spring Yoga Immersion, May   £625 to £1,195, the same range as
--                                   /norfolk-retreat
--    Booking links are not touched: the Spring Yoga Immersion keeps pointing
--    at the /norfolk-retreat page (Ammar's decision, 23 Nov 2026).
--
-- Order matters: apply this BEFORE deploying the site code that reads the
-- columns, or the build fails (by design) and the live site stays as it is.

ALTER TABLE public.events
  ADD COLUMN IF NOT EXISTS price numeric(8,2),
  ADD COLUMN IF NOT EXISTS price_high numeric(8,2);

ALTER TABLE public.events
  DROP CONSTRAINT IF EXISTS events_price_valid,
  ADD CONSTRAINT events_price_valid CHECK (
    (price IS NULL OR price >= 0)
    AND (price_high IS NULL OR (price IS NOT NULL AND price_high > price))
  );

COMMENT ON COLUMN public.events.price IS 'Price in GBP, or the lowest price when price_high is set. Empty = no price.';
COMMENT ON COLUMN public.events.price_high IS 'Highest price in GBP, only for a price range.';

UPDATE public.events
   SET price = 30
 WHERE slug = '120-power-january-2027';

UPDATE public.events
   SET price = 625,
       price_high = 1195
 WHERE slug = 'spring-yoga-immersion-may-2027';
