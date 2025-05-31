
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth';
import { UserPreferences, UserBehaviorProfile, UserJourneyProfile, UserJourneyStage } from '@/types/user-profiling';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export function useUserProfiling() {
  const { user, userProfile } = useAuth();
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [behaviorProfile, setBehaviorProfile] = useState<UserBehaviorProfile | null>(null);
  const [journeyProfile, setJourneyProfile] = useState<UserJourneyProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user profiling data
  useEffect(() => {
    if (user) {
      loadUserProfilingData();
    } else {
      // For anonymous users, load from localStorage
      loadAnonymousProfile();
    }
  }, [user]);

  const loadUserProfilingData = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Load preferences from localStorage as fallback
      const localPrefs = getLocalPreferences();
      if (localPrefs) {
        setPreferences(localPrefs);
      }

      // Load behavior profile from localStorage
      const behaviorData = getLocalBehaviorProfile();
      if (behaviorData) {
        setBehaviorProfile(behaviorData);
      }

      // Determine journey stage
      const journeyData = determineJourneyStage();
      setJourneyProfile(journeyData);

    } catch (error) {
      console.error('Error loading user profiling data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadAnonymousProfile = () => {
    const localPrefs = getLocalPreferences();
    const behaviorData = getLocalBehaviorProfile();
    
    if (localPrefs) setPreferences(localPrefs);
    if (behaviorData) setBehaviorProfile(behaviorData);
    
    setLoading(false);
  };

  const getLocalPreferences = (): UserPreferences | null => {
    try {
      const stored = localStorage.getItem('hawkly_user_preferences');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  };

  const getLocalBehaviorProfile = (): UserBehaviorProfile | null => {
    try {
      const stored = localStorage.getItem('hawkly_behavior_profile');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  };

  const updatePreferences = async (updates: Partial<UserPreferences>) => {
    const updatedPrefs: UserPreferences = {
      ...preferences,
      ...updates,
      id: preferences?.id || crypto.randomUUID(),
      userId: user?.id || 'anonymous',
      updatedAt: new Date().toISOString(),
      createdAt: preferences?.createdAt || new Date().toISOString(),
    } as UserPreferences;

    setPreferences(updatedPrefs);
    localStorage.setItem('hawkly_user_preferences', JSON.stringify(updatedPrefs));
    
    toast.success('Preferences updated successfully');
  };

  const trackBehavior = (action: string, metadata?: Record<string, any>) => {
    const currentBehavior = behaviorProfile || createDefaultBehaviorProfile();
    
    const updatedBehavior: UserBehaviorProfile = {
      ...currentBehavior,
      lastVisit: new Date().toISOString(),
      visitCount: currentBehavior.visitCount + 1,
      completedActions: [...currentBehavior.completedActions, action],
      updatedAt: new Date().toISOString(),
    };

    // Track page visit
    if (action === 'page_visit' && metadata?.page) {
      const page = metadata.page;
      const updatedPages = [...updatedBehavior.mostVisitedPages];
      if (!updatedPages.includes(page)) {
        updatedPages.push(page);
      }
      updatedBehavior.mostVisitedPages = updatedPages.slice(-10); // Keep last 10
    }

    setBehaviorProfile(updatedBehavior);
    localStorage.setItem('hawkly_behavior_profile', JSON.stringify(updatedBehavior));
  };

  const createDefaultBehaviorProfile = (): UserBehaviorProfile => ({
    id: crypto.randomUUID(),
    userId: user?.id || 'anonymous',
    visitCount: 0,
    lastVisit: new Date().toISOString(),
    averageSessionDuration: 0,
    mostVisitedPages: [],
    completedActions: [],
    abandonedFunnels: [],
    deviceType: getDeviceType(),
    referralSource: document.referrer || 'direct',
    engagementScore: 0,
    conversionLikelihood: 0,
    preferredContent: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  const determineJourneyStage = (): UserJourneyProfile => {
    const actions = behaviorProfile?.completedActions || [];
    const visitCount = behaviorProfile?.visitCount || 0;
    
    let stage: UserJourneyStage = 'visitor';
    let progressScore = 0;

    if (visitCount >= 5) {
      stage = 'explorer';
      progressScore = 20;
    }
    
    if (actions.includes('viewed_auditor_profile') || actions.includes('viewed_service_details')) {
      stage = 'evaluator';
      progressScore = 40;
    }
    
    if (actions.includes('started_onboarding') || actions.includes('contacted_provider')) {
      stage = 'engager';
      progressScore = 60;
    }
    
    if (actions.includes('completed_audit_request') || actions.includes('made_payment')) {
      stage = 'converter';
      progressScore = 80;
    }
    
    if (actions.filter(a => a.includes('completed')).length >= 3) {
      stage = 'advocate';
      progressScore = 90;
    }
    
    if (visitCount >= 50 && actions.length >= 20) {
      stage = 'power_user';
      progressScore = 100;
    }

    return {
      userId: user?.id || 'anonymous',
      currentStage: stage,
      stageHistory: [],
      nextRecommendedActions: getRecommendedActions(stage),
      progressScore,
      blockers: [],
      opportunities: getOpportunities(stage),
    };
  };

  const getRecommendedActions = (stage: UserJourneyStage): string[] => {
    switch (stage) {
      case 'visitor':
        return ['explore_services', 'view_how_it_works', 'read_testimonials'];
      case 'explorer':
        return ['view_auditor_profiles', 'check_pricing', 'read_case_studies'];
      case 'evaluator':
        return ['start_onboarding', 'contact_auditor', 'request_quote'];
      case 'engager':
        return ['complete_profile', 'submit_audit_request', 'schedule_consultation'];
      case 'converter':
        return ['leave_review', 'refer_friend', 'explore_additional_services'];
      case 'advocate':
        return ['join_beta_program', 'provide_feedback', 'become_affiliate'];
      case 'power_user':
        return ['access_advanced_features', 'mentor_new_users', 'suggest_improvements'];
      default:
        return [];
    }
  };

  const getOpportunities = (stage: UserJourneyStage): string[] => {
    switch (stage) {
      case 'visitor':
        return ['personalized_welcome', 'guided_tour', 'free_consultation'];
      case 'explorer':
        return ['comparison_tool', 'expert_recommendations', 'live_chat_support'];
      case 'evaluator':
        return ['trial_offer', 'money_back_guarantee', 'testimonial_showcase'];
      default:
        return [];
    }
  };

  const getDeviceType = (): 'mobile' | 'tablet' | 'desktop' => {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  };

  const getUserSegment = () => {
    if (!behaviorProfile || !preferences) return 'new_visitor';
    
    const userType = userProfile?.user_type;
    const engagementScore = behaviorProfile.engagementScore;
    const visitCount = behaviorProfile.visitCount;
    
    if (userType === 'auditor' && engagementScore > 70) return 'active_auditor';
    if (userType === 'project_owner' && visitCount > 10) return 'returning_client';
    if (visitCount === 1) return 'first_time_visitor';
    if (visitCount > 5 && engagementScore < 30) return 'browsing_prospect';
    
    return 'general_user';
  };

  return {
    preferences,
    behaviorProfile,
    journeyProfile,
    loading,
    updatePreferences,
    trackBehavior,
    getUserSegment,
    getRecommendedActions: () => journeyProfile?.nextRecommendedActions || [],
    getOpportunities: () => journeyProfile?.opportunities || [],
  };
}
