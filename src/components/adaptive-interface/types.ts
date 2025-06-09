
import { UserPreferences, UserBehaviorProfile } from '@/hooks/useUserProfiling';

export interface AdaptiveInterfaceProps {
  userSegment: string;
  userType: string;
  preferences: UserPreferences | null;
  behaviorProfile: UserBehaviorProfile | null;
  isAuthenticated?: boolean;
}

export interface PersonalizedMessage {
  title: string;
  message: string;
  type: 'welcome' | 'tip' | 'alert' | 'info';
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

export interface AdaptiveLayoutConfig {
  variant: 'compact' | 'detailed' | 'cards';
  contentPriority: string[];
  showFeatures: string[];
}
