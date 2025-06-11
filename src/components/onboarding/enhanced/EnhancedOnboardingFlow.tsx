
import React, { useState } from 'react';
import { useAuth } from '@/contexts/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Shield, Building, CheckCircle, ArrowRight, Star } from 'lucide-react';
import { toast } from 'sonner';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface UserTypeOption {
  type: 'auditor' | 'project_owner';
  title: string;
  description: string;
  icon: React.ReactNode;
  benefits: string[];
}

export function EnhancedOnboardingFlow() {
  const { user, userProfile } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedUserType, setSelectedUserType] = useState<'auditor' | 'project_owner' | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  const userTypeOptions: UserTypeOption[] = [
    {
      type: 'auditor',
      title: 'Security Auditor',
      description: 'Provide expert security services to Web3 projects',
      icon: <Shield className="h-8 w-8 text-primary" />,
      benefits: [
        'Build your security reputation',
        'Set your own rates',
        'Access to premium audit tools',
        'Connect with quality projects'
      ]
    },
    {
      type: 'project_owner',
      title: 'Project Owner',
      description: 'Get your Web3 project secured by top experts',
      icon: <Building className="h-8 w-8 text-primary" />,
      benefits: [
        'AI-powered expert matching',
        'Transparent pricing',
        'Real-time audit tracking',
        'Secure escrow payments'
      ]
    }
  ];

  const getStepsForUserType = (userType: 'auditor' | 'project_owner'): OnboardingStep[] => {
    const commonSteps = [
      {
        id: 'user-type',
        title: 'Choose Your Role',
        description: 'Select how you plan to use Hawkly',
        completed: !!selectedUserType
      }
    ];

    if (userType === 'auditor') {
      return [
        ...commonSteps,
        {
          id: 'profile-setup',
          title: 'Set Up Your Profile',
          description: 'Add your expertise and experience',
          completed: false
        },
        {
          id: 'verification',
          title: 'Verify Your Expertise',
          description: 'Complete security expert verification',
          completed: false
        },
        {
          id: 'first-service',
          title: 'Create Your First Service',
          description: 'List your audit services',
          completed: false
        }
      ];
    } else {
      return [
        ...commonSteps,
        {
          id: 'project-setup',
          title: 'Tell Us About Your Project',
          description: 'Help us understand your security needs',
          completed: false
        },
        {
          id: 'preferences',
          title: 'Set Your Preferences',
          description: 'Configure audit preferences and notifications',
          completed: false
        },
        {
          id: 'first-request',
          title: 'Submit Your First Audit Request',
          description: 'Get started with professional security review',
          completed: false
        }
      ];
    }
  };

  const steps = selectedUserType ? getStepsForUserType(selectedUserType) : [];
  const progress = steps.length > 0 ? (completedSteps.size / steps.length) * 100 : 0;

  const handleUserTypeSelect = (type: 'auditor' | 'project_owner') => {
    setSelectedUserType(type);
    setCompletedSteps(new Set(['user-type']));
    setCurrentStep(1);
    toast.success(`Welcome aboard as a ${type === 'auditor' ? 'Security Auditor' : 'Project Owner'}!`);
  };

  const handleStepComplete = (stepId: string) => {
    setCompletedSteps(prev => new Set([...prev, stepId]));
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleFinishOnboarding = () => {
    toast.success("Onboarding completed! Welcome to Hawkly!");
    // Save completion state
    localStorage.setItem('hawkly_onboarding_completed', 'true');
    localStorage.setItem('hawkly_user_type', selectedUserType || '');
  };

  if (!selectedUserType) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Welcome to Hawkly!</h1>
          <p className="text-lg text-muted-foreground">
            Let's get you set up. How do you plan to use our platform?
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {userTypeOptions.map((option) => (
            <Card 
              key={option.type}
              className="cursor-pointer transition-all hover:shadow-lg hover:border-primary"
              onClick={() => handleUserTypeSelect(option.type)}
            >
              <CardHeader className="text-center">
                <div className="mx-auto mb-4">
                  {option.icon}
                </div>
                <CardTitle className="text-xl">{option.title}</CardTitle>
                <CardDescription>{option.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {option.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-6">
                  Get Started as {option.title}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Complete Your Setup</h1>
          <Badge variant="outline">
            {Math.round(progress)}% Complete
          </Badge>
        </div>
        <Progress value={progress} className="w-full" />
      </div>

      <div className="space-y-4">
        {steps.map((step, index) => (
          <Card 
            key={step.id}
            className={`transition-all ${
              index === currentStep 
                ? 'ring-2 ring-primary border-primary' 
                : completedSteps.has(step.id)
                ? 'bg-muted/50'
                : ''
            }`}
          >
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  completedSteps.has(step.id)
                    ? 'bg-green-100 text-green-600'
                    : index === currentStep
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {completedSteps.has(step.id) ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </div>
                <div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                  <CardDescription>{step.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            {index === currentStep && !completedSteps.has(step.id) && (
              <CardContent className="pt-0">
                <Button 
                  onClick={() => handleStepComplete(step.id)}
                  className="w-full"
                >
                  Complete This Step
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {progress === 100 && (
        <Card className="mt-6 border-green-200 bg-green-50">
          <CardContent className="pt-6 text-center">
            <Star className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Congratulations!</h3>
            <p className="text-muted-foreground mb-4">
              You've completed the onboarding process. You're ready to start using Hawkly!
            </p>
            <Button onClick={handleFinishOnboarding} size="lg">
              Start Using Hawkly
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
