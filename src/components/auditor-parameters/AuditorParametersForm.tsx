
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { User, Code, Shield, Briefcase, Star } from "lucide-react";
import { AuditorProfileProgress } from "./AuditorProfileProgress";
import { formSchema, FormValues } from "./types";
import { BasicInformationStep } from "./steps/BasicInformationStep";
import { ExpertiseSkillsStep } from "./steps/ExpertiseSkillsStep";
import { ToolsMethodsStep } from "./steps/ToolsMethodsStep";
import { ExperienceStep } from "./steps/ExperienceStep";
import { PreferencesStep } from "./steps/PreferencesStep";
import { StepNavigation } from "./StepNavigation";
import { 
  expertiseAreas, 
  blockchainOptions, 
  securityToolOptions, 
  experienceOptions 
} from "./formOptions";

export function AuditorParametersForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const [progress, setProgress] = useState(20);
  
  const steps = [
    { title: "Basic Information", icon: <User className="h-5 w-5" /> },
    { title: "Expertise & Skills", icon: <Code className="h-5 w-5" /> },
    { title: "Tools & Methods", icon: <Shield className="h-5 w-5" /> },
    { title: "Experience", icon: <Briefcase className="h-5 w-5" /> },
    { title: "Preferences", icon: <Star className="h-5 w-5" /> },
  ];
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      walletAddress: "",
      githubProfile: "",
      personalWebsite: "",
      yearsExperience: "1-3",
      primaryExpertise: [],
      blockchainExpertise: [],
      solidity: 5,
      rust: 0,
      vyper: 0,
      securityTools: [],
      staticAnalysis: false,
      formalVerification: false,
      fuzzTesting: false,
      completedAudits: 0,
      pastProjects: "",
      experienceTypes: [],
      responseTime: "48h",
      availability: "full-time",
      projectPreference: "",
      certifications: "",
      specializedCredentials: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    console.log(values);
    toast.success("Profile successfully created!", {
      description: "You'll now be matched with projects that fit your expertise.",
    });
    navigate("/");
  };

  const nextStep = () => {
    setCurrentStep((prev) => {
      const newStep = prev + 1;
      setProgress((newStep + 1) * 20);
      return newStep;
    });
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setCurrentStep((prev) => {
      const newStep = Math.max(0, prev - 1);
      setProgress((newStep + 1) * 20);
      return newStep;
    });
    window.scrollTo(0, 0);
  };

  const handleArrayToggle = (field: string, value: string) => {
    const currentValues = form.getValues(field as any) || [];
    const updatedValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    
    form.setValue(field as any, updatedValues as any);
  };

  // Render current step component
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <BasicInformationStep form={form} />;
      case 1:
        return (
          <ExpertiseSkillsStep 
            form={form} 
            handleArrayToggle={handleArrayToggle}
            expertiseAreas={expertiseAreas}
            blockchainOptions={blockchainOptions}
          />
        );
      case 2:
        return (
          <ExperienceStep 
            form={form} 
            handleArrayToggle={handleArrayToggle}
            experienceOptions={experienceOptions}
          />
        );
      case 3:
        return (
          <ToolsMethodsStep 
            form={form} 
            handleArrayToggle={handleArrayToggle}
            securityToolOptions={securityToolOptions}
          />
        );
      case 4:
        return <PreferencesStep form={form} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <AuditorProfileProgress currentStep={currentStep} progress={progress} steps={steps} />
      
      <Card className="border border-border/40 rounded-xl shadow-sm">
        <CardContent className="p-6 md:p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {renderStepContent()}
              
              <StepNavigation 
                currentStep={currentStep}
                totalSteps={steps.length}
                onPrevious={prevStep}
                onNext={nextStep}
                onSubmit={form.handleSubmit(onSubmit)}
                onCancel={() => navigate("/")}
              />
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
