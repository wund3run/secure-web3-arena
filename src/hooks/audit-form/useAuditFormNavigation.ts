
import { AuditFormData, AuditFormErrors } from "@/types/audit-request.types";
import { validateFormStep } from "@/services/audit-form-validation";
import { showFeedback } from "@/components/ui/interactive-feedback";

export const useAuditFormNavigation = (
  formData: AuditFormData,
  formStep: number,
  setFormStep: (step: number) => void,
  setShowAIMatching: (show: boolean) => void,
  setFormErrors: (errors: AuditFormErrors) => void,
  setValidationError: (error: string | null) => void
) => {
  const validateStep = (step: number): boolean => {
    setValidationError(null);
    const validation = validateFormStep(step, formData);
    
    if (!validation.isValid) {
      setFormErrors(validation.errors);
      
      // Show first error as a toast and set validation error
      const firstErrorKey = Object.keys(validation.errors)[0];
      const firstError = firstErrorKey ? validation.errors[firstErrorKey] : '';
      
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
    if (true) { // This will be replaced by showAIMatching in the main hook
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

  return {
    validateStep,
    nextStep,
    prevStep,
    completeAIMatching
  };
};
