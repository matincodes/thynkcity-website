-- Create registrations table for student/parent registrations
CREATE TABLE IF NOT EXISTS registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('individual', 'parent')),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  age INTEGER,
  course_interest TEXT NOT NULL,
  children JSONB, -- For parent registrations: [{"name": "...", "age": ..., "course_interest": "..."}]
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'enrolled', 'declined')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_registrations_status ON registrations(status);
CREATE INDEX IF NOT EXISTS idx_registrations_type ON registrations(type);
CREATE INDEX IF NOT EXISTS idx_registrations_created_at ON registrations(created_at);

-- Enable RLS
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can insert registrations" ON registrations
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view all registrations" ON registrations
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update registrations" ON registrations
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can delete registrations" ON registrations
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );
