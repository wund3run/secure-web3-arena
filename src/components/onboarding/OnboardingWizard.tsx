import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { UserTypeSelection } from './steps/UserTypeSelection';
import { ProfileSetup } from './steps/ProfileSetup';
import { SkillsAssessment } from './steps/SkillsAssessment';
import { VerificationStep } from './steps/VerificationStep';
import { CompletionStep } from './steps/CompletionStep';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export type UserType = 'auditor' | 'project_owner' | null;

export interface ProfileData {
  fullName: string;
  displayName: string;
  bio: string;
  website: string;
  socialLinks: Record<string, string>;
}

export interface SkillsData {
  expertise: string[];
  experience: string;
  certifications: string[];
  languages: string[];
}

export interface OnboardingData {
  userType: UserType;
  profileData: ProfileData;
  skillsData: SkillsData;
}

export const OnboardingWizard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [userType, setUserType] = useState<UserType>(null);
  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: '',
    displayName: '',
    bio: '',
    website: '',
    socialLinks: {}
  });
  const [skillsData, setSkillsData] = useState<SkillsData>({
    expertise: [],
    experience: '',
    certifications: [],
    languages: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const updateData = (stepData: Partial<OnboardingData>) => {
    setData(prev => ({ ...prev, ...stepData }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    if (!user) return;
    
    setIsSubmitting(true);
    try {
      // Update user profile with onboarding data (without user_type since it's in separate table)
      await updateProfile({
        full_name: data.profileData.fullName,
        display_name: data.profileData.displayName,
        bio: data.profileData.bio,
        website: data.profileData.website,
        social_links: data.profileData.socialLinks,
        skills: data.skillsData.skills,
        specializations: data.skillsData.specializations,
        years_of_experience: data.skillsData.experience,
        verification_status: 'pending'
      });

        if (auditorError) throw auditorError;
      }

      toast.success('Welcome to Hawkly!', {
        description: 'Your profile has been set up successfully.'
      });

      // Navigate to appropriate dashboard
      navigate(userType === 'auditor' ? '/auditor/dashboard' : '/project-dashboard');
    } catch (error) {
      console.error('Onboarding completion error:', error);
      toast.error('Failed to complete onboarding', {
        description: 'Please try again or contact support.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderCurrentStep = () => {
    const currentStepType = steps[currentStep]?.component;
    
    switch (currentStepType) {
      case 'welcome':
        return <WelcomeStep onNext={handleNext} />;
      
      case 'userType':
        return (
          <UserTypeSelection
            selected={userType}
            onSelect={setUserType}
            onNext={handleNext}
          />
        );
      
      case 'profile':
        return (
          <ProfileSetup
            data={profileData}
            userType={userType}
            onChange={setProfileData}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        );
      
      case 'skills':
        return (
          <SkillsAssessment
            skillsData={skillsData}
            onSkillsChange={setSkillsData}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        );
      
      case 'verification':
        return (
          <VerificationStep
            userType={userType}
            onComplete={handleComplete}
            isSubmitting={isSubmitting}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <div>
              <CardTitle>Welcome to Hawkly</CardTitle>
              <CardDescription>
                Step {currentStep + 1} of {steps.length}: {steps[currentStep]?.title}
              </CardDescription>
            </div>
            <div className="text-sm text-muted-foreground">
              {Math.round(progress)}%
            </div>
          </div>
          <Progress value={progress} className="w-full" />
        </CardHeader>
        <CardContent>
          {renderCurrentStep()}
          
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentStep === 0}
            >
              Previous
            </Button>
            
            {currentStep === steps.length - 1 ? (
              <Button onClick={handleComplete} disabled={isSubmitting}>
                {isSubmitting ? 'Completing...' : 'Complete Setup'}
              </Button>
            ) : (
              <Button onClick={handleNext}>
                Next
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
