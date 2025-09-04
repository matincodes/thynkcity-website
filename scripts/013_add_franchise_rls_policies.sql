-- Enable Row Level Security on franchise tables
ALTER TABLE franchisee_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE franchise_schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE franchise_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE franchise_activity_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE discount_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE franchisee_verifications ENABLE ROW LEVEL SECURITY;

-- Franchisee Profiles Policies
-- Franchisees can only view and update their own profile
CREATE POLICY "Franchisees can view own profile" ON franchisee_profiles
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Franchisees can update own profile" ON franchisee_profiles
    FOR UPDATE USING (auth.uid() = user_id);

-- Fixed admin policies to use auth.jwt() instead of auth.users table
-- Admins can view and manage all franchisee profiles
CREATE POLICY "Admins can manage all franchisee profiles" ON franchisee_profiles
    FOR ALL USING (
        (auth.jwt() ->> 'email')::text LIKE '%@thynkcity.com'
    );

-- Allow insert during registration (before user is authenticated)
CREATE POLICY "Allow franchisee registration" ON franchisee_profiles
    FOR INSERT WITH CHECK (true);

-- Franchise Schools Policies
-- Franchisees can only manage their own schools
CREATE POLICY "Franchisees can manage own schools" ON franchise_schools
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM franchisee_profiles 
            WHERE franchisee_profiles.id = franchise_schools.franchisee_id 
            AND franchisee_profiles.user_id = auth.uid()
        )
    );

-- Fixed admin policy to use auth.jwt() instead of auth.users table
-- Admins can view all schools
CREATE POLICY "Admins can view all schools" ON franchise_schools
    FOR SELECT USING (
        (auth.jwt() ->> 'email')::text LIKE '%@thynkcity.com'
    );

-- Franchise Documents Policies
-- Franchisees can only manage their own documents
CREATE POLICY "Franchisees can manage own documents" ON franchise_documents
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM franchisee_profiles 
            WHERE franchisee_profiles.id = franchise_documents.franchisee_id 
            AND franchisee_profiles.user_id = auth.uid()
        )
    );

-- Fixed admin policy to use auth.jwt() instead of auth.users table
-- Admins can view all documents
CREATE POLICY "Admins can view all documents" ON franchise_documents
    FOR SELECT USING (
        (auth.jwt() ->> 'email')::text LIKE '%@thynkcity.com'
    );

-- Franchise Activity Log Policies
-- Franchisees can only view their own activity
CREATE POLICY "Franchisees can view own activity" ON franchise_activity_log
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM franchisee_profiles 
            WHERE franchisee_profiles.id = franchise_activity_log.franchisee_id 
            AND franchisee_profiles.user_id = auth.uid()
        )
    );

-- System can insert activity logs
CREATE POLICY "System can insert activity logs" ON franchise_activity_log
    FOR INSERT WITH CHECK (true);

-- Fixed admin policy to use auth.jwt() instead of auth.users table
-- Admins can view all activity
CREATE POLICY "Admins can view all activity" ON franchise_activity_log
    FOR SELECT USING (
        (auth.jwt() ->> 'email')::text LIKE '%@thynkcity.com'
    );

-- Discount Requests Policies
-- Franchisees can manage their own discount requests
CREATE POLICY "Franchisees can manage own discount requests" ON discount_requests
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM franchisee_profiles 
            WHERE franchisee_profiles.id = discount_requests.franchisee_id 
            AND franchisee_profiles.user_id = auth.uid()
        )
    );

-- Fixed admin policy to use auth.jwt() instead of auth.users table
-- Admins can manage all discount requests
CREATE POLICY "Admins can manage all discount requests" ON discount_requests
    FOR ALL USING (
        (auth.jwt() ->> 'email')::text LIKE '%@thynkcity.com'
    );

-- Franchisee Verifications Policies
-- Fixed admin policy to use auth.jwt() instead of auth.users table
-- Only admins can manage verifications
CREATE POLICY "Admins can manage verifications" ON franchisee_verifications
    FOR ALL USING (
        (auth.jwt() ->> 'email')::text LIKE '%@thynkcity.com'
    );

-- Allow system to insert verification tokens during signup
CREATE POLICY "System can insert verification tokens" ON franchisee_verifications
    FOR INSERT WITH CHECK (true);

-- Allow public verification (for email verification links)
CREATE POLICY "Allow public verification" ON franchisee_verifications
    FOR SELECT USING (true);
