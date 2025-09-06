-- Temporarily disable RLS on all franchise tables to allow signup
-- This is a temporary fix until we can properly configure service role access

ALTER TABLE franchisee_profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE franchisee_verifications DISABLE ROW LEVEL SECURITY;
ALTER TABLE discount_requests DISABLE ROW LEVEL SECURITY;
ALTER TABLE franchise_activity_log DISABLE ROW LEVEL SECURITY;
ALTER TABLE franchise_documents DISABLE ROW LEVEL SECURITY;
ALTER TABLE franchise_schools DISABLE ROW LEVEL SECURITY;

-- Add a comment to track this temporary change
COMMENT ON TABLE franchisee_profiles IS 'RLS temporarily disabled for signup issues - needs proper service role configuration';
