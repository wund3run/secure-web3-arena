
export interface UserPreferences {
  id: string;
  userId: string;
  preferredCommunication: 'email' | 'discord' | 'telegram' | 'in-app';
  notificationSettings: {
    auditUpdates: boolean;
    newMessages: boolean;
    paymentAlerts: boolean;
    marketingEmails: boolean;
    securityAlerts: boolean;
  };
  dashboardLayout: 'compact' | 'detailed' | 'cards';
  theme: 'light' | 'dark' | 'auto';
  timezone: string;
  language: string;
  experienceLevel: 'beginner' | 'intermediate' | 'expert';
  interestedBlockchains: string[];
  budgetRange?: {
    min: number;
    max: number;
  };
  preferredAuditorExperience?: 'junior' | 'mid' | 'senior' | 'any';
  urgencyPreference: 'flexible' | 'standard' | 'urgent';
  createdAt: string;
  updatedAt: string;
}

export interface UserBehaviorProfile {
  id: string;
  userId: string;
  visitCount: number;
  lastVisit: string;
  averageSessionDuration: number;
  mostVisitedPages: string[];
  completedActions: string[];
  abandonedFunnels: string[];
  deviceType: 'mobile' | 'tablet' | 'desktop';
  referralSource: string;
  engagementScore: number;
  conversionLikelihood: number;
  preferredContent: string[];
  createdAt: string;
  updatedAt: string;
}

export interface UserSegment {
  id: string;
  name: string;
  description: string;
  criteria: {
    userType?: ('auditor' | 'project_owner' | 'admin' | 'general')[];
    experienceLevel?: ('beginner' | 'intermediate' | 'expert')[];
    engagementScore?: { min: number; max: number };
    visitCount?: { min: number; max: number };
    hasCompletedAudit?: boolean;
    budgetRange?: { min: number; max: number };
  };
  personalizedContent: {
    heroMessage: string;
    ctaButtons: Array<{
      text: string;
      href: string;
      variant: 'primary' | 'secondary' | 'outline';
    }>;
    recommendedServices: string[];
    featuredContent: string[];
  };
}

export type UserJourneyStage = 
  | 'visitor'           // First time visitor
  | 'explorer'          // Browsing services/auditors
  | 'evaluator'         // Comparing options
  | 'engager'           // Started onboarding/communication
  | 'converter'         // Made first transaction
  | 'advocate'          // Multiple successful transactions
  | 'power_user';       // High engagement, multiple services

export interface UserJourneyProfile {
  userId: string;
  currentStage: UserJourneyStage;
  stageHistory: Array<{
    stage: UserJourneyStage;
    enteredAt: string;
    completedActions: string[];
  }>;
  nextRecommendedActions: string[];
  progressScore: number; // 0-100
  blockers: string[];
  opportunities: string[];
}
