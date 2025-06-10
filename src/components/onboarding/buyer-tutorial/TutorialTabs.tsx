
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Play, 
  CheckCircle, 
  ArrowRight, 
  Search, 
  FileText, 
  Shield,
  MessageSquare,
  CreditCard,
  Award
} from 'lucide-react';

interface TutorialStep {
  id: string;
  title: string;
  description: string;
  content: string;
  duration: string;
  completed: boolean;
  icon: React.ReactNode;
}

const tutorialSteps: TutorialStep[] = [
  {
    id: 'marketplace',
    title: 'Browse the Marketplace',
    description: 'Learn how to find and evaluate security auditors',
    content: 'Discover how to use our advanced search and filtering tools to find the perfect auditor for your project. Learn about trust indicators, ratings, and verification levels.',
    duration: '3 min',
    completed: false,
    icon: <Search className="h-5 w-5" />
  },
  {
    id: 'request',
    title: 'Request an Audit',
    description: 'Create your first audit request',
    content: 'Walk through the process of creating a comprehensive audit request, including project details, scope, timeline, and budget considerations.',
    duration: '5 min',
    completed: false,
    icon: <FileText className="h-5 w-5" />
  },
  {
    id: 'security',
    title: 'Security Best Practices',
    description: 'Understand security standards and requirements',
    content: 'Learn about Web3 security standards, common vulnerabilities, and how to prepare your code for audit to ensure the best results.',
    duration: '7 min',
    completed: false,
    icon: <Shield className="h-5 w-5" />
  },
  {
    id: 'communication',
    title: 'Communicating with Auditors',
    description: 'Best practices for project collaboration',
    content: 'Effective communication strategies for working with auditors, providing context, and understanding audit findings and recommendations.',
    duration: '4 min',
    completed: false,
    icon: <MessageSquare className="h-5 w-5" />
  },
  {
    id: 'payment',
    title: 'Payment & Escrow',
    description: 'Secure payment processing',
    content: 'Understand how our escrow system protects both buyers and auditors, milestone-based payments, and dispute resolution processes.',
    duration: '3 min',
    completed: false,
    icon: <CreditCard className="h-5 w-5" />
  },
  {
    id: 'completion',
    title: 'Review & Completion',
    description: 'Understanding audit reports and next steps',
    content: 'Learn how to interpret audit reports, implement recommendations, and use the certification process to showcase your security standards.',
    duration: '4 min',
    completed: false,
    icon: <Award className="h-5 w-5" />
  }
];

export function TutorialTabs() {
  const [activeStep, setActiveStep] = useState('marketplace');
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  
  const currentStepIndex = tutorialSteps.findIndex(step => step.id === activeStep);
  const progressPercentage = (completedSteps.length / tutorialSteps.length) * 100;
  
  const markStepComplete = (stepId: string) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps(prev => [...prev, stepId]);
    }
    
    // Auto-advance to next step
    const currentIndex = tutorialSteps.findIndex(step => step.id === stepId);
    if (currentIndex < tutorialSteps.length - 1) {
      setActiveStep(tutorialSteps[currentIndex + 1].id);
    }
  };
  
  const currentStep = tutorialSteps.find(step => step.id === activeStep);
  
  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Buyer Tutorial</h2>
          <Badge variant="outline">
            {completedSteps.length}/{tutorialSteps.length} Complete
          </Badge>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Tutorial Progress</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <Progress 
            value={progressPercentage} 
            className="h-2 [&>div]:bg-gradient-to-r [&>div]:from-primary [&>div]:to-secondary"
          />
        </div>
      </div>

      {/* Tutorial Content */}
      <Tabs value={activeStep} onValueChange={setActiveStep} className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
          {tutorialSteps.map((step) => (
            <TabsTrigger 
              key={step.id} 
              value={step.id}
              className="flex items-center gap-1 relative"
            >
              {completedSteps.includes(step.id) && (
                <CheckCircle className="h-3 w-3 text-green-500 absolute -top-1 -right-1" />
              )}
              <span className="hidden sm:inline">{step.icon}</span>
              <span className="truncate text-xs">{step.title.split(' ')[0]}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {tutorialSteps.map((step) => (
          <TabsContent key={step.id} value={step.id}>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {/* Step Header */}
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        {step.icon}
                        <h3 className="text-xl font-semibold">{step.title}</h3>
                        <Badge variant="secondary">{step.duration}</Badge>
                      </div>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className="prose prose-sm max-w-none">
                    <p>{step.content}</p>
                  </div>

                  {/* Interactive Demo Area */}
                  <div className="bg-muted/30 rounded-lg p-4 border-2 border-dashed border-muted-foreground/20">
                    <div className="text-center space-y-2">
                      <Play className="h-8 w-8 mx-auto text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Interactive demo for "{step.title}" would appear here
                      </p>
                    </div>
                  </div>

                  {/* Step Actions */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>Step {currentStepIndex + 1} of {tutorialSteps.length}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {completedSteps.includes(step.id) ? (
                        <Badge variant="default" className="flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" />
                          Completed
                        </Badge>
                      ) : (
                        <Button onClick={() => markStepComplete(step.id)}>
                          Mark Complete
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Tutorial Completion */}
      {completedSteps.length === tutorialSteps.length && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-6 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Award className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-green-800">Tutorial Complete!</h3>
                <p className="text-green-600">
                  You're now ready to start your first security audit project.
                </p>
              </div>
              <Button className="bg-green-600 hover:bg-green-700">
                Start Your First Audit Request
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
