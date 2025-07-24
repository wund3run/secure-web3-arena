import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { AuditFormData } from "@/types/audit-request.types";
import { handleApiError } from "@/utils/apiErrorHandler";
import { showFeedback } from "@/components/ui/interactive-feedback";

export const useAuditFormSubmission = (
  user: { id: string } | null,
  formData: AuditFormData,
  validateStep: (step: number) => boolean,
  formStep: number,
  setIsSubmitting: (isSubmitting: boolean) => void,
  setSubmissionAttempted: (attempted: boolean) => void,
  onSubmitSuccess: () => void
) => {
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionAttempted(true);
    
    // Validate the form one last time
    if (!validateStep(formStep)) {
      return;
    }
    
    if (!user || !user.id) {
      toast.error("Authentication required", {
        description: "You need to sign in to submit an audit request.",
      });
      navigate('/auth');
      return;
    }
    
    // Visual feedback for submission started
    const dismissLoading = showFeedback('loading', {
      message: "Submitting your audit request...",
      description: "This might take a few moments",
      duration: 0 // No auto-dismiss
    });
    
    try {
      setIsSubmitting(true);
      
      // If "Other" is selected, use the custom blockchain name instead
      const blockchain = formData.blockchain === "Other" && formData.customBlockchain 
        ? formData.customBlockchain 
        : formData.blockchain;
      
      // Parse string values to the appropriate types for database
      const contractCount = parseInt(formData.contractCount.split('-')[0]) || 0;
      const linesOfCode = parseInt(formData.linesOfCode.split('-')[0]) || 0;
      
      // Convert budget string to number, handle parsing for different formats
      let budgetValue: number | null = null;
      if (formData.budget) {
        if (formData.budget === "flexible") {
          budgetValue = 0; // Represent flexible budget with 0
        } else {
          // Extract numeric part of the budget range and convert to number
          const numericMatch = formData.budget.match(/\d+/);
          if (numericMatch) {
            budgetValue = parseInt(numericMatch[0], 10);
          }
        }
      }
      
      // Prepare data for database
      const auditRequestData = {
        client_id: user.id,
        project_name: formData.projectName,
        project_description: formData.projectDescription,
        blockchain,
        repository_url: formData.repositoryUrl,
        contract_count: contractCount,
        lines_of_code: linesOfCode,
        deadline: formData.deadline || null,
        budget: budgetValue,
        audit_scope: formData.auditScope,
        previous_audits: formData.previousAudits,
        specific_concerns: formData.specificConcerns,
        status: 'pending',
        created_at: new Date().toISOString()
      };
      
      console.log("Submitting data with real-time sync:", auditRequestData);
      
      const { data, error } = await supabase
        .from('audit_requests')
        .insert(auditRequestData)
        .select()
        .single();
      
      if (error) {
        throw error;
      }

      // The real-time system will automatically notify the admin dashboard
      console.log("Audit request submitted successfully, real-time notification sent:", data);
      
      // Clear loading feedback and show success
      dismissLoading();
      showFeedback('success', {
        message: "Audit request submitted successfully!",
        description: "Admins have been notified instantly via our real-time system.",
        duration: 5000
      });
      
      // Give the user time to see the success message before redirecting
      setTimeout(() => {
        onSubmitSuccess();
      }, 1000);
      
    } catch (error: unknown) {
      // Clear loading feedback and show error
      dismissLoading();
      handleApiError(error, { customMessage: "Error submitting audit request" });
      
      showFeedback('error', {
        message: "Submission failed",
        description: "Please try again or contact support if the issue persists.",
        duration: 5000
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return { handleSubmit };
};
