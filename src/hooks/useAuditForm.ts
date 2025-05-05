
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { AuditFormData, AuditFormErrors } from "@/types/audit-request.types";
import { validateFormStep } from "@/services/audit-form-validation";
import { handleApiError } from "@/utils/apiErrorHandler";
import { showFeedback } from "@/components/ui/interactive-feedback";

export const useAuditForm = (onSubmitSuccess: () => void) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formStep, setFormStep] = useState(1);
  const [projectType, setProjectType] = useState("");
  const [showAIMatching, setShowAIMatching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<AuditFormErrors>({});
  const [validationError, setValidationError] = useState<string | null>(null);
  const [submissionAttempted, setSubmissionAttempted] = useState(false);
  
  const [formData, setFormData] = useState<AuditFormData>({
    projectName: "",
    projectDescription: "",
    contactEmail: "",
    contactName: "",
    blockchain: "Ethereum",
    customBlockchain: "",
    repositoryUrl: "",
    contractCount: "",
    linesOfCode: "",
    deadline: "",
    budget: "",
    auditScope: "",
    previousAudits: false, // Initialize with a default value since it's required
    specificConcerns: ""
  });

  useEffect(() => {
    // Check if user is authenticated
    if (!user) {
      toast.error("Authentication required", {
        description: "You need to sign in to request an audit.",
      });
      navigate('/auth');
    } else {
      // Pre-fill user information if available
      supabase
        .from('extended_profiles')
        .select('full_name')
        .eq('id', user.id)
        .single()
        .then(({ data, error }) => {
          if (!error && data && data.full_name) {
            setFormData(prev => ({
              ...prev,
              contactName: data.full_name || '',
              contactEmail: user.email || ''
            }));
          }
        });
    }
  }, [user, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
    
    // Clear error for this field when user changes selection
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData({ ...formData, [name]: checked });
  };

  const handleEcosystemClick = (ecosystem: string) => {
    setFormData({ ...formData, blockchain: ecosystem });
    if (ecosystem !== "Other") {
      toast.success(`Selected ${ecosystem} as your blockchain ecosystem`);
    }
  };

  const validateStep = (step: number): boolean => {
    setValidationError(null);
    const validation = validateFormStep(step, formData);
    
    if (!validation.isValid) {
      setFormErrors(validation.errors);
      
      // Show first error as a toast and set validation error
      const firstError = Object.values(validation.errors)[0];
      if (firstError) {
        setValidationError("Please correct the highlighted fields");
        
        // Visual feedback for validation error
        showFeedback('error', { 
          message: "Form validation failed", 
          description: firstError,
          duration: 5000
        });
      }
      
      return false;
    }
    
    setFormErrors({});
    return true;
  };

  const nextStep = () => {
    if (validateStep(formStep)) {
      window.scrollTo(0, 0);
      
      showFeedback('success', {
        message: "Step completed successfully",
        duration: 2000
      });
      
      // After requirements step, show AI matching
      if (formStep === 3) {
        setShowAIMatching(true);
      } else {
        setFormStep(formStep + 1);
      }
    }
  };

  const prevStep = () => {
    window.scrollTo(0, 0);
    setValidationError(null);
    
    // If coming back from AI matching, return to step 3
    if (showAIMatching) {
      setShowAIMatching(false);
    } else {
      setFormStep(formStep - 1);
    }
  };

  const completeAIMatching = () => {
    setShowAIMatching(false);
    setFormStep(4); // Go to review step after AI matching
    window.scrollTo(0, 0);
    
    showFeedback('success', {
      message: "AI matching complete",
      description: "Review your information before submitting",
      duration: 3000
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionAttempted(true);
    
    // Validate the form one last time
    if (!validateStep(formStep)) {
      return;
    }
    
    if (!user) {
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
      
      console.log("Submitting data:", auditRequestData);
      
      const { error } = await supabase
        .from('audit_requests')
        .insert(auditRequestData);
      
      if (error) {
        throw error;
      }
      
      // Clear loading feedback and show success
      dismissLoading();
      showFeedback('success', {
        message: "Audit request submitted successfully!",
        description: "Our AI will match you with the perfect auditors for your project.",
        duration: 5000
      });
      
      // Give the user time to see the success message before redirecting
      setTimeout(() => {
        onSubmitSuccess();
      }, 1000);
      
    } catch (error) {
      // Clear loading feedback and show error
      dismissLoading();
      handleApiError(error, "Error submitting audit request");
      
      showFeedback('error', {
        message: "Submission failed",
        description: "Please try again or contact support if the issue persists.",
        duration: 5000
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    formStep,
    projectType,
    showAIMatching,
    isSubmitting,
    formErrors,
    validationError,
    submissionAttempted,
    setProjectType,
    handleChange,
    handleSelectChange,
    handleCheckboxChange,
    handleEcosystemClick,
    handleSubmit,
    nextStep,
    prevStep,
    completeAIMatching
  };
};
