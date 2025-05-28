
import { useState } from 'react';
import { useAuditSubmission } from './useAuditSubmission';
import { useAuth } from '@/contexts/auth';
import { toast } from 'sonner';
import type { AuditFormData } from '@/types/audit-request.types';

interface PrefilledData {
  serviceType?: string;
  serviceName?: string;
  providerId?: string;
  providerName?: string;
}

export function useAuditForm(onSubmitSuccess: () => void, prefilledData?: PrefilledData) {
  const { user } = useAuth();
  const { submitAuditRequest, isSubmitting } = useAuditSubmission();
  
  const [formStep, setFormStep] = useState(1);
  const [projectType, setProjectType] = useState('');
  const [showAIMatching, setShowAIMatching] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<AuditFormData>({
    projectName: prefilledData?.serviceName ? `${prefilledData.serviceName} Audit Request` : "",
    projectDescription: prefilledData?.providerName ? `Requesting an audit from ${prefilledData.providerName}` : "",
    blockchain: prefilledData?.serviceType || "Ethereum",
    contractCount: "1-5",
    linesOfCode: "< 1,000",
    deadline: "1-2 weeks",
    budget: "$5,000 - $10,000",
    specializedAuditType: "Standard",
    accountabilityPreference: "standard",
    preferredCommunication: "email",
    contactName: "",
    contactEmail: "",
    auditScope: "",
    specificConcerns: "",
    previousAudits: false,
    previousAuditLinks: "",
    customBlockchain: "",
    repositoryUrl: "",
    collaborativeAudit: false,
    continuousAuditing: false,
    hybridModel: false
  });

  const validateStep = (step: number): boolean => {
    const errors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.projectName.trim()) errors.projectName = "Project name is required";
        if (!formData.projectDescription.trim()) errors.projectDescription = "Project description is required";
        if (!formData.blockchain) errors.blockchain = "Blockchain selection is required";
        break;
      case 2:
        if (!formData.contractCount) errors.contractCount = "Contract count is required";
        if (!formData.linesOfCode) errors.linesOfCode = "Lines of code estimate is required";
        break;
      case 3:
        if (!formData.deadline) errors.deadline = "Deadline is required";
        if (!formData.budget) errors.budget = "Budget is required";
        break;
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectChange = (field: keyof AuditFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleCheckboxChange = (field: keyof AuditFormData, checked: boolean) => {
    setFormData(prev => ({ ...prev, [field]: checked }));
  };

  const handleEcosystemClick = (ecosystem: string) => {
    setFormData(prev => ({ ...prev, blockchain: ecosystem }));
    if (formErrors.blockchain) {
      setFormErrors(prev => ({ ...prev, blockchain: '' }));
    }
  };

  const nextStep = () => {
    if (validateStep(formStep)) {
      if (formStep < 4) {
        setFormStep(formStep + 1);
      } else {
        setShowAIMatching(true);
      }
    }
  };

  const prevStep = () => {
    if (formStep > 1) {
      setFormStep(formStep - 1);
    }
  };

  const completeAIMatching = () => {
    setShowAIMatching(false);
    // Process form submission
    handleSubmit();
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!user) {
      toast.error('Please sign in to submit an audit request');
      return;
    }

    setValidationError(null);

    try {
      await submitAuditRequest(formData);
      onSubmitSuccess();
    } catch (error: any) {
      setValidationError(error.message || 'Failed to submit audit request');
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
}
