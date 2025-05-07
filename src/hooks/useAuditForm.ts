
import { useAuditFormState } from './audit-form/useAuditFormState';
import { useAuditFormHandlers } from './audit-form/useAuditFormHandlers';
import { useAuditFormNavigation } from './audit-form/useAuditFormNavigation';
import { useAuditFormAuth } from './audit-form/useAuditFormAuth';
import { useAuditFormSubmission } from './audit-form/useAuditFormSubmission';

// Define a type for the prefilledData parameter
interface PrefilledData {
  serviceType?: string;
  serviceName?: string;
  providerId?: string;
  providerName?: string;
}

export const useAuditForm = (onSubmitSuccess: () => void, prefilledData?: PrefilledData) => {
  const {
    formData,
    formStep,
    projectType,
    showAIMatching,
    isSubmitting,
    formErrors,
    validationError,
    submissionAttempted,
    setFormData,
    setFormStep,
    setProjectType,
    setShowAIMatching,
    setIsSubmitting,
    setFormErrors,
    setValidationError,
    setSubmissionAttempted
  } = useAuditFormState(prefilledData);

  const { user, navigate } = useAuditFormAuth(setFormData, prefilledData);

  const {
    handleChange,
    handleSelectChange,
    handleCheckboxChange,
    handleEcosystemClick
  } = useAuditFormHandlers(formData, setFormData, formErrors, setFormErrors);

  const {
    validateStep,
    nextStep: baseNextStep,
    prevStep: basePrevStep,
    completeAIMatching: baseCompleteAIMatching
  } = useAuditFormNavigation(
    formData,
    formStep,
    setFormStep,
    setShowAIMatching,
    setFormErrors,
    setValidationError
  );

  // Create the actual navigation methods with the correct context
  const nextStep = () => baseNextStep();
  
  const prevStep = () => {
    if (showAIMatching) {
      setShowAIMatching(false);
    } else {
      basePrevStep();
    }
  };
  
  const completeAIMatching = () => baseCompleteAIMatching();

  const { handleSubmit } = useAuditFormSubmission(
    user,
    formData,
    validateStep,
    formStep,
    setIsSubmitting,
    setSubmissionAttempted,
    onSubmitSuccess
  );

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
