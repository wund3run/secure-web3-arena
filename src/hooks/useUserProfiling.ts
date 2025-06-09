
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/auth';

export interface UserBehaviorProfile {
  visitCount: number;
  averageSessionTime: number;
  preferredSections: string[];
  interactionPatterns: Record<string, number>;
  lastVisit: string;
  deviceType: 'mobile' | 'tablet' | 'desktop';
  preferredContentType: 'visual' | 'textual' | 'interactive';
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  notifications: boolean;
  autoPlay: boolean;
  reducedMotion: boolean;
  compactMode: boolean;
  notificationSettings?: {
    auditUpdates: boolean;
    newMessages: boolean;
    paymentAlerts: boolean;
    securityAlerts: boolean;
    marketingEmails: boolean;
  };
}

export function useUserProfiling() {
  const { user } = useAuth();
  const [behaviorProfile, setBehaviorProfile] = useState<UserBehaviorProfile | null>(null);
  const [preferences, setPreferences] = useState<UserPreferences>({
    theme: 'light',
    language: 'en',
    notifications: true,
    autoPlay: false,
    reducedMotion: false,
    compactMode: false,
    notificationSettings: {
      auditUpdates: true,
      newMessages: true,
      paymentAlerts: true,
      securityAlerts: true,
      marketingEmails: false
    }
  });

  // Initialize user profiling
  useEffect(() => {
    const initializeProfile = () => {
      const stored = localStorage.getItem('hawkly_user_profile');
      if (stored) {
        try {
          setBehaviorProfile(JSON.parse(stored));
        } catch (error) {
          console.warn('Failed to parse user profile:', error);
        }
      } else {
        // Create new profile
        const newProfile: UserBehaviorProfile = {
          visitCount: 1,
          averageSessionTime: 0,
          preferredSections: [],
          interactionPatterns: {},
          lastVisit: new Date().toISOString(),
          deviceType: getDeviceType(),
          preferredContentType: 'visual'
        };
        setBehaviorProfile(newProfile);
        localStorage.setItem('hawkly_user_profile', JSON.stringify(newProfile));
      }
    };

    initializeProfile();
  }, []);

  // Track user interactions
  const trackInteraction = useCallback((section: string, interactionType: string) => {
    setBehaviorProfile(prev => {
      if (!prev) return prev;
      
      const updated = {
        ...prev,
        interactionPatterns: {
          ...prev.interactionPatterns,
          [`${section}_${interactionType}`]: (prev.interactionPatterns[`${section}_${interactionType}`] || 0) + 1
        }
      };
      
      localStorage.setItem('hawkly_user_profile', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Track behavior (alias for trackInteraction)
  const trackBehavior = useCallback((action: string, metadata?: any) => {
    trackInteraction('general', action);
  }, [trackInteraction]);

  // Update preferences
  const updatePreferences = useCallback((newPreferences: Partial<UserPreferences>) => {
    setPreferences(prev => {
      const updated = { ...prev, ...newPreferences };
      localStorage.setItem('hawkly_user_preferences', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Get user segment for personalization
  const getUserSegment = useCallback(() => {
    if (!behaviorProfile) return 'new_visitor';
    
    if (behaviorProfile.visitCount === 1) return 'new_visitor';
    if (behaviorProfile.visitCount < 5) return 'returning_visitor';
    if (behaviorProfile.averageSessionTime > 300) return 'engaged_user';
    if (user) return 'authenticated_user';
    
    return 'casual_visitor';
  }, [behaviorProfile, user]);

  // Get recommended actions
  const getRecommendedActions = useCallback(() => {
    const segment = getUserSegment();
    const actions = [];
    
    switch (segment) {
      case 'new_visitor':
        actions.push('explore_services', 'learn_about_audits');
        break;
      case 'returning_visitor':
        actions.push('create_account', 'request_audit');
        break;
      case 'engaged_user':
        actions.push('start_first_audit', 'browse_auditors');
        break;
      case 'authenticated_user':
        actions.push('submit_audit_request', 'view_dashboard');
        break;
    }
    
    return actions;
  }, [getUserSegment]);

  // Mock journey profile
  const journeyProfile = {
    currentStage: 'visitor' as const,
    progressScore: behaviorProfile ? Math.min(100, behaviorProfile.visitCount * 10) : 0
  };

  return {
    behaviorProfile,
    preferences,
    trackInteraction,
    trackBehavior,
    updatePreferences,
    getUserSegment,
    getRecommendedActions,
    journeyProfile
  };
}

function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}
