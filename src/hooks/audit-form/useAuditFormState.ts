
import { useState } from 'react';
import { AuditFormData, AuditFormErrors } from "@/types/audit-request.types";

export const useAuditFormState = () => {
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
    specificConcerns: "", // Initialize with empty string since it's now required
    previousAuditLinks: ""
  });

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
