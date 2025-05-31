
export interface UserPreferences {
  userId: string;
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  accessibility: {
    reducedMotion: boolean;
    highContrast: boolean;
    fontSize: 'small' | 'medium' | 'large';
  };
  privacy: {
    analytics: boolean;
    marketing: boolean;
    personalization: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

export interface UserBehaviorProfile {
  userId: string;
  visitCount: number;
  lastVisit: string;
  totalTimeSpent: number;
  averageSessionDuration: number;
  pagesVisited: string[];
  mostVisitedPages: string[];
  completedActions: string[];
  preferences: Record<string, any>;
  engagementScore: number;
  conversionEvents: string[];
  createdAt: string;
  updatedAt: string;
}

export interface UserJourneyProfile {
  userId: string;
  currentStage: UserJourneyStage;
  stageHistory: { stage: UserJourneyStage; timestamp: string }[];
  nextRecommendedActions: string[];
  progressScore: number;
  blockers: string[];
  opportunities: string[];
}

export type UserJourneyStage = 
  | 'visitor' 
  | 'explorer' 
  | 'evaluator' 
  | 'engager' 
  | 'converter' 
  | 'advocate'
  | 'power_user';
