
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

export interface PersonalizedMessage {
  title: string;
  message: string;
  type: 'welcome' | 'info' | 'warning' | 'error';
}

export interface AdaptiveLayoutConfig {
  variant: 'compact' | 'detailed' | 'cards';
  showSidebar: boolean;
  contentPriority: string[];
}

export interface QuickAction {
  id: string;
  label: string;
  href: string;
  priority: number;
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  href: string;
  action: string;
  tags: string[];
  priority: number;
  relevanceScore: number;
}
