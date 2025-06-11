
export interface AdaptiveInterfaceProps {
  userSegment: string;
  userType: string;
  preferences: any;
  behaviorProfile: any;
  isAuthenticated?: boolean;
}

export interface AdaptiveDashboardConfig {
  layout: 'compact' | 'detailed' | 'cards';
  widgetPriority: string[];
  personalizedMetrics: string[];
  showAdvancedFeatures: boolean;
}

export interface UserSegment {
  id: string;
  name: string;
  characteristics: string[];
  recommendations: string[];
}
