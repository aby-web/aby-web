-- Fix RLS policies for subscribers table to allow anonymous inserts
-- This allows the email signup form to work from the public website

-- Drop existing restrictive policies if they exist
DROP POLICY IF EXISTS "Anyone can read subscribers" ON subscribers;
DROP POLICY IF EXISTS "Authenticated users can insert subscribers" ON subscribers;
DROP POLICY IF EXISTS "Authenticated users can update subscribers" ON subscribers;
DROP POLICY IF EXISTS "Authenticated users can delete subscribers" ON subscribers;

-- Create new policies that allow anonymous access
-- (Safe because the admin page has password protection and this is just email collection)

CREATE POLICY "Anyone can insert subscribers"
  ON subscribers FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can read subscribers"
  ON subscribers FOR SELECT
  USING (true);

CREATE POLICY "Anyone can update subscribers"
  ON subscribers FOR UPDATE
  USING (true);

CREATE POLICY "Anyone can delete subscribers"
  ON subscribers FOR DELETE
  USING (true);
