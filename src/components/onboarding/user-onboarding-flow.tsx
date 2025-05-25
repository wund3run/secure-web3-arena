
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CheckCircle, Shield, Code, Users, ArrowRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  action: {
    label: string;
    href: string;
    variant?: 'default' | 'outline';
  };
  completed?: boolean;
}

interface UserOnboardingFlowProps {
  isOpen: boolean;
  onClose: () => void;
  userType?: 'auditor' | 'project_owner' | null;
}

export function UserOnboardingFlow({ isOpen, onClose, userType }: UserOnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const auditorSteps: OnboardingStep[] = [
    {
      id: 'profile',
      title: 'Complete Your Profile',
      description: 'Add your skills, experience, and certifications to attract clients',
      icon: <Users className="h-6 w-6" />,
      action: { label: 'Complete Profile', href: '/dashboard?tab=profile' }
    },
    {
      id: 'services',
      title: 'Create Your First Service',
      description: 'List your security audit services and set your pricing',
      icon: <Shield className="h-6 w-6" />,
      action: { label: 'Create Service', href: '/submit-service' }
    },
    {
      id: 'guidelines',
      title: 'Review Security Guidelines',
      description: 'Familiarize yourself with our audit standards and best practices',
      icon: <Code className="h-6 w-6" />,
      action: { label: 'Read Guidelines', href: '/audit-guidelines', variant: 'outline' }
    }
  ];

  const projectOwnerSteps: OnboardingStep[] = [
    {
      id: 'explore',
      title: 'Explore Security Services',
      description: 'Browse our marketplace to find the right security experts for your project',
      icon: <Shield className="h-6 w-6" />,
      action: { label: 'Browse Marketplace', href: '/marketplace' }
    },
    {
      id: 'request',
      title: 'Request Your First Audit',
      description: 'Submit your project details to get matched with qualified auditors',
      icon: <Code className="h-6 w-6" />,
      action: { label: 'Request Audit', href: '/request-audit' }
    },
    {
      id: 'learn',
      title: 'Learn Security Best Practices',
      description: 'Access our knowledge base to improve your project\'s security',
      icon: <Users className="h-6 w-6" />,
      action: { label: 'View Resources', href: '/resources', variant: 'outline' }
    }
  ];

  const steps = userType === 'auditor' ? auditorSteps : projectOwnerSteps;

  const handleStepComplete = (stepId: string) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl">
                Welcome to Hawkly! 🎉
              </DialogTitle>
              <DialogDescription>
                Let's get you started with {userType === 'auditor' ? 'offering security services' : 'securing your project'}
              </DialogDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Step {currentStep + 1} of {steps.length}</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <div className="w-full bg-muted h-2 rounded-full">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Current Step */}
          <Card className="border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  {steps[currentStep].icon}
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg">{steps[currentStep].title}</CardTitle>
                  <CardDescription>{steps[currentStep].description}</CardDescription>
                </div>
                {completedSteps.includes(steps[currentStep].id) && (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
              </div>
            </CardHeader>
            <CardContent>
              <Link to={steps[currentStep].action.href} onClick={onClose}>
                <Button 
                  className="w-full"
                  variant={steps[currentStep].action.variant || 'default'}
                >
                  {steps[currentStep].action.label}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* All Steps Overview */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-muted-foreground">Your Journey</h4>
            <div className="grid gap-2">
              {steps.map((step, index) => (
                <div 
                  key={step.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                    index === currentStep 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border'
                  }`}
                >
                  <div className={`p-1.5 rounded ${
                    completedSteps.includes(step.id) 
                      ? 'bg-green-100 text-green-600' 
                      : index === currentStep
                        ? 'bg-primary/10 text-primary'
                        : 'bg-muted text-muted-foreground'
                  }`}>
                    {completedSteps.includes(step.id) ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      step.icon
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{step.title}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    {completedSteps.includes(step.id) && (
                      <Badge variant="secondary" className="text-xs">
                        Complete
                      </Badge>
                    )}
                    {index === currentStep && (
                      <Badge className="text-xs">
                        Current
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              Previous
            </Button>
            <div className="flex gap-2">
              <Button variant="ghost" onClick={onClose}>
                Skip for now
              </Button>
              {currentStep < steps.length - 1 ? (
                <Button onClick={handleNext}>
                  Next Step
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={onClose}>
                  Get Started!
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
