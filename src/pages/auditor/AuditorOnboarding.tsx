
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { CheckCircle, Play, BookOpen, Users, Shield, Github, ArrowRight } from 'lucide-react';

const AuditorOnboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const onboardingSteps = [
    {
      id: 0,
      title: 'Welcome Tour',
      description: 'Get familiar with the platform features and dashboard',
      icon: <Play className="h-5 w-5" />,
      action: 'Take Tour'
    },
    {
      id: 1,
      title: 'Review Guidelines',
      description: 'Read the auditor code of conduct and platform guidelines',
      icon: <BookOpen className="h-5 w-5" />,
      action: 'Review Guidelines'
    },
    {
      id: 2,
      title: 'Connect GitHub',
      description: 'Link your GitHub account for portfolio verification',
      icon: <Github className="h-5 w-5" />,
      action: 'Connect GitHub'
    },
    {
      id: 3,
      title: 'Join Community',
      description: 'Connect with other auditors and get support',
      icon: <Users className="h-5 w-5" />,
      action: 'Join Community'
    },
    {
      id: 4,
      title: 'Complete Profile',
      description: 'Finalize your auditor profile for better matching',
      icon: <Shield className="h-5 w-5" />,
      action: 'Complete Profile'
    }
  ];

  const handleStepComplete = async (stepId: number) => {
    // Simulate step completion
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setCompletedSteps(prev => [...prev, stepId]);
    
    if (stepId < onboardingSteps.length - 1) {
      setCurrentStep(stepId + 1);
    }
    
    toast.success(`Step completed: ${onboardingSteps[stepId].title}`);
  };

  const handleFinishOnboarding = () => {
    toast.success('Onboarding completed! Welcome to Hawkly!');
    navigate('/auditor/dashboard');
  };

  const progress = (completedSteps.length / onboardingSteps.length) * 100;
  const isComplete = completedSteps.length === onboardingSteps.length;

  return (
    <>
      <Helmet>
        <title>Auditor Onboarding | Hawkly</title>
        <meta name="description" content="Complete your auditor onboarding process" />
      </Helmet>

      <StandardLayout title="Welcome to Hawkly" description="Let's get you set up as a security auditor">
        <div className="container max-w-4xl py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Welcome to the Team!</h1>
            <p className="text-muted-foreground mb-6">
              Complete these steps to get the most out of your auditor experience
            </p>
            
            <div className="max-w-md mx-auto mb-4">
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-muted-foreground mt-2">
                {completedSteps.length} of {onboardingSteps.length} steps completed
              </p>
            </div>
            
            {isComplete && (
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <CheckCircle className="h-4 w-4 mr-1" />
                All Steps Completed!
              </Badge>
            )}
          </div>

          <div className="grid gap-4">
            {onboardingSteps.map((step, index) => {
              const isCompleted = completedSteps.includes(step.id);
              const isCurrent = currentStep === step.id;
              const isLocked = index > 0 && !completedSteps.includes(index - 1) && !isCompleted;

              return (
                <Card 
                  key={step.id} 
                  className={`transition-all ${
                    isCurrent ? 'ring-2 ring-primary border-primary' : 
                    isCompleted ? 'bg-green-50 border-green-200' : 
                    isLocked ? 'opacity-50' : ''
                  }`}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${
                          isCompleted ? 'bg-green-100 text-green-600' :
                          isCurrent ? 'bg-primary/10 text-primary' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          {isCompleted ? <CheckCircle className="h-5 w-5" /> : step.icon}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{step.title}</CardTitle>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {isCompleted ? (
                          <Badge variant="outline" className="bg-green-50 text-green-600">
                            Completed
                          </Badge>
                        ) : isCurrent ? (
                          <Badge variant="outline" className="bg-primary/10 text-primary">
                            Current
                          </Badge>
                        ) : isLocked ? (
                          <Badge variant="outline" className="text-muted-foreground">
                            Locked
                          </Badge>
                        ) : null}
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    {step.id === 0 && (
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                          Take a guided tour of your auditor dashboard, learn about audit workflows, 
                          and discover platform features that will help you succeed.
                        </p>
                        <Button 
                          onClick={() => handleStepComplete(step.id)}
                          disabled={isCompleted || isLocked}
                          className="w-full sm:w-auto"
                        >
                          {step.action}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    )}
                    
                    {step.id === 1 && (
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                          Review our comprehensive guidelines covering audit standards, 
                          professional conduct, and quality expectations.
                        </p>
                        <Button 
                          onClick={() => handleStepComplete(step.id)}
                          disabled={isCompleted || isLocked}
                          variant="outline"
                          className="w-full sm:w-auto"
                        >
                          {step.action}
                        </Button>
                      </div>
                    )}
                    
                    {step.id === 2 && (
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                          Connect your GitHub account to showcase your repositories 
                          and build trust with potential clients.
                        </p>
                        <Button 
                          onClick={() => handleStepComplete(step.id)}
                          disabled={isCompleted || isLocked}
                          variant="outline"
                          className="w-full sm:w-auto"
                        >
                          <Github className="mr-2 h-4 w-4" />
                          {step.action}
                        </Button>
                      </div>
                    )}
                    
                    {step.id === 3 && (
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                          Join our auditor community for networking, knowledge sharing, 
                          and professional development opportunities.
                        </p>
                        <Button 
                          onClick={() => handleStepComplete(step.id)}
                          disabled={isCompleted || isLocked}
                          variant="outline"
                          className="w-full sm:w-auto"
                        >
                          {step.action}
                        </Button>
                      </div>
                    )}
                    
                    {step.id === 4 && (
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                          Complete your detailed auditor profile to improve project matching 
                          and attract high-quality audit opportunities.
                        </p>
                        <Button 
                          onClick={() => handleStepComplete(step.id)}
                          disabled={isCompleted || isLocked}
                          className="w-full sm:w-auto"
                        >
                          {step.action}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {isComplete && (
            <div className="text-center mt-8">
              <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">🎉 You're All Set!</h3>
                  <p className="text-muted-foreground mb-4">
                    Your auditor profile is complete and you're ready to start earning from audits.
                  </p>
                  <Button onClick={handleFinishOnboarding} size="lg">
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </StandardLayout>
    </>
  );
};

export default AuditorOnboarding;
