import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

// Core gamification types
export interface AuditorXP {
  userId: string;
  totalXP: number;
  currentLevel: number;
  currentLevelXP: number;
  nextLevelXP: number;
  dailyStreak: number;
  weeklyStreak: number;
  lastActivityDate: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'skill' | 'achievement' | 'milestone' | 'behavior' | 'special';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  requirements: BadgeRequirement[];
  xpReward: number;
  unlockedAt?: string;
}

export interface BadgeRequirement {
  type: 'audits_completed' | 'vulnerabilities_found' | 'streak_days' | 'tools_used' | 'client_rating' | 'response_time' | 'continuous_learning';
  threshold: number;
  description: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly' | 'special';
  category: 'audit_quality' | 'productivity' | 'learning' | 'community';
  requirements: ChallengeRequirement[];
  rewards: ChallengeReward[];
  startDate: string;
  endDate: string;
  progress: number;
  isCompleted: boolean;
  participants: number;
}

export interface ChallengeRequirement {
  action: string;
  target: number;
  current: number;
}

export interface ChallengeReward {
  type: 'xp' | 'badge' | 'unlock' | 'surprise';
  value: string | number;
  description: string;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  userName: string;
  avatar: string;
  score: number;
  badge?: string;
  streak: number;
  change: 'up' | 'down' | 'same';
}

export interface AuditorAvatar {
  userId: string;
  baseAvatar: string;
  accessories: string[];
  unlockedItems: string[];
  customizations: Record<string, any>;
}

export interface UnlockableItem {
  id: string;
  name: string;
  type: 'avatar_accessory' | 'dashboard_theme' | 'tool_feature' | 'advanced_analytics' | 'priority_support';
  category: string;
  description: string;
  requirements: UnlockRequirement[];
  previewImage: string;
  isUnlocked: boolean;
}

export interface UnlockRequirement {
  type: 'level' | 'xp' | 'badge' | 'audit_count' | 'streak';
  value: number | string;
  description: string;
}

export interface SurpriseReward {
  id: string;
  type: 'bonus_xp' | 'rare_badge' | 'unlock' | 'feature_preview';
  title: string;
  description: string;
  value: any;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  triggerConditions: string[];
}

// XP Action Types - focused on auditor behavioral incentives
export enum XPAction {
  // Core Audit Activities
  AUDIT_COMPLETED = 'audit_completed',
  FINDING_REPORTED = 'finding_reported',
  CRITICAL_FINDING = 'critical_finding',
  HIGH_FINDING = 'high_finding',
  MILESTONE_COMPLETED = 'milestone_completed',
  DELIVERABLE_SUBMITTED = 'deliverable_submitted',
  
  // Quality & Excellence
  PERFECT_AUDIT_SCORE = 'perfect_audit_score',
  EARLY_DELIVERY = 'early_delivery',
  CLIENT_SATISFACTION_HIGH = 'client_satisfaction_high',
  ZERO_DEFECTS = 'zero_defects',
  
  // Learning & Growth
  CERTIFICATION_EARNED = 'certification_earned',
  SKILL_ASSESSMENT_PASSED = 'skill_assessment_passed',
  RESEARCH_CONTRIBUTION = 'research_contribution',
  KNOWLEDGE_SHARING = 'knowledge_sharing',
  
  // Consistency & Habits
  DAILY_LOGIN = 'daily_login',
  WEEKLY_GOALS_MET = 'weekly_goals_met',
  STREAK_MILESTONE = 'streak_milestone',
  PROFILE_UPDATED = 'profile_updated',
  
  // Community & Collaboration
  MENTORSHIP_PROVIDED = 'mentorship_provided',
  PEER_REVIEW = 'peer_review',
  FORUM_CONTRIBUTION = 'forum_contribution',
  BEST_PRACTICE_SHARED = 'best_practice_shared',
  
  // Innovation & Tools
  TOOL_IMPROVEMENT_SUGGESTED = 'tool_improvement_suggested',
  AUTOMATION_IMPLEMENTED = 'automation_implemented',
  PROCESS_OPTIMIZATION = 'process_optimization',
  
