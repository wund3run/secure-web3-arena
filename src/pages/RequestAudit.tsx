
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronRight, ChevronLeft, FileText, Users, Calendar, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useRequestAuditForm } from '@/hooks/useRequestAuditForm';
import { EnhancedProjectInformationStep } from '@/components/request-audit/steps/EnhancedProjectInformationStep';
import { TechnicalDetailsStep } from '@/components/request-audit/steps/TechnicalDetailsStep';
import { TimelineBudgetStep } from '@/components/request-audit/steps/TimelineBudgetStep';
import { ReviewSubmitStep } from '@/components/request-audit/steps/ReviewSubmitStep';
import { Badge } from '@/components/ui/badge';

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
    toast.success('Audit request submitted successfully!', {
      description: 'You will be matched with suitable auditors within 24 hours.'
    });
    console.log('Form data:', formData);
  };

  const getStepInfo = () => {
    switch (currentStep) {
      case 1: return {
        title: "Project Information",
        description: "Tell us about your project and requirements",
        icon: <FileText className="h-5 w-5" />
      };
      case 2: return {
        title: "Technical Details",
        description: "Provide technical specifications and scope",
        icon: <Users className="h-5 w-5" />
      };
      case 3: return {
        title: "Timeline & Budget",
        description: "Set your timeline and budget preferences",
        icon: <Calendar className="h-5 w-5" />
      };
      case 4: return {
        title: "Review & Submit",
        description: "Review your request and submit for matching",
        icon: <CheckCircle className="h-5 w-5" />
      };
      default: return { title: "", description: "", icon: null };
    }
  };

  const stepInfo = getStepInfo();

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <EnhancedProjectInformationStep
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

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Request Security Audit
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Get your Web3 project audited by expert security professionals. 
                Our AI matching system will connect you with the perfect auditors.
              </p>
            </div>

            {/* Progress Indicator */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-4">
                  {[1, 2, 3, 4].map((step) => (
                    <div key={step} className="flex items-center">
                      <div className={`
                        flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium
                        ${step <= currentStep 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted text-muted-foreground'
                        }
                      `}>
                        {step < currentStep ? <CheckCircle className="h-5 w-5" /> : step}
                      </div>
                      {step < 4 && (
                        <div className={`
                          w-16 h-1 mx-2 rounded-full
                          ${step < currentStep ? 'bg-primary' : 'bg-muted'}
                        `} />
                      )}
                    </div>
                  ))}
                </div>
                <Badge variant="outline" className="text-sm">
                  Step {currentStep} of {totalSteps}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{Math.round(progress)}% Complete</span>
                  <span className="text-sm text-muted-foreground">
                    Estimated time: {5 - currentStep} minutes remaining
                  </span>
                </div>
                <Progress value={progress} className="w-full h-2" />
              </div>
            </div>

            {/* Form */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
                <div className="flex items-center space-x-3">
                  {stepInfo.icon}
                  <div>
                    <CardTitle className="text-xl">{stepInfo.title}</CardTitle>
                    <p className="text-muted-foreground">{stepInfo.description}</p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-8">
                {renderStep()}

                {/* Navigation */}
                <div className="flex justify-between items-center mt-8 pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className="flex items-center space-x-2"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span>Previous</span>
                  </Button>
                  
                  <div className="text-sm text-muted-foreground">
                    Need help? <a href="/support" className="text-primary hover:underline">Contact support</a>
                  </div>
                  
                  {currentStep < totalSteps ? (
                    <Button onClick={nextStep} className="flex items-center space-x-2">
                      <span>Next</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button onClick={submitRequest} className="flex items-center space-x-2 bg-green-600 hover:bg-green-700">
                      <CheckCircle className="h-4 w-4" />
                      <span>Submit Request</span>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Benefits Section */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="text-center p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">AI-Powered Matching</h3>
                <p className="text-sm text-muted-foreground">
                  Our AI system matches you with the most suitable auditors based on your project requirements
                </p>
              </Card>
              
              <Card className="text-center p-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Quality Guarantee</h3>
                <p className="text-sm text-muted-foreground">
                  All auditors are verified professionals with proven track records in Web3 security
                </p>
              </Card>
              
              <Card className="text-center p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Fast Turnaround</h3>
                <p className="text-sm text-muted-foreground">
                  Get matched with auditors within 24 hours and start your security audit quickly
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RequestAudit;
