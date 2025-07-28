import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle,
  Circle,
  Users,
  Target,
  BookOpen,
  Shield,
  Plus,
  Globe,
  Lightbulb,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  link?: string;
  icon: React.ReactNode;
  optional?: boolean;
}

interface OnboardingProgress {
  totalSteps: number;
  completedSteps: number;
  progressPercentage: number;
}

export function NewAuditorOnboarding() {
  const [steps, setSteps] = useState<OnboardingStep[]>([]);
  const [progress, setProgress] = useState<OnboardingProgress>({
    totalSteps: 0,
    completedSteps: 0,
    progressPercentage: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      checkOnboardingStatus();
    }
  }, [user]);

  const checkOnboardingStatus = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      // Check if auditor profile exists
      const { data: profile } = await supabase
        .from('auditor_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      // Check if user has applied to any projects
      const { data: applications } = await supabase
        .from('audit_proposals')
        .select('id')
        .eq('auditor_id', user.id)
        .limit(1);

      // Check if user has any completed audits
      const { data: completedAudits } = await supabase
        .from('audit_requests')
        .select('id')
        .eq('assigned_auditor_id', user.id)
        .eq('status', 'completed')
        .limit(1);

      const onboardingSteps: OnboardingStep[] = [
        {
          id: 'profile',
          title: 'Complete Your Auditor Profile',
          description: 'Set up your expertise, experience, and availability',
          completed: !!profile && !!profile.years_experience,
          link: '/service-provider-onboarding',
          icon: <Users className="h-5 w-5" />
        },
        {
          id: 'browse',
          title: 'Browse Project Opportunities',
          description: 'Explore available audit projects that match your skills',
          completed: true, // Always show as available
          link: '/auditor/opportunities',
          icon: <Target className="h-5 w-5" />
        },
        {
          id: 'apply',
          title: 'Apply to Your First Project',
          description: 'Submit a proposal for an audit project',
          completed: !!applications && applications.length > 0,
          icon: <Globe className="h-5 w-5" />
        },
        {
          id: 'tools',
          title: 'Explore AI-Powered Tools',
          description: 'Get familiar with our advanced audit tools',
          completed: false, // Track based on tool usage
          link: '/phase4',
          icon: <BookOpen className="h-5 w-5" />,
          optional: true
        },
        {
          id: 'community',
          title: 'Join the Auditor Community',
          description: 'Connect with other security professionals',
          completed: false,
          link: '/community',
          icon: <Shield className="h-5 w-5" />,
          optional: true
        }
      ];

      setSteps(onboardingSteps);

      const completedRequired = onboardingSteps.filter(step => step.completed && !step.optional).length;
      const totalRequired = onboardingSteps.filter(step => !step.optional).length;
      const progressPercentage = Math.round((completedRequired / totalRequired) * 100);

      setProgress({
        totalSteps: totalRequired,
        completedSteps: completedRequired,
        progressPercentage
      });

    } catch (error) {
      console.error('Error checking onboarding status:', error);
      toast({
        title: "Error loading onboarding status",
        description: "Please refresh the page to try again",
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const markStepComplete = async (stepId: string) => {
    // This could be called when certain actions are completed
    setSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, completed: true } : step
    ));
    await checkOnboardingStatus(); // Refresh the status
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Alert */}
      <Alert className="border-blue-200 bg-blue-50">
        <Lightbulb className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>Welcome to Hawkly!</strong> Complete these steps to unlock all platform features and start building your auditing career.
        </AlertDescription>
      </Alert>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Onboarding Progress
            </CardTitle>
            <Badge variant="outline" className="px-3 py-1">
              {progress.completedSteps} of {progress.totalSteps} completed
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span>Overall Progress</span>
              <span className="font-medium">{progress.progressPercentage}%</span>
            </div>
            <Progress value={progress.progressPercentage} className="h-3" />
            <p className="text-sm text-gray-600">
              {progress.completedSteps === progress.totalSteps 
                ? "🎉 Congratulations! You're ready to start auditing!"
                : `${progress.totalSteps - progress.completedSteps} more steps to complete your setup`
              }
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Onboarding Steps */}
      <div className="space-y-4">
        {steps.map((step, index) => (
          <Card 
            key={step.id} 
            className={`transition-all duration-200 ${
              step.completed 
                ? 'border-green-200 bg-green-50' 
                : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
            }`}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                {/* Step Icon and Status */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  step.completed 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-blue-100 text-blue-600'
                }`}>
                  {step.completed ? <CheckCircle className="h-5 w-5" /> : step.icon}
                </div>

                {/* Step Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className={`font-semibold ${
                      step.completed ? 'text-green-900' : 'text-gray-900'
                    }`}>
                      {step.title}
                    </h3>
                    {step.optional && (
                      <Badge variant="secondary" className="text-xs">
                        Optional
                      </Badge>
                    )}
                    {step.completed && (
                      <Badge variant="default" className="text-xs bg-green-600">
                        Completed
                      </Badge>
                    )}
                  </div>
                  
                  <p className={`text-sm mb-4 ${
                    step.completed ? 'text-green-700' : 'text-gray-600'
                  }`}>
                    {step.description}
                  </p>

                  {/* Action Button */}
                  {step.link && !step.completed && (
                    <Button asChild variant="outline" size="sm">
                      <Link to={step.link}>
                        {step.id === 'profile' && <Plus className="h-4 w-4 mr-2" />}
                        {step.id === 'browse' && <Target className="h-4 w-4 mr-2" />}
                        {step.id === 'tools' && <Shield className="h-4 w-4 mr-2" />}
                        {step.id === 'community' && <Users className="h-4 w-4 mr-2" />}
                        {step.id === 'profile' && 'Complete Profile'}
                        {step.id === 'browse' && 'Browse Projects'}
                        {step.id === 'tools' && 'Explore Tools'}
                        {step.id === 'community' && 'Join Community'}
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  )}

                  {step.completed && (
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      <span>Completed successfully</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Next Steps */}
      {progress.progressPercentage === 100 && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-900">🎉 You're All Set!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-green-800 mb-4">
              Congratulations! You've completed the onboarding process. Here are some next steps to boost your auditing career:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button asChild>
                <Link to="/auditor/opportunities">
                  <Target className="h-4 w-4 mr-2" />
                  Find Your Next Project
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/phase4">
                  <Shield className="h-4 w-4 mr-2" />
                  Master AI Tools
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 