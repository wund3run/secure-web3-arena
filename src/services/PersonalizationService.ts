import { supabase } from '../lib/supabase';
import {
  AuditorProfile,
  PersonalizationContext,
  PersonalizedContent,
  QuickWin,
  RecommendedFeature,
  ActionPlanItem,
  GamificationAnalytics,
  BehavioralAnalytics,
  PersonalizedRecommendation,
  LearningProgress,
  AuditorChallengeProgress,
  AuditorBadge,
  GamificationSummary,
  AnalyticsEvent,
  UserInteraction,
  PersonalizationModel,
  BehaviorPattern,
  UserPreferences,
  PersonalityInsights,
  AuditorPersonalizationProfile,
  GamificationChallenge,
  LearningPath
} from '../types/personalization';

class PersonalizationService {
  private sessionId: string;
  private userId: string | null = null;
  private auditorId: string | null = null;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.initializeUser();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private async initializeUser() {
    const { data: { user } } = await supabase.auth.getUser();
    this.userId = user?.id || null;
    
    if (this.userId) {
      const { data: profile } = await supabase
        .from('auditor_profiles')
        .select('id')
        .eq('user_id', this.userId)
        .single();
      
      this.auditorId = profile?.id || null;
    }
  }

  // Analytics and Tracking
  async trackEvent(eventType: string, eventData: Record<string, any>): Promise<void> {
    if (!this.auditorId) await this.initializeUser();
    if (!this.auditorId) return;

    const analyticsEvent: Omit<GamificationAnalytics, 'id' | 'timestamp'> = {
      auditorId: this.auditorId,
      eventType,
      eventData,
      sessionId: this.sessionId,
      deviceInfo: this.getDeviceInfo()
    };

    try {
      await supabase
        .from('gamification_analytics')
        .insert(analyticsEvent);
    } catch (error) {
      console.warn('Failed to track analytics event:', error);
    }
  }

  async trackBehavioralEvent(eventType: string, eventData: Record<string, any>): Promise<void> {
    if (!this.auditorId) await this.initializeUser();
    if (!this.auditorId) return;

    const behavioralEvent: Omit<BehavioralAnalytics, 'id' | 'timestamp'> = {
      auditorId: this.auditorId,
      eventType,
      eventData,
      sessionId: this.sessionId,
      deviceInfo: this.getDeviceInfo()
    };

    try {
      await supabase
        .from('behavioral_analytics')
        .insert(behavioralEvent);
    } catch (error) {
      console.warn('Failed to track behavioral event:', error);
    }
  }

  async trackUserInteraction(interaction: UserInteraction): Promise<void> {
    await this.trackBehavioralEvent('user_interaction', interaction);
  }

  private getDeviceInfo(): Record<string, any> {
    return {
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
      cookieEnabled: navigator.cookieEnabled,
      onLine: navigator.onLine,
      screenResolution: `${screen.width}x${screen.height}`,
      colorDepth: screen.colorDepth,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timestamp: new Date().toISOString()
    };
  }

  // Profile and Preferences Management
  async getPersonalizationProfile(auditorId: string): Promise<AuditorPersonalizationProfile | null> {
    const { data, error } = await supabase
      .from('auditor_personalization_profiles')
      .select('*')
      .eq('auditor_id', auditorId)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching personalization profile:', error);
      return null;
    }

