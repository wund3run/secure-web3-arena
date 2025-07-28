import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/auth';
import { personalizationService } from '../services/PersonalizationService';
import {
  AuditorProfile,
  PersonalizedContent,
  GamificationSummary,
  PersonalizationState,
  UsePersonalizationOptions,
  QuickWin,
  UserPreferences,
  PersonalityInsights
} from '../types/personalization';

export const usePersonalization = (options: UsePersonalizationOptions = {}) => {
  const { user, userProfile } = useAuth();
  const {
    enableAnalytics = true,
    enableRealtimeUpdates = false,
    cacheTimeout = 5 * 60 * 1000 // 5 minutes
  } = options;

  const [state, setState] = useState<PersonalizationState>({
    profile: null,
    personalizationProfile: null,
    recommendations: [],
    learningProgress: [],
    challengeProgress: [],
    badges: [],
    gamificationSummary: null,
    isLoading: true,
    error: null
  });

  const [personalizedContent, setPersonalizedContent] = useState<PersonalizedContent | null>(null);
  const [lastFetch, setLastFetch] = useState<number>(0);

  // Track user interactions for analytics
  const trackInteraction = useCallback(async (
    element: string,
    type: 'click' | 'view' | 'hover' = 'click',
    context?: Record<string, any>
  ) => {
    if (!enableAnalytics || !user) return;

    try {
      await personalizationService.trackEvent('user_interaction', {
        element,
        type,
        context,
        timestamp: new Date().toISOString(),
        page: window.location.pathname
      });
    } catch (error) {
      console.warn('Failed to track interaction:', error);
    }
  }, [enableAnalytics, user]);

  // Complete a quick win action
  const completeQuickWin = useCallback(async (quickWin: QuickWin) => {
    if (!state.profile?.id) return false;

    try {
      await personalizationService.trackEvent('quick_win_completed', {
        quickWinId: quickWin.id,
        xpEarned: quickWin.xpValue,
        completedAt: new Date().toISOString()
      });

      // Mark as completed in local state
      if (personalizedContent) {
        const updatedQuickWins = personalizedContent.quickWins.map(qw =>
          qw.id === quickWin.id ? { ...qw, completed: true } : qw
        );
        
        setPersonalizedContent({
          ...personalizedContent,
          quickWins: updatedQuickWins
        });
      }

      return true;
    } catch (error) {
      console.error('Failed to complete quick win:', error);
      return false;
    }
  }, [state.profile?.id, personalizedContent]);

  // Update user preferences
  const updatePreferences = useCallback(async (preferences: UserPreferences) => {
    if (!state.profile?.id) return false;

    try {
      setState(prev => ({ ...prev, isLoading: true }));
      
      const success = await personalizationService.updateUserPreferences(
        state.profile.id,
        preferences
      );

      if (success && state.profile) {
        setState(prev => ({
          ...prev,
          profile: {
            ...prev.profile!,
            userPreferences: preferences
          },
          isLoading: false
        }));
      }

      return success;
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to update preferences',
        isLoading: false
      }));
      return false;
    }
  }, [state.profile?.id]);

  // Update personality insights
  const updatePersonalityInsights = useCallback(async (insights: PersonalityInsights) => {
    if (!state.profile?.id) return false;

    try {
      setState(prev => ({ ...prev, isLoading: true }));
      
      const success = await personalizationService.updatePersonalityInsights(
        state.profile.id,
        insights
      );

      if (success && state.profile) {
        setState(prev => ({
          ...prev,
          profile: {
            ...prev.profile!,
            personalityInsights: insights
          },
          isLoading: false
        }));
      }

      return success;
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to update insights',
        isLoading: false
      }));
      return false;
    }
  }, [state.profile?.id]);

  // Load personalized content
  const loadPersonalizedContent = useCallback(async (profile: AuditorProfile) => {
    try {
      const content = await personalizationService.getPersonalizedContent(profile);
      setPersonalizedContent(content);
      setLastFetch(Date.now());
    } catch (error) {
      console.error('Failed to load personalized content:', error);
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to load content'
      }));
    }
  }, []);

  // Load gamification summary
  const loadGamificationSummary = useCallback(async (auditorId: string) => {
    try {
      const summary = await personalizationService.getGamificationSummary(auditorId);
      setState(prev => ({
        ...prev,
        gamificationSummary: summary
      }));
    } catch (error) {
      console.error('Failed to load gamification summary:', error);
    }
  }, []);

  // Refresh all data
  const refresh = useCallback(async () => {
    if (!user || !state.profile) return;

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Load personalized content and gamification data
      await Promise.all([
        loadPersonalizedContent(state.profile),
        loadGamificationSummary(state.profile.id)
      ]);

      setState(prev => ({ ...prev, isLoading: false }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to refresh data',
        isLoading: false
      }));
    }
  }, [user, state.profile, loadPersonalizedContent, loadGamificationSummary]);

  // Auto-refresh based on cache timeout
  useEffect(() => {
    if (!personalizedContent || !cacheTimeout) return;

    const timeElapsed = Date.now() - lastFetch;
    if (timeElapsed >= cacheTimeout) {
      refresh();
    }
  }, [personalizedContent, lastFetch, cacheTimeout, refresh]);

  // Initialize when user and profile are available
  useEffect(() => {
    if (!user || !state.profile) return;

    // Only load if we don't have recent data
    const timeElapsed = Date.now() - lastFetch;
    if (!personalizedContent || timeElapsed >= cacheTimeout) {
      loadPersonalizedContent(state.profile);
      loadGamificationSummary(state.profile.id);
    }
  }, [user, state.profile, personalizedContent, lastFetch, cacheTimeout, loadPersonalizedContent, loadGamificationSummary]);

  // Track page views for analytics
  useEffect(() => {
    if (!enableAnalytics || !user) return;

    trackInteraction('page_view', 'view', {
      path: window.location.pathname,
      timestamp: new Date().toISOString()
    });
  }, [enableAnalytics, user, trackInteraction]);

  // Set up profile from auth context when available
  useEffect(() => {
    if (userProfile) {
      setState(prev => ({
        ...prev,
        profile: userProfile as unknown as AuditorProfile,
        isLoading: false
      }));
    }
  }, [userProfile]);

  return {
    // State
    ...state,
    personalizedContent,
    
    // Actions
    trackInteraction,
    completeQuickWin,
    updatePreferences,
    updatePersonalityInsights,
    refresh,
    
    // Utilities
    isContentStale: () => {
      if (!lastFetch || !cacheTimeout) return false;
      return Date.now() - lastFetch >= cacheTimeout;
    },
    
    hasPersonalizedContent: () => !!personalizedContent,
    
    getSessionId: () => personalizationService.getSessionId()
  };
}; 