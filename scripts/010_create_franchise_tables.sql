-- Create franchisee profiles table
CREATE TABLE IF NOT EXISTS franchisee_profiles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    country TEXT NOT NULL,
    state_city TEXT NOT NULL,
    territory TEXT NOT NULL,
    statement TEXT NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'deactivated')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create schools table for franchisee CRM
CREATE TABLE IF NOT EXISTS franchise_schools (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    franchisee_id UUID REFERENCES franchisee_profiles(id) ON DELETE CASCADE,
    school_name TEXT NOT NULL,
    school_type TEXT NOT NULL CHECK (school_type IN ('nursery', 'primary', 'secondary', 'nursery_primary', 'primary_secondary')),
    address TEXT NOT NULL,
    contact_person_name TEXT NOT NULL,
    contact_person_role TEXT NOT NULL,
    email TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    status TEXT DEFAULT 'lead' CHECK (status IN ('lead', 'contacted', 'proposal_sent', 'trial_period', 'accepted', 'rejected', 'contract_signed')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create documents table to track generated documents
CREATE TABLE IF NOT EXISTS franchise_documents (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    franchisee_id UUID REFERENCES franchisee_profiles(id) ON DELETE CASCADE,
    school_id UUID REFERENCES franchise_schools(id) ON DELETE CASCADE,
    document_type TEXT NOT NULL CHECK (document_type IN ('proposal', 'brochure', 'contract')),
    file_name TEXT NOT NULL,
    discount_percentage DECIMAL(5,2) DEFAULT 0,
    generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create discount requests table
CREATE TABLE IF NOT EXISTS discount_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    franchisee_id UUID REFERENCES franchisee_profiles(id) ON DELETE CASCADE,
    school_id UUID REFERENCES franchise_schools(id) ON DELETE CASCADE,
    discount_percentage DECIMAL(5,2) NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    requested_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    reviewed_at TIMESTAMP WITH TIME ZONE,
    reviewed_by UUID REFERENCES auth.users(id)
);

-- Create activity log table
CREATE TABLE IF NOT EXISTS franchise_activity_log (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    franchisee_id UUID REFERENCES franchisee_profiles(id) ON DELETE CASCADE,
    action TEXT NOT NULL,
    details JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_franchisee_profiles_user_id ON franchisee_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_franchisee_profiles_status ON franchisee_profiles(status);
CREATE INDEX IF NOT EXISTS idx_franchise_schools_franchisee_id ON franchise_schools(franchisee_id);
CREATE INDEX IF NOT EXISTS idx_franchise_schools_status ON franchise_schools(status);
CREATE INDEX IF NOT EXISTS idx_franchise_documents_franchisee_id ON franchise_documents(franchisee_id);
CREATE INDEX IF NOT EXISTS idx_franchise_documents_school_id ON franchise_documents(school_id);
CREATE INDEX IF NOT EXISTS idx_discount_requests_status ON discount_requests(status);
CREATE INDEX IF NOT EXISTS idx_franchise_activity_log_franchisee_id ON franchise_activity_log(franchisee_id);
