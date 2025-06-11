
import { useMemo } from 'react';
import { AdaptiveInterfaceProps, DashboardLayoutConfig } from '../types';

export const useAdaptiveDashboard = ({
  userSegment,
  userType,
  preferences,
  behaviorProfile
}: AdaptiveInterfaceProps) => {
  
  const getDashboardLayout = (): string => {
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
  };

  const getWidgetPriority = (): string[] => {
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
  };

  const getPersonalizedMetrics = () => {
    const metrics = {
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
  };

  const getRecommendedActions = () => {
    const actions = [];

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
  };

  return useMemo(() => ({
    getDashboardLayout,
    getWidgetPriority,
    getPersonalizedMetrics,
    getRecommendedActions
  }), [userSegment, userType, preferences, behaviorProfile]);
};
