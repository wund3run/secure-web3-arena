import React, { useState } from 'react';
import { useAuditForm } from "@/hooks/useAuditForm";
import { ProjectDetailsStep } from './steps/ProjectDetailsStep';
import { TechnicalInfoStep } from './steps/TechnicalInfoStep';
import { RequirementsStep } from './steps/RequirementsStep';
import { ReviewStep } from './steps/ReviewStep';
import { FormProgress } from './FormProgress';
import AIMatchingJourney from './AIMatchingJourney';
import ErrorBoundary from "@/components/ui/error-boundary";
import LoadingState from "@/components/ui/loading-state";
import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAuth } from '@/contexts/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserPlus } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { toast } from 'sonner';

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

  interface AISuggestions {
    recommendedAuditors: Array<{ id: string; [key: string]: any }>;
    estimatedDuration: string | null;
    suggestedBudget: number | null;
    securityPriorities: string[];
    riskAssessment: {
      level: 'default' | 'destructive';
      title: string;
      description: string;
    } | null;
  }

  const [aiSuggestions, setAiSuggestions] = useState<AISuggestions>({
    recommendedAuditors: [],
    estimatedDuration: null,
    suggestedBudget: null,
    securityPriorities: [],
    riskAssessment: null
  });

  const generateAISuggestions = async (projectData: typeof formData) => {
    try {
      // Simulate AI analysis (replace with actual AI service call)
      // Placeholder for actual AI analysis
      const suggestions = {
        recommendedAuditors: [],
        estimatedDuration: '2-3 weeks',
        suggestedBudget: 5000,
        securityPriorities: ['Smart Contract Security', 'Access Control'],
        riskAssessment: {
          level: 'default' as const,
          title: 'Medium Risk Assessment',
          description: 'This project has moderate security risks that should be addressed.'
        }
      };
      setAiSuggestions(suggestions);
      
      // Update form with AI recommendations
      // Note: Form updates would be handled by the actual form hooks
      console.log('AI suggestions generated:', suggestions);
    } catch (error) {
      console.error('AI analysis failed:', error);
      toast.error('Failed to generate AI suggestions. Using default values.');
    }
  };

  // Add AI suggestions panel
  const renderAISuggestionsPanel = () => (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>AI-Powered Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {aiSuggestions.recommendedAuditors.length > 0 && (
            <div>
              <h4 className="font-medium mb-2">Recommended Auditors</h4>
              <div className="grid grid-cols-2 gap-4">
                {aiSuggestions.recommendedAuditors.map(auditor => (
                  <div key={auditor.id} className="p-4 border rounded-lg">
                    <p className="font-medium">Recommended Auditor #{auditor.id}</p>
                    <p className="text-sm text-muted-foreground">Profile details would be shown here</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {aiSuggestions.riskAssessment && (
            <div>
              <h4 className="font-medium mb-2">Risk Assessment</h4>
              <Alert variant={aiSuggestions.riskAssessment.level}>
                <AlertTitle>{aiSuggestions.riskAssessment.title}</AlertTitle>
                <AlertDescription>{aiSuggestions.riskAssessment.description}</AlertDescription>
              </Alert>
            </div>
          )}
          
          {aiSuggestions.securityPriorities.length > 0 && (
            <div>
              <h4 className="font-medium mb-2">Recommended Security Focus Areas</h4>
              <div className="flex flex-wrap gap-2">
                {aiSuggestions.securityPriorities.map(priority => (
                  <Badge key={priority} variant="secondary">
                    {priority}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

                    {/* AI Suggestions Panel */}
                    {showAIMatching && renderAISuggestionsPanel()}
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
