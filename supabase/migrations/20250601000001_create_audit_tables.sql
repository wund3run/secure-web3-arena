
-- Create audit_findings table
CREATE TABLE public.audit_findings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  audit_request_id UUID NOT NULL REFERENCES public.audit_requests(id) ON DELETE CASCADE,
  severity TEXT NOT NULL CHECK (severity IN ('critical', 'high', 'medium', 'low', 'info')),
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT,
  code_snippet TEXT,
  recommendation TEXT,
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'acknowledged', 'fixed', 'false_positive')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create audit_deliverables table
CREATE TABLE public.audit_deliverables (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  audit_request_id UUID NOT NULL REFERENCES public.audit_requests(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'delivered')),
  due_date TIMESTAMP WITH TIME ZONE,
  delivered_at TIMESTAMP WITH TIME ZONE,
  file_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create audit_status_updates table
CREATE TABLE public.audit_status_updates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  audit_request_id UUID NOT NULL REFERENCES public.audit_requests(id) ON DELETE CASCADE,
  status_type TEXT NOT NULL CHECK (status_type IN ('progress', 'milestone', 'finding', 'communication', 'deliverable')),
  title TEXT NOT NULL,
  message TEXT,
  metadata JSONB DEFAULT '{}',
  user_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add missing columns to audit_requests table
ALTER TABLE public.audit_requests 
ADD COLUMN IF NOT EXISTS current_phase TEXT DEFAULT 'initial_review',
ADD COLUMN IF NOT EXISTS completion_percentage INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS security_score INTEGER DEFAULT 0;

-- Enable RLS on new tables
ALTER TABLE public.audit_findings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_deliverables ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_status_updates ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for audit_findings
CREATE POLICY "Users can view findings for their audits" ON public.audit_findings
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.audit_requests 
      WHERE id = audit_request_id 
      AND (client_id = auth.uid() OR assigned_auditor_id = auth.uid())
    )
  );

CREATE POLICY "Auditors can create findings" ON public.audit_findings
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.audit_requests 
      WHERE id = audit_request_id 
      AND assigned_auditor_id = auth.uid()
    )
  );

CREATE POLICY "Auditors can update findings" ON public.audit_findings
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.audit_requests 
      WHERE id = audit_request_id 
      AND assigned_auditor_id = auth.uid()
    )
  );

-- Create RLS policies for audit_deliverables
CREATE POLICY "Users can view deliverables for their audits" ON public.audit_deliverables
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.audit_requests 
      WHERE id = audit_request_id 
      AND (client_id = auth.uid() OR assigned_auditor_id = auth.uid())
    )
  );

CREATE POLICY "Auditors can manage deliverables" ON public.audit_deliverables
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.audit_requests 
      WHERE id = audit_request_id 
      AND assigned_auditor_id = auth.uid()
    )
  );

-- Create RLS policies for audit_status_updates
CREATE POLICY "Users can view status updates for their audits" ON public.audit_status_updates
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.audit_requests 
      WHERE id = audit_request_id 
      AND (client_id = auth.uid() OR assigned_auditor_id = auth.uid())
    )
  );

CREATE POLICY "Users can create status updates" ON public.audit_status_updates
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.audit_requests 
      WHERE id = audit_request_id 
      AND (client_id = auth.uid() OR assigned_auditor_id = auth.uid())
    )
  );

-- Add triggers for updated_at columns
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_audit_findings_updated_at 
  BEFORE UPDATE ON public.audit_findings 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_audit_deliverables_updated_at 
  BEFORE UPDATE ON public.audit_deliverables 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
