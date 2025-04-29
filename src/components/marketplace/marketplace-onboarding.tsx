
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, FileCheck, Users, ArrowRight, X } from "lucide-react";
import { toast } from "sonner";

interface Step {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: string;
}

export function MarketplaceOnboarding({ onClose }: { onClose: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps: Step[] = [
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: "Welcome to the Security Marketplace",
      description: "Discover top security services for your Web3 projects, all verified and ranked for quality.",
      action: "Start tour"
    },
    {
      icon: <FileCheck className="h-10 w-10 text-secondary" />,
      title: "Find Security Services",
      description: "Browse by category, blockchain ecosystem, or use advanced filters to find the perfect security solution.",
      action: "Next"
    },
    {
      icon: <Users className="h-10 w-10 text-web3-orange" />,
      title: "Verify Provider Credentials",
      description: "Check security scores, verification levels, and review provider performance before making a choice.",
      action: "Finish"
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      localStorage.setItem('marketplace-onboarding-completed', 'true');
      toast.success("Welcome aboard!", {
        description: "You're all set to explore the marketplace"
      });
      onClose();
    }
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
          <CardTitle className="text-center text-2xl">{steps[currentStep].title}</CardTitle>
          <CardDescription className="text-center text-base">
            {steps[currentStep].description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center space-x-2 mb-4">
            {steps.map((_, index) => (
              <div 
                key={index} 
                className={`h-2 w-${index === currentStep ? "8" : "2"} rounded-full transition-all duration-300 ${index === currentStep ? "bg-primary" : "bg-muted"}`}
              />
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
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