  // Client Relations
  CLIENT_FEEDBACK_POSITIVE = 'client_feedback_positive',
  REPEAT_CLIENT = 'repeat_client',
  REFERRAL_GENERATED = 'referral_generated'
}

// XP Values - Behavioral design focused
export const XP_VALUES: Record<XPAction, number> = {
  // Core Activities (moderate to high XP)
  [XPAction.AUDIT_COMPLETED]: 500,
  [XPAction.FINDING_REPORTED]: 50,
  [XPAction.CRITICAL_FINDING]: 200,
  [XPAction.HIGH_FINDING]: 100,
  [XPAction.MILESTONE_COMPLETED]: 150,
  [XPAction.DELIVERABLE_SUBMITTED]: 75,
  
  // Quality Excellence (high XP rewards)
  [XPAction.PERFECT_AUDIT_SCORE]: 1000,
  [XPAction.EARLY_DELIVERY]: 300,
  [XPAction.CLIENT_SATISFACTION_HIGH]: 250,
  [XPAction.ZERO_DEFECTS]: 400,
  
  // Learning & Growth (encouraging skill development)
  [XPAction.CERTIFICATION_EARNED]: 600,
  [XPAction.SKILL_ASSESSMENT_PASSED]: 200,
  [XPAction.RESEARCH_CONTRIBUTION]: 350,
  [XPAction.KNOWLEDGE_SHARING]: 100,
  
  // Daily Habits (small but frequent)
  [XPAction.DAILY_LOGIN]: 10,
  [XPAction.WEEKLY_GOALS_MET]: 200,
  [XPAction.STREAK_MILESTONE]: 100,
  [XPAction.PROFILE_UPDATED]: 25,
  
  // Community (social reinforcement)
  [XPAction.MENTORSHIP_PROVIDED]: 150,
  [XPAction.PEER_REVIEW]: 80,
  [XPAction.FORUM_CONTRIBUTION]: 30,
  [XPAction.BEST_PRACTICE_SHARED]: 120,
  
  // Innovation (high value for platform improvement)
  [XPAction.TOOL_IMPROVEMENT_SUGGESTED]: 250,
  [XPAction.AUTOMATION_IMPLEMENTED]: 500,
  [XPAction.PROCESS_OPTIMIZATION]: 300,
  
  // Client Relations (business critical)
  [XPAction.CLIENT_FEEDBACK_POSITIVE]: 180,
  [XPAction.REPEAT_CLIENT]: 400,
  [XPAction.REFERRAL_GENERATED]: 350
};

export const XP_ACTION_DESCRIPTIONS: Record<XPAction, string> = {
  [XPAction.AUDIT_COMPLETED]: 'Successfully completed a security audit',
  [XPAction.FINDING_REPORTED]: 'Discovered and documented a security finding',
  [XPAction.CRITICAL_FINDING]: 'Identified a critical security vulnerability',
  [XPAction.HIGH_FINDING]: 'Found a high-severity security issue',
  [XPAction.MILESTONE_COMPLETED]: 'Completed an audit milestone on time',
  [XPAction.DELIVERABLE_SUBMITTED]: 'Submitted audit deliverables',
  [XPAction.PERFECT_AUDIT_SCORE]: 'Achieved perfect score on audit quality',
  [XPAction.EARLY_DELIVERY]: 'Delivered audit ahead of schedule',
  [XPAction.CLIENT_SATISFACTION_HIGH]: 'Received excellent client feedback',
  [XPAction.ZERO_DEFECTS]: 'Completed audit with zero quality issues',
  [XPAction.CERTIFICATION_EARNED]: 'Earned a professional certification',
  [XPAction.SKILL_ASSESSMENT_PASSED]: 'Passed a skills assessment',
  [XPAction.RESEARCH_CONTRIBUTION]: 'Contributed to security research',
  [XPAction.KNOWLEDGE_SHARING]: 'Shared knowledge with community',
  [XPAction.DAILY_LOGIN]: 'Logged in to stay engaged',
  [XPAction.WEEKLY_GOALS_MET]: 'Completed weekly objectives',
  [XPAction.STREAK_MILESTONE]: 'Maintained consistent activity streak',
  [XPAction.PROFILE_UPDATED]: 'Kept profile information current',
  [XPAction.MENTORSHIP_PROVIDED]: 'Mentored another auditor',
  [XPAction.PEER_REVIEW]: 'Provided peer review feedback',
  [XPAction.FORUM_CONTRIBUTION]: 'Participated in community discussions',
  [XPAction.BEST_PRACTICE_SHARED]: 'Shared audit best practices',
  [XPAction.TOOL_IMPROVEMENT_SUGGESTED]: 'Suggested platform improvements',
  [XPAction.AUTOMATION_IMPLEMENTED]: 'Implemented process automation',
  [XPAction.PROCESS_OPTIMIZATION]: 'Optimized audit processes',
  [XPAction.CLIENT_FEEDBACK_POSITIVE]: 'Received positive client review',
  [XPAction.REPEAT_CLIENT]: 'Secured repeat business from client',
  [XPAction.REFERRAL_GENERATED]: 'Generated new client referral'
};

