
export interface AdaptiveInterfaceProps {
  userSegment: 'new_user' | 'regular_user' | 'power_user' | 'at_risk' | 'champion';
  userType: string;
  preferences: {
    theme: string;
    dashboardLayout: string;
    notifications: boolean;
    [key: string]: any;
  };
  behaviorProfile: {
    visitCount: number;
    preferredPages: string[];
    featureUsage: Record<string, number>;
    engagementScore: number;
    [key: string]: any;
  } | null;
  isAuthenticated?: boolean;
}

export interface DashboardLayoutConfig {
  layout: 'compact' | 'detailed' | 'cards';
  priority: string[];
  widgets: string[];
}

export interface PersonalizationRule {
  condition: (props: AdaptiveInterfaceProps) => boolean;
  action: string;
  weight: number;
}
