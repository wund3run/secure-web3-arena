
import { useMemo } from 'react';
import { AdaptiveInterfaceProps, PersonalizedMessage, AdaptiveLayoutConfig } from '../types';

export function useAdaptiveContent({ 
  userSegment, 
  userType, 
  preferences, 
  behaviorProfile 
}: AdaptiveInterfaceProps) {
  
  const getLayoutVariant = () => {
    if (preferences?.dashboardLayout) {
      return preferences.dashboardLayout;
    }
    
    // Adapt based on user behavior
    if (behaviorProfile?.deviceType === 'mobile') return 'compact';
    if (userSegment === 'power_user') return 'detailed';
    return 'cards';
  };

  const getContentPriority = () => {
    const basePriority = ['overview', 'actions', 'content'];
    
    switch (userSegment) {
      case 'new_user':
        return ['welcome', 'getting-started', 'overview'];
      case 'regular_user':
        return ['projects', 'audits', 'reports'];
      case 'power_user':
        return ['opportunities', 'active-audits', 'earnings'];
      default:
        return basePriority;
    }
  };

  const shouldShowFeature = (feature: string): boolean => {
    const featureMap: Record<string, boolean> = {
      'contextual_help': preferences?.experienceLevel === 'beginner',
      'advanced_filters': preferences?.experienceLevel === 'expert',
      'quick_actions': (behaviorProfile?.visitCount || 0) > 5,
      'recommendations': (behaviorProfile?.engagementScore || 0) > 30,
    };
    
    return featureMap[feature] || false;
  };

  const personalizedMessages = useMemo((): { 
    welcome?: PersonalizedMessage;
    helpTip?: string;
  } => {
    const messages: any = {};
    
    if (userSegment === 'new_user') {
      messages.welcome = {
        title: 'Welcome to Hawkly!',
        message: 'Discover the future of Web3 security. Let us help you get started.',
        type: 'welcome' as const
      };
      messages.helpTip = 'Start by exploring our marketplace or learning about our audit process.';
    } else if (userSegment === 'regular_user') {
      messages.welcome = {
        title: 'Welcome back!',
        message: 'Ready for your next security audit? Check out our latest auditor matches.',
        type: 'welcome' as const
      };
    } else if (userSegment === 'power_user') {
      messages.welcome = {
        title: 'New opportunities await',
        message: 'There are fresh audit requests that match your expertise.',
        type: 'info' as const
      };
    }
    
    return messages;
  }, [userSegment, userType, behaviorProfile]);

  return {
    getLayoutVariant,
    getContentPriority,
    shouldShowFeature,
    personalizedMessages
  };
}