// Badge Types
export enum BadgeType {
  // Achievement Badges
  FIRST_AUDIT = 'first_audit',
  AUDIT_MASTER = 'audit_master',
  SECURITY_EXPERT = 'security_expert',
  QUALITY_CHAMPION = 'quality_champion',
  
  // Streak Badges
  WEEK_WARRIOR = 'week_warrior',
  MONTH_MASTER = 'month_master',
  YEAR_LEGEND = 'year_legend',
  
  // Quality Badges
  PERFECTIONIST = 'perfectionist',
  SPEED_DEMON = 'speed_demon',
  CLIENT_FAVORITE = 'client_favorite',
  
  // Learning Badges
  KNOWLEDGE_SEEKER = 'knowledge_seeker',
  MENTOR = 'mentor',
  INNOVATOR = 'innovator',
  
  // Community Badges
  COMMUNITY_LEADER = 'community_leader',
  HELPFUL_PEER = 'helpful_peer',
  THOUGHT_LEADER = 'thought_leader'
}

// Badge Rarity Levels
export enum BadgeRarity {
  COMMON = 'common',
  RARE = 'rare',
  EPIC = 'epic',
  LEGENDARY = 'legendary'
}

// Level Configuration
export interface LevelConfig {
  level: number;
  xpRequired: number;
  title: string;
  perks: string[];
}

// Generate level progression (exponential growth)
export const generateLevelConfig = (): LevelConfig[] => {
  const levels: LevelConfig[] = [];
  const baseXP = 1000;
  const multiplier = 1.5;
  
  const levelTitles = [
    'Novice Auditor', 'Security Analyst', 'Audit Specialist', 'Senior Auditor', 'Security Expert',
    'Lead Auditor', 'Principal Auditor', 'Security Architect', 'Audit Master', 'Security Guru',
    'Elite Auditor', 'Security Sage', 'Audit Legend', 'Security Oracle', 'Grandmaster Auditor'
  ];

  for (let i = 1; i <= 50; i++) {
    const xpRequired = Math.floor(baseXP * Math.pow(multiplier, i - 1));
    const titleIndex = Math.min(i - 1, levelTitles.length - 1);
    
    levels.push({
      level: i,
      xpRequired,
      title: levelTitles[titleIndex] || `Level ${i} Auditor`,
      perks: [
        `Unlock Level ${i} privileges`,
        i % 5 === 0 ? 'New badge collection unlocked' : '',
        i % 10 === 0 ? 'Special avatar customization' : '',
        i % 15 === 0 ? 'Premium features access' : ''
      ].filter(Boolean)
    });
  }
  
  return levels;
};

// Behavioral Multipliers
export interface BehaviorMultiplier {
  type: string;
  multiplier: number;
  description: string;
}

