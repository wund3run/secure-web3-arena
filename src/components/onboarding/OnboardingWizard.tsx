import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSupabaseClient } from '@/lib/supabase';
import { useToast } from '@/lib/toast';
import { Button } from '@/components/ui/button';
import { 
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from '@/components/ui/card';
import PersonalInfoForm from './PersonalInfoForm';
import AccountTypeForm from './AccountTypeForm';
import SkillsForm from './SkillsForm';
import ProjectDetailsForm from './ProjectDetailsForm';
import FormStepIndicator from './FormStepIndicator';

// Form step components
// Onboarding steps data

// Onboarding steps data
const steps = [
  { title: 'Personal Info', description: 'Basic information about you' },
  { title: 'Account Type', description: 'Choose your role on the platform' },
  { title: 'Auditor Details', description: 'Your security expertise', auditorOnly: true },
  { title: 'Project Details', description: 'About your project', projectOwnerOnly: true },
  { title: 'Review', description: 'Confirm your details' }
];

export type OnboardingData = {
  personalInfo: {
    name: string;
    email: string;
    country: string;
    timezone: string;
    language: string;
  };
  accountType: {
    userType: 'auditor' | 'project-owner';
  };
  skillsData?: {
    specializations: string[];
    experience: string;
    github: string;
    portfolio?: string;
  };
  projectData?: {
    projectName: string;
    description: string;
    projectType: string;
    teamSize: string;
    development: string;
  };
};

export default function OnboardingWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    personalInfo: {
      name: '',
      email: '',
      country: '',
      timezone: '',
      language: '',
    },
    accountType: {
      userType: 'auditor',
    },
  });

  const navigate = useNavigate();
  const supabase = useSupabaseClient();
  const { toast } = useToast();

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const updateData = (stepData: Partial<OnboardingData>) => {
    setOnboardingData((prev) => ({
      ...prev,
      ...stepData,
    }));
    handleNext();
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const data = onboardingData;
      const userType = data.accountType.userType;

      // Get current user
      const { data: userData, error: userError } = await supabase.auth.getUser();
      
      if (userError || !userData.user) throw new Error('User not authenticated');
      
      const userId = userData.user.id;
      
      // Update user profile in main profiles table
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          full_name: data.personalInfo.name,
          country: data.personalInfo.country,
          timezone: data.personalInfo.timezone,
          preferred_language: data.personalInfo.language,
          user_type: userType,
          onboarding_completed: true
        })
        .eq('id', userId);
      
      if (profileError) throw profileError;

      // Create project owner profile if applicable
      if (userType === 'project-owner' && data.projectData) {
        const { error: projectError } = await supabase
          .from('projects')
          .insert({
            owner_id: userId,
            name: data.projectData.projectName,
            description: data.projectData.description,
            project_type: data.projectData.projectType,
            team_size: data.projectData.teamSize,
            development_stage: data.projectData.development
          });
        
        if (projectError) throw projectError;
      }
      
      // Create auditor profile if applicable
      if (userType === 'auditor' && data.skillsData) {
        const { error: auditorError } = await supabase
          .from('auditor_profiles')
          .insert({
            user_id: userId,
            github_handle: data.skillsData.github,
            portfolio_url: data.skillsData.portfolio,
            specializations: data.skillsData.specializations,
            years_of_experience: data.skillsData.experience,
            verification_status: 'pending'
        });
        
        if (auditorError) throw auditorError;
      }

      toast({
        title: 'Welcome to Hawkly!',
        description: 'Your profile has been set up successfully.',
        variant: 'default',
      });

      // Navigate to appropriate dashboard
      navigate(userType === 'auditor' ? '/auditor/dashboard' : '/project-dashboard');
    } catch (error) {
      console.error('Onboarding completion error:', error);
      toast({
        title: 'Failed to complete onboarding',
        description: 'Please try again or contact support.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <PersonalInfoForm onNext={updateData} data={onboardingData.personalInfo} />;
      case 1:
        return <AccountTypeForm onNext={updateData} data={onboardingData.accountType} />;
      case 2:
        if (onboardingData.accountType.userType === 'auditor') {
          return <SkillsForm onNext={updateData} />;
        } else {
          return <ProjectDetailsForm onNext={updateData} />;
        }
      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Review Your Information</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">Personal Information</h4>
                <p>Name: {onboardingData.personalInfo.name}</p>
                <p>Email: {onboardingData.personalInfo.email}</p>
                <p>Country: {onboardingData.personalInfo.country}</p>
              </div>
              
              <div>
                <h4 className="font-medium">Account Type</h4>
                <p>{onboardingData.accountType.userType === 'auditor' ? 'Auditor' : 'Project Owner'}</p>
              </div>
              
              {onboardingData.accountType.userType === 'auditor' && onboardingData.skillsData && (
                <div>
                  <h4 className="font-medium">Skills & Experience</h4>
                  <p>Experience: {onboardingData.skillsData.experience}</p>
                  <p>Specializations: {onboardingData.skillsData.specializations.join(', ')}</p>
                </div>
              )}
              
              {onboardingData.accountType.userType === 'project-owner' && onboardingData.projectData && (
                <div>
                  <h4 className="font-medium">Project Details</h4>
                  <p>Project: {onboardingData.projectData.projectName}</p>
                  <p>Type: {onboardingData.projectData.projectType}</p>
                </div>
              )}
            </div>
            
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Complete Onboarding'}
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto py-8">
      <Card className="border-hawkly-primary/20 shadow-lg shadow-hawkly-accent/5">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Welcome to Hawkly Platform
          </CardTitle>
          <FormStepIndicator
            steps={steps}
            currentStep={currentStep}
            userType={onboardingData.accountType.userType}
          />
        </CardHeader>
        <CardContent>
          {renderStepContent()}
          
          <div className="flex justify-between mt-8">
            {currentStep > 0 && (
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
            )}
            
            {currentStep < 3 && (
              <Button onClick={handleNext}>
                Next
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
