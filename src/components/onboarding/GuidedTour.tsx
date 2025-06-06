
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, ArrowLeft, X, Target, Eye } from 'lucide-react';
import { toast } from 'sonner';

interface TourStep {
  id: string;
  title: string;
  description: string;
  target?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  action?: {
    type: 'highlight' | 'click' | 'navigate';
    element?: string;
    url?: string;
  };
}

interface GuidedTourProps {
  tourType: string;
  onComplete: () => void;
}

const tourSteps: Record<string, TourStep[]> = {
  'dashboard-tour': [
    {
      id: 'welcome',
      title: 'Welcome to Your Dashboard',
      description: 'This is your central hub for managing all your security activities.',
      target: '.dashboard-header'
    },
    {
      id: 'navigation',
      title: 'Dashboard Navigation',
      description: 'Use these tabs to switch between different views and manage your projects.',
      target: '.dashboard-nav'
    },
    {
      id: 'quick-actions',
      title: 'Quick Actions',
      description: 'Access frequently used features directly from your dashboard.',
      target: '.quick-actions'
    }
  ],
  'marketplace-tour': [
    {
      id: 'browse',
      title: 'Browse Security Experts',
      description: 'Explore our verified security auditors and their specializations.',
      target: '.auditor-grid'
    },
    {
      id: 'filters',
      title: 'Filter Results',
      description: 'Use filters to find auditors that match your specific requirements.',
      target: '.filter-sidebar'
    },
    {
      id: 'contact',
      title: 'Connect with Auditors',
      description: 'Click on any auditor profile to learn more and start a conversation.',
      target: '.auditor-card'
    }
  ],
  'request-audit-tour': [
    {
      id: 'project-details',
      title: 'Project Information',
      description: 'Provide detailed information about your project to get the best matches.',
      target: '.project-form'
    },
    {
      id: 'requirements',
      title: 'Audit Requirements',
      description: 'Specify your security needs and timeline for accurate pricing.',
      target: '.requirements-section'
    },
    {
      id: 'matching',
      title: 'AI-Powered Matching',
      description: 'Our AI will find the best auditors for your specific project needs.',
      target: '.matching-section'
    }
  ]
};

export function GuidedTour({ tourType, onComplete }: GuidedTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  
  const steps = tourSteps[tourType] || [];
  const progress = ((currentStep + 1) / steps.length) * 100;

  useEffect(() => {
    // Highlight target element when step changes
    const currentStepData = steps[currentStep];
    if (currentStepData?.target) {
      const element = document.querySelector(currentStepData.target);
      if (element) {
        element.classList.add('tour-highlight');
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }

    return () => {
      // Remove highlights from all elements
      document.querySelectorAll('.tour-highlight').forEach(el => {
        el.classList.remove('tour-highlight');
      });
    };
  }, [currentStep, steps]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    setIsVisible(false);
    toast.success('Tour completed!', {
      description: 'You\'re all set to explore this feature.'
    });
    onComplete();
  };

  const handleSkip = () => {
    setIsVisible(false);
    onComplete();
  };

  if (!isVisible || steps.length === 0) return null;

  const currentStepData = steps[currentStep];

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-40" />
      
      {/* Tour Card */}
      <div className="fixed bottom-4 right-4 z-50 w-80">
        <Card>
          <CardHeader className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSkip}
              className="absolute right-2 top-2 h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">
                Step {currentStep + 1} of {steps.length}
              </span>
            </div>
            <Progress value={progress} className="h-1" />
            <CardTitle className="text-lg">{currentStepData.title}</CardTitle>
            <CardDescription>{currentStepData.description}</CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="flex justify-between items-center">
              <Button
                variant="ghost"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="flex items-center gap-1"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>
              
              <div className="flex gap-2">
                <Button variant="ghost" onClick={handleSkip}>
                  Skip Tour
                </Button>
                <Button onClick={handleNext}>
                  {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
                  {currentStep !== steps.length - 1 && (
                    <ArrowRight className="ml-1 h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add CSS for highlighting */}
      <style>{`
        .tour-highlight {
          position: relative;
          z-index: 41;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.5);
          border-radius: 8px;
          transition: all 0.3s ease;
        }
      `}</style>
    </>
  );
}
