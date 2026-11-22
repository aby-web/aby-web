-- APPLIED 22 Nov 2026, at Ammar's request.
--
-- /pinchaguide had no row in `guides`, so it was missing from the admin Guides
-- tab and its password gate could never be passed. This adds the row with NO
-- password. An empty password matches nothing (check-guide-password refuses
-- when nothing is stored), so the guide stays closed until Ammar sets a
-- password himself in /admin > Guides.
--
-- Title and description are the ones already written for this guide in the
-- admin page's old setup notes.

INSERT INTO public.guides (title, slug, password, description)
VALUES (
  'Forearm Stand Fundamentals Guide',
  'pinchaguide',
  '',
  'A structured approach to building your Pincha Mayurasana (forearm stand) practice'
)
ON CONFLICT (slug) DO NOTHING;
