// Types for Personalization and Advanced Gamification System

export interface UserPreferences {
  theme?: 'light' | 'dark' | 'auto';
  language?: string;
  notifications?: {
    email?: boolean;
    push?: boolean;
    desktop?: boolean;
    frequency?: 'immediate' | 'hourly' | 'daily' | 'weekly';
  };
  dashboard?: {
    layout?: 'compact' | 'detailed' | 'minimal';
    defaultTab?: string;
    showQuickActions?: boolean;
  };
  privacy?: {
    profileVisibility?: 'public' | 'connections' | 'private';
    shareProgress?: boolean;
    shareActivity?: boolean;
  };
}

export interface PersonalityInsights {
  personalityType?: 'achiever' | 'socializer' | 'explorer' | 'killer';
  workStyle?: 'focused' | 'collaborative' | 'flexible' | 'structured';
  learningPreference?: 'visual' | 'auditory' | 'kinesthetic' | 'reading';
  motivationFactors?: string[];
  communicationStyle?: 'direct' | 'supportive' | 'analytical' | 'expressive';
  riskTolerance?: 'conservative' | 'moderate' | 'aggressive';
}

export interface AuditorPersonalizationProfile {
  id: string;
  auditorId: string;
  personalityType?: string;
  learningStyle?: string;
  workPreferences?: Record<string, any>;
  communicationStyle?: string;
  motivationFactors?: Record<string, any>;
  accessibilityNeeds?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface GamificationAnalytics {
  id: string;
  auditorId: string;
  eventType: string;
  eventData: Record<string, any>;
  timestamp: string;
  sessionId?: string;
  deviceInfo?: Record<string, any>;
}

export interface BehavioralAnalytics {
  id: string;
  auditorId: string;
  eventType: string;
  eventData: Record<string, any>;
  timestamp: string;
  sessionId?: string;
  deviceInfo?: Record<string, any>;
}

export interface PersonalizedRecommendation {
  id: string;
  auditorId: string;
  recommendationType: 'learning_path' | 'challenge' | 'feature' | 'connection' | 'tool';
  recommendationData: Record<string, any>;
  confidenceScore?: number;
  status: 'pending' | 'viewed' | 'clicked' | 'dismissed' | 'completed';
  generatedAt: string;
  expiresAt?: string;
  viewedAt?: string;
  clickedAt?: string;
}

export interface LearningPath {
  id: string;
  name: string;
  description?: string;
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  estimatedDuration?: number; // in hours
  prerequisites?: string[];
  learningObjectives?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface LearningProgress {
  id: string;
  auditorId: string;
  learningPathId: string;
  progressPercentage: number;
  completedModules?: string[];
  currentModule?: string;
  startedAt: string;
  lastActivityAt: string;
  completedAt?: string;
  learningPath?: LearningPath;
}

export interface PeerMatch {
  id: string;
  auditor1Id: string;
  auditor2Id: string;
  matchType: 'mentor' | 'peer' | 'mentee';
  compatibilityScore?: number;
  status: 'suggested' | 'accepted' | 'declined' | 'active' | 'completed';
  createdAt: string;
  acceptedAt?: string;
  auditor1?: AuditorProfile;
  auditor2?: AuditorProfile;
}

export interface GamificationChallenge {
  id: string;
  title: string;
  description?: string;
  challengeType: 'daily' | 'weekly' | 'monthly' | 'milestone' | 'special';
  difficultyLevel: 'easy' | 'medium' | 'hard' | 'expert';
  xpReward: number;
  badgeReward?: string;
  requirements: Record<string, any>;
  startDate: string;
  endDate?: string;
  targetAudience?: string[]; // experience levels, specializations
  createdAt: string;
}

export interface AuditorChallengeProgress {
  id: string;
  auditorId: string;
  challengeId: string;
  progressData: Record<string, any>;
  completionPercentage: number;
  startedAt: string;
  completedAt?: string;
  xpEarned: number;
  badgeEarned?: string;
  challenge?: GamificationChallenge;
}

export interface AchievementBadge {
  id: string;
  name: string;
  description?: string;
  iconUrl?: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  category: 'skill' | 'milestone' | 'social' | 'special';
  requirements: Record<string, any>;
  xpValue: number;
  unlocksFeatures?: string[];
  createdAt: string;
}

export interface AuditorBadge {
  id: string;
  auditorId: string;
  badgeId: string;
  earnedAt: string;
  earningContext?: Record<string, any>;
  displayed: boolean;
  badge?: AchievementBadge;
}

// Enhanced existing types
export interface AuditorProfile {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  experienceLevel: 'beginner' | 'intermediate' | 'expert';
  specializations: string[];
  githubUsername?: string;
  linkedinUrl?: string;
  bio?: string;
  profilePictureUrl?: string;
  totalXp: number;
  currentLevel: number;
  streakCount: number;
  createdAt: string;
  updatedAt: string;
  
