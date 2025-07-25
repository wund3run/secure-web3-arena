import { useMemo, useCallback } from 'react';
import { AdaptiveInterfaceProps, DashboardLayoutConfig } from '../types';

interface PersonalizedMetrics {
  primary: string;
  secondary: string[];
  advanced: string[];
}

export const useAdaptiveDashboard = ({
  userSegment,
  userType,
  preferences,
  behaviorProfile
}: AdaptiveInterfaceProps) => {
  
  const getDashboardLayout = useCallback((): string => {
    // Prioritize user preferences
    if (preferences.dashboardLayout) {
      return preferences.dashboardLayout;
    }

    // Fallback to segment-based layout
    switch (userSegment) {
      case 'new_user':
        return 'compact';
      case 'power_user':
      case 'champion':
        return 'detailed';
      default:
        return 'cards';
    }
  }, [preferences.dashboardLayout, userSegment]);

  const getWidgetPriority = useCallback((): string[] => {
    const baseWidgets = ['overview', 'recent-activity', 'quick-actions'];
    
    if (!behaviorProfile) return baseWidgets;

    const prioritized = [...baseWidgets];

    // Add widgets based on feature usage
    if (behaviorProfile.featureUsage['notifications'] > 5) {
      prioritized.push('notifications');
    }

    if (behaviorProfile.featureUsage['analytics'] > 3) {
      prioritized.push('analytics');
    }

    if (userSegment === 'power_user' || userSegment === 'champion') {
      prioritized.push('advanced-metrics', 'ai-insights');
    }

    return prioritized;
  }, [behaviorProfile, userSegment]);

  const getPersonalizedMetrics = useCallback((): PersonalizedMetrics => {
    const metrics: PersonalizedMetrics = {
      primary: 'overview',
      secondary: ['activity', 'performance'],
      advanced: []
    };

    if (userType === 'auditor') {
      metrics.primary = 'audits';
      metrics.secondary = ['earnings', 'ratings'];
      if (userSegment === 'power_user') {
        metrics.advanced = ['efficiency', 'client-satisfaction'];
      }
    } else if (userType === 'project_owner') {
      metrics.primary = 'projects';
      metrics.secondary = ['security-score', 'spending'];
      if (userSegment === 'power_user') {
        metrics.advanced = ['roi', 'risk-assessment'];
      }
    }

    return metrics;
  }, [userType, userSegment]);

  const getRecommendedActions = useCallback((): string[] => {
    const actions: string[] = [];

    switch (userSegment) {
      case 'new_user':
        actions.push('complete-profile', 'take-tour', 'first-action');
        break;
      case 'regular_user':
        actions.push('explore-features', 'optimize-workflow');
        break;
      case 'power_user':
        actions.push('try-advanced-features', 'provide-feedback');
        break;
      case 'at_risk':
        actions.push('check-updates', 'special-offers', 'support');
        break;
      case 'champion':
        actions.push('refer-friends', 'beta-features', 'community');
        break;
    }

    return actions;
  }, [userSegment]);

  return useMemo(() => ({
    getDashboardLayout,
    getWidgetPriority,
    getPersonalizedMetrics,
    getRecommendedActions
  }), [getDashboardLayout, getWidgetPriority, getPersonalizedMetrics, getRecommendedActions]);
};
