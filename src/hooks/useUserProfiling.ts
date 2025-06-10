import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth';

interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  notifications: boolean;
  language: string;
  timezone: string;
  dashboardLayout: 'compact' | 'detailed' | 'cards';
  autoSave: boolean;
}

interface BehaviorProfile {
  visitCount: number;
  totalTimeSpent: number;
  averageSessionDuration: number;
  preferredPages: string[];
  deviceType: 'mobile' | 'tablet' | 'desktop';
  browserPreference: string;
  timeOfDayActivity: Record<string, number>;
  featureUsage: Record<string, number>;
  lastActiveDate: Date;
  engagementScore: number;
  conversionEvents: number;
}

type UserSegment = 'new_user' | 'regular_user' | 'power_user' | 'at_risk' | 'champion';

export const useUserProfiling = () => {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState<UserPreferences>({
    theme: 'auto',
    notifications: true,
    language: 'en',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    dashboardLayout: 'detailed',
    autoSave: true
  });
  
  const [behaviorProfile, setBehaviorProfile] = useState<BehaviorProfile | null>(null);

  useEffect(() => {
    if (!user) return;

    // Load user preferences from localStorage
    const savedPreferences = localStorage.getItem(`user_preferences_${user.id}`);
    if (savedPreferences) {
      try {
        setPreferences(JSON.parse(savedPreferences));
      } catch (error) {
        console.error('Failed to parse user preferences:', error);
      }
    }

    // Load or initialize behavior profile
    const savedBehavior = localStorage.getItem(`user_behavior_${user.id}`);
    if (savedBehavior) {
      try {
        const parsed = JSON.parse(savedBehavior);
        setBehaviorProfile({
          ...parsed,
          lastActiveDate: new Date(parsed.lastActiveDate)
        });
      } catch (error) {
        console.error('Failed to parse behavior profile:', error);
        initializeBehaviorProfile();
      }
    } else {
      initializeBehaviorProfile();
    }

    // Update behavior on page load
    updateBehaviorProfile();
  }, [user]);

  const initializeBehaviorProfile = () => {
    const profile: BehaviorProfile = {
      visitCount: 1,
      totalTimeSpent: 0,
      averageSessionDuration: 0,
      preferredPages: [],
      deviceType: getDeviceType(),
      browserPreference: getBrowserType(),
      timeOfDayActivity: {},
      featureUsage: {},
      lastActiveDate: new Date(),
      engagementScore: 0.5,
      conversionEvents: 0
    };
    setBehaviorProfile(profile);
  };

  const updateBehaviorProfile = () => {
    if (!user || !behaviorProfile) return;

    const now = new Date();
    const currentHour = now.getHours();
    const currentPath = window.location.pathname;

    setBehaviorProfile(prev => {
      if (!prev) return null;

      const updated = {
        ...prev,
        visitCount: prev.visitCount + 1,
        lastActiveDate: now,
        timeOfDayActivity: {
          ...prev.timeOfDayActivity,
          [currentHour]: (prev.timeOfDayActivity[currentHour] || 0) + 1
        },
        preferredPages: updatePreferredPages(prev.preferredPages, currentPath)
      };

      // Save to localStorage
      localStorage.setItem(`user_behavior_${user.id}`, JSON.stringify(updated));
      return updated;
    });
  };

  const updatePreferredPages = (current: string[], newPage: string): string[] => {
    const updated = [...current];
    const existingIndex = updated.indexOf(newPage);
    
    if (existingIndex > -1) {
      // Move to front if already exists
      updated.splice(existingIndex, 1);
      updated.unshift(newPage);
    } else {
      // Add to front
      updated.unshift(newPage);
    }
    
    // Keep only top 10 pages
    return updated.slice(0, 10);
  };

  const updatePreferences = (newPreferences: Partial<UserPreferences>) => {
    if (!user) return;

    const updated = { ...preferences, ...newPreferences };
    setPreferences(updated);
    localStorage.setItem(`user_preferences_${user.id}`, JSON.stringify(updated));
  };

  const trackFeatureUsage = (feature: string) => {
    if (!user || !behaviorProfile) return;

    setBehaviorProfile(prev => {
      if (!prev) return null;

      const updated = {
        ...prev,
        featureUsage: {
          ...prev.featureUsage,
          [feature]: (prev.featureUsage[feature] || 0) + 1
        }
      };

      localStorage.setItem(`user_behavior_${user.id}`, JSON.stringify(updated));
      return updated;
    });
  };

  const trackConversionEvent = () => {
    if (!user || !behaviorProfile) return;

    setBehaviorProfile(prev => {
      if (!prev) return null;

      const updated = {
        ...prev,
        conversionEvents: prev.conversionEvents + 1,
        engagementScore: Math.min(1, prev.engagementScore + 0.1)
      };

      localStorage.setItem(`user_behavior_${user.id}`, JSON.stringify(updated));
      return updated;
    });
  };

  const getUserSegment = (): UserSegment => {
    if (!behaviorProfile) return 'new_user';

    const { visitCount, engagementScore, conversionEvents, lastActiveDate } = behaviorProfile;
    const daysSinceLastActive = Math.floor((Date.now() - lastActiveDate.getTime()) / (1000 * 60 * 60 * 24));

    if (visitCount < 3) return 'new_user';
    if (daysSinceLastActive > 30) return 'at_risk';
    if (conversionEvents > 5 && engagementScore > 0.8) return 'champion';
    if (visitCount > 20 && engagementScore > 0.6) return 'power_user';
    return 'regular_user';
  };

  const getPersonalizedContent = () => {
    const segment = getUserSegment();
    
    switch (segment) {
      case 'new_user':
        return {
          welcomeMessage: "Welcome to Hawkly! Let's get you started.",
          primaryCTA: "Complete Profile",
          recommendations: ["Take our platform tour", "Set up your first project"]
        };
      case 'regular_user':
        return {
          welcomeMessage: "Welcome back! Ready to continue?",
          primaryCTA: "View Dashboard",
          recommendations: ["Check recent updates", "Explore new features"]
        };
      case 'power_user':
        return {
          welcomeMessage: "Great to see you again!",
          primaryCTA: "Advanced Features",
          recommendations: ["Try our new AI tools", "Join our beta program"]
        };
      case 'at_risk':
        return {
          welcomeMessage: "We've missed you! Check out what's new.",
          primaryCTA: "See Updates",
          recommendations: ["Special offers available", "New features added"]
        };
      case 'champion':
        return {
          welcomeMessage: "Welcome back, champion!",
          primaryCTA: "Pro Dashboard",
          recommendations: ["Refer friends", "Share feedback", "Early access features"]
        };
      default:
        return {
          welcomeMessage: "Welcome to Hawkly!",
          primaryCTA: "Get Started",
          recommendations: []
        };
    }
  };

  return {
    preferences,
    behaviorProfile,
    updatePreferences,
    trackFeatureUsage,
    trackConversionEvent,
    getUserSegment,
    getPersonalizedContent
  };
};

const getDeviceType = (): 'mobile' | 'tablet' | 'desktop' => {
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

const getBrowserType = (): string => {
  const userAgent = navigator.userAgent;
  if (userAgent.includes('Chrome')) return 'Chrome';
  if (userAgent.includes('Firefox')) return 'Firefox';
  if (userAgent.includes('Safari')) return 'Safari';
  if (userAgent.includes('Edge')) return 'Edge';
  return 'Other';
};
