
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, ChevronRight, AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import ProjectDetailsStep from './steps/ProjectDetailsStep';
import TechnicalInfoStep from './steps/TechnicalInfoStep';
import RequirementsStep from './steps/RequirementsStep';
import ReviewStep from './steps/ReviewStep';
import AIMatchingJourney from './AIMatchingJourney';
import { useAuditForm } from "@/hooks/useAuditForm";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription } from "@/components/ui/alert";
import LoadingState from "@/components/ui/loading-state";

interface PrefilledData {
  serviceType?: string;
  serviceName?: string;
  providerId?: string;
  providerName?: string;
}

interface WizardRequestFormProps {
  onSubmitSuccess: () => void;
  prefilledData?: PrefilledData;
}

export default function WizardRequestForm({ onSubmitSuccess, prefilledData }: WizardRequestFormProps) {
  const {
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
  } = useAuditForm(onSubmitSuccess, prefilledData);
  
  const [animating, setAnimating] = useState(false);
  
  // Calculate progress percentage
  const progressPercentage = ((formStep - 1) / 3) * 100;
  
  // Define wizard steps
  const wizardSteps = [
    { name: 'Project Details', status: formStep >= 1 ? 'complete' : 'upcoming' },
    { name: 'Technical Info', status: formStep >= 2 ? 'complete' : formStep === 1 ? 'current' : 'upcoming' },
    { name: 'Requirements', status: formStep >= 3 ? 'complete' : formStep === 2 ? 'current' : 'upcoming' },
    { name: 'Review', status: formStep === 4 ? 'current' : 'upcoming' },
  ];
  
  const handleStepTransition = (direction: 'next' | 'prev') => {
    setAnimating(true);
    
    // Small delay to allow animation to complete
    setTimeout(() => {
      if (direction === 'next') {
        nextStep();
      } else {
        prevStep();
      }
      setAnimating(false);
    }, 300);
  };
  
  return (
    <Card className="max-w-4xl mx-auto shadow-lg border-primary/10">
      {/* Progress header */}
      <div className="p-6 border-b border-border/60 bg-muted/30">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold tracking-tight">Request an Audit</h2>
          <div className="text-sm text-muted-foreground">
            Step {formStep} of 4
          </div>
        </div>
        
        {/* Progress bar */}
        <Progress value={progressPercentage} className="h-2 mb-6" />
        
        {/* Step indicators */}
        <div className="flex justify-between">
          {wizardSteps.map((step, index) => (
            <div 
              key={step.name} 
              className={cn(
                "flex flex-col items-center",
                (index === wizardSteps.length - 1) ? "mr-0" : "mr-4"
              )}
            >
              <div 
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center mb-1 transition-all duration-300",
                  step.status === 'complete' ? "bg-primary text-primary-foreground" : 
                  step.status === 'current' ? "bg-primary/20 text-primary border-2 border-primary" : 
                  "bg-muted text-muted-foreground"
                )}
              >
                {step.status === 'complete' ? 
                  <Check className="h-4 w-4" /> : 
                  <span>{index + 1}</span>
                }
              </div>
              <span 
                className={cn(
                  "text-xs hidden md:block",
                  step.status === 'complete' ? "text-primary font-medium" : 
                  step.status === 'current' ? "text-foreground font-medium" : 
                  "text-muted-foreground"
                )}
              >
                {step.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Form content */}
      <div className="p-6">
        {validationError && (
          <Alert variant="destructive" className="mb-6 animate-fade-in">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              {validationError}
            </AlertDescription>
          </Alert>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {isSubmitting ? (
            <LoadingState 
              message="Processing your audit request..." 
              fullPage={false} 
              size="lg"
            />
          ) : (
            <div 
              className={cn(
                "transition-opacity duration-300",
                animating ? "opacity-50" : "opacity-100"
              )}
            >
              {/* AI Matching Journey */}
              {showAIMatching ? (
                <AIMatchingJourney 
                  formData={formData} 
                  onProceed={completeAIMatching}
                />
              ) : (
                <>
                  {/* Step 1: Project Details */}
                  {formStep === 1 && (
                    <ProjectDetailsStep
                      formData={formData}
                      handleChange={handleChange}
                      projectType={projectType}
                      setProjectType={setProjectType}
                      handleEcosystemClick={handleEcosystemClick}
                      nextStep={() => handleStepTransition('next')}
                      formErrors={formErrors}
                    />
                  )}

                  {/* Step 2: Technical Information */}
                  {formStep === 2 && (
                    <TechnicalInfoStep
                      formData={formData}
                      handleChange={handleChange}
                      handleSelectChange={handleSelectChange}
                      handleCheckboxChange={handleCheckboxChange}
                      prevStep={() => handleStepTransition('prev')}
                      nextStep={() => handleStepTransition('next')}
                      formErrors={formErrors}
                    />
                  )}

                  {/* Step 3: Requirements & Preferences */}
                  {formStep === 3 && (
                    <RequirementsStep
                      formData={formData}
                      handleChange={handleChange}
                      handleSelectChange={handleSelectChange}
                      prevStep={() => handleStepTransition('prev')}
                      nextStep={() => handleStepTransition('next')}
                      formErrors={formErrors}
                    />
                  )}

                  {/* Step 4: Review & Submit */}
                  {formStep === 4 && (
                    <ReviewStep
                      formData={formData}
                      prevStep={() => handleStepTransition('prev')}
                      isSubmitting={isSubmitting}
                    />
                  )}
                </>
              )}
            </div>
          )}
        </form>
      </div>
      
      {/* Navigation hints - mobile only */}
      <div className="p-4 border-t border-border/60 text-xs text-center text-muted-foreground md:hidden">
        {formStep < 4 ? 
          <div className="flex items-center justify-center">
            <span>Continue</span>
            <ChevronRight className="h-3 w-3 ml-1" />
          </div> :
          <div>Review and submit your request</div>
        }
      </div>
    </Card>
  );
};