export const calculateBehaviorMultipliers = (
  auditorId: string,
  timestamp: Date = new Date()
): BehaviorMultiplier[] => {
  const multipliers: BehaviorMultiplier[] = [];
  const hour = timestamp.getHours();
  const day = timestamp.getDay();
  
  // Time-based bonuses (encouraging specific behaviors)
  if (hour >= 6 && hour <= 9) {
    multipliers.push({
      type: 'early_bird',
      multiplier: 1.25,
      description: 'Early bird bonus (6AM-9AM)'
    });
  } else if (hour >= 22 || hour <= 2) {
    multipliers.push({
      type: 'night_owl',
      multiplier: 1.15,
      description: 'Night owl bonus (10PM-2AM)'
    });
  }
  
  // Weekend productivity bonus
  if (day === 0 || day === 6) {
    multipliers.push({
      type: 'weekend_warrior',
      multiplier: 1.2,
      description: 'Weekend dedication bonus'
    });
  }
  
  return multipliers;
};

// Challenge Types
export enum ChallengeType {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  SPECIAL = 'special'
}

// Level calculation utility
export const calculateLevelFromXP = (totalXP: number): { level: number; currentLevelXP: number; nextLevelXP: number } => {
  const levels = generateLevelConfig();
  
  for (let i = levels.length - 1; i >= 0; i--) {
    if (totalXP >= levels[i].xpRequired) {
      const currentLevel = levels[i].level;
      const currentLevelXP = totalXP - levels[i].xpRequired;
      const nextLevelXP = i < levels.length - 1 ? levels[i + 1].xpRequired - totalXP : 0;
      
      return {
        level: currentLevel,
        currentLevelXP,
        nextLevelXP: Math.max(0, nextLevelXP)
      };
    }
  }
  
  return { level: 1, currentLevelXP: totalXP, nextLevelXP: levels[0].xpRequired - totalXP };
};

// Main Gamification Service Class
export class GamificationService {
  /**
   * Award XP to a user for a specific action
   */
  static async awardXP(userId: string, action: XPAction, metadata?: Record<string, any>): Promise<void> {
    try {
      const baseXP = XP_VALUES[action];
      let finalXP = baseXP;
      
      // Apply multipliers based on behavioral patterns
      const multipliers = await this.calculateMultipliers(userId, action, metadata);
      finalXP = Math.floor(baseXP * multipliers.total);
      
      // Get current XP data
      const currentData = await this.getAuditorXP(userId);
      const newTotalXP = currentData.totalXP + finalXP;
      const levelData = calculateLevelFromXP(newTotalXP);
      
      // Check for level up
      const leveledUp = levelData.level > currentData.currentLevel;
      
      // Update XP in database (using audit_progress table)
      await supabase.from('audit_progress').upsert({
        auditor_id: userId,
        audit_request_id: `gamification_${userId}`,
        current_phase: 'gamification',
        progress_percentage: levelData.level,
        phase_details: {
          total_xp: newTotalXP,
          current_level: levelData.level,
          last_activity: new Date().toISOString(),
          action,
          xp_gained: finalXP
        },
        notes: `XP: ${finalXP} from ${action}`,
        updated_at: new Date().toISOString()
      });
      
      // Trigger notifications for significant gains
      if (leveledUp || finalXP > 100) {
        this.sendGamificationNotification(userId, {
          type: leveledUp ? 'level_up' : 'xp_earned',
          title: leveledUp ? `Level Up! You're now level ${levelData.level}!` : `+${finalXP} XP`,
          description: leveledUp ? 'New features and rewards unlocked!' : this.getActionDescription(action),
          xpGained: finalXP,
          newLevel: leveledUp ? levelData.level : undefined
        });
      }
      
    } catch (error) {
      console.error('Error awarding XP:', error);
    }
  }
  
