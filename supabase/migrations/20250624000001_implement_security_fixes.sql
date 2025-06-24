
-- Enable RLS on missing tables
ALTER TABLE public.extended_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_matching_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_milestones ENABLE ROW LEVEL SECURITY;

-- Extended Profiles RLS Policies
CREATE POLICY "Users can view their own profile" ON public.extended_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.extended_profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.extended_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON public.extended_profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() 
      AND role = 'admin' 
      AND is_active = true
    )
  );

-- User Roles RLS Policies
CREATE POLICY "Users can view their own roles" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles" ON public.user_roles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() 
      AND role = 'admin' 
      AND is_active = true
    )
  );

-- AI Matching Preferences RLS Policies
CREATE POLICY "Users can manage their own preferences" ON public.ai_matching_preferences
  FOR ALL USING (auth.uid() = user_id);

-- Analytics Events RLS Policies
CREATE POLICY "Users can view their own analytics" ON public.analytics_events
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can insert analytics" ON public.analytics_events
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view all analytics" ON public.analytics_events
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() 
      AND role = 'admin' 
      AND is_active = true
    )
  );

-- Admin Actions RLS Policies
CREATE POLICY "Admins can manage admin actions" ON public.admin_actions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() 
      AND role = 'admin' 
      AND is_active = true
    )
  );

-- Audit Messages RLS Policies
CREATE POLICY "Audit participants can view messages" ON public.audit_messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.audit_requests ar
      WHERE ar.id = audit_request_id
      AND (ar.client_id = auth.uid() OR ar.assigned_auditor_id = auth.uid())
    )
  );

CREATE POLICY "Audit participants can send messages" ON public.audit_messages
  FOR INSERT WITH CHECK (
    auth.uid() = sender_id AND
    EXISTS (
      SELECT 1 FROM public.audit_requests ar
      WHERE ar.id = audit_request_id
      AND (ar.client_id = auth.uid() OR ar.assigned_auditor_id = auth.uid())
    )
  );

-- Audit Milestones RLS Policies
CREATE POLICY "Audit participants can view milestones" ON public.audit_milestones
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.audit_requests ar
      WHERE ar.id = audit_request_id
      AND (ar.client_id = auth.uid() OR ar.assigned_auditor_id = auth.uid())
    )
  );

CREATE POLICY "Auditors can manage milestones" ON public.audit_milestones
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.audit_requests ar
      WHERE ar.id = audit_request_id
      AND ar.assigned_auditor_id = auth.uid()
    )
  );

-- Create security audit log table
CREATE TABLE IF NOT EXISTS public.security_audit_log (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  event_type TEXT NOT NULL,
  event_description TEXT NOT NULL,
  ip_address INET,
  user_agent TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.security_audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view security logs" ON public.security_audit_log
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() 
      AND role = 'admin' 
      AND is_active = true
    )
  );

-- Create function to log security events
CREATE OR REPLACE FUNCTION log_security_event(
  p_user_id UUID,
  p_event_type TEXT,
  p_event_description TEXT,
  p_metadata JSONB DEFAULT '{}'
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.security_audit_log (
    user_id,
    event_type,
    event_description,
    metadata
  ) VALUES (
    p_user_id,
    p_event_type,
    p_event_description,
    p_metadata
  );
END;
$$;
