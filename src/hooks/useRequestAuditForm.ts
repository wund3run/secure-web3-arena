
import { useState } from 'react';

export const useRequestAuditForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    projectName: '',
    projectDescription: '',
    blockchain: '',
    projectType: '',
    repositoryUrl: '',
    contractCount: '',
    linesOfCode: '',
    deadline: null as Date | null,
    budget: '',
    auditScope: [] as string[],
    previousAudits: '',
    specificConcerns: '',
    contactEmail: '',
    urgency: 'normal'
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleScopeChange = (scope: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      auditScope: checked 
        ? [...prev.auditScope, scope]
        : prev.auditScope.filter(s => s !== scope)
    }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return {
    currentStep,
    formData,
    handleInputChange,
    handleScopeChange,
    nextStep,
    prevStep,
    setCurrentStep
  };
};
