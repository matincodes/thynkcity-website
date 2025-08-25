-- Create admin_verifications table for email verification
CREATE TABLE IF NOT EXISTS admin_verifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_admin_verifications_token ON admin_verifications(token);
CREATE INDEX IF NOT EXISTS idx_admin_verifications_user_id ON admin_verifications(user_id);

-- Enable RLS
ALTER TABLE admin_verifications ENABLE ROW LEVEL SECURITY;

-- Create policy for service role access only
CREATE POLICY "Service role can manage admin verifications" ON admin_verifications
  FOR ALL USING (auth.role() = 'service_role');
