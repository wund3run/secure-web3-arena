
import React, { useState } from 'react';
import { useAuth } from '@/contexts/auth';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { UserTypeSelection } from './steps/UserTypeSelection';
import { ProfileSetup } from './steps/ProfileSetup';
import { SkillsAndExpertise } from './steps/SkillsAndExpertise';
import { VerificationStep } from './steps/VerificationStep';
import { CompletionStep } from './steps/CompletionStep';
import { toast } from 'sonner';

export type UserType = 'auditor' | 'project_owner';

interface OnboardingData {
  userType: UserType | null;
  profileData: {
    fullName: string;
    displayName: string;
    bio: string;
    website: string;
    socialLinks: Record<string, string>;
  };
  skillsData: {
    skills: string[];
    specializations: string[];
    experience: number;
    blockchainExpertise: string[];
  };
  verificationData: {
    documents: File[];
    portfolioLinks: string[];
    githubUsername: string;
    linkedinUrl: string;
  };
}

const initialData: OnboardingData = {
  userType: null,
  profileData: {
    fullName: '',
    displayName: '',
    bio: '',
    website: '',
    socialLinks: {}
  },
  skillsData: {
    skills: [],
    specializations: [],
    experience: 0,
    blockchainExpertise: []
  },
  verificationData: {
    documents: [],
    portfolioLinks: [],
    githubUsername: '',
    linkedinUrl: ''
  }
};

export const OnboardingWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<OnboardingData>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const updateData = (stepData: Partial<OnboardingData>) => {
    setData(prev => ({ ...prev, ...stepData }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const completeOnboarding = async () => {
    if (!user || !data.userType) return;

    setIsSubmitting(true);
    try {
      // Update user profile with onboarding data
      await updateProfile({
        full_name: data.profileData.fullName,
        display_name: data.profileData.displayName,
        bio: data.profileData.bio,
        website: data.profileData.website,
        social_links: data.profileData.socialLinks,
        user_type: data.userType,
        skills: data.skillsData.skills,
        specializations: data.skillsData.specializations,
        years_of_experience: data.skillsData.experience,
        verification_status: 'pending'
      });

      toast.success('Onboarding completed successfully!');
      
      // Redirect based on user type
      const redirectPath = data.userType === 'auditor' 
        ? '/dashboard/auditor' 
        : '/dashboard/project';
      
      navigate(redirectPath, { replace: true });
    } catch (error) {
      console.error('Onboarding completion error:', error);
      toast.error('Failed to complete onboarding. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <UserTypeSelection 
            selected={data.userType}
            onSelect={(userType) => updateData({ userType })}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <ProfileSetup
            data={data.profileData}
            userType={data.userType}
            onChange={(profileData) => updateData({ profileData })}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 3:
        return (
          <SkillsAndExpertise
            data={data.skillsData}
            userType={data.userType}
            onChange={(skillsData) => updateData({ skillsData })}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 4:
        return (
          <VerificationStep
            data={data.verificationData}
            userType={data.userType}
            onChange={(verificationData) => updateData({ verificationData })}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 5:
        return (
          <CompletionStep
            data={data}
            onComplete={completeOnboarding}
            onPrev={prevStep}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 py-8">
      <div className="container max-w-2xl mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Welcome to Hawkly</CardTitle>
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-muted-foreground text-center">
                Step {currentStep} of {totalSteps}
              </p>
            </div>
          </CardHeader>
          <CardContent>
            {renderStep()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