  /**
   * Calculate behavioral multipliers for XP
   */
  static async calculateMultipliers(userId: string, action: XPAction, metadata?: Record<string, any>): Promise<{
    streak: number;
    time: number;
    quality: number;
    total: number;
  }> {
    const multipliers = {
      streak: 1,
      time: 1,
      quality: 1,
      total: 1
    };
    
    try {
      const auditorData = await this.getAuditorXP(userId);
      
      // Streak multiplier (progressive reward for consistency)
      if (auditorData.dailyStreak >= 7) {
        multipliers.streak = Math.min(1 + (auditorData.dailyStreak * 0.05), 2);
      }
      
      // Time-based behavioral rewards
      const hour = new Date().getHours();
      if (hour >= 6 && hour <= 9) {
        multipliers.time = 1.25; // Early bird bonus
      } else if (hour >= 22 || hour <= 2) {
        multipliers.time = 1.15; // Night owl bonus
      }
      
      // Quality multipliers for excellence
      if (metadata?.quality === 'perfect') {
        multipliers.quality = 1.5;
      } else if (metadata?.quality === 'high') {
        multipliers.quality = 1.25;
      }
      
      multipliers.total = multipliers.streak * multipliers.time * multipliers.quality;
      
    } catch (error) {
      console.error('Error calculating multipliers:', error);
    }
    
    return multipliers;
  }
  
