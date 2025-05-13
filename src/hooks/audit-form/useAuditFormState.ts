
import { useState, useEffect } from 'react';
import { AuditFormData, AuditFormErrors } from "@/types/audit-request.types";

// Define a type for the prefilledData parameter
interface PrefilledData {
  serviceType?: string;
  serviceName?: string;
  providerId?: string;
  providerName?: string;
}

export const useAuditFormState = (prefilledData?: PrefilledData) => {
  const [formStep, setFormStep] = useState(1);
  const [projectType, setProjectType] = useState("");
  const [showAIMatching, setShowAIMatching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<AuditFormErrors>({});
  const [validationError, setValidationError] = useState<string | null>(null);
  const [submissionAttempted, setSubmissionAttempted] = useState(false);
  
  // Initialize form data with default values
  const [formData, setFormData] = useState<AuditFormData>({
    projectName: "",
    projectDescription: "",
    contactEmail: "",
    contactName: "",
    blockchain: "Ethereum", // Default to a valid value
    customBlockchain: "",
    repositoryUrl: "",
    contractCount: "1-5", // Set a default value
    linesOfCode: "< 1,000", // Set a default value
    deadline: "1-2 weeks", // Set a default value
    budget: "$5,000 - $10,000", // Set a default value
    auditScope: "",
    previousAudits: false,
    specificConcerns: "",
    previousAuditLinks: "",
    // New enhanced audit model options
    collaborativeAudit: false,
    continuousAuditing: false,
    hybridModel: false,
    specializedAuditType: "Standard", // Default to a valid value
    accountabilityPreference: "standard", // Default to standard accountability
  });

  // Update form data with prefilled values if provided
  useEffect(() => {
    if (prefilledData) {
      setFormData(prevData => ({
        ...prevData,
        // If the service has a specific blockchain focus, set it as the blockchain
        ...(prefilledData.serviceType && { blockchain: prefilledData.serviceType }),
        // Use service name as the project name prefix if available
        ...(prefilledData.serviceName && { 
          projectName: `${prefilledData.serviceName} Audit Request` 
        }),
        // Use service provider name in project description if available
        ...(prefilledData.providerName && { 
          projectDescription: `Requesting an audit from ${prefilledData.providerName}` 
        })
      }));
    }
  }, [prefilledData]);

  return {
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
  };
};
