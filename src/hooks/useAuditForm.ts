
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { AuditFormData } from "@/types/audit-request.types";
import { validateFormStep } from "@/services/audit-form-validation";
import { handleApiError } from "@/utils/apiErrorHandler";

export const useAuditForm = (onSubmitSuccess: () => void) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formStep, setFormStep] = useState(1);
  const [projectType, setProjectType] = useState("");
  const [showAIMatching, setShowAIMatching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  
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
    previousAudits: false,
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
    const validation = validateFormStep(step, formData);
    
    if (!validation.isValid) {
      setFormErrors(validation.errors);
      
      // Show first error as a toast
      const firstError = Object.values(validation.errors)[0];
      if (firstError) {
        toast.error("Validation error", {
          description: firstError
        });
      }
      
      return false;
    }
    
    return true;
  };

  const nextStep = () => {
    if (validateStep(formStep)) {
      window.scrollTo(0, 0);
      
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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Authentication required", {
        description: "You need to sign in to submit an audit request.",
      });
      navigate('/auth');
      return;
    }
    
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
        status: 'pending'
      };
      
      console.log("Submitting data:", auditRequestData);
      
      const { error } = await supabase
        .from('audit_requests')
        .insert(auditRequestData);
      
      if (error) {
        throw error;
      }
      
      toast.success("Audit request submitted successfully!", {
        description: "Our AI will match you with the perfect auditors for your project.",
      });
      
      onSubmitSuccess();
    } catch (error) {
      handleApiError(error, "Error submitting audit request");
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
