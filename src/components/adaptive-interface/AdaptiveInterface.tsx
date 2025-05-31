
import React from 'react';
import { useUserProfiling } from '@/hooks/useUserProfiling';
import { useAuth } from '@/contexts/auth';
import { AdaptiveContent } from './AdaptiveContent';
import { AdaptiveNavigation } from './AdaptiveNavigation';
import { AdaptiveDashboard } from './AdaptiveDashboard';
import { PersonalizedRecommendations } from './PersonalizedRecommendations';

interface AdaptiveInterfaceProps {
  children: React.ReactNode;
  variant?: 'full' | 'minimal' | 'dashboard-only';
}

export function AdaptiveInterface({ children, variant = 'full' }: AdaptiveInterfaceProps) {
  const { user, userProfile } = useAuth();
  const { preferences, behaviorProfile, getUserSegment } = useUserProfiling();
  
  const userSegment = getUserSegment();
  const userType = userProfile?.user_type || 'general';
  
  // Don't render adaptive interface for new visitors to avoid layout shift
  if (!behaviorProfile || behaviorProfile.visitCount < 2) {
    return <>{children}</>;
  }

  const adaptiveProps = {
    userSegment,
    userType,
    preferences,
    behaviorProfile,
    isAuthenticated: !!user
  };

  if (variant === 'dashboard-only') {
    return (
      <>
        <AdaptiveDashboard {...adaptiveProps} />
        {children}
      </>
    );
  }

  if (variant === 'minimal') {
    return (
      <>
        <AdaptiveContent {...adaptiveProps}>
          {children}
        </AdaptiveContent>
      </>
    );
  }

  return (
    <div className="adaptive-interface">
      <AdaptiveNavigation {...adaptiveProps} />
      <AdaptiveContent {...adaptiveProps}>
        {children}
      </AdaptiveContent>
      <PersonalizedRecommendations {...adaptiveProps} />
    </div>
  );
}
