-- Create admin_settings table for storing admin password
CREATE TABLE IF NOT EXISTS admin_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key TEXT UNIQUE NOT NULL,
  setting_value TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;

-- Only authenticated users can read/update settings
CREATE POLICY "Authenticated users can read admin settings"
  ON admin_settings FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert admin settings"
  ON admin_settings FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update admin settings"
  ON admin_settings FOR UPDATE
  USING (auth.role() = 'authenticated');
