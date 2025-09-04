-- Create a simpler RLS approach that doesn't rely on auth.users table access
-- Drop existing policies that might be causing issues
DROP POLICY IF EXISTS "franchisee_profiles_select_policy" ON franchisee_profiles;
DROP POLICY IF EXISTS "franchisee_profiles_insert_policy" ON franchisee_profiles;
DROP POLICY IF EXISTS "franchisee_profiles_update_policy" ON franchisee_profiles;
DROP POLICY IF EXISTS "franchisee_profiles_delete_policy" ON franchisee_profiles;

-- Temporarily disable RLS on franchisee_profiles to allow signup
ALTER TABLE franchisee_profiles DISABLE ROW LEVEL SECURITY;

-- Re-enable RLS with simpler policies
ALTER TABLE franchisee_profiles ENABLE ROW LEVEL SECURITY;

-- Allow users to insert their own profile during signup
CREATE POLICY "franchisee_profiles_insert_own" ON franchisee_profiles
    FOR INSERT 
    WITH CHECK (user_id = auth.uid());

-- Allow users to view and update their own profile
CREATE POLICY "franchisee_profiles_select_own" ON franchisee_profiles
    FOR SELECT 
    USING (user_id = auth.uid());

CREATE POLICY "franchisee_profiles_update_own" ON franchisee_profiles
    FOR UPDATE 
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

-- Allow service role (for admin operations) to access all profiles
CREATE POLICY "franchisee_profiles_service_role" ON franchisee_profiles
    FOR ALL 
    USING (current_setting('role') = 'service_role');

-- Similar approach for other franchise tables
ALTER TABLE franchisee_verifications DISABLE ROW LEVEL SECURITY;
ALTER TABLE franchisee_verifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "franchisee_verifications_insert" ON franchisee_verifications
    FOR INSERT 
    WITH CHECK (true); -- Allow system to create verification records

CREATE POLICY "franchisee_verifications_select" ON franchisee_verifications
    FOR SELECT 
    USING (true); -- Allow reading for verification process

-- Fix other franchise tables with simpler policies
ALTER TABLE discount_requests DISABLE ROW LEVEL SECURITY;
ALTER TABLE franchise_activity_log DISABLE ROW LEVEL SECURITY;
ALTER TABLE franchise_documents DISABLE ROW LEVEL SECURITY;
ALTER TABLE franchise_schools DISABLE ROW LEVEL SECURITY;

-- Re-enable with basic policies
ALTER TABLE discount_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE franchise_activity_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE franchise_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE franchise_schools ENABLE ROW LEVEL SECURITY;

-- Basic policies for franchise tables
CREATE POLICY "discount_requests_own" ON discount_requests
    FOR ALL USING (franchisee_id IN (
        SELECT id FROM franchisee_profiles WHERE user_id = auth.uid()
    ));

CREATE POLICY "franchise_activity_log_own" ON franchise_activity_log
    FOR ALL USING (franchisee_id IN (
        SELECT id FROM franchisee_profiles WHERE user_id = auth.uid()
    ));

CREATE POLICY "franchise_documents_own" ON franchise_documents
    FOR ALL USING (franchisee_id IN (
        SELECT id FROM franchisee_profiles WHERE user_id = auth.uid()
    ));

CREATE POLICY "franchise_schools_own" ON franchise_schools
    FOR ALL USING (franchisee_id IN (
        SELECT id FROM franchisee_profiles WHERE user_id = auth.uid()
    ));
