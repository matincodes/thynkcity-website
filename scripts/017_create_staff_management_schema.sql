-- Drop franchise tables
DROP TABLE IF EXISTS franchise_documents CASCADE;
DROP TABLE IF EXISTS franchise_activity_log CASCADE;
DROP TABLE IF EXISTS franchise_schools CASCADE;
DROP TABLE IF EXISTS discount_requests CASCADE;
DROP TABLE IF EXISTS franchisee_verifications CASCADE;
DROP TABLE IF EXISTS franchisee_profiles CASCADE;

-- Create schools table
CREATE TABLE IF NOT EXISTS schools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  address TEXT,
  contact_person TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create students table
CREATE TABLE IF NOT EXISTS students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
  parent_email TEXT,
  parent_phone TEXT,
  date_of_birth DATE,
  grade_level TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create staff_profiles table
CREATE TABLE IF NOT EXISTS staff_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone_number TEXT,
  assigned_school_id UUID REFERENCES schools(id) ON DELETE SET NULL,
  assigned_student_id UUID REFERENCES students(id) ON DELETE SET NULL,
  approved BOOLEAN DEFAULT FALSE,
  specialization TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create class_sessions table
CREATE TABLE IF NOT EXISTS class_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  staff_id UUID REFERENCES staff_profiles(id) ON DELETE CASCADE NOT NULL,
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
  class_type TEXT CHECK (class_type IN ('1-on-1', 'group')) NOT NULL,
  subject TEXT NOT NULL,
  date DATE NOT NULL,
  start_time TIME,
  end_time TIME,
  hours_spent NUMERIC(4,2),
  attendance_status TEXT CHECK (attendance_status IN ('held', 'missed', 'cancelled')),
  feedback TEXT,
  next_steps TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create report_cards table
CREATE TABLE IF NOT EXISTS report_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE NOT NULL,
  subject TEXT NOT NULL,
  term TEXT NOT NULL,
  overall_feedback TEXT,
  strengths TEXT,
  areas_of_improvement TEXT,
  recommendations TEXT,
  grade TEXT,
  created_by UUID REFERENCES staff_profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create virtual_class_schedules table
CREATE TABLE IF NOT EXISTS virtual_class_schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  staff_id UUID REFERENCES staff_profiles(id) ON DELETE CASCADE NOT NULL,
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
  day_of_week TEXT CHECK (day_of_week IN ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')) NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  subject TEXT,
  google_meet_link TEXT,
  reminder_enabled BOOLEAN DEFAULT TRUE,
  reminder_time INTEGER DEFAULT 30,
  rescheduled_date DATE,
  reschedule_notes TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE report_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE virtual_class_schedules ENABLE ROW LEVEL SECURITY;

-- RLS Policies for staff_profiles
CREATE POLICY "Staff can view own profile" ON staff_profiles
  FOR SELECT USING (user_id = auth.uid() AND approved = true);

CREATE POLICY "Anyone can insert staff profile" ON staff_profiles
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Staff can update own profile" ON staff_profiles
  FOR UPDATE USING (user_id = auth.uid());

-- RLS Policies for class_sessions
CREATE POLICY "Staff can view own sessions" ON class_sessions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM staff_profiles
      WHERE staff_profiles.id = class_sessions.staff_id
      AND staff_profiles.user_id = auth.uid()
      AND staff_profiles.approved = true
    )
  );

CREATE POLICY "Staff can create sessions" ON class_sessions
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM staff_profiles
      WHERE staff_profiles.id = class_sessions.staff_id
      AND staff_profiles.user_id = auth.uid()
      AND staff_profiles.approved = true
    )
  );

-- Create indexes for performance
CREATE INDEX idx_staff_user_id ON staff_profiles(user_id);
CREATE INDEX idx_class_sessions_staff ON class_sessions(staff_id);
CREATE INDEX idx_class_sessions_student ON class_sessions(student_id);
CREATE INDEX idx_students_school ON students(school_id);
CREATE INDEX idx_schedules_staff ON virtual_class_schedules(staff_id);
