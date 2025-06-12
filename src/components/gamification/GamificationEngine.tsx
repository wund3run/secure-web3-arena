
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth';

interface XPGain {
  amount: number;
  reason: string;
  timestamp: Date;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
  progress: number;
  maxProgress: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  xpReward: number;
}

interface UserLevel {
  level: number;
  title: string;
  xp: number;
  maxXp: number;
  badges: string[];
  perks: string[];
}

interface Leaderboard {
  period: 'weekly' | 'monthly' | 'allTime';
  users: {
    id: string;
    name: string;
    xp: number;
    level: number;
    rank: number;
    avatar?: string;
  }[];
}

interface GamificationContextType {
  userLevel: UserLevel;
  achievements: Achievement[];
  recentXPGains: XPGain[];
  leaderboard: Leaderboard;
  addXP: (amount: number, reason: string) => void;
  unlockAchievement: (achievementId: string) => void;
  checkAchievements: (action: string, metadata?: any) => void;
  getNextLevelRequirement: () => number;
  getUserRank: () => number;
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

export const useGamification = () => {
  const context = useContext(GamificationContext);
  if (!context) {
    throw new Error('useGamification must be used within a GamificationProvider');
  }
  return context;
};

// XP values for different actions
const XP_VALUES = {
  COMPLETE_AUDIT: 500,
  FIND_CRITICAL_VULNERABILITY: 200,
  FIND_HIGH_VULNERABILITY: 100,
  FIND_MEDIUM_VULNERABILITY: 50,
  FIND_LOW_VULNERABILITY: 25,
  SUBMIT_REPORT: 150,
  RECEIVE_5_STAR_REVIEW: 100,
  HELP_COMMUNITY_MEMBER: 50,
  COMPLETE_TUTORIAL: 25,
  DAILY_LOGIN: 10,
  STREAK_BONUS: 50,
  REFERRAL: 200,
  PROFILE_COMPLETION: 100
};

// Level thresholds
const LEVEL_THRESHOLDS = [
  { level: 1, xp: 0, title: 'Newcomer' },
  { level: 2, xp: 500, title: 'Apprentice' },
  { level: 3, xp: 1200, title: 'Analyst' },
  { level: 4, xp: 2000, title: 'Specialist' },
  { level: 5, xp: 3000, title: 'Expert' },
  { level: 6, xp: 4500, title: 'Veteran' },
  { level: 7, xp: 6500, title: 'Master' },
  { level: 8, xp: 9000, title: 'Elite' },
  { level: 9, xp: 12000, title: 'Legend' },
  { level: 10, xp: 16000, title: 'Grandmaster' }
];

// Achievement definitions
const ACHIEVEMENT_DEFINITIONS: Achievement[] = [
  {
    id: 'first-audit',
    title: 'First Steps',
    description: 'Complete your first security audit',
    icon: 'shield',
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    rarity: 'common',
    xpReward: 100
  },
  {
    id: 'audit-streak-5',
    title: 'Getting Warmed Up',
    description: 'Complete 5 audits',
    icon: 'flame',
    unlocked: false,
    progress: 0,
    maxProgress: 5,
    rarity: 'common',
    xpReward: 200
  },
  {
    id: 'audit-streak-25',
    title: 'Seasoned Professional',
    description: 'Complete 25 audits',
    icon: 'star',
    unlocked: false,
    progress: 0,
    maxProgress: 25,
    rarity: 'rare',
    xpReward: 500
  },
  {
    id: 'vulnerability-hunter',
    title: 'Vulnerability Hunter',
    description: 'Find 100 vulnerabilities',
    icon: 'target',
    unlocked: false,
    progress: 0,
    maxProgress: 100,
    rarity: 'epic',
    xpReward: 1000
  },
  {
    id: 'critical-finder',
    title: 'Critical Eye',
    description: 'Find 10 critical vulnerabilities',
    icon: 'alert-triangle',
    unlocked: false,
    progress: 0,
    maxProgress: 10,
    rarity: 'rare',
    xpReward: 750
  },
  {
    id: 'perfect-score',
    title: 'Perfectionist',
    description: 'Receive 10 five-star reviews',
    icon: 'award',
    unlocked: false,
    progress: 0,
    maxProgress: 10,
    rarity: 'epic',
    xpReward: 800
  },
  {
    id: 'community-helper',
    title: 'Community Hero',
    description: 'Help 50 community members',
    icon: 'users',
    unlocked: false,
    progress: 0,
    maxProgress: 50,
    rarity: 'legendary',
    xpReward: 1500
  },
  {
    id: 'speed-demon',
    title: 'Speed Demon',
    description: 'Complete an audit in under 24 hours',
    icon: 'zap',
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    rarity: 'rare',
    xpReward: 300
  }
];

export const GamificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [userLevel, setUserLevel] = useState<UserLevel>({
    level: 1,
    title: 'Newcomer',
    xp: 0,
    maxXp: 500,
    badges: [],
    perks: []
  });
  const [achievements, setAchievements] = useState<Achievement[]>(ACHIEVEMENT_DEFINITIONS);
  const [recentXPGains, setRecentXPGains] = useState<XPGain[]>([]);
  const [leaderboard, setLeaderboard] = useState<Leaderboard>({
    period: 'weekly',
    users: []
  });

