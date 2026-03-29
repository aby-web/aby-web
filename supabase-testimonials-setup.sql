-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  review TEXT NOT NULL,
  studio TEXT NOT NULL,
  class_name TEXT NOT NULL,
  order_position INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read and admin write
CREATE POLICY "Anyone can read testimonials"
  ON testimonials FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert testimonials"
  ON testimonials FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update testimonials"
  ON testimonials FOR UPDATE
  USING (true);

CREATE POLICY "Anyone can delete testimonials"
  ON testimonials FOR DELETE
  USING (true);

-- Insert the existing 3 testimonials
INSERT INTO testimonials (review, studio, class_name, order_position) VALUES
  ('Challenging positions in a positive way. Great pace, attentive and helpful instructor.', 'Flo Yoga', 'Experienced Flow', 1),
  ('Very calm, attentive and knowledgeable. The class flew smoothly with amazing vinyasas.', 'Hotpod', 'Notting Hill', 2),
  ('Brilliant teaching. Mixture of deep breaths with pace picking up for deep stretches and holds.', 'Studio Society', 'Vinyasa Flow', 3);
