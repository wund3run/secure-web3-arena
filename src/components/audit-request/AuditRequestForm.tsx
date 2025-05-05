
import React from 'react';
import { useAuditForm } from "@/hooks/useAuditForm";
import ProjectDetailsStep from './steps/ProjectDetailsStep';
import TechnicalInfoStep from './steps/TechnicalInfoStep';
import RequirementsStep from './steps/RequirementsStep';
import ReviewStep from './steps/ReviewStep';
import FormProgress from './FormProgress';
import AIMatchingJourney from './AIMatchingJourney';
import ErrorBoundary from "@/components/ui/error-boundary";
import LoadingState from "@/components/ui/loading-state";
import { showFeedback } from "@/components/ui/interactive-feedback";
import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface AuditRequestFormProps {
  onSubmitSuccess: () => void;
}

const AuditRequestForm = ({ onSubmitSuccess }: AuditRequestFormProps) => {
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
  } = useAuditForm(onSubmitSuccess);

  return (
    <ErrorBoundary>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress indicator */}
        <FormProgress formStep={formStep} showAIMatching={showAIMatching} />

        {/* Form */}
        <div className="bg-card border border-border/40 rounded-xl p-6 md:p-8 shadow-sm">
          {validationError && (
            <Alert variant="destructive" className="mb-6 animate-fade-in">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                {validationError}
              </AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleSubmit}>
            {isSubmitting ? (
              <LoadingState 
                message="Processing your audit request..." 
                fullPage={false} 
                size="lg"
              />
            ) : (
              <>
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
                        nextStep={nextStep}
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
                        prevStep={prevStep}
                        nextStep={nextStep}
                        formErrors={formErrors}
                      />
                    )}

                    {/* Step 3: Requirements & Preferences */}
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

                    {/* Step 4: Review & Submit */}
                    {formStep === 4 && (
                      <ReviewStep
                        formData={formData}
                        prevStep={prevStep}
                        isSubmitting={isSubmitting}
                      />
                    )}
                  </>
                )}
              </>
            )}
          </form>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default AuditRequestForm;
