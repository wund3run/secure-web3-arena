
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Code, Users, CheckCircle } from "lucide-react";

interface OnboardingStepProps {
  title: string;
  description: string;
  icon: React.ElementType;
  active: boolean;
  completed: boolean;
  onClick: () => void;
}

const OnboardingStep = ({ title, description, icon: Icon, active, completed, onClick }: OnboardingStepProps) => {
  return (
    <div 
      className={`flex items-center p-4 rounded-lg cursor-pointer transition-all
        ${active ? 'bg-primary/10 border-primary' : 'bg-card border-border/30'} 
        ${completed ? 'border-secondary' : ''}
        border hover:border-primary`}
      onClick={onClick}
    >
      <div className={`flex items-center justify-center w-12 h-12 rounded-full mr-4 
        ${active ? 'bg-primary/20' : 'bg-secondary/10'}`}>
        {completed ? (
          <CheckCircle className="h-6 w-6 text-secondary" />
        ) : (
          <Icon className={`h-6 w-6 ${active ? 'text-primary' : 'text-muted-foreground'}`} />
        )}
      </div>
      <div className="flex-1">
        <h3 className={`font-semibold ${active ? 'text-primary' : 'text-foreground'}`}>{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export function OnboardingPaths() {
  const [activeTab, setActiveTab] = useState("auditor");
  const [currentStep, setCurrentStep] = useState(0);

  const auditorSteps = [
    {
      title: "Verify Security Expertise",
      description: "Provide credentials, certifications, and proof of expertise",
      icon: Shield
    },
    {
      title: "Technical Assessment",
      description: "Complete technical challenges to demonstrate your skills",
      icon: Code
    },
    {
      title: "Join Security Community",
      description: "Connect with other security professionals and start building your reputation",
      icon: Users
    }
  ];

  const clientSteps = [
    {
      title: "Project Details",
      description: "Provide information about your blockchain project",
      icon: Code
    },
    {
      title: "Security Needs Assessment",
      description: "Identify your specific security requirements and risk profile",
      icon: Shield
    },
    {
      title: "Connect with Security Experts",
      description: "Get matched with the best security professionals for your needs",
      icon: Users
    }
  ];

  const handleNext = () => {
    const steps = activeTab === "auditor" ? auditorSteps : clientSteps;
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentSteps = activeTab === "auditor" ? auditorSteps : clientSteps;

  return (
    <Card className="w-full border-border/30 shadow-md">
      <CardHeader className="pb-0">
        <CardTitle className="text-2xl font-bold text-center">Join Our Security Ecosystem</CardTitle>
        <CardDescription className="text-center max-w-xl mx-auto">
          Choose your path to get started with our Web3 security marketplace
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 w-full mb-6">
            <TabsTrigger value="auditor" className="text-base py-3">
              <Shield className="w-4 h-4 mr-2" />
              Security Provider
            </TabsTrigger>
            <TabsTrigger value="client" className="text-base py-3">
              <Code className="w-4 h-4 mr-2" />
              Project Owner
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="auditor" className="mt-0">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold">Become a Security Provider</h3>
              <p className="text-muted-foreground">
                Join our network of elite security professionals and earn rewards for securing Web3 projects
              </p>
            </div>
            
            <div className="space-y-4 mb-8">
              {auditorSteps.map((step, index) => (
                <OnboardingStep
                  key={index}
                  title={step.title}
                  description={step.description}
                  icon={step.icon}
                  active={currentStep === index}
                  completed={currentStep > index}
                  onClick={() => setCurrentStep(index)}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="client" className="mt-0">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold">Secure Your Project</h3>
              <p className="text-muted-foreground">
                Get matched with the best security professionals for your blockchain project
              </p>
            </div>
            
            <div className="space-y-4 mb-8">
              {clientSteps.map((step, index) => (
                <OnboardingStep
                  key={index}
                  title={step.title}
                  description={step.description}
                  icon={step.icon}
                  active={currentStep === index}
                  completed={currentStep > index}
                  onClick={() => setCurrentStep(index)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={handlePrevious}
          disabled={currentStep === 0}
        >
          Previous
        </Button>
        <Button onClick={handleNext} disabled={currentStep === currentSteps.length - 1}>
          {currentStep === currentSteps.length - 1 ? "Complete" : "Next"}
        </Button>
      </CardFooter>
    </Card>
  );
}
