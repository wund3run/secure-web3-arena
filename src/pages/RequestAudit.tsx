
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, FileText, Settings, Clock, Send } from 'lucide-react';
import { toast } from 'sonner';
import { useRequestAuditForm } from '@/hooks/useRequestAuditForm';
import { ProjectInformationStep } from '@/components/request-audit/steps/ProjectInformationStep';
import { TechnicalDetailsStep } from '@/components/request-audit/steps/TechnicalDetailsStep';
import { TimelineBudgetStep } from '@/components/request-audit/steps/TimelineBudgetStep';
import { ReviewSubmitStep } from '@/components/request-audit/steps/ReviewSubmitStep';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

const RequestAudit = () => {
  const {
    currentStep,
    formData,
    errors,
    handleInputChange,
    handleScopeChange,
    nextStep,
    prevStep
  } = useRequestAuditForm();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const stepIcons = [
    { icon: FileText, label: "Project Info" },
    { icon: Settings, label: "Technical Details" },
    { icon: Clock, label: "Timeline & Budget" },
    { icon: Send, label: "Review & Submit" }
  ];

  const submitRequest = async () => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Audit request submitted successfully!', {
        description: 'You will receive an email confirmation shortly.'
      });
      console.log('Form data:', formData);
      
      // TODO: Redirect to dashboard or success page
    } catch (error) {
      toast.error('Failed to submit audit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
            errors={errors}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <TechnicalDetailsStep
            formData={formData}
            handleInputChange={handleInputChange}
            handleScopeChange={handleScopeChange}
            errors={errors}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 3:
        return (
          <TimelineBudgetStep
            formData={formData}
            handleInputChange={handleInputChange}
            errors={errors}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 4:
        return (
          <ReviewSubmitStep
            formData={formData}
            onBack={prevStep}
            onSubmit={submitRequest}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>Request Security Audit | Hawkly</title>
        <meta name="description" content="Submit your Web3 project for professional security audit with our streamlined request process" />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-4">
                  Request Security Audit
                </h1>
                <p className="text-muted-foreground">
                  Get your Web3 project audited by expert security professionals with our comprehensive audit request process
                </p>
              </div>

              {/* Progress Steps */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  {stepIcons.map((step, index) => {
                    const stepNumber = index + 1;
                    const isActive = stepNumber === currentStep;
                    const isCompleted = stepNumber < currentStep;
                    const Icon = step.icon;

                    return (
                      <div key={stepNumber} className="flex flex-col items-center flex-1">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors ${
                          isCompleted 
                            ? 'bg-primary text-primary-foreground' 
                            : isActive 
                              ? 'bg-primary/10 text-primary border-2 border-primary' 
                              : 'bg-muted text-muted-foreground'
                        }`}>
                          {isCompleted ? (
                            <CheckCircle className="h-5 w-5" />
                          ) : (
                            <Icon className="h-5 w-5" />
                          )}
                        </div>
                        <span className={`text-sm font-medium text-center ${
                          isActive ? 'text-primary' : isCompleted ? 'text-foreground' : 'text-muted-foreground'
                        }`}>
                          {step.label}
                        </span>
                        {index < stepIcons.length - 1 && (
                          <div className={`hidden md:block w-full h-0.5 mt-5 -ml-full ${
                            isCompleted ? 'bg-primary' : 'bg-muted'
                          }`} />
                        )}
                      </div>
                    );
                  })}
                </div>
                
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Step {currentStep} of {totalSteps}</span>
                  <span className="text-sm text-muted-foreground">{Math.round(progress)}% complete</span>
                </div>
                <Progress value={progress} className="w-full" />
              </div>

              {/* Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {React.createElement(stepIcons[currentStep - 1].icon, { className: "h-5 w-5" })}
                    {getStepTitle()}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {renderStep()}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default RequestAudit;
