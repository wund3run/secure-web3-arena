
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle, 
  Circle, 
  ArrowRight, 
  Rocket,
  FileText,
  Users,
  Settings
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  action: string;
  route?: string;
  completed?: boolean;
}

export function OnboardingWizard() {
  const navigate = useNavigate();
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const steps: OnboardingStep[] = [
    {
      id: 'profile',
      title: 'Complete Your Profile',
      description: 'Add your company details and project information',
      icon: Settings,
      action: 'Complete Profile',
      route: '/profile'
    },
    {
      id: 'first-audit',
      title: 'Request Your First Audit',
      description: 'Submit your first smart contract for security review',
      icon: FileText,
      action: 'Start Audit Request',
      route: '/audit/new'
    },
    {
      id: 'find-auditor',
      title: 'Browse Auditors',
      description: 'Explore our verified security auditors',
      icon: Users,
      action: 'View Auditors',
      route: '/auditors'
    }
  ];

  const completionPercentage = (completedSteps.length / steps.length) * 100;

  const handleStepAction = (step: OnboardingStep) => {
    if (step.route) {
      navigate(step.route);
    }
    
    // Mark step as completed (in real app, this would be tracked in backend)
    if (!completedSteps.includes(step.id)) {
      setCompletedSteps([...completedSteps, step.id]);
    }
  };

  const dismissOnboarding = () => {
    // In real app, this would update user preferences
    localStorage.setItem('onboarding_dismissed', 'true');
    window.location.reload();
  };

  return (
    <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-full">
              <Rocket className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">Welcome to Hawkly!</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Let's get you started with your first security audit
              </p>
            </div>
          </div>
          <Badge variant="secondary">
            {completedSteps.length}/{steps.length} completed
          </Badge>
        </div>
        
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{Math.round(completionPercentage)}%</span>
          </div>
          <Progress value={completionPercentage} className="h-2" />
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {steps.map((step, index) => {
            const isCompleted = completedSteps.includes(step.id);
            const IconComponent = step.icon;
            
            return (
              <div 
                key={step.id}
                className="flex flex-col p-4 rounded-lg border bg-card hover:shadow-sm transition-shadow"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="flex-shrink-0">
                    {isCompleted ? (
                      <CheckCircle className="h-5 w-5 text-success" />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm">{step.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  <IconComponent className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                </div>
                
                <Button
                  size="sm"
                  variant={isCompleted ? "outline" : "default"}
                  className="w-full gap-2"
                  onClick={() => handleStepAction(step)}
                  disabled={isCompleted}
                >
                  {isCompleted ? 'Completed' : step.action}
                  {!isCompleted && <ArrowRight className="h-3 w-3" />}
                </Button>
              </div>
            );
          })}
        </div>
        
        <div className="flex items-center justify-between mt-6 pt-4 border-t">
          <p className="text-xs text-muted-foreground">
            Complete these steps to unlock all platform features
          </p>
          <Button variant="ghost" size="sm" onClick={dismissOnboarding}>
            Skip for now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
