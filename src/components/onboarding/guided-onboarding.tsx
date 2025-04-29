
import { useState } from "react";
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

export function GuidedOnboarding({ onClose }: { onClose: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps: Step[] = [
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: "Welcome to Web3 Security Marketplace",
      description: "Discover how our platform connects you with expert security auditors to protect your blockchain projects.",
      action: "Start tour"
    },
    {
      icon: <FileCheck className="h-10 w-10 text-secondary" />,
      title: "Find Security Services",
      description: "Browse verified auditors, compare services, and choose the right security solution for your project.",
      action: "Next"
    },
    {
      icon: <Users className="h-10 w-10 text-web3-orange" />,
      title: "Build Your Profile",
      description: "Create your profile to showcase your expertise or to make requesting audits easier.",
      action: "Finish"
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      toast.success("Welcome aboard!", {
        description: "You're all set to explore the marketplace"
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
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
                className={`h-2 w-2 rounded-full ${index === currentStep ? "bg-primary" : "bg-muted"}`}
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
