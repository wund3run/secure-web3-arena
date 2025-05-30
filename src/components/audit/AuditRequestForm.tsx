
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ProjectDetailsStep } from './steps/ProjectDetailsStep';
import { TechnicalSpecsStep } from './steps/TechnicalSpecsStep';
import { RequirementsStep } from './steps/RequirementsStep';
import { ReviewStep } from './steps/ReviewStep';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSecureForm } from '@/hooks/useSecureForm';
import { toast } from 'sonner';

const steps = [
  { id: 1, title: 'Project Details', description: 'Basic project information' },
  { id: 2, title: 'Technical Specs', description: 'Code and technical details' },
  { id: 3, title: 'Requirements', description: 'Timeline and budget' },
  { id: 4, title: 'Review', description: 'Confirm and submit' }
];

interface AuditFormData {
  projectName: string;
  projectDescription: string;
  blockchain: string;
  projectType: string;
  repositoryUrl: string;
  contractCount: number;
  linesOfCode: number;
  testCoverage: number;
  frameworks: string[];
  deadline: string;
  budget: number;
  urgencyLevel: string;
  specificConcerns: string;
  previousAudits: boolean;
  auditScope: string;
}

export function AuditRequestForm() {
  const [currentStep, setCurrentStep] = useState(1);
  
  const initialValues: AuditFormData = {
    projectName: '',
    projectDescription: '',
    blockchain: '',
    projectType: '',
    repositoryUrl: '',
    contractCount: 1,
    linesOfCode: 0,
    testCoverage: 0,
    frameworks: [],
    deadline: '',
    budget: 0,
    urgencyLevel: 'normal',
    specificConcerns: '',
    previousAudits: false,
    auditScope: ''
  };

  const { values, setValue, handleSubmit, isSubmitting, errors } = useSecureForm(
    initialValues,
    { enableRateLimit: true, rateLimitKey: 'audit-request' }
  );

  const progress = (currentStep / steps.length) * 100;

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data: AuditFormData) => {
    // Here you would integrate with your audit request API
    console.log('Submitting audit request:', data);
    toast.success('Audit request submitted successfully! We\'ll match you with qualified auditors shortly.');
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <ProjectDetailsStep values={values} setValue={setValue} errors={errors} />;
      case 2:
        return <TechnicalSpecsStep values={values} setValue={setValue} errors={errors} />;
      case 3:
        return <RequirementsStep values={values} setValue={setValue} errors={errors} />;
      case 4:
        return <ReviewStep values={values} />;
      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return values.projectName && values.projectDescription && values.blockchain;
      case 2:
        return values.repositoryUrl && values.contractCount > 0;
      case 3:
        return values.deadline && values.budget > 0;
      default:
        return true;
    }
  };

  return (
    <div className="space-y-8">
      {/* Progress Header */}
      <Card>
        <CardHeader>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <CardTitle>Step {currentStep} of {steps.length}</CardTitle>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="w-full" />
            <div className="grid grid-cols-4 gap-4">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className={`text-center p-2 rounded-lg ${
                    step.id === currentStep
                      ? 'bg-primary text-primary-foreground'
                      : step.id < currentStep
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  <div className="font-medium text-sm">{step.title}</div>
                  <div className="text-xs opacity-80">{step.description}</div>
                </div>
              ))}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Form Content */}
      <Card>
        <CardHeader>
          <CardTitle>{steps[currentStep - 1].title}</CardTitle>
        </CardHeader>
        <CardContent>
          {renderCurrentStep()}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 1}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>

        {currentStep < steps.length ? (
          <Button
            onClick={nextStep}
            disabled={!canProceed()}
            className="flex items-center gap-2"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={() => handleSubmit(onSubmit)}
            disabled={isSubmitting || !canProceed()}
            className="flex items-center gap-2"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Request'}
          </Button>
        )}
      </div>
    </div>
  );
}
