
import React from "react";
import { CheckCircle, User, Code, Briefcase, Shield, FileCheck } from "lucide-react";

interface ServiceProviderStepsProps {
  providerType: "auditor" | "service";
  currentStep: number;
  totalSteps: number;
}

export function ServiceProviderSteps({ providerType, currentStep, totalSteps }: ServiceProviderStepsProps) {
  // Define the steps based on provider type
  const stepConfig = [
    {
      title: "Basic Info",
      description: "Personal and contact information",
      icon: <User className="h-5 w-5" />,
      completed: currentStep > 0
    },
    {
      title: "Expertise",
      description: "Technical skills and specializations",
      icon: <Code className="h-5 w-5" />,
      completed: currentStep > 1
    },
    {
      title: "Experience",
      description: "Track record and past projects",
      icon: <Briefcase className="h-5 w-5" />,
      completed: currentStep > 2
    },
    {
      title: providerType === "service" ? "Services" : "Methodology",
      description: providerType === "service" 
        ? "Service offerings and capabilities" 
        : "Audit process and methodologies",
      icon: <Shield className="h-5 w-5" />,
      completed: currentStep > 3
    },
    {
      title: "Verification",
      description: "Final steps and agreements",
      icon: <FileCheck className="h-5 w-5" />,
      completed: currentStep > 4
    }
  ];

  return (
    <div className="mb-8 px-2">
      <div className="flex flex-col md:flex-row justify-between">
        {stepConfig.map((step, index) => (
          <div 
            key={index} 
            className={`flex items-center ${index < stepConfig.length - 1 ? 'mb-4 md:mb-0' : ''}`}
          >
            <div className="relative">
              <div 
                className={`w-10 h-10 flex items-center justify-center rounded-full
                  ${currentStep === index 
                    ? 'bg-primary text-primary-foreground' 
                    : step.completed 
                      ? 'bg-primary/20 text-primary' 
                      : 'bg-muted text-muted-foreground'
                  }`}
              >
                {step.completed ? <CheckCircle className="h-5 w-5" /> : step.icon}
              </div>
              {index < stepConfig.length - 1 && (
                <div className="hidden md:block absolute top-1/2 left-full w-full h-0.5 -translate-y-1/2 bg-border">
                  <div 
                    className="h-full bg-primary transition-all" 
                    style={{ width: step.completed ? '100%' : '0%' }}
                  />
                </div>
              )}
            </div>
            
            <div className="ml-3 md:hidden">
              <p className={`text-sm font-medium ${currentStep === index ? 'text-primary' : ''}`}>
                {step.title}
              </p>
              <p className="text-xs text-muted-foreground hidden sm:block">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Current step details - only visible on medium screens and up */}
      <div className="hidden md:block text-center mt-4">
        <p className="font-medium">{stepConfig[currentStep].title}</p>
        <p className="text-sm text-muted-foreground">{stepConfig[currentStep].description}</p>
      </div>
    </div>
  );
}
