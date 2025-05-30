
import { useState } from 'react';

interface FormData {
  projectName: string;
  projectDescription: string;
  blockchain: string;
  customBlockchain: string;
  projectType: string;
  repositoryUrl: string;
  contractCount: string;
  linesOfCode: string;
  auditScope: string[];
  previousAudits: string;
  previousAuditLinks: string;
  specificConcerns: string;
  budget: string;
  deadline: string;
  urgency: string;
  contactEmail: string;
  contactName: string;
}

export const useRequestAuditForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<FormData>({
    projectName: '',
    projectDescription: '',
    blockchain: 'ethereum',
    customBlockchain: '',
    projectType: '',
    repositoryUrl: '',
    contractCount: '1-5',
    linesOfCode: '< 1,000',
    auditScope: [],
    previousAudits: 'none',
    previousAuditLinks: '',
    specificConcerns: '',
    budget: '$5,000 - $10,000',
    deadline: '2-4 weeks',
    urgency: 'normal',
    contactEmail: '',
    contactName: ''
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleScopeChange = (scope: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      auditScope: checked 
        ? [...prev.auditScope, scope]
        : prev.auditScope.filter(s => s !== scope)
    }));
    if (errors.auditScope) {
      setErrors(prev => ({ ...prev, auditScope: '' }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.projectName.trim()) {
          newErrors.projectName = 'Project name is required';
        }
        if (!formData.projectDescription.trim() || formData.projectDescription.length < 50) {
          newErrors.projectDescription = 'Project description is required (minimum 50 characters)';
        }
        if (!formData.blockchain) {
          newErrors.blockchain = 'Blockchain selection is required';
        }
        if (formData.blockchain === 'other' && !formData.customBlockchain.trim()) {
          newErrors.customBlockchain = 'Custom blockchain name is required';
        }
        if (!formData.projectType) {
          newErrors.projectType = 'Project type is required';
        }
        if (formData.repositoryUrl && !isValidUrl(formData.repositoryUrl)) {
          newErrors.repositoryUrl = 'Please enter a valid URL';
        }
        break;

      case 2:
        if (!formData.contractCount) {
          newErrors.contractCount = 'Contract count is required';
        }
        if (!formData.linesOfCode) {
          newErrors.linesOfCode = 'Lines of code estimate is required';
        }
        if (formData.auditScope.length === 0) {
          newErrors.auditScope = 'Please select at least one audit scope';
        }
        if (!formData.previousAudits) {
          newErrors.previousAudits = 'Previous audit information is required';
        }
        break;

      case 3:
        if (!formData.budget) {
          newErrors.budget = 'Budget range is required';
        }
        if (!formData.deadline) {
          newErrors.deadline = 'Timeline is required';
        }
        if (!formData.urgency) {
          newErrors.urgency = 'Urgency level is required';
        }
        if (!formData.contactEmail.trim()) {
          newErrors.contactEmail = 'Contact email is required';
        } else if (!isValidEmail(formData.contactEmail)) {
          newErrors.contactEmail = 'Please enter a valid email address';
        }
        if (!formData.contactName.trim()) {
          newErrors.contactName = 'Contact name is required';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  return {
    currentStep,
    formData,
    errors,
    handleInputChange,
    handleScopeChange,
    nextStep,
    prevStep,
    validateStep
  };
};

// Helper functions
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
