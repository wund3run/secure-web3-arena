import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/auth';
import { toast } from 'sonner';
import type { AuditFormData } from '@/types/audit-request.types';

export function useAuditSubmission() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  const submitAuditRequest = async (formData: AuditFormData) => {
    if (!user) {
      toast.error('You must be logged in to submit an audit request');
      throw new Error('User not authenticated');
    }

    setIsSubmitting(true);
    
    try {
      // Convert form data to database format
      const auditRequestData = {
        client_id: user.id,
        project_name: formData.projectName,
        project_description: formData.projectDescription,
        blockchain: formData.blockchain === 'Other' ? formData.customBlockchain : formData.blockchain,
        repository_url: formData.repositoryUrl,
        contract_count: parseInt(formData.contractCount.split('-')[0]) || 1,
        lines_of_code: parseInt(formData.linesOfCode.replace(/[<>]/g, '').split(' ')[0]) || 1000,
        deadline: formData.deadline, // Keep as string for database
        budget: parseBudgetRange(formData.budget),
        audit_scope: formData.auditScope,
        specific_concerns: formData.specificConcerns,
        previous_audits: formData.previousAudits,
        status: 'pending',
        ai_matching_completed: false,
        priority_score: 0.5
      };

      const { data, error } = await supabase
        .from('audit_requests')
        .insert(auditRequestData as any)
        .select()
        .single();

      if (error) {
        console.error('Audit request submission error:', error);
        throw error;
      }

      toast.success('Audit request submitted successfully!');
      return data;
    } catch (error: unknown) {
      console.error('Failed to submit audit request:', error);
      const errorMessage = error instanceof Error ? error.message : 'Please try again later';
      toast.error('Failed to submit audit request', {
        description: errorMessage
      });
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitAuditRequest,
    isSubmitting
  };
}

function parseBudgetRange(budget: string): number {
  // Extract numeric value from budget range strings like "$5,000 - $10,000"
  const match = budget.match(/\$?([0-9,]+)/);
  if (match) {
    return parseInt(match[1].replace(/,/g, ''));
  }
  return 5000; // Default fallback
}
