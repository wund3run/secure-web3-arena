
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth';
import { FirstTimeUserExperience } from './FirstTimeUserExperience';
import { OnboardingFlow } from './OnboardingFlow';
import { GuidedTour } from './GuidedTour';

interface OnboardingState {
  showFirstTime: boolean;
  showFlow: boolean;
  showTour: boolean;
  tourStep: string | null;
}

export function OnboardingManager() {
  const { user, userProfile } = useAuth();
  const [onboardingState, setOnboardingState] = useState<OnboardingState>({
    showFirstTime: false,
    showFlow: false,
    showTour: false,
    tourStep: null
  });

  useEffect(() => {
    if (!user) return;

    const hasCompletedOnboarding = localStorage.getItem('hawkly-onboarding-completed');
    const hasSeenFirstTime = localStorage.getItem('hawkly-first-time-seen');
    const currentPath = window.location.pathname;

    // Show first time experience for completely new users
    if (!hasSeenFirstTime && !hasCompletedOnboarding) {
      setOnboardingState(prev => ({ ...prev, showFirstTime: true }));
      return;
    }

    // Show onboarding flow for users who haven't completed it
    if (!hasCompletedOnboarding && !userProfile?.user_type) {
      setOnboardingState(prev => ({ ...prev, showFlow: true }));
      return;
    }

    // Check if we should show guided tour for specific pages
    const tourTriggers = {
      '/dashboard': 'dashboard-tour',
      '/marketplace': 'marketplace-tour',
      '/request-audit': 'request-audit-tour'
    };

    const tourKey = tourTriggers[currentPath as keyof typeof tourTriggers];
    if (tourKey && !localStorage.getItem(`hawkly-tour-${tourKey}`)) {
      setOnboardingState(prev => ({ ...prev, showTour: true, tourStep: tourKey }));
    }
  }, [user, userProfile]);

  const handleFirstTimeComplete = () => {
    localStorage.setItem('hawkly-first-time-seen', 'true');
    setOnboardingState(prev => ({ ...prev, showFirstTime: false, showFlow: true }));
  };

  const handleFlowComplete = () => {
    setOnboardingState(prev => ({ ...prev, showFlow: false }));
  };

  const handleTourComplete = () => {
    if (onboardingState.tourStep) {
      localStorage.setItem(`hawkly-tour-${onboardingState.tourStep}`, 'true');
    }
    setOnboardingState(prev => ({ ...prev, showTour: false, tourStep: null }));
  };

  if (!user) return null;

  return (
    <>
      {onboardingState.showFirstTime && (
        <FirstTimeUserExperience onClose={handleFirstTimeComplete} />
      )}
      
      {onboardingState.showFlow && (
        <OnboardingFlow />
      )}
      
      {onboardingState.showTour && onboardingState.tourStep && (
        <GuidedTour 
          tourType={onboardingState.tourStep}
          onComplete={handleTourComplete}
        />
      )}
    </>
  );
}
