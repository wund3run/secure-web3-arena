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
import { HawklyCard } from '@/components/ui/hawkly-components';

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
    <HawklyCard variant="glass" elevation="subtle" glow={true} className="mt-4">
      <CardHeader>
        <CardTitle className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-600">AI-Powered Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {aiSuggestions.recommendedAuditors.length > 0 && (
            <div>
              <h4 className="font-medium mb-2 text-purple-300">Recommended Auditors</h4>
              <div className="grid grid-cols-2 gap-4">
                {aiSuggestions.recommendedAuditors.map(auditor => (
                  <HawklyCard key={auditor.id} variant="interactive" elevation="subtle" className="p-4">
                    <p className="font-medium">Recommended Auditor #{auditor.id}</p>
                    <p className="text-sm text-gray-300">Profile details would be shown here</p>
                  </HawklyCard>
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
    </HawklyCard>
  );

  // Show auth loading state
  if (authLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <HawklyCard variant="glass" elevation="subtle" glow={true} className="p-8">
          <LoadingState message="Preparing your audit request form..." />
        </HawklyCard>
      </div>
    );
  }

  // Show login required message if not authenticated
  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <HawklyCard variant="glass" elevation="subtle" glow={true}>
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-blue-600 flex items-center justify-center mx-auto mb-4">
              <UserPlus className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-white">Authentication Required</h3>
            <p className="text-gray-300 mb-6">
              You need to be signed in to submit an audit request. Please create an account or sign in to continue.
            </p>
            <Button className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700" asChild>
              <a href="/auth">Sign In / Sign Up</a>
            </Button>
          </CardContent>
        </HawklyCard>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress indicator */}
        <FormProgress formStep={formStep} showAIMatching={showAIMatching} />

        {/* Form */}
        <HawklyCard variant="glass" elevation="subtle" className="p-6 md:p-8">
          {validationError && (
            <Alert variant="error" className="mb-6 animate-fade-in">
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
        </HawklyCard>
      </div>
    </ErrorBoundary>
  );
};

export default AuditRequestForm;
