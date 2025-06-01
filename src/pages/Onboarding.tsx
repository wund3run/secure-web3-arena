
import React from 'react';
import { OnboardingWizard } from '@/components/onboarding/OnboardingWizard';
import { useAuth } from '@/contexts/auth';
import { Navigate } from 'react-router-dom';
import LoadingState from '@/components/ui/loading-state';

const Onboarding: React.FC = () => {
  const { user, loading, userProfile } = useAuth();

  if (loading) {
    return <LoadingState message="Loading..." />;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // If user already completed onboarding, redirect to dashboard
  if (userProfile?.user_type) {
    const dashboardPath = userProfile.user_type === 'auditor' 
      ? '/dashboard/auditor' 
      : '/dashboard/project';
    return <Navigate to={dashboardPath} replace />;
  }

  return <OnboardingWizard />;
};

export default Onboarding;
