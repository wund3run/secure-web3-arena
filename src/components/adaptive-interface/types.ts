import type { UserSegment, UserPreferences, BehaviorProfile } from '@/hooks/useUserProfiling';

export interface AdaptiveInterfaceProps {
  userSegment: UserSegment;
  userType: 'admin' | 'auditor' | 'project_owner' | 'general';
  preferences: UserPreferences;
  behaviorProfile: BehaviorProfile;
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

export interface PersonalizedMessage {
  title: string;
  message: string;
  type: 'welcome' | 'info' | 'warning' | 'success';
}

export interface AdaptiveLayoutConfig {
  variant: 'compact' | 'detailed' | 'cards';
  priority: string[];
  widgets: string[];
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
