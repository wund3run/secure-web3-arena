
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowRight, ArrowLeft, Star, Shield, Clock } from 'lucide-react';
import { useAuth } from '@/contexts/auth';

interface TutorialStep {
  id: string;
  title: string;
  description: string;
  action?: string;
  icon: React.ReactNode;
  completed?: boolean;
}

interface OnboardingTutorialProps {
  userType: 'client' | 'auditor';
  onComplete: () => void;
}

export function OnboardingTutorial({ userType, onComplete }: OnboardingTutorialProps) {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);

  const clientSteps: TutorialStep[] = [
    {
      id: 'welcome',
      title: 'Welcome to Hawkly!',
      description: 'You\'re about to experience the fastest and most reliable Web3 security platform. Let\'s get you started!',
      icon: <Star className="h-6 w-6 text-yellow-500" />
    },
    {
      id: 'audit-request',
      title: 'Submit Your First Audit Request',
      description: 'Our AI will analyze your project and match you with the perfect auditor in under 2 hours.',
      action: 'Create Audit Request',
      icon: <Shield className="h-6 w-6 text-blue-500" />
    },
    {
      id: 'ai-matching',
      title: 'AI-Powered Matching',
      description: 'Watch as our advanced AI finds the best auditors for your specific blockchain and requirements.',
      icon: <Clock className="h-6 w-6 text-green-500" />
    },
    {
      id: 'communication',
      title: 'Real-Time Communication',
      description: 'Once matched, communicate directly with your auditor through our secure messaging system.',
      icon: <CheckCircle className="h-6 w-6 text-purple-500" />
    }
  ];

  const auditorSteps: TutorialStep[] = [
    {
      id: 'welcome',
      title: 'Welcome, Security Expert!',
      description: 'Join the elite network of Web3 security professionals. Let\'s set up your profile to start receiving high-quality audit opportunities.',
      icon: <Star className="h-6 w-6 text-yellow-500" />
    },
    {
      id: 'profile-setup',
      title: 'Complete Your Profile',
      description: 'Showcase your expertise, certifications, and specializations to attract the best projects.',
      action: 'Complete Profile',
      icon: <Shield className="h-6 w-6 text-blue-500" />
    },
    {
      id: 'ai-matching',
      title: 'Get Matched with Perfect Projects',
      description: 'Our AI analyzes your skills and matches you with projects that fit your expertise and schedule.',
      icon: <Clock className="h-6 w-6 text-green-500" />
    },
    {
      id: 'start-earning',
      title: 'Start Earning',
      description: 'Accept projects, communicate with clients, and build your reputation on the platform.',
      icon: <CheckCircle className="h-6 w-6 text-purple-500" />
    }
  ];

  const steps = userType === 'client' ? clientSteps : auditorSteps;
  const currentStepData = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAction = () => {
    if (currentStepData.action) {
      // Navigate to the appropriate page based on the action
      if (currentStepData.action === 'Create Audit Request') {
        window.location.href = '/audit-request';
      } else if (currentStepData.action === 'Complete Profile') {
        window.location.href = '/auditor-onboarding';
      }
    } else {
      handleNext();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="max-w-2xl mx-4">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Badge variant="outline">
              Step {currentStep + 1} of {steps.length}
            </Badge>
            <Button variant="ghost" size="sm" onClick={onComplete}>
              Skip Tutorial
            </Button>
          </div>
          <CardTitle className="flex items-center gap-3">
            {currentStepData.icon}
            {currentStepData.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground text-lg leading-relaxed">
            {currentStepData.description}
          </p>

          {/* Progress indicator */}
          <div className="flex items-center gap-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 flex-1 rounded-full ${
                  index <= currentStep ? 'bg-blue-500' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <Button onClick={handleAction}>
              {currentStepData.action || (currentStep === steps.length - 1 ? 'Get Started' : 'Next')}
              {!currentStepData.action && <ArrowRight className="h-4 w-4 ml-2" />}
            </Button>
          </div>

          {userType === 'client' && currentStep === 1 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
              <h4 className="font-semibold text-blue-800 mb-2">💡 Pro Tip</h4>
              <p className="text-blue-700 text-sm">
                Include detailed project information and code repository for the most accurate matching. 
                Our AI considers 50+ factors to find your perfect auditor!
              </p>
            </div>
          )}

          {userType === 'auditor' && currentStep === 1 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
              <h4 className="font-semibold text-green-800 mb-2">⭐ Stand Out</h4>
              <p className="text-green-700 text-sm">
                Verified profiles with certifications and portfolio examples receive 3x more project matches. 
                Take time to showcase your expertise!
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
