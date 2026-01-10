-- Fix admin_verifications foreign key constraint issue
-- The table was referencing 'users' table instead of 'auth.users'
-- We'll remove the foreign key constraint since auth.users is managed by Supabase

-- Drop the problematic foreign key constraint
ALTER TABLE admin_verifications 
DROP CONSTRAINT IF EXISTS admin_verifications_user_id_fkey;

-- Add a comment to document that user_id references auth.users but without FK constraint
COMMENT ON COLUMN admin_verifications.user_id IS 'References auth.users(id) - no FK constraint as auth.users is managed by Supabase Auth';

-- Ensure the table has proper indexes for performance
CREATE INDEX IF NOT EXISTS idx_admin_verifications_user_id ON admin_verifications(user_id);
CREATE INDEX IF NOT EXISTS idx_admin_verifications_token ON admin_verifications(token);
CREATE INDEX IF NOT EXISTS idx_admin_verifications_expires_at ON admin_verifications(expires_at);
