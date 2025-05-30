
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronRight, ChevronLeft, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { useRequestAuditForm } from '@/hooks/useRequestAuditForm';
import { ProjectInformationStep } from '@/components/request-audit/steps/ProjectInformationStep';
import { TechnicalDetailsStep } from '@/components/request-audit/steps/TechnicalDetailsStep';
import { TimelineBudgetStep } from '@/components/request-audit/steps/TimelineBudgetStep';
import { ReviewSubmitStep } from '@/components/request-audit/steps/ReviewSubmitStep';

const RequestAudit = () => {
  const {
    currentStep,
    formData,
    handleInputChange,
    handleScopeChange,
    nextStep,
    prevStep
  } = useRequestAuditForm();

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const submitRequest = () => {
    // Here you would submit to your backend
    toast.success('Audit request submitted successfully!');
    console.log('Form data:', formData);
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return "Project Information";
      case 2: return "Technical Details";
      case 3: return "Timeline & Budget";
      case 4: return "Review & Submit";
      default: return "";
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ProjectInformationStep
            formData={formData}
            handleInputChange={handleInputChange}
          />
        );
      case 2:
        return (
          <TechnicalDetailsStep
            formData={formData}
            handleInputChange={handleInputChange}
            handleScopeChange={handleScopeChange}
          />
        );
      case 3:
        return (
          <TimelineBudgetStep
            formData={formData}
            handleInputChange={handleInputChange}
          />
        );
      case 4:
        return <ReviewSubmitStep formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>Request Security Audit | Hawkly</title>
        <meta name="description" content="Submit your Web3 project for professional security audit" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Request Security Audit
              </h1>
              <p className="text-gray-600">
                Get your Web3 project audited by expert security professionals
              </p>
            </div>

            {/* Progress */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Step {currentStep} of {totalSteps}</span>
                <span className="text-sm text-gray-500">{Math.round(progress)}% complete</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>

            {/* Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  {getStepTitle()}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {renderStep()}

                {/* Navigation */}
                <div className="flex justify-between mt-8">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                  
                  {currentStep < totalSteps ? (
                    <Button onClick={nextStep}>
                      Next
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  ) : (
                    <Button onClick={submitRequest}>
                      Submit Request
                      <FileText className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default RequestAudit;
