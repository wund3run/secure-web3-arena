-- CRITICAL SECURITY FIX: Complete RLS Policy Implementation
-- Run this in Supabase SQL Editor to fix all security warnings

-- ==============================================
-- 1. PROFILES TABLE SECURITY
-- ==============================================

-- Enable RLS if not already enabled
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Drop any existing policies to recreate them properly
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;

-- Create secure RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- ==============================================
-- 2. AUDITOR_PROFILES TABLE SECURITY
-- ==============================================

ALTER TABLE public.auditor_profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own auditor profile" ON public.auditor_profiles;
DROP POLICY IF EXISTS "Users can update their own auditor profile" ON public.auditor_profiles;
DROP POLICY IF EXISTS "Users can insert their own auditor profile" ON public.auditor_profiles;

-- Create secure RLS policies for auditor_profiles
CREATE POLICY "Users can view their own auditor profile" ON public.auditor_profiles
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own auditor profile" ON public.auditor_profiles
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own auditor profile" ON public.auditor_profiles
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ==============================================
-- 3. AUDIT_REQUESTS TABLE SECURITY
-- ==============================================

ALTER TABLE public.audit_requests ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their related audit requests" ON public.audit_requests;
DROP POLICY IF EXISTS "Project owners can create audit requests" ON public.audit_requests;
DROP POLICY IF EXISTS "Participants can update audit requests" ON public.audit_requests;

-- Create secure RLS policies for audit_requests
-- Users can see requests they created or are assigned to
CREATE POLICY "Users can view their related audit requests" ON public.audit_requests
    FOR SELECT USING (
        auth.uid() = requester_id OR 
        auth.uid() = auditor_id OR
        auth.uid() IN (
            SELECT p.owner_id FROM public.projects p 
            WHERE p.id = audit_requests.project_id
        )
    );

-- Only project owners can create audit requests
CREATE POLICY "Project owners can create audit requests" ON public.audit_requests
    FOR INSERT WITH CHECK (
        auth.uid() = requester_id AND
        auth.uid() IN (
            SELECT p.owner_id FROM public.projects p 
            WHERE p.id = audit_requests.project_id
        )
    );

-- Participants can update status and details
CREATE POLICY "Participants can update audit requests" ON public.audit_requests
    FOR UPDATE USING (
        auth.uid() = requester_id OR 
        auth.uid() = auditor_id
    );

-- ==============================================
-- 4. PERSONALIZED_RECOMMENDATIONS TABLE SECURITY
-- ==============================================

ALTER TABLE public.personalized_recommendations ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own recommendations" ON public.personalized_recommendations;
DROP POLICY IF EXISTS "Users can manage their own recommendations" ON public.personalized_recommendations;

-- Create secure RLS policies
CREATE POLICY "Users can view their own recommendations" ON public.personalized_recommendations
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can manage recommendations" ON public.personalized_recommendations
    FOR ALL USING (auth.uid() = user_id);

-- ==============================================
-- 5. LEARNING_PATHS TABLE SECURITY
-- ==============================================

ALTER TABLE public.learning_paths ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their learning paths" ON public.learning_paths;
DROP POLICY IF EXISTS "Users can manage their learning paths" ON public.learning_paths;

-- Create secure RLS policies
CREATE POLICY "Users can view their learning paths" ON public.learning_paths
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their learning paths" ON public.learning_paths
    FOR ALL USING (auth.uid() = user_id);

-- ==============================================
-- 6. ADD MISSING SECURITY CONSTRAINTS
-- ==============================================

-- Add check constraints for data validation
ALTER TABLE public.profiles 
ADD CONSTRAINT check_account_type CHECK (account_type IN ('auditor', 'project_owner'));

ALTER TABLE public.audit_requests 
ADD CONSTRAINT check_status CHECK (status IN ('pending', 'accepted', 'in_progress', 'completed', 'cancelled'));

-- Add indexes for performance on security-related queries
CREATE INDEX IF NOT EXISTS idx_profiles_account_type ON public.profiles(account_type);
CREATE INDEX IF NOT EXISTS idx_audit_requests_requester ON public.audit_requests(requester_id);
CREATE INDEX IF NOT EXISTS idx_audit_requests_auditor ON public.audit_requests(auditor_id);

-- ==============================================
-- 7. ENABLE REAL-TIME SECURITY
-- ==============================================

-- Enable real-time for secure tables only
ALTER PUBLICATION supabase_realtime ADD TABLE public.profiles;
ALTER PUBLICATION supabase_realtime ADD TABLE public.audit_requests;

-- ==============================================
-- SUCCESS MESSAGE
-- ==============================================

DO $$ 
BEGIN 
    RAISE NOTICE 'Security policies successfully applied to all tables!';
    RAISE NOTICE 'RLS is now properly configured for maximum data protection.';
END $$;
