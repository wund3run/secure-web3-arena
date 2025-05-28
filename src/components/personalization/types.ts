
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
