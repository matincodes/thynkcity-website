-- Create franchisee verification table for email verification
CREATE TABLE IF NOT EXISTS franchisee_verifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  franchisee_id UUID NOT NULL REFERENCES franchisees(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  token TEXT NOT NULL UNIQUE,
  verified BOOLEAN DEFAULT FALSE,
  verified_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster token lookups
CREATE INDEX IF NOT EXISTS idx_franchisee_verifications_token ON franchisee_verifications(token);
CREATE INDEX IF NOT EXISTS idx_franchisee_verifications_franchisee_id ON franchisee_verifications(franchisee_id);

-- Add trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_franchisee_verifications_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_franchisee_verifications_updated_at
  BEFORE UPDATE ON franchisee_verifications
  FOR EACH ROW
  EXECUTE FUNCTION update_franchisee_verifications_updated_at();
