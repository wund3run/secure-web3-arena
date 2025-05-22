
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, FileCheck, Users, ArrowRight, X, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth";

interface Step {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: string;
  actionLink?: string;
}

export function FirstTimeUserExperience({ onClose }: { onClose: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const { user, getUserType } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Different steps for different user types
  const userType = user ? getUserType() : 'visitor';
  
  const visitorSteps: Step[] = [
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: "Welcome to Hawkly",
      description: "The leading Web3 security marketplace connecting projects with expert auditors.",
      action: "Start Tour"
    },
    {
      icon: <FileCheck className="h-10 w-10 text-secondary" />,
      title: "Browse Security Services",
      description: "Discover top-rated security auditors and services, verified and ranked by reputation.",
      action: "Visit Marketplace",
      actionLink: "/marketplace"
    },
    {
      icon: <Users className="h-10 w-10 text-web3-orange" />,
      title: "Join Our Community",
      description: "Create an account to access personalized features and connect with security experts.",
      action: "Sign Up",
      actionLink: "/auth"
    }
  ];
  
  const auditorSteps: Step[] = [
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: "Welcome, Security Expert",
      description: "Your dedicated auditor dashboard helps you manage security reviews and client relationships.",
      action: "Continue"
    },
    {
      icon: <FileCheck className="h-10 w-10 text-secondary" />,
      title: "Complete Your Profile",
      description: "Showcase your expertise and experience to attract more audit requests.",
      action: "Update Profile",
      actionLink: "/dashboard/auditor"
    },
    {
      icon: <Users className="h-10 w-10 text-web3-orange" />,
      title: "Accept Your First Audit",
      description: "Browse open audit requests and start building your reputation on the platform.",
      action: "View Requests",
      actionLink: "/dashboard/auditor/requests"
    }
  ];
  
  const projectOwnerSteps: Step[] = [
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: "Welcome, Project Owner",
      description: "Let's secure your Web3 project with top security experts.",
      action: "Continue"
    },
    {
      icon: <FileCheck className="h-10 w-10 text-secondary" />,
      title: "Request Your First Audit",
      description: "Submit your project details to get matched with the perfect security experts.",
      action: "Request Audit",
      actionLink: "/request-audit"
    },
    {
      icon: <Users className="h-10 w-10 text-web3-orange" />,
      title: "Explore Security Resources",
      description: "Access guides and best practices to better prepare your project for security review.",
      action: "View Resources",
      actionLink: "/resources"
    }
  ];
  
  // Select appropriate steps based on user type
  const steps = userType === 'auditor' ? auditorSteps : 
                userType === 'project' ? projectOwnerSteps : 
                visitorSteps;
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setCompletedSteps([...completedSteps, currentStep]);
    } else {
      // Mark onboarding as completed
      localStorage.setItem('hawkly-onboarding-completed', 'true');
      localStorage.setItem('hawkly-user-type', userType);
      
      toast.success("Welcome aboard!", {
        description: "You're all set to explore the platform"
      });
      
      // Navigate if action link is specified
      if (steps[currentStep].actionLink) {
        navigate(steps[currentStep].actionLink);
      }
      
      onClose();
    }
  };
  
  const handleSkip = () => {
    // Mark onboarding as completed but skipped
    localStorage.setItem('hawkly-onboarding-skipped', 'true');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <Card className="w-full max-w-lg">
        <CardHeader className="relative">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-4 top-4" 
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
          <div className="flex justify-center mb-4">
            {steps[currentStep].icon}
          </div>
          <div className="flex justify-center items-center gap-2 mb-1">
            <CardTitle className="text-center text-2xl">{steps[currentStep].title}</CardTitle>
            {userType !== 'visitor' && (
              <Badge variant="outline" className="text-xs bg-primary/10 border-primary/30 text-primary">
                {userType === 'auditor' ? 'AUDITOR' : 'PROJECT'}
              </Badge>
            )}
          </div>
          <CardDescription className="text-center text-base">
            {steps[currentStep].description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Progress indicator */}
          <div className="mb-6">
            <Progress value={(currentStep / (steps.length - 1)) * 100} className="h-1" />
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>Getting started</span>
              <span>{currentStep + 1} of {steps.length}</span>
            </div>
          </div>
          
          {/* Step indicators */}
          <div className="flex justify-center space-x-2 mb-4">
            {steps.map((_, index) => (
              <div 
                key={index} 
                className={`flex items-center justify-center rounded-full w-6 h-6 transition-all duration-300 
                  ${completedSteps.includes(index) 
                    ? "bg-primary text-white" 
                    : index === currentStep 
                      ? "border-2 border-primary" 
                      : "border border-muted"}`}
              >
                {completedSteps.includes(index) && <CheckCircle className="h-4 w-4" />}
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            variant="ghost" 
            onClick={handleSkip}
          >
            Skip tour
          </Button>
          
          <Button 
            onClick={handleNext}
            className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
          >
            {steps[currentStep].action}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