  // Personalization fields
  userPreferences?: UserPreferences;
  onboardingCompletedAt?: string;
  personalityInsights?: PersonalityInsights;
  learningStyle?: string;
  motivationType?: string;
}

// Analytics and Tracking Types
export interface AnalyticsEvent {
  eventType: string;
  eventData: Record<string, any>;
  timestamp?: string;
  sessionId?: string;
}

export interface UserInteraction {
  type: 'click' | 'view' | 'scroll' | 'hover' | 'focus';
  element: string;
  context?: Record<string, any>;
  timestamp: string;
}

// Personalization Algorithm Types
export interface PersonalizationContext {
  auditorProfile: AuditorProfile;
  recentActivity: GamificationAnalytics[];
  learningProgress: LearningProgress[];
  challengeProgress: AuditorChallengeProgress[];
  badges: AuditorBadge[];
  preferences: UserPreferences;
  personalityInsights: PersonalityInsights;
}

export interface PersonalizedContent {
  welcomeMessage: string;
  motivationalQuote: string;
  quickWins: QuickWin[];
  recommendedFeatures: RecommendedFeature[];
  actionPlan: ActionPlanItem[];
  challenges: GamificationChallenge[];
  learningPaths: LearningPath[];
}

export interface QuickWin {
  id: string;
  title: string;
  description: string;
  xpValue: number;
  estimatedTime: number; // in minutes
  action: string;
  actionData?: Record<string, any>;
  completed?: boolean;
}

export interface RecommendedFeature {
  id: string;
  title: string;
  description: string;
  category: string;
  estimatedValue: 'high' | 'medium' | 'low';
  difficulty: 'easy' | 'medium' | 'hard';
  timeToValue: number; // in minutes
  actionUrl: string;
  prerequisites?: string[];
}

export interface ActionPlanItem {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  estimatedDuration: number; // in hours
  category: string;
  dependencies?: string[];
  actionUrl: string;
  status: 'not_started' | 'in_progress' | 'completed';
}

// Gamification Summary Types
export interface GamificationSummary {
  totalXp: number;
  totalActions: number;
  currentLevel: number;
  totalBadges: number;
  activeChallenges: number;
  completedChallenges: number;
  streakCount: number;
  weeklyXp: number;
  monthlyXp: number;
  rankPosition?: number;
  nextLevelXp: number;
  progressToNextLevel: number;
}

// API Response Types
export interface PersonalizationApiResponse<T> {
  data: T;
  status: 'success' | 'error';
  message?: string;
  timestamp: string;
}

// Hook Types
export interface UsePersonalizationOptions {
  enableAnalytics?: boolean;
  enableRealtimeUpdates?: boolean;
  cacheTimeout?: number;
}

export interface PersonalizationState {
  profile: AuditorProfile | null;
  personalizationProfile: AuditorPersonalizationProfile | null;
  recommendations: PersonalizedRecommendation[];
  learningProgress: LearningProgress[];
  challengeProgress: AuditorChallengeProgress[];
  badges: AuditorBadge[];
  gamificationSummary: GamificationSummary | null;
  isLoading: boolean;
  error: string | null;
}

// Behavioral Learning Types
export interface BehaviorPattern {
  patternType: string;
  frequency: number;
  context: Record<string, any>;
  confidence: number;
  lastObserved: string;
}

export interface PersonalizationModel {
  modelVersion: string;
  behaviorPatterns: BehaviorPattern[];
  preferences: UserPreferences;
  predictedInterests: string[];
  riskScore: number;
  engagementScore: number;
  learningVelocity: number;
  lastUpdated: string;
}

// Feature Flag Types
export interface PersonalizationFeatureFlags {
  enableAIRecommendations: boolean;
  enableBehavioralLearning: boolean;
  enablePeerMatching: boolean;
  enableAdvancedChallenges: boolean;
  enableLearningPaths: boolean;
  enablePersonalizedContent: boolean;
} 