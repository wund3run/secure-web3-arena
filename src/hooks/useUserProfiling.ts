
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth';
import { useBehaviorTracking } from './user-profiling/useBehaviorTracking';
import { getUserSegment } from './user-profiling/userProfilingUtils';
import { getLocalPreferences, savePreferences } from './user-profiling/useLocalStorage';
import { UserPreferences, UserJourneyProfile } from '@/types/user-profiling';

export const useUserProfiling = () => {
  const { user, userProfile } = useAuth();
  const { behaviorProfile, setBehaviorProfile, trackBehavior } = useBehaviorTracking(user?.id);
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [journeyProfile, setJourneyProfile] = useState<UserJourneyProfile | null>(null);

  // Load preferences on mount
  useEffect(() => {
    const stored = getLocalPreferences();
    if (stored) {
      setPreferences(stored);
    } else {
      // Create default preferences
      const defaultPrefs: UserPreferences = {
        userId: user?.id || 'anonymous',
        theme: 'system',
        language: 'en',
        dashboardLayout: 'cards',
        experienceLevel: 'intermediate',
        timezone: 'UTC',
        preferredCommunication: 'email',
        urgencyPreference: 'standard',
        notifications: {
          email: true,
          push: false,
          sms: false
        },
        notificationSettings: {
          auditUpdates: true,
          newMessages: true,
          paymentAlerts: true,
          securityAlerts: true,
          marketingEmails: false
        },
        accessibility: {
          reducedMotion: false,
          highContrast: false,
          fontSize: 'medium'
        },
        privacy: {
          analytics: true,
          marketing: false,
          personalization: true
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setPreferences(defaultPrefs);
      savePreferences(defaultPrefs);
    }
  }, [user?.id]);

  // Initialize behavior profile for new users
  useEffect(() => {
    if (user && !behaviorProfile) {
      const initialProfile = {
        userId: user.id,
        visitCount: 1,
        lastVisit: new Date().toISOString(),
        totalTimeSpent: 0,
        averageSessionDuration: 0,
        deviceType: 'desktop' as const,
        pagesVisited: [window.location.pathname],
        mostVisitedPages: [window.location.pathname],
        completedActions: [],
        preferences: {},
        engagementScore: 1,
        conversionEvents: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setBehaviorProfile(initialProfile);
    }
  }, [user, behaviorProfile, setBehaviorProfile]);

  // Initialize journey profile
  useEffect(() => {
    if (user && !journeyProfile) {
      const initialJourney: UserJourneyProfile = {
        userId: user.id,
        currentStage: 'visitor',
        stageHistory: [{ stage: 'visitor', timestamp: new Date().toISOString() }],
        nextRecommendedActions: ['explore_services', 'view_auditor_profiles'],
        progressScore: 10,
        blockers: [],
        opportunities: ['start_onboarding']
      };
      setJourneyProfile(initialJourney);
    }
  }, [user, journeyProfile]);

  const updatePreferences = (newPreferences: Partial<UserPreferences>) => {
    if (preferences) {
      const updated = {
        ...preferences,
        ...newPreferences,
        updatedAt: new Date().toISOString()
      };
      setPreferences(updated);
      savePreferences(updated);
    }
  };

  const getUserSegmentValue = () => {
    return getUserSegment(behaviorProfile, userProfile?.user_type);
  };

  const getRecommendedActions = () => {
    if (!journeyProfile) return [];
    return journeyProfile.nextRecommendedActions;
  };

  return {
    preferences,
    behaviorProfile,
    journeyProfile,
    updatePreferences,
    trackBehavior,
    getUserSegment: getUserSegmentValue,
    getRecommendedActions
  };
};