    return data;
  }

  async createPersonalizationProfile(
    auditorId: string,
    profileData: Partial<AuditorPersonalizationProfile>
  ): Promise<AuditorPersonalizationProfile | null> {
    const { data, error } = await supabase
      .from('auditor_personalization_profiles')
      .insert({
        auditor_id: auditorId,
        ...profileData
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating personalization profile:', error);
      return null;
    }

    return data;
  }

  async updatePersonalizationProfile(
    auditorId: string,
    updates: Partial<AuditorPersonalizationProfile>
  ): Promise<AuditorPersonalizationProfile | null> {
    const { data, error } = await supabase
      .from('auditor_personalization_profiles')
      .update(updates)
      .eq('auditor_id', auditorId)
      .select()
      .single();

    if (error) {
      console.error('Error updating personalization profile:', error);
      return null;
    }

    return data;
  }

  async updateUserPreferences(
    auditorId: string,
    preferences: UserPreferences
  ): Promise<boolean> {
    const { error } = await supabase
      .from('auditor_profiles')
      .update({ user_preferences: preferences })
      .eq('id', auditorId);

    if (error) {
      console.error('Error updating user preferences:', error);
      return false;
    }

    await this.trackEvent('preferences_updated', { preferences });
    return true;
  }

  async updatePersonalityInsights(
    auditorId: string,
    insights: PersonalityInsights
  ): Promise<boolean> {
    const { error } = await supabase
      .from('auditor_profiles')
      .update({ personality_insights: insights })
      .eq('id', auditorId);

    if (error) {
      console.error('Error updating personality insights:', error);
      return false;
    }

    await this.trackEvent('personality_insights_updated', { insights });
    return true;
  }

  // Personalized Content Generation
  async getPersonalizedContent(auditorProfile: AuditorProfile): Promise<PersonalizedContent> {
    const context = await this.buildPersonalizationContext(auditorProfile);
    
    return {
      welcomeMessage: await this.generateWelcomeMessage(context),
      motivationalQuote: await this.generateMotivationalQuote(context),
      quickWins: await this.generateQuickWins(context),
      recommendedFeatures: await this.generateRecommendedFeatures(context),
      actionPlan: await this.generateActionPlan(context),
      challenges: await this.getPersonalizedChallenges(context),
      learningPaths: await this.getPersonalizedLearningPaths(context)
    };
  }

  private async buildPersonalizationContext(auditorProfile: AuditorProfile): Promise<PersonalizationContext> {
    const [recentActivity, learningProgress, challengeProgress, badges] = await Promise.all([
      this.getRecentActivity(auditorProfile.id),
      this.getLearningProgress(auditorProfile.id),
      this.getChallengeProgress(auditorProfile.id),
      this.getAuditorBadges(auditorProfile.id)
    ]);

    return {
      auditorProfile,
      recentActivity,
      learningProgress,
      challengeProgress,
      badges,
      preferences: auditorProfile.userPreferences || {},
      personalityInsights: auditorProfile.personalityInsights || {}
    };
  }

  private async generateWelcomeMessage(context: PersonalizationContext): Promise<string> {
    const { auditorProfile, personalityInsights } = context;
    const timeOfDay = this.getTimeOfDay();
    const emoji = this.getTimeBasedEmoji();
    
    const baseGreeting = `${timeOfDay} ${emoji}, ${auditorProfile.fullName}!`;
    
    const motivationType = personalityInsights.motivationFactors?.[0] || 'purpose';
    
    switch (motivationType) {
      case 'achievement':
        return `${baseGreeting} Ready to level up your security skills today?`;
      case 'social':
        return `${baseGreeting} The community is excited to see what you'll accomplish today!`;
      case 'mastery':
        return `${baseGreeting} Time to deepen your expertise and master new techniques!`;
      default:
        return `${baseGreeting} Let's make a meaningful impact on Web3 security today!`;
    }
  }

  private async generateMotivationalQuote(context: PersonalizationContext): Promise<string> {
    const { personalityInsights, auditorProfile } = context;
    
    const quotes = {
      achievement: [
        "Every vulnerability found is a step closer to mastery. 🎯",
        "Progress is impossible without change. Keep pushing forward! 🚀",
        "Excellence is not a skill, it's an attitude. 💪"
      ],
      social: [
        "Alone we can do so little; together we can do so much. 🤝",
        "Knowledge shared is knowledge multiplied. 📚",
        "Be the auditor you needed when you were starting out. 🌟"
      ],
      mastery: [
        "The expert in anything was once a beginner. 🎓",
        "Deep understanding comes from deliberate practice. 🧠",
        "Mastery is not a destination, but a journey of continuous learning. 🛤️"
      ],
      purpose: [
        "Your work protects the future of decentralized finance. 🛡️",
        "Every audit makes the Web3 ecosystem safer for everyone. 🌐",
        "Security is not just code, it's trust in action. 🔐"
      ]
    };

    const motivationType = personalityInsights.motivationFactors?.[0] || 'purpose';
    const categoryQuotes = quotes[motivationType as keyof typeof quotes] || quotes.purpose;
    
    return categoryQuotes[Math.floor(Math.random() * categoryQuotes.length)];
  }

  private async generateQuickWins(context: PersonalizationContext): Promise<QuickWin[]> {
    const { auditorProfile } = context;
    const quickWins: QuickWin[] = [];

    // Profile completion quick wins
    if (!auditorProfile.bio) {
      quickWins.push({
        id: 'complete_bio',
        title: 'Complete Your Bio',
        description: 'Add a professional bio to your profile',
        xpValue: 50,
        estimatedTime: 5,
        action: 'navigate_to_profile',
        actionData: { section: 'bio' }
      });
    }

    if (!auditorProfile.githubUsername) {
      quickWins.push({
        id: 'add_github',
        title: 'Connect GitHub',
        description: 'Link your GitHub profile to showcase your work',
        xpValue: 75,
        estimatedTime: 2,
        action: 'navigate_to_profile',
        actionData: { section: 'social' }
      });
    }

    // Experience-based quick wins
    if (auditorProfile.experienceLevel === 'beginner') {
      quickWins.push({
        id: 'first_audit_tutorial',
        title: 'Take the Audit Tutorial',
        description: 'Learn the basics with our interactive tutorial',
        xpValue: 100,
        estimatedTime: 15,
        action: 'start_tutorial'
      });
    }

    quickWins.push({
      id: 'daily_checkin',
      title: 'Daily Check-in',
      description: 'Maintain your streak and earn bonus XP',
      xpValue: 25,
      estimatedTime: 1,
      action: 'daily_checkin'
    });

    return quickWins.slice(0, 3); // Limit to top 3 quick wins
  }

  private async generateRecommendedFeatures(context: PersonalizationContext): Promise<RecommendedFeature[]> {
    const { auditorProfile, challengeProgress } = context;
    const features: RecommendedFeature[] = [];

    if (auditorProfile.experienceLevel === 'beginner') {
      features.push({
        id: 'guided_audit',
        title: 'Guided Audit Assistant',
        description: 'AI-powered guidance for your first audits',
        category: 'Learning',
        estimatedValue: 'high',
        difficulty: 'easy',
        timeToValue: 10,
        actionUrl: '/audit-assistant'
      });
    }

    if (challengeProgress.length === 0) {
      features.push({
        id: 'challenges',
        title: 'Weekly Challenges',
        description: 'Gamified tasks to improve your skills',
        category: 'Gamification',
        estimatedValue: 'medium',
        difficulty: 'easy',
        timeToValue: 5,
        actionUrl: '/challenges'
      });
    }

    if (auditorProfile.experienceLevel === 'expert') {
      features.push({
        id: 'ai_assistant_pro',
        title: 'AI Assistant Pro',
        description: 'Advanced AI tools for complex audits',
        category: 'Tools',
        estimatedValue: 'high',
        difficulty: 'medium',
        timeToValue: 15,
        actionUrl: '/ai-assistant-pro'
      });
    }

    return features;
  }

  private async generateActionPlan(context: PersonalizationContext): Promise<ActionPlanItem[]> {
    const { auditorProfile, learningProgress } = context;
    const actionPlan: ActionPlanItem[] = [];

    if (auditorProfile.experienceLevel === 'beginner') {
      actionPlan.push({
        id: 'complete_fundamentals',
        title: 'Complete Web3 Security Fundamentals',
        description: 'Master the basics of blockchain security',
        priority: 'high',
        estimatedDuration: 20,
        category: 'Learning',
        actionUrl: '/learning-paths/fundamentals',
        status: 'not_started'
      });
    }

    if (auditorProfile.specializations.length === 0) {
      actionPlan.push({
        id: 'choose_specialization',
        title: 'Choose Your Specialization',
        description: 'Focus on DeFi, NFTs, or Smart Contract security',
        priority: 'medium',
        estimatedDuration: 2,
        category: 'Profile',
        actionUrl: '/profile/specializations',
        status: 'not_started'
      });
    }

    actionPlan.push({
      id: 'first_audit',
      title: 'Complete Your First Audit',
      description: 'Apply your knowledge in a real audit scenario',
      priority: 'high',
      estimatedDuration: 8,
      category: 'Practice',
      dependencies: ['complete_fundamentals'],
      actionUrl: '/audits/new',
      status: 'not_started'
    });

    return actionPlan;
  }

  // Data Retrieval Methods
  private async getRecentActivity(auditorId: string): Promise<GamificationAnalytics[]> {
    const { data, error } = await supabase
      .from('gamification_analytics')
      .select('*')
      .eq('auditor_id', auditorId)
      .order('timestamp', { ascending: false })
      .limit(50);

    if (error) {
      console.error('Error fetching recent activity:', error);
      return [];
    }

    return data || [];
  }

  private async getLearningProgress(auditorId: string): Promise<LearningProgress[]> {
    const { data, error } = await supabase
      .from('learning_progress')
      .select(`
        *,
        learning_path:learning_paths(*)
      `)
      .eq('auditor_id', auditorId);

    if (error) {
      console.error('Error fetching learning progress:', error);
      return [];
    }

    return data || [];
  }

  private async getChallengeProgress(auditorId: string): Promise<AuditorChallengeProgress[]> {
    const { data, error } = await supabase
      .from('auditor_challenge_progress')
      .select(`
        *,
        challenge:gamification_challenges(*)
      `)
      .eq('auditor_id', auditorId);

    if (error) {
      console.error('Error fetching challenge progress:', error);
      return [];
    }

    return data || [];
  }

  private async getAuditorBadges(auditorId: string): Promise<AuditorBadge[]> {
    const { data, error } = await supabase
      .from('auditor_badges')
      .select(`
        *,
        badge:achievement_badges(*)
      `)
      .eq('auditor_id', auditorId);

    if (error) {
      console.error('Error fetching auditor badges:', error);
      return [];
    }

    return data || [];
  }

  async getGamificationSummary(auditorId: string): Promise<GamificationSummary | null> {
    try {
      const { data, error } = await supabase
        .rpc('get_auditor_gamification_summary', { auditor_uuid: auditorId });

      if (error) {
        console.error('Error fetching gamification summary:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error calling gamification summary function:', error);
      return null;
    }
  }

  private async getPersonalizedChallenges(context: PersonalizationContext): Promise<GamificationChallenge[]> {
    const { auditorProfile } = context;
    
    const { data, error } = await supabase
      .from('gamification_challenges')
      .select('*')
      .contains('target_audience', [auditorProfile.experienceLevel])
      .gte('end_date', new Date().toISOString())
      .order('difficulty_level', { ascending: true })
      .limit(5);

    if (error) {
      console.error('Error fetching personalized challenges:', error);
      return [];
    }

    return data || [];
  }

  private async getPersonalizedLearningPaths(context: PersonalizationContext): Promise<LearningPath[]> {
    const { auditorProfile } = context;
    
    const { data, error } = await supabase
      .from('learning_paths')
      .select('*')
      .eq('difficulty_level', auditorProfile.experienceLevel)
      .order('estimated_duration', { ascending: true })
      .limit(3);

    if (error) {
      console.error('Error fetching personalized learning paths:', error);
      return [];
    }

    return data || [];
  }

  // Behavioral Learning and Pattern Recognition
  async analyzeBehaviorPatterns(auditorId: string): Promise<BehaviorPattern[]> {
    const { data, error } = await supabase
      .from('behavioral_analytics')
      .select('*')
      .eq('auditor_id', auditorId)
      .gte('timestamp', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()) // Last 30 days
      .order('timestamp', { ascending: false });

    if (error) {
      console.error('Error fetching behavioral data:', error);
      return [];
    }

    // Analyze patterns (simplified implementation)
    const patterns: BehaviorPattern[] = [];
    const eventCounts: Record<string, number> = {};
    
    data?.forEach(event => {
      eventCounts[event.event_type] = (eventCounts[event.event_type] || 0) + 1;
    });

    Object.entries(eventCounts).forEach(([patternType, frequency]) => {
      patterns.push({
        patternType,
        frequency,
        context: {},
        confidence: Math.min(frequency / 10, 1), // Simple confidence score
        lastObserved: new Date().toISOString()
      });
    });

    return patterns;
  }

  // Recommendations Engine
  async generateRecommendations(auditorId: string): Promise<PersonalizedRecommendation[]> {
    const behaviorPatterns = await this.analyzeBehaviorPatterns(auditorId);
    const recommendations: PersonalizedRecommendation[] = [];

    // Generate recommendations based on behavior patterns
    behaviorPatterns.forEach(pattern => {
      if (pattern.patternType === 'challenge_viewed' && pattern.frequency > 5) {
        recommendations.push({
          id: `rec_${Date.now()}_${Math.random()}`,
          auditorId,
          recommendationType: 'challenge',
          recommendationData: {
            challengeType: 'advanced',
            reason: 'High engagement with challenges'
          },
          confidenceScore: pattern.confidence,
          status: 'pending',
          generatedAt: new Date().toISOString()
        });
      }
    });

    return recommendations;
  }

  async saveRecommendations(recommendations: PersonalizedRecommendation[]): Promise<boolean> {
    const { error } = await supabase
      .from('personalized_recommendations')
      .insert(recommendations);

    if (error) {
      console.error('Error saving recommendations:', error);
      return false;
    }

    return true;
  }

  // Utility Methods
  private getTimeOfDay(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  }

  private getTimeBasedEmoji(): string {
    const hour = new Date().getHours();
    if (hour < 6) return '🌙';
    if (hour < 12) return '☀️';
    if (hour < 17) return '🌤️';
    if (hour < 20) return '🌅';
    return '🌙';
  }

  // Cleanup and Utility
  updateSessionId(): void {
    this.sessionId = this.generateSessionId();
  }

  getSessionId(): string {
    return this.sessionId;
  }
}

export const personalizationService = new PersonalizationService(); 