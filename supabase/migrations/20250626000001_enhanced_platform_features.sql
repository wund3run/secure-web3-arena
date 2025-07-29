
-- Create audit_proposals table
CREATE TABLE public.audit_proposals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  audit_request_id UUID NOT NULL REFERENCES public.audit_requests(id) ON DELETE CASCADE,
  auditor_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  estimated_hours INTEGER NOT NULL,
  hourly_rate DECIMAL(10,2) NOT NULL,
  total_cost DECIMAL(10,2) GENERATED ALWAYS AS (estimated_hours * hourly_rate) STORED,
  timeline TEXT NOT NULL,
  deliverables TEXT[] NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'withdrawn')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(audit_request_id, auditor_id)
);

-- Create project_messages table for chat functionality
CREATE TABLE public.project_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.audit_requests(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  message_type TEXT NOT NULL DEFAULT 'text' CHECK (message_type IN ('text', 'file', 'system')),
  file_url TEXT,
  file_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create notifications table
CREATE TABLE public.notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('audit_assigned', 'proposal_received', 'payment_released', 'audit_completed', 'message_received')),
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  read BOOLEAN NOT NULL DEFAULT false,
  action_url TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create ratings table for trust system
CREATE TABLE public.ratings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  audit_request_id UUID NOT NULL REFERENCES public.audit_requests(id) ON DELETE CASCADE,
  rater_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  rated_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review TEXT,
  categories JSONB DEFAULT '{}', -- e.g., {"communication": 5, "technical_skill": 4, "timeliness": 5}
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(audit_request_id, rater_id, rated_id)
);

-- Enable RLS on all new tables
ALTER TABLE public.audit_proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ratings ENABLE ROW LEVEL SECURITY;

-- RLS policies for audit_proposals
CREATE POLICY "Users can view proposals for their projects" ON public.audit_proposals
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.audit_requests 
      WHERE id = audit_request_id 
      AND (client_id = auth.uid() OR assigned_auditor_id = auth.uid())
    ) OR auditor_id = auth.uid()
  );

CREATE POLICY "Auditors can create proposals" ON public.audit_proposals
  FOR INSERT WITH CHECK (auditor_id = auth.uid());

CREATE POLICY "Auditors can update their proposals" ON public.audit_proposals
  FOR UPDATE USING (auditor_id = auth.uid());

-- RLS policies for project_messages
CREATE POLICY "Users can view messages for their projects" ON public.project_messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.audit_requests 
      WHERE id = project_id 
      AND (client_id = auth.uid() OR assigned_auditor_id = auth.uid())
    )
  );

CREATE POLICY "Users can send messages for their projects" ON public.project_messages
  FOR INSERT WITH CHECK (
    sender_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM public.audit_requests 
      WHERE id = project_id 
      AND (client_id = auth.uid() OR assigned_auditor_id = auth.uid())
    )
  );

-- RLS policies for notifications
CREATE POLICY "Users can view their notifications" ON public.notifications
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update their notifications" ON public.notifications
  FOR UPDATE USING (user_id = auth.uid());

-- RLS policies for ratings
CREATE POLICY "Users can view ratings for their audits" ON public.ratings
  FOR SELECT USING (
    rater_id = auth.uid() OR rated_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM public.audit_requests 
      WHERE id = audit_request_id 
      AND (client_id = auth.uid() OR assigned_auditor_id = auth.uid())
    )
  );

CREATE POLICY "Users can create ratings" ON public.ratings
  FOR INSERT WITH CHECK (
    rater_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM public.audit_requests 
      WHERE id = audit_request_id 
      AND (client_id = auth.uid() OR assigned_auditor_id = auth.uid())
      AND status = 'completed'
    )
  );

-- Create storage bucket for project files
INSERT INTO storage.buckets (id, name, public) VALUES ('project-files', 'project-files', true);

-- Storage policies for project files
CREATE POLICY "Users can upload files for their projects" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'project-files' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view files for their projects" ON storage.objects
  FOR SELECT USING (bucket_id = 'project-files');

-- Add triggers for updated_at columns
CREATE TRIGGER update_audit_proposals_updated_at 
  BEFORE UPDATE ON public.audit_proposals 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Add indexes for performance
CREATE INDEX idx_audit_proposals_audit_request_id ON public.audit_proposals(audit_request_id);
CREATE INDEX idx_audit_proposals_auditor_id ON public.audit_proposals(auditor_id);
CREATE INDEX idx_audit_proposals_status ON public.audit_proposals(status);
CREATE INDEX idx_project_messages_project_id ON public.project_messages(project_id);
CREATE INDEX idx_project_messages_created_at ON public.project_messages(created_at);
CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX idx_notifications_read ON public.notifications(read);
CREATE INDEX idx_ratings_rated_id ON public.ratings(rated_id);
