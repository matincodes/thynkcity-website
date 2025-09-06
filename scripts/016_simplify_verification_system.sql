-- Add verification fields directly to franchisee_profiles table
ALTER TABLE franchisee_profiles 
ADD COLUMN IF NOT EXISTS verification_token TEXT,
ADD COLUMN IF NOT EXISTS verification_expires_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS verified_at TIMESTAMP WITH TIME ZONE;

-- Update existing records to be verified (for migration)
UPDATE franchisee_profiles 
SET verified_at = NOW() 
WHERE verified_at IS NULL;

-- Drop the problematic franchisee_verifications table if it exists
DROP TABLE IF EXISTS franchisee_verifications CASCADE;
