
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, FileCheck, Users, ArrowRight, X, Zap, Brain, Wallet, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface TourStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  action?: string;
  position?: { x: number | string; y: number | string };
  highlight?: string;
  route?: string;
}

const DEFAULT_TOUR_STEPS: TourStep[] = [
  {
    id: "welcome",
    title: "Welcome to Hawkly",
    description: "Discover our Web3 security marketplace connecting projects with verified security experts.",
    icon: <Shield className="h-10 w-10 text-primary" />,
    action: "Start Tour",
  },
  {
    id: "marketplace",
    title: "Browse Security Services",
    description: "Find the perfect security provider filtered by reputation, blockchain expertise, and price.",
    icon: <FileCheck className="h-10 w-10 text-secondary" />,
    route: "/marketplace",
  },
  {
    id: "request",
    title: "Request an Audit",
    description: "Submit your project details for a custom security assessment from verified experts.",
    icon: <Brain className="h-10 w-10 text-web3-orange" />,
    route: "/request-audit",
  },
  {
    id: "escrow",
    title: "Secure Escrow System",
    description: "Our built-in escrow ensures your funds are only released when audit requirements are met.",
    icon: <Wallet className="h-10 w-10 text-green-500" />,
    route: "/escrow",
  },
  {
    id: "dashboard",
    title: "Track Your Security",
    description: "Monitor your project's security status, view reports, and manage your security journey.",
    icon: <Zap className="h-10 w-10 text-blue-500" />,
    action: "Finish",
  },
];

interface EnhancedGuidedTourProps {
  steps?: TourStep[];
  onClose: () => void;
  onFinish: () => void;
  autoStart?: boolean;
  showProgress?: boolean;
}

export function EnhancedGuidedTour({
  steps = DEFAULT_TOUR_STEPS,
  onClose,
  onFinish,
  autoStart = false,
  showProgress = true,
}: EnhancedGuidedTourProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [active, setActive] = useState(autoStart);
  const navigate = useNavigate();
  
  const currentStep = steps[currentStepIndex];

  useEffect(() => {
    // If the step has a route, navigate to that route
    if (active && currentStep.route) {
      navigate(currentStep.route);
    }
  }, [currentStepIndex, active, navigate, currentStep]);

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      // Tour completed
      toast.success("Tour completed!", {
        description: "You're now ready to explore the platform."
      });
      setActive(false);
      localStorage.setItem('hawkly-guided-tour-completed', 'true');
      onFinish();
    }
  };
  
  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };
  
  const handleSkip = () => {
    toast.info("Tour skipped", {
      description: "You can restart the tour anytime from the help menu."
    });
    setActive(false);
    onClose();
  };
  
  if (!active) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <Card className="w-full max-w-lg animate-fade-in">
        <CardHeader className="relative">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-4 top-4" 
            onClick={handleSkip}
            aria-label="Close tour"
          >
            <X className="h-4 w-4" />
          </Button>
          <div className="flex justify-center mb-4">
            {currentStep.icon}
          </div>
          <div className="flex justify-center items-center gap-2 mb-1">
            <CardTitle className="text-center text-2xl">{currentStep.title}</CardTitle>
            {currentStepIndex === 0 && (
              <Badge variant="outline" className="text-xs bg-amber-50 border-amber-300 text-amber-700">
                GUIDED TOUR
              </Badge>
            )}
          </div>
          <CardDescription className="text-center text-base">
            {currentStep.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {showProgress && (
            <div className="flex justify-center space-x-2 mb-4">
              {steps.map((_, index) => (
                <div 
                  key={index} 
                  className={`h-2 w-${index === currentStepIndex ? "8" : "2"} rounded-full transition-all duration-300 ${
                    index === currentStepIndex ? "bg-primary" : 
                    index < currentStepIndex ? "bg-primary/30" : "bg-muted"
                  }`}
                  aria-hidden="true"
                />
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <div>
            {currentStepIndex > 0 && (
              <Button variant="outline" onClick={handlePrevious}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={handleSkip}>
              Skip tour
            </Button>
            <Button 
              onClick={handleNext}
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
            >
              {currentStepIndex === steps.length - 1 ? "Finish" : (currentStep.action || "Next")}
              {currentStepIndex === steps.length - 1 ? null : <ChevronRight className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