  // Calculate level from XP
  const calculateLevel = (totalXP: number): UserLevel => {
    let currentLevel = LEVEL_THRESHOLDS[0];
    let nextLevel = LEVEL_THRESHOLDS[1];

    for (let i = 0; i < LEVEL_THRESHOLDS.length - 1; i++) {
      if (totalXP >= LEVEL_THRESHOLDS[i].xp && totalXP < LEVEL_THRESHOLDS[i + 1].xp) {
        currentLevel = LEVEL_THRESHOLDS[i];
        nextLevel = LEVEL_THRESHOLDS[i + 1];
        break;
      }
    }

    // If XP exceeds the highest threshold
    if (totalXP >= LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1].xp) {
      currentLevel = LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
      nextLevel = { level: currentLevel.level + 1, xp: currentLevel.xp + 5000, title: 'Transcendent' };
    }

    return {
      level: currentLevel.level,
      title: currentLevel.title,
      xp: totalXP,
      maxXp: nextLevel.xp,
      badges: getBadgesForLevel(currentLevel.level),
      perks: getPerksForLevel(currentLevel.level)
    };
  };

  const getBadgesForLevel = (level: number): string[] => {
    const badges = [];
    if (level >= 2) badges.push('Verified Auditor');
    if (level >= 5) badges.push('Security Expert');
    if (level >= 8) badges.push('Elite Specialist');
    if (level >= 10) badges.push('Grandmaster');
    return badges;
  };

  const getPerksForLevel = (level: number): string[] => {
    const perks = [];
    if (level >= 2) perks.push('Priority Support');
    if (level >= 3) perks.push('5% Fee Reduction');
    if (level >= 5) perks.push('Beta Feature Access');
    if (level >= 7) perks.push('10% Fee Reduction');
    if (level >= 10) perks.push('VIP Status');
    return perks;
  };

  const addXP = (amount: number, reason: string) => {
    const newXPGain: XPGain = {
      amount,
      reason,
      timestamp: new Date()
    };

    setRecentXPGains(prev => [newXPGain, ...prev].slice(0, 10));
    
    const newTotalXP = userLevel.xp + amount;
    const newLevel = calculateLevel(newTotalXP);
    
    // Check for level up
    if (newLevel.level > userLevel.level) {
      // Show level up notification
      console.log(`Level up! You are now level ${newLevel.level} - ${newLevel.title}`);
    }
    
    setUserLevel(newLevel);
  };

  const unlockAchievement = (achievementId: string) => {
    setAchievements(prev => prev.map(achievement => {
      if (achievement.id === achievementId && !achievement.unlocked) {
        const unlockedAchievement = {
          ...achievement,
          unlocked: true,
          unlockedAt: new Date(),
          progress: achievement.maxProgress
        };
        
        // Award XP for achievement
        addXP(achievement.xpReward, `Achievement: ${achievement.title}`);
        
        return unlockedAchievement;
      }
      return achievement;
    }));
  };

  const updateAchievementProgress = (achievementId: string, progress: number) => {
    setAchievements(prev => prev.map(achievement => {
      if (achievement.id === achievementId) {
        const newProgress = Math.min(progress, achievement.maxProgress);
        if (newProgress >= achievement.maxProgress && !achievement.unlocked) {
          unlockAchievement(achievementId);
        }
        return { ...achievement, progress: newProgress };
      }
      return achievement;
    }));
  };

  const checkAchievements = (action: string, metadata?: any) => {
    switch (action) {
      case 'AUDIT_COMPLETED':
        // Update audit-related achievements
        const currentAudits = metadata?.auditCount || 0;
        updateAchievementProgress('first-audit', currentAudits >= 1 ? 1 : 0);
        updateAchievementProgress('audit-streak-5', currentAudits);
        updateAchievementProgress('audit-streak-25', currentAudits);
        break;
        
      case 'VULNERABILITY_FOUND':
        const severity = metadata?.severity;
        const totalVulns = metadata?.totalVulnerabilities || 0;
        const criticalVulns = metadata?.criticalVulnerabilities || 0;
        
        updateAchievementProgress('vulnerability-hunter', totalVulns);
        if (severity === 'critical') {
          updateAchievementProgress('critical-finder', criticalVulns);
        }
        break;
        
      case 'REVIEW_RECEIVED':
        if (metadata?.rating === 5) {
          const fiveStarReviews = metadata?.fiveStarCount || 0;
          updateAchievementProgress('perfect-score', fiveStarReviews);
        }
        break;
        
      case 'COMMUNITY_HELP':
        const helpCount = metadata?.helpCount || 0;
        updateAchievementProgress('community-helper', helpCount);
        break;
        
      case 'FAST_AUDIT':
        if (metadata?.completionTimeHours < 24) {
          updateAchievementProgress('speed-demon', 1);
        }
        break;
    }
  };

  const getNextLevelRequirement = (): number => {
    return userLevel.maxXp - userLevel.xp;
  };

  const getUserRank = (): number => {
    // This would typically come from the backend
    return Math.floor(Math.random() * 100) + 1;
  };

  const value: GamificationContextType = {
    userLevel,
    achievements,
    recentXPGains,
    leaderboard,
    addXP,
    unlockAchievement,
    checkAchievements,
    getNextLevelRequirement,
    getUserRank
  };

  return (
    <GamificationContext.Provider value={value}>
      {children}
    </GamificationContext.Provider>
  );
};
