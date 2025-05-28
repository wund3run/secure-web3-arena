
import React from 'react';
import { useAuditForm } from "@/hooks/useAuditForm";
import ProjectDetailsStep from './steps/ProjectDetailsStep';
import TechnicalInfoStep from './steps/TechnicalInfoStep';
import RequirementsStep from './steps/RequirementsStep';
import ReviewStep from './steps/ReviewStep';
import FormProgress from './FormProgress';
import AIMatchingJourney from './AIMatchingJourney';
import { ErrorBoundary } from "@/utils/error-handling";
import LoadingState from "@/components/ui/loading-state";
import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from '@/contexts/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { UserPlus } from 'lucide-react';

interface PrefilledData {
  serviceType?: string;
  serviceName?: string;
  providerId?: string;
  providerName?: string;
}

interface AuditRequestFormProps {
  onSubmitSuccess: () => void;
  prefilledData?: PrefilledData;
}

const AuditRequestForm = ({ onSubmitSuccess, prefilledData }: AuditRequestFormProps) => {
  const { user, loading: authLoading } = useAuth();
  
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

  // Show auth loading state
  if (authLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <LoadingState message="Loading..." />
      </div>
    );
  }

  // Show login required message if not authenticated
  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card>
          <CardContent className="p-8 text-center">
            <UserPlus className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-4">Authentication Required</h3>
            <p className="text-gray-600 mb-6">
              You need to be signed in to submit an audit request. Please create an account or sign in to continue.
            </p>
            <Button asChild>
              <a href="/auth">Sign In / Sign Up</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

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
                message="Submitting your audit request..." 
                fullPage={false} 
                size="lg"
                showTrivia={true}
              />
            ) : (
              <ErrorBoundary>
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
              </ErrorBoundary>
            )}
          </form>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default AuditRequestForm;
