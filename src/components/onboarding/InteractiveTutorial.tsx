
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Check, ChevronRight, Play, Target, Users, Shield } from 'lucide-react';

interface TutorialStep {
  id: string;
  title: string;
  description: string;
  action: string;
  completed: boolean;
  optional?: boolean;
}

interface InteractiveTutorialProps {
  userType: 'project_owner' | 'auditor' | 'admin';
  onComplete: () => void;
}

export function InteractiveTutorial({ userType, onComplete }: InteractiveTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<TutorialStep[]>([]);

  useEffect(() => {
    const tutorialSteps: Record<string, TutorialStep[]> = {
      project_owner: [
        {
          id: 'welcome',
          title: 'Welcome to Hawkly',
          description: 'Get your smart contracts audited by top security experts',
          action: 'Learn about our platform',
          completed: false
        },
        {
          id: 'profile',
          title: 'Complete Your Profile',
          description: 'Add project details and security requirements',
          action: 'Set up profile',
          completed: false
        },
        {
          id: 'request',
          title: 'Submit Audit Request',
          description: 'Use our AI-powered matching to find the perfect auditor',
          action: 'Create audit request',
          completed: false
        },
        {
          id: 'matching',
          title: 'AI Auditor Matching',
          description: 'Our AI analyzes your project and recommends suitable auditors',
          action: 'Review matches',
          completed: false
        },
        {
          id: 'collaboration',
          title: 'Collaborate & Track',
          description: 'Work with auditors and track progress in real-time',
          action: 'Start collaboration',
          completed: false
        }
      ],
      auditor: [
        {
          id: 'welcome',
          title: 'Welcome Auditor',
          description: 'Join the premier security audit marketplace',
          action: 'Get started',
          completed: false
        },
        {
          id: 'verification',
          title: 'Profile Verification',
          description: 'Verify your credentials and showcase your expertise',
          action: 'Complete verification',
          completed: false
        },
        {
          id: 'skills',
          title: 'Skills Assessment',
          description: 'Demonstrate your audit capabilities',
          action: 'Take assessment',
          completed: false
        },
        {
          id: 'marketplace',
          title: 'Browse Projects',
          description: 'Find projects that match your expertise',
          action: 'Explore marketplace',
          completed: false
        },
        {
          id: 'tools',
          title: 'Audit Tools',
          description: 'Access integrated security tools and templates',
          action: 'Set up tools',
          completed: false
        }
      ],
      admin: [
        {
          id: 'dashboard',
          title: 'Admin Dashboard',
          description: 'Monitor platform health and user activity',
          action: 'View dashboard',
          completed: false
        },
        {
          id: 'users',
          title: 'User Management',
          description: 'Manage auditors, projects, and verifications',
          action: 'Manage users',
          completed: false
        },
        {
          id: 'analytics',
          title: 'Platform Analytics',
          description: 'Track performance metrics and user engagement',
          action: 'View analytics',
          completed: false
        },
        {
          id: 'security',
          title: 'Security Monitoring',
          description: 'Monitor security events and audit logs',
          action: 'Check security',
          completed: false
        }
      ]
    };

    setSteps(tutorialSteps[userType] || []);
  }, [userType]);

  const handleStepAction = (stepIndex: number) => {
    setSteps(prev => prev.map((step, index) => 
      index === stepIndex ? { ...step, completed: true } : step
    ));
    
    // Track tutorial progress
    if ((window as any).trackConversion) {
      (window as any).trackConversion({
        action: 'tutorial_step_completed',
        category: 'onboarding',
        label: `${userType}_step_${stepIndex}`,
        metadata: { stepId: steps[stepIndex]?.id }
      });
    }

    if (stepIndex < steps.length - 1) {
      setCurrentStep(stepIndex + 1);
    } else {
      // All steps completed
      if ((window as any).trackConversion) {
        (window as any).trackConversion({
          action: 'tutorial_completed',
          category: 'onboarding',
          label: userType,
          value: 1
        });
      }
      setTimeout(onComplete, 1000);
    }
  };

  const completedSteps = steps.filter(step => step.completed).length;
  const progressPercentage = (completedSteps / steps.length) * 100;

  const getStepIcon = (userType: string) => {
    switch (userType) {
      case 'project_owner': return <Target className="h-5 w-5" />;
      case 'auditor': return <Shield className="h-5 w-5" />;
      case 'admin': return <Users className="h-5 w-5" />;
      default: return <Play className="h-5 w-5" />;
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {getStepIcon(userType)}
            <div>
              <CardTitle>
                {userType.replace('_', ' ').toUpperCase()} Tutorial
              </CardTitle>
              <CardDescription>
                Complete these steps to get the most out of Hawkly
              </CardDescription>
            </div>
          </div>
          <Badge variant="secondary">
            {completedSteps}/{steps.length} steps
          </Badge>
        </div>
        <Progress value={progressPercentage} className="mt-4" />
      </CardHeader>
      
      <CardContent className="space-y-4">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`p-4 rounded-lg border transition-all ${
              index === currentStep
                ? 'border-primary bg-primary/5'
                : step.completed
                ? 'border-green-200 bg-green-50 dark:bg-green-950'
                : 'border-border bg-muted/30'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${
                  step.completed
                    ? 'bg-green-500 text-white'
                    : index === currentStep
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {step.completed ? <Check className="h-3 w-3" /> : index + 1}
                </div>
                <div>
                  <h4 className="font-medium">{step.title}</h4>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {step.optional && (
                  <Badge variant="outline" className="text-xs">
                    Optional
                  </Badge>
                )}
                {index === currentStep && !step.completed && (
                  <Button
                    onClick={() => handleStepAction(index)}
                    size="sm"
                    className="ml-2"
                  >
                    {step.action}
                    <ChevronRight className="h-3 w-3 ml-1" />
                  </Button>
                )}
                {step.completed && (
                  <Badge variant="default" className="bg-green-500">
                    <Check className="h-3 w-3 mr-1" />
                    Done
                  </Badge>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {completedSteps === steps.length && (
          <div className="text-center py-6 border-t">
            <div className="text-2xl mb-2">🎉</div>
            <h3 className="text-lg font-semibold mb-2">Tutorial Complete!</h3>
            <p className="text-muted-foreground mb-4">
              You're all set to start using Hawkly effectively.
            </p>
            <Button onClick={onComplete}>
              Continue to Platform
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
