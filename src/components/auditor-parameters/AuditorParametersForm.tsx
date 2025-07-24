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
import { ExperienceStep } from "./steps/ExperienceStep";
import { ToolsMethodsStep } from "./steps/ToolsMethodsStep";
import { PreferencesStep } from "./steps/PreferencesStep";
import { StepNavigation } from "./StepNavigation";
import { 
  expertiseAreas, 
  blockchainOptions, 
  securityToolOptions, 
  experienceOptions 
} from "./formOptions";
import { useAuth } from "@/contexts/auth";
import { supabase } from "@/integrations/supabase/client";

export function AuditorParametersForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const [progress, setProgress] = useState(20);
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const steps = [
    { title: "Basic Information", icon: <User className="h-5 w-5" /> },
    { title: "Expertise & Skills", icon: <Code className="h-5 w-5" /> },
    { title: "Experience", icon: <Briefcase className="h-5 w-5" /> },
    { title: "Tools & Methods", icon: <Shield className="h-5 w-5" /> },
    { title: "Preferences", icon: <Star className="h-5 w-5" /> },
  ];
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      walletAddress: "",
      githubProfile: "",
      personalWebsite: "",
      yearsExperience: "1-3" as const,
      primaryExpertise: [] as string[],
      blockchainExpertise: [] as string[],
      solidity: 5,
      rust: 0,
      vyper: 0,
      securityTools: [] as string[],
      staticAnalysis: false,
      formalVerification: false,
      fuzzTesting: false,
      completedAudits: 0,
      pastProjects: "",
      experienceTypes: [] as string[],
      responseTime: "48h" as const,
      availability: "full-time" as const,
      projectPreference: "",
      certifications: "",
      specializedCredentials: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    if (!user) {
      toast.error("Please log in to save your profile");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Convert years experience string to number for database
      const convertYearsExperience = (exp: string): number => {
        switch (exp) {
          case "0-1": return 1;
          case "1-3": return 2;
          case "3-5": return 4;
          case "5+": return 6;
          default: return 2;
        }
      };

      // Save to auditor_profiles table
      const { error: profileError } = await supabase
        .from('auditor_profiles')
        .upsert({
          user_id: user.id,
          years_experience: convertYearsExperience(values.yearsExperience),
          hourly_rate_min: 50, // Default values, can be updated later
          hourly_rate_max: 200,
          verification_status: 'pending',
          availability_status: values.availability,
          blockchain_expertise: values.blockchainExpertise,
          specialization_tags: values.primaryExpertise,
          total_audits_completed: values.completedAudits,
          success_rate: 100, // Default for new auditors
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });

      if (profileError) throw profileError;

      // Update extended_profiles with additional info
      const { error: extendedError } = await supabase
        .from('extended_profiles')
        .upsert({
          id: user.id,
          full_name: values.fullName,
          wallet_address: values.walletAddress,
          github_profile: values.githubProfile,
          personal_website: values.personalWebsite,
          skills: [
            ...(values.solidity > 0 ? [`Solidity (${values.solidity}/10)`] : []),
            ...(values.rust > 0 ? [`Rust (${values.rust}/10)`] : []),
            ...(values.vyper > 0 ? [`Vyper (${values.vyper}/10)`] : []),
            ...values.securityTools
          ],
          certifications: values.certifications,
          specialized_credentials: values.specializedCredentials,
          verification_status: 'pending',
          updated_at: new Date().toISOString()
        });

      if (extendedError) throw extendedError;

      toast.success("Profile successfully created!", {
        description: "You'll now be matched with projects that fit your expertise.",
      });
      
      // Navigate to auditor dashboard
      navigate("/dashboard/auditor");
      
    } catch (error) {
      console.error('Profile creation error:', error);
      toast.error("Failed to save profile", {
        description: "Please try again or contact support if the issue persists."
      });
    } finally {
      setIsSubmitting(false);
    }
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
    // Ensure we're working with an array
    const arrayValues = Array.isArray(currentValues) ? currentValues : [];
    const updatedValues = arrayValues.includes(value)
      ? arrayValues.filter((v: string) => v !== value)
      : [...arrayValues, value];
    
    form.setValue(field as any, updatedValues);
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
