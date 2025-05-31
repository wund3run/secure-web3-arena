
import { AdaptiveInterfaceProps } from '../types';

export function useAdaptiveDashboard({ 
  userSegment, 
  userType, 
  preferences, 
  behaviorProfile 
}: AdaptiveInterfaceProps) {
  
  const getDashboardLayout = () => {
    if (preferences?.dashboardLayout) {
      return preferences.dashboardLayout;
    }
    
    // Auto-adapt based on user behavior
    if (behaviorProfile?.deviceType === 'mobile') return 'compact';
    if (userSegment === 'power_user') return 'detailed';
    return 'cards';
  };

  const getWidgetPriority = () => {
    switch (userType) {
      case 'auditor':
        return ['active-audits', 'reputation', 'earnings', 'opportunities'];
      case 'project_owner':
        return ['projects', 'security-score', 'vulnerabilities', 'audit-progress'];
      case 'admin':
        return ['platform-health', 'user-activity', 'revenue', 'system-metrics'];
      default:
        return ['overview', 'getting-started', 'recommendations'];
    }
  };

  const getPersonalizedMetrics = () => {
    const metrics = [];
    
    if (behaviorProfile) {
      metrics.push({
        label: 'Engagement Score',
        value: behaviorProfile.engagementScore,
        trend: 'up'
      });
      
      metrics.push({
        label: 'Platform Usage',
        value: `${behaviorProfile.visitCount} visits`,
        trend: 'neutral'
      });
    }
    
    return metrics;
  };

  return {
    getDashboardLayout,
    getWidgetPriority,
    getPersonalizedMetrics
  };
}
