
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { AuditRequestService } from '@/services/auditRequestService';
import type { AuditFormData } from '@/types/audit-request.types';

const initialFormData: AuditFormData = {
  projectName: '',
  projectDescription: '',
  blockchain: '',
  customBlockchain: '',
  repositoryUrl: '',
  contractCount: '',
  linesOfCode: '',
  auditScope: '',
  specializedAuditType: '',
  collaborativeAudit: false,
  continuousAuditing: false,
  hybridModel: false,
  deadline: '',
  budget: '',
  customBudget: '',
  preferredCommunication: '',
  specificConcerns: '',
  previousAudits: false,
  previousAuditLinks: '',
  accountabilityPreference: '',
  contactName: '',
  contactEmail: '',
};

interface PrefilledData {
  serviceType?: string;
  serviceName?: string;
  providerId?: string;
  providerName?: string;
}

export const useAuditForm = (onSubmitSuccess: () => void, prefilledData?: PrefilledData) => {
  const navigate = useNavigate();
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState<AuditFormData>({
    ...initialFormData,
    projectName: prefilledData?.serviceName || '',
    auditScope: prefilledData?.serviceType || '',
  });
  const [projectType, setProjectType] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [showAIMatching, setShowAIMatching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string>('');

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: name === 'previousAudits' ? checked : value
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  }, [formErrors]);

  const handleSelectChange = useCallback((field: keyof AuditFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user makes selection
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  }, [formErrors]);

  const handleCheckboxChange = useCallback((field: keyof AuditFormData, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked
    }));
  }, []);

  const handleEcosystemClick = useCallback((ecosystem: string) => {
    handleSelectChange('blockchain', ecosystem);
  }, [handleSelectChange]);

  const validateStep = useCallback((step: number): boolean => {
    const errors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.projectName.trim()) {
          errors.projectName = 'Project name is required';
        }
        if (!formData.projectDescription.trim()) {
          errors.projectDescription = 'Project description is required';
        }
        if (!formData.blockchain) {
          errors.blockchain = 'Please select a blockchain';
        }
        break;
      case 2:
        if (!formData.contractCount) {
          errors.contractCount = 'Please select the number of contracts';
        }
        if (!formData.linesOfCode) {
          errors.linesOfCode = 'Please select the lines of code range';
        }
        break;
      case 3:
        if (!formData.deadline) {
          errors.deadline = 'Please select a deadline';
        }
        if (!formData.budget) {
          errors.budget = 'Please select a budget range';
        }
        break;
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData]);

  const nextStep = useCallback(() => {
    if (validateStep(formStep)) {
      setFormStep(prev => prev + 1);
    }
  }, [formStep, validateStep]);

  const prevStep = useCallback(() => {
    setFormStep(prev => prev - 1);
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(formStep)) {
      return;
    }

    setIsSubmitting(true);
    setShowAIMatching(true);
    
    try {
      // Simulate AI matching process
      await new Promise(resolve => setTimeout(resolve, 8000));
      
      // Create the audit request
      const auditId = await AuditRequestService.createAuditRequest(formData);
      
      if (auditId) {
        toast.success('Audit request submitted successfully!');
        onSubmitSuccess();
      } else {
        throw new Error('Failed to create audit request');
      }
    } catch (error: unknown) {
      console.error('Error submitting audit request:', error);
      toast.error('Failed to submit audit request. Please try again.');
      setShowAIMatching(false);
    } finally {
      setIsSubmitting(false);
    }
  }, [formStep, validateStep, formData, onSubmitSuccess]);

  const completeAIMatching = useCallback(() => {
    toast.success('AI matching completed! Redirecting to results...');
    navigate('/dashboard');
  }, [navigate]);

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
    completeAIMatching,
  };
};
