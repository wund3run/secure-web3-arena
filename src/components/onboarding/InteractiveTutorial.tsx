
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, ArrowRight, ArrowLeft, Shield, Users, BarChart3 } from "lucide-react";

interface TutorialStep {
  id: string;
  title: string;
  description: string;
  content: React.ReactNode;
  userTypes: ("project_owner" | "auditor" | "admin")[];
}

interface InteractiveTutorialProps {
  userType: "project_owner" | "auditor" | "admin";
  onComplete: () => void;
}

export function InteractiveTutorial({ userType, onComplete }: InteractiveTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const tutorialSteps: TutorialStep[] = [
    {
      id: "welcome",
      title: "Welcome to Hawkly",
      description: "Let's get you started with the platform",
      userTypes: ["project_owner", "auditor", "admin"],
      content: (
        <div className="space-y-4">
          <div className="text-center">
            <Shield className="h-16 w-16 mx-auto text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Welcome to the Future of Web3 Security</h3>
            <p className="text-muted-foreground">
              Hawkly connects you with top security experts and cutting-edge audit tools
            </p>
          </div>
        </div>
      )
    },
    {
      id: "dashboard_overview",
      title: "Your Dashboard",
      description: "Navigate your personalized control center",
      userTypes: ["project_owner", "auditor", "admin"],
      content: (
        <div className="space-y-4">
          <BarChart3 className="h-12 w-12 text-primary" />
          <div>
            <h4 className="font-semibold mb-2">Dashboard Features</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                Real-time project tracking
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                Performance analytics
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                Quick action buttons
              </li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: "first_action",
      title: userType === "project_owner" ? "Request Your First Audit" : "Browse Available Projects",
      description: userType === "project_owner" ? "Learn how to submit a security audit request" : "Find projects that match your expertise",
      userTypes: ["project_owner", "auditor"],
      content: (
        <div className="space-y-4">
          <Users className="h-12 w-12 text-primary" />
          <div>
            <h4 className="font-semibold mb-2">
              {userType === "project_owner" ? "Getting Started with Audits" : "Finding the Right Projects"}
            </h4>
            <p className="text-sm text-muted-foreground mb-4">
              {userType === "project_owner" 
                ? "Submit your project details and get matched with expert auditors"
                : "Use our advanced filters to find projects that match your skills and interests"
              }
            </p>
            <Button variant="outline" size="sm">
              {userType === "project_owner" ? "Start Audit Request" : "Browse Projects"}
            </Button>
          </div>
        </div>
      )
    }
  ];

  const relevantSteps = tutorialSteps.filter(step => 
    step.userTypes.includes(userType)
  );

  const progress = ((currentStep + 1) / relevantSteps.length) * 100;

  const handleNext = () => {
    const currentStepId = relevantSteps[currentStep]?.id;
    if (currentStepId && !completedSteps.includes(currentStepId)) {
      setCompletedSteps([...completedSteps, currentStepId]);
    }

    if (currentStep < relevantSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentStepData = relevantSteps[currentStep];

  if (!currentStepData) {
    return null;
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary">
            Step {currentStep + 1} of {relevantSteps.length}
          </Badge>
          <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2 mb-4" />
        <CardTitle>{currentStepData.title}</CardTitle>
        <CardDescription>{currentStepData.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          {currentStepData.content}
        </div>
        
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          
          <Button onClick={handleNext}>
            {currentStep === relevantSteps.length - 1 ? "Complete Tutorial" : "Next"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
