import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormProgress } from './FormProgress';
import { ProjectDetailsStep } from './steps/ProjectDetailsStep';
import { TechnicalInfoStep } from './steps/TechnicalInfoStep';
import { RequirementsStep } from './steps/RequirementsStep';
import { ReviewStep } from './steps/ReviewStep';
import AIMatchingJourney from './AIMatchingJourney';
import { AuditRequestService } from '@/services/auditRequestService';
import { toast } from 'sonner';
import type { AuditFormData } from '@/types/audit-request.types';
import RequestSuccessMessage from './RequestSuccessMessage';
import { useAuth } from '@/contexts/auth';

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
  accountabilityPreference: '',
  contactName: '',
  contactEmail: '',
};

const WizardRequestForm: React.FC = () => {
  const navigate = useNavigate();
  const [formStep, setFormStep] = useState(0);
  const [formData, setFormData] = useState<AuditFormData>(initialFormData);
  const [projectType, setProjectType] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [showAIMatching, setShowAIMatching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { user, userProfile } = useAuth();
  const userName = userProfile?.full_name || userProfile?.display_name || user?.email?.split('@')[0] || '';
  const isFirstProject = !localStorage.getItem('hasSubmittedAuditRequest');

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
        setShowSuccess(true);
        localStorage.setItem('hasSubmittedAuditRequest', 'true');
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

  // Save draft to localStorage
  const saveDraft = () => {
    localStorage.setItem('auditRequestDraft', JSON.stringify({ formData, formStep }));
    toast.success('Draft saved!');
  };

  // Resume draft if available
  useEffect(() => {
    const saved = localStorage.getItem('auditRequestDraft');
    if (saved) {
      const { formData: savedData, formStep: savedStep } = JSON.parse(saved);
      if (savedData && typeof savedStep === 'number') {
        setFormData(savedData);
        setFormStep(savedStep);
        toast.info('Resumed from saved draft.');
      }
    }
  }, []);

  if (showSuccess) {
    return <RequestSuccessMessage />;
  }

  // Intro step (step 0)
  if (formStep === 0) {
    return (
      <div className="w-full max-w-full sm:max-w-2xl mx-auto px-2 sm:px-4 lg:px-8 py-8 flex flex-col items-center justify-center" role="main">
        <div className="bg-card border border-border/40 rounded-xl p-4 sm:p-8 shadow-md w-full text-center animate-fade-in">
          <h2 className="text-3xl font-bold mb-4">Welcome{userName ? `, ${userName}` : ''}!</h2>
          {isFirstProject && (
            <p className="mb-4 text-primary font-medium">
              It looks like this is your first audit request. Here's what to expect…
            </p>
          )}
          <p className="mb-6 text-lg text-muted-foreground">
            Let's get your project secured. This process takes just a few steps:
            <br />
            <span className="font-medium">Project Details → Technical Info → Requirements → Review & Submit → Confirmation</span>
          </p>
          <p className="mb-8 text-base text-muted-foreground">
            Please have your project information and repository link ready. You can save your progress at any time.
          </p>
          <button
            className="btn btn-primary px-8 py-3 rounded-lg text-lg font-semibold w-full sm:w-auto"
            onClick={() => setFormStep(1)}
            autoFocus
            aria-label="Start the audit request process"
          >
            Get Started
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-full sm:max-w-4xl mx-auto px-2 sm:px-4 lg:px-8 py-8">
      <FormProgress formStep={formStep === 0 ? 1 : formStep} showAIMatching={showAIMatching} />
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Show Save Draft button on steps 1-4 */}
        {formStep > 0 && formStep <= 4 && (
          <div className="flex flex-col sm:flex-row justify-end mb-2 gap-2">
            <button
              type="button"
              className="btn btn-secondary px-4 py-2 rounded-md text-sm font-medium w-full sm:w-auto"
              onClick={saveDraft}
              aria-label="Save your progress as a draft"
            >
              Save Draft
            </button>
          </div>
        )}
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
