
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, ArrowRight, ArrowLeft, X } from "lucide-react";
import { useAuth } from "@/contexts/auth";
import { useNavigate } from "react-router-dom";

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  action?: {
    label: string;
    href: string;
  };
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: "welcome",
    title: "Welcome to Hawkly",
    description: "Your trusted Web3 security marketplace. Let's get you started with a quick tour of our platform."
  },
  {
    id: "explore",
    title: "Explore Security Services",
    description: "Browse our marketplace to find expert security auditors and services for your Web3 projects.",
    action: {
      label: "Visit Marketplace",
      href: "/marketplace"
    }
  },
  {
    id: "request",
    title: "Request Your First Audit",
    description: "Ready to secure your project? Submit an audit request and get matched with expert auditors.",
    action: {
      label: "Request Audit",
      href: "/request-audit"
    }
  },
  {
    id: "dashboard",
    title: "Your Dashboard",
    description: "Access your dashboard to track audits, manage projects, and view your security reports.",
    action: {
      label: "Go to Dashboard",
      href: "/dashboard"
    }
  }
];

export function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const { user, userProfile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Show onboarding for new users
    const hasSeenOnboarding = localStorage.getItem('hawkly-onboarding-completed');
    if (user && !hasSeenOnboarding) {
      setIsVisible(true);
    }
  }, [user]);

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeOnboarding();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    completeOnboarding();
  };

  const completeOnboarding = () => {
    localStorage.setItem('hawkly-onboarding-completed', 'true');
    setIsVisible(false);
  };

  const handleActionClick = (href: string) => {
    const stepId = onboardingSteps[currentStep].id;
    setCompletedSteps(prev => new Set([...prev, stepId]));
    navigate(href);
    completeOnboarding();
  };

  const progress = ((currentStep + 1) / onboardingSteps.length) * 100;

  if (!isVisible || !user) {
    return null;
  }

  const currentStepData = onboardingSteps[currentStep];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSkip}
            className="absolute right-2 top-2 h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{currentStepData.title}</CardTitle>
              <span className="text-sm text-muted-foreground">
                {currentStep + 1} of {onboardingSteps.length}
              </span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <p className="text-muted-foreground">{currentStepData.description}</p>

          {currentStepData.action && (
            <Button
              onClick={() => handleActionClick(currentStepData.action!.href)}
              className="w-full"
            >
              {currentStepData.action.label}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}

          <div className="flex justify-between">
            <Button
              variant="ghost"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex items-center"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>

            <div className="flex gap-2">
              <Button variant="ghost" onClick={handleSkip}>
                Skip Tour
              </Button>
              <Button onClick={handleNext}>
                {currentStep === onboardingSteps.length - 1 ? 'Finish' : 'Next'}
                {currentStep !== onboardingSteps.length - 1 && (
                  <ArrowRight className="ml-2 h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
