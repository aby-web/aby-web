-- Add followed_up column to private_enquiries table
ALTER TABLE private_enquiries ADD COLUMN IF NOT EXISTS followed_up BOOLEAN DEFAULT false;