  /**
   * Get auditor's current XP and progression data
   */
  static async getAuditorXP(userId: string): Promise<AuditorXP> {
    try {
      const { data, error } = await supabase
        .from('audit_progress')
        .select('*')
        .eq('auditor_id', userId)
        .eq('audit_request_id', `gamification_${userId}`)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        throw error;
      }
      
      if (!data) {
        // Initialize new user
        const levelData = calculateLevelFromXP(0);
        return {
          userId,
          totalXP: 0,
          currentLevel: 1,
          currentLevelXP: 0,
          nextLevelXP: levelData.nextLevelXP,
          dailyStreak: 0,
          weeklyStreak: 0,
          lastActivityDate: new Date().toISOString()
        };
      }
      
      const phaseDetails = data.phase_details as any;
      const totalXP = phaseDetails?.total_xp || 0;
      const levelData = calculateLevelFromXP(totalXP);
      
      return {
        userId,
        totalXP,
        currentLevel: levelData.level,
        currentLevelXP: levelData.currentLevelXP,
        nextLevelXP: levelData.nextLevelXP,
        dailyStreak: phaseDetails?.daily_streak || 0,
        weeklyStreak: phaseDetails?.weekly_streak || 0,
        lastActivityDate: phaseDetails?.last_activity || new Date().toISOString()
      };
      
    } catch (error) {
      console.error('Error getting auditor XP:', error);
      // Return default values for graceful degradation
      const levelData = calculateLevelFromXP(0);
      return {
        userId,
        totalXP: 0,
        currentLevel: 1,
        currentLevelXP: 0,
        nextLevelXP: levelData.nextLevelXP,
        dailyStreak: 0,
        weeklyStreak: 0,
        lastActivityDate: new Date().toISOString()
      };
    }
  }
  
  /**
   * Update activity streak for habit formation
   */
  static async updateActivityStreak(userId: string): Promise<void> {
    try {
      const currentData = await this.getAuditorXP(userId);
      const lastActivity = new Date(currentData.lastActivityDate);
      const today = new Date();
      const daysDiff = Math.floor((today.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24));
      
      let newDailyStreak = currentData.dailyStreak;
      let newWeeklyStreak = currentData.weeklyStreak;
      
      if (daysDiff === 1) {
        // Consecutive day - reward consistency
        newDailyStreak += 1;
        if (newDailyStreak % 7 === 0) {
          newWeeklyStreak += 1;
          // Award streak milestone XP
          await this.awardXP(userId, XPAction.STREAK_MILESTONE);
        }
      } else if (daysDiff > 1) {
        // Streak broken - reset but encourage return
        newDailyStreak = 1;
      }
      
      // Update in database
      await supabase.from('audit_progress').upsert({
        auditor_id: userId,
        audit_request_id: `gamification_${userId}`,
        current_phase: 'gamification',
        progress_percentage: currentData.currentLevel,
        phase_details: {
          ...currentData,
          daily_streak: newDailyStreak,
          weekly_streak: newWeeklyStreak,
          last_activity: today.toISOString()
        },
        updated_at: new Date().toISOString()
      });
      
    } catch (error) {
      console.error('Error updating activity streak:', error);
    }
  }
  
  /**
   * Send gamification notifications (placeholder for real implementation)
   */
  static sendGamificationNotification(userId: string, notification: any): void {
    console.log('Gamification notification:', notification);
    // In real implementation, this would integrate with your notification system
  }
  
  /**
   * Get user-friendly action descriptions
   */
  static getActionDescription(action: XPAction): string {
    return XP_ACTION_DESCRIPTIONS[action] || 'Great work!';
  }

  /**
   * Get leaderboard data
   */
  static async getLeaderboard(timeframe: 'daily' | 'weekly' | 'monthly' | 'all-time' = 'weekly'): Promise<LeaderboardEntry[]> {
    try {
      // This would normally query all auditors, but for now return mock data
      return [
        { rank: 1, userId: '1', userName: 'Alex Chen', avatar: '/api/placeholder/32/32', score: 15420, streak: 28, change: 'up' },
        { rank: 2, userId: '2', userName: 'Sarah Kim', avatar: '/api/placeholder/32/32', score: 12850, streak: 15, change: 'same' },
        { rank: 3, userId: '3', userName: 'Marcus Rodriguez', avatar: '/api/placeholder/32/32', score: 11200, streak: 42, change: 'up' },
        { rank: 4, userId: '4', userName: 'Emily Watson', avatar: '/api/placeholder/32/32', score: 9750, streak: 7, change: 'down' },
        { rank: 5, userId: '5', userName: 'David Liu', avatar: '/api/placeholder/32/32', score: 8900, streak: 21, change: 'up' }
      ];
    } catch (error) {
      console.error('Error getting leaderboard:', error);
      return [];
    }
  }

  /**
   * Get active challenges for an auditor
   */
  static async getActiveChallenges(userId: string): Promise<Challenge[]> {
    const now = new Date();
    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999);
    
    const endOfWeek = new Date(now);
    endOfWeek.setDate(now.getDate() + (7 - now.getDay()));
    endOfWeek.setHours(23, 59, 59, 999);

    return [
      {
        id: 'daily-login',
        title: 'Daily Engagement',
        description: 'Log in and check your dashboard',
        type: 'daily',
        category: 'productivity',
        requirements: [{ action: 'login', target: 1, current: 0 }],
        rewards: [{ type: 'xp', value: 50, description: '50 XP bonus' }],
        startDate: now.toISOString(),
        endDate: endOfDay.toISOString(),
        progress: 0,
        isCompleted: false,
        participants: 150
      },
      {
        id: 'weekly-quality',
        title: 'Quality Focus',
        description: 'Complete 3 audits with high quality scores',
        type: 'weekly',
        category: 'audit_quality',
        requirements: [{ action: 'quality_audits', target: 3, current: 0 }],
        rewards: [
          { type: 'xp', value: 500, description: '500 XP bonus' },
          { type: 'badge', value: 'quality_champion', description: 'Quality Champion badge' }
        ],
        startDate: now.toISOString(),
        endDate: endOfWeek.toISOString(),
        progress: 0,
        isCompleted: false,
        participants: 75
      }
    ];
  }

  /**
   * Check and award badges based on achievements
   */
  static async checkAndAwardBadges(userId: string): Promise<BadgeType[]> {
    const awardedBadges: BadgeType[] = [];
    const auditorData = await this.getAuditorXP(userId);
    
    // Check for streak badges
    if (auditorData.dailyStreak >= 7 && auditorData.dailyStreak < 30) {
      awardedBadges.push(BadgeType.WEEK_WARRIOR);
    }
    if (auditorData.dailyStreak >= 30) {
      awardedBadges.push(BadgeType.MONTH_MASTER);
    }
    
    // Check for level badges
    if (auditorData.currentLevel >= 10) {
      awardedBadges.push(BadgeType.SECURITY_EXPERT);
    }
    
    return awardedBadges;
  }
} 