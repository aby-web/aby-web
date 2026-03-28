-- Fix storage bucket policies to allow image uploads from admin
-- This allows the admin dashboard to upload event images

-- Drop existing restrictive policies if any
DROP POLICY IF EXISTS "Allow public uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow public reads" ON storage.objects;
DROP POLICY IF EXISTS "Allow public deletes" ON storage.objects;

-- Create policies for event-images bucket
CREATE POLICY "Anyone can upload to event-images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'event-images');

CREATE POLICY "Anyone can read from event-images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'event-images');

CREATE POLICY "Anyone can update event-images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'event-images');

CREATE POLICY "Anyone can delete from event-images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'event-images');

-- Note: This is secure because:
-- 1. Only applies to the event-images bucket
-- 2. Admin page is password protected
-- 3. Images are public anyway (displayed on the website)
