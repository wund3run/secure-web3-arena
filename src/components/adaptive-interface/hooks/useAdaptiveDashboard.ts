
import { useMemo } from 'react';
import { AdaptiveInterfaceProps, AdaptiveDashboardConfig } from '../types';

export function useAdaptiveDashboard({
  userSegment,
  userType,
  preferences,
  behaviorProfile
}: AdaptiveInterfaceProps) {
  
  const getDashboardLayout = (): string => {
    // Return layout based on user preferences or defaults
    if (preferences?.dashboardLayout) {
      return preferences.dashboardLayout;
    }
    
    // Fallback to segment-based defaults
    switch (userSegment) {
      case 'new_user':
        return 'detailed'; // More guidance for new users
      case 'power_user':
      case 'champion':
        return 'compact'; // More efficient for experienced users
      default:
        return 'cards'; // Balanced view for regular users
    }
  };

  const getWidgetPriority = (): string[] => {
    const baseWidgets = ['overview', 'quick-actions'];
    
    if (userType === 'auditor') {
      return [...baseWidgets, 'active-audits', 'earnings', 'availability'];
    } else {
      return [...baseWidgets, 'projects', 'recommendations', 'activity'];
    }
  };

  const getPersonalizedMetrics = (): string[] => {
    const metrics = [];
    
    if (userType === 'auditor') {
      metrics.push('earnings', 'completion-rate', 'client-satisfaction');
    } else {
      metrics.push('project-status', 'audit-progress', 'cost-tracking');
    }
    
    // Add advanced metrics for power users
    if (userSegment === 'power_user' || userSegment === 'champion') {
      metrics.push('performance-trends', 'predictive-insights');
    }
    
    return metrics;
  };

  const config: AdaptiveDashboardConfig = useMemo(() => ({
    layout: getDashboardLayout() as 'compact' | 'detailed' | 'cards',
    widgetPriority: getWidgetPriority(),
    personalizedMetrics: getPersonalizedMetrics(),
    showAdvancedFeatures: userSegment === 'power_user' || userSegment === 'champion'
  }), [userSegment, userType, preferences, behaviorProfile]);

  return {
    getDashboardLayout,
    getWidgetPriority,
    getPersonalizedMetrics,
    config
  };
}
