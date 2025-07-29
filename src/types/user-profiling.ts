
export interface UserPreferences {
  userId: string;
  theme: 'light' | 'dark' | 'system';
  language: string;
  dashboardLayout?: 'compact' | 'detailed' | 'cards';
  experienceLevel?: 'beginner' | 'intermediate' | 'expert';
  timezone?: string;
  preferredCommunication?: 'email' | 'discord' | 'telegram' | 'in-app';
  urgencyPreference?: 'flexible' | 'standard' | 'urgent';
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  notificationSettings?: {
    auditUpdates: boolean;
    newMessages: boolean;
    paymentAlerts: boolean;
    securityAlerts: boolean;
    marketingEmails: boolean;
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
  deviceType?: 'mobile' | 'tablet' | 'desktop';
  pagesVisited: string[];
  mostVisitedPages: string[];
  completedActions: string[];
  preferences: Record<string, unknown>;
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
