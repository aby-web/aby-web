-- ============================================
-- RUN THIS SQL IN SUPABASE SQL EDITOR
-- ============================================

-- 1. Create Events table
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  date TEXT,
  location TEXT,
  description TEXT,
  image_url TEXT,
  booking_link TEXT,
  status TEXT NOT NULL DEFAULT 'upcoming',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create Subscribers table
CREATE TABLE subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  source TEXT DEFAULT 'website'
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies for Events table
-- Public can read all events
CREATE POLICY "Public can read events"
  ON events FOR SELECT
  USING (true);

-- Only authenticated users can insert events
CREATE POLICY "Authenticated users can insert events"
  ON events FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Only authenticated users can update events
CREATE POLICY "Authenticated users can update events"
  ON events FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Only authenticated users can delete events
CREATE POLICY "Authenticated users can delete events"
  ON events FOR DELETE
  USING (auth.role() = 'authenticated');

-- 5. RLS Policies for Subscribers table
-- Public can insert (so signup form works)
CREATE POLICY "Public can subscribe"
  ON subscribers FOR INSERT
  WITH CHECK (true);

-- Only authenticated users can read subscribers
CREATE POLICY "Authenticated users can read subscribers"
  ON subscribers FOR SELECT
  USING (auth.role() = 'authenticated');

-- 6. Create Storage bucket for event images
INSERT INTO storage.buckets (id, name, public)
VALUES ('event-images', 'event-images', true);

-- 7. Storage policy - public can read images
CREATE POLICY "Public can read event images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'event-images');

-- Authenticated users can upload/update/delete images
CREATE POLICY "Authenticated users can upload event images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'event-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update event images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'event-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete event images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'event-images' AND auth.role() = 'authenticated');
