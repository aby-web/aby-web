-- Create private_enquiries table for private session enquiries
CREATE TABLE IF NOT EXISTS private_enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE private_enquiries ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public insert and admin read
CREATE POLICY "Anyone can insert private enquiries"
  ON private_enquiries FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can read private enquiries"
  ON private_enquiries FOR SELECT
  USING (true);

CREATE POLICY "Anyone can update private enquiries"
  ON private_enquiries FOR UPDATE
  USING (true);

CREATE POLICY "Anyone can delete private enquiries"
  ON private_enquiries FOR DELETE
  USING (true);

-- Add index on created_at for faster queries
CREATE INDEX idx_private_enquiries_created_at ON private_enquiries(created_at DESC);
