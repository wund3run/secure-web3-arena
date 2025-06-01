
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormProgress from './FormProgress';
import ProjectDetailsStep from './steps/ProjectDetailsStep';
import TechnicalInfoStep from './steps/TechnicalInfoStep';
import RequirementsStep from './steps/RequirementsStep';
import ReviewStep from './steps/ReviewStep';
import AIMatchingJourney from './AIMatchingJourney';
import { AuditRequestService } from '@/services/auditRequestService';
import { toast } from 'sonner';
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
  preferredCommunication: '',
  specificConcerns: '',
  previousAudits: false,
  previousAuditLinks: '',
};

const WizardRequestForm: React.FC = () => {
  const navigate = useNavigate();
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState<AuditFormData>(initialFormData);
  const [projectType, setProjectType] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [showAIMatching, setShowAIMatching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
  };

  const handleSelectChange = (field: keyof AuditFormData, value: string) => {
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
  };

  const handleCheckboxChange = (field: keyof AuditFormData, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked
    }));
  };

  const handleEcosystemClick = (ecosystem: string) => {
    handleSelectChange('blockchain', ecosystem);
  };

  const validateStep = (step: number): boolean => {
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
  };

  const nextStep = () => {
    if (validateStep(formStep)) {
      setFormStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setFormStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
        navigate(`/audit/${auditId}`);
      } else {
        throw new Error('Failed to create audit request');
      }
    } catch (error) {
      console.error('Error submitting audit request:', error);
      toast.error('Failed to submit audit request. Please try again.');
      setShowAIMatching(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleProceedFromAI = () => {
    // In a real implementation, this would navigate to the matching results
    toast.success('AI matching completed! Redirecting to results...');
    navigate('/audits');
  };

  if (showAIMatching) {
    return (
      <div className="container max-w-4xl mx-auto py-8">
        <AIMatchingJourney 
          formData={formData} 
          onProceed={handleProceedFromAI}
        />
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto py-8">
      <FormProgress formStep={formStep} showAIMatching={showAIMatching} />
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {formStep === 1 && (
          <ProjectDetailsStep
            formData={formData}
            handleChange={handleChange}
            projectType={projectType}
            setProjectType={setProjectType}
            handleEcosystemClick={handleEcosystemClick}
            nextStep={nextStep}
            formErrors={formErrors}
          />
        )}

        {formStep === 2 && (
          <TechnicalInfoStep
            formData={formData}
            handleChange={handleChange}
            handleSelectChange={handleSelectChange}
            handleCheckboxChange={handleCheckboxChange}
            prevStep={prevStep}
            nextStep={nextStep}
            formErrors={formErrors}
          />
        )}

        {formStep === 3 && (
          <RequirementsStep
            formData={formData}
            handleChange={handleChange}
            handleSelectChange={handleSelectChange}
            prevStep={prevStep}
            nextStep={nextStep}
            formErrors={formErrors}
          />
        )}

        {formStep === 4 && (
          <ReviewStep
            formData={formData}
            prevStep={prevStep}
            isSubmitting={isSubmitting}
          />
        )}
      </form>
    </div>
  );
};

export default WizardRequestForm;
