
export interface UserBehavior {
  pageViews: string[];
  timeSpent: Record<string, number>;
  interactions: string[];
  lastVisit: string;
}

export type UserSegment = 'new' | 'returning' | 'power' | 'enterprise';

export interface PersonalizationConfig {
  segment: UserSegment;
  recommendations: string[];
  customizations: Record<string, any>;
}

export interface PersonalizedContent {
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  features: Array<{
    title: string;
    description: string;
    icon: React.ReactElement;
    priority: number;
  }>;
  recommendations: Array<{
    type: string;
    content: string;
    action: string;
  }>;
}
