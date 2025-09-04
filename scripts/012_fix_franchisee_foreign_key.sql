-- Remove the foreign key constraint that's causing issues with email confirmation
ALTER TABLE franchisee_profiles DROP CONSTRAINT IF EXISTS franchisee_profiles_user_id_fkey;

-- Add a simple index instead for performance
CREATE INDEX IF NOT EXISTS idx_franchisee_profiles_user_id_lookup ON franchisee_profiles(user_id);

-- Also fix the discount_requests table that has the same issue
ALTER TABLE discount_requests DROP CONSTRAINT IF EXISTS discount_requests_reviewed_by_fkey;
CREATE INDEX IF NOT EXISTS idx_discount_requests_reviewed_by ON discount_requests(reviewed_by);
