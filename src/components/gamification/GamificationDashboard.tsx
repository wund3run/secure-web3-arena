import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Trophy, 
  Zap, 
  Star, 
  Target, 
  TrendingUp, 
  Award, 
  Flame, 
  Crown,
  Users,
  Gift,
  Lock,
  Unlock,
  ChevronRight,
  Calendar,
  Clock,
  BarChart3,
  Shield,
  Brain,
  Settings
} from 'lucide-react';
import { GamificationService, AuditorXP, Badge as GamificationBadge, Challenge, LeaderboardEntry, UnlockableItem, XPAction, XP_VALUES } from '@/services/gamificationService';
import { useAuth } from '@/contexts/auth';
import { useToast } from '@/hooks/use-toast';
import { GamificationNotifications, useGamificationNotifications } from './GamificationNotifications';

interface GamificationDashboardProps {
  className?: string;
}

const GamificationDashboard: React.FC<GamificationDashboardProps> = ({ className }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const {
    notifications,
    dismissNotification,
    showXPGained,
    showLevelUp,
    showBadgeEarned,
    showStreakMilestone,
    showChallengeCompleted,
    showSurpriseReward
  } = useGamificationNotifications();
  
  const [auditorXP, setAuditorXP] = useState<AuditorXP | null>(null);
  const [earnedBadges, setEarnedBadges] = useState<GamificationBadge[]>([]);
  const [availableBadges, setAvailableBadges] = useState<GamificationBadge[]>([]);
  const [activeChallenges, setActiveChallenges] = useState<Challenge[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [unlockables, setUnlockables] = useState<UnlockableItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLeaderboardTimeframe, setSelectedLeaderboardTimeframe] = useState<'daily' | 'weekly' | 'monthly' | 'all-time'>('weekly');
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (user?.id) {
      loadGamificationData();
    }
  }, [user?.id]);

  const loadGamificationData = async () => {
    if (!user?.id) return;
    
    try {
      setLoading(true);
      
      // Load all gamification data in parallel
      const [xpData, leaderboardData] = await Promise.all([
        GamificationService.getAuditorXP(user.id),
        GamificationService.getLeaderboard(selectedLeaderboardTimeframe)
      ]);
      
      setAuditorXP(xpData);
      setLeaderboard(leaderboardData);
      
      // Update activity streak
      await GamificationService.updateActivityStreak(user.id);
      
      // Mock data for badges and challenges (would be fetched from service)
      setEarnedBadges([
        {
          id: 'vulnerability_hunter',
          name: 'Vulnerability Hunter',
          description: 'Found your first critical vulnerability',
          icon: '🎯',
          category: 'skill',
          rarity: 'common',
          requirements: [],
          xpReward: 100,
          unlockedAt: new Date().toISOString()
        },
        {
          id: 'streak_warrior',
          name: 'Streak Warrior',
          description: 'Maintained a 30-day activity streak',
          icon: '🔥',
          category: 'behavior',
          rarity: 'rare',
          requirements: [],
          xpReward: 750,
          unlockedAt: new Date().toISOString()
        }
      ]);
      
      setAvailableBadges([
        {
          id: 'security_expert',
          name: 'Security Expert',
          description: 'Find 50 vulnerabilities across all audits',
          icon: '🛡️',
          category: 'skill',
          rarity: 'rare',
          requirements: [{ type: 'vulnerabilities_found', threshold: 50, description: 'Find 50+ vulnerabilities' }],
          xpReward: 500
        },
        {
          id: 'audit_master',
          name: 'Audit Master',
          description: 'Complete 25 successful audits',
          icon: '👑',
          category: 'achievement',
          rarity: 'epic',
          requirements: [{ type: 'audits_completed', threshold: 25, description: 'Complete 25 audits' }],
          xpReward: 1000
        }
      ]);
      
      setActiveChallenges([
        {
          id: 'daily_hunt',
          title: 'Daily Vulnerability Hunt',
          description: 'Find at least 3 vulnerabilities today',
          type: 'daily',
          category: 'audit_quality',
          requirements: [{ action: 'find_vulnerabilities', target: 3, current: 1 }],
          rewards: [{ type: 'xp', value: 150, description: '150 XP bonus' }],
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          progress: 33,
          isCompleted: false,
          participants: 127
        },
        {
          id: 'weekly_marathon',
          title: 'Audit Marathon',
          description: 'Complete 3 audits this week with high quality ratings',
          type: 'weekly',
          category: 'productivity',
          requirements: [{ action: 'complete_audits', target: 3, current: 1 }],
          rewards: [
            { type: 'xp', value: 1000, description: '1000 XP bonus' },
            { type: 'unlock', value: 'premium_analytics', description: 'Unlock premium analytics' }
          ],
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          progress: 33,
          isCompleted: false,
          participants: 89
        }
      ]);
      
      setUnlockables([
        {
          id: 'premium_theme',
          name: 'Premium Dark Theme',
          type: 'dashboard_theme',
          category: 'customization',
          description: 'Unlock the sleek premium dark theme for your dashboard',
          requirements: [{ type: 'level', value: 5, description: 'Reach level 5' }],
          previewImage: '/themes/premium-dark.png',
          isUnlocked: xpData.currentLevel >= 5
        },
        {
          id: 'ai_assistant_pro',
          name: 'AI Assistant Pro',
          type: 'tool_feature',
          category: 'analysis',
          description: 'Advanced AI assistant with custom analysis patterns',
          requirements: [{ type: 'audit_count', value: 10, description: 'Complete 10 audits' }],
          previewImage: '/features/ai-pro.png',
          isUnlocked: false
        },
        {
          id: 'priority_support',
          name: 'Priority Support',
          type: 'priority_support',
          category: 'service',
          description: 'Get priority support with 1-hour response time',
          requirements: [{ type: 'streak', value: 30, description: 'Maintain 30-day streak' }],
          previewImage: '/features/priority-support.png',
          isUnlocked: xpData.dailyStreak >= 30
        }
      ]);
      
    } catch (error) {
      console.error('Error loading gamification data:', error);
      toast({
        title: "Error loading gamification data",
        description: "Please try refreshing the page",
        variant: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  const getRarityColor = (rarity: string) => {
    const colors = {
      common: 'bg-gray-500',
      rare: 'bg-blue-500',
      epic: 'bg-purple-500',
      legendary: 'bg-yellow-500'
    };
    return colors[rarity as keyof typeof colors] || 'bg-gray-500';
  };

  const getRarityGlow = (rarity: string) => {
    const glows = {
      common: 'shadow-gray-500/20',
      rare: 'shadow-blue-500/30',
      epic: 'shadow-purple-500/40',
      legendary: 'shadow-yellow-500/50'
    };
    return glows[rarity as keyof typeof glows] || 'shadow-gray-500/20';
  };

  const formatTimeRemaining = (endDate: string): string => {
    const now = new Date();
    const end = new Date(endDate);
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) return 'Expired';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 24) {
      const days = Math.floor(hours / 24);
      return `${days}d ${hours % 24}h`;
    }
    
    return `${hours}h ${minutes}m`;
  };

  // Test functions for gamification system
  const testXPGain = async (action: XPAction) => {
    if (!user?.id) return;
    
    try {
      const previousLevel = auditorXP?.currentLevel || 1;
      await GamificationService.awardXP(user.id, action);
      
      // Reload data to get updated values
      const newData = await GamificationService.getAuditorXP(user.id);
      setAuditorXP(newData);
      
      // Show appropriate notification
      const xpGained = XP_VALUES[action];
      if (newData.currentLevel > previousLevel) {
        showLevelUp(newData.currentLevel, xpGained);
      } else {
        showXPGained(xpGained, GamificationService.getActionDescription(action));
      }
      
      // Check for badge unlocks or milestones
      if (newData.dailyStreak > 0 && newData.dailyStreak % 7 === 0) {
        showStreakMilestone(newData.dailyStreak);
      }
      
    } catch (error) {
      console.error('Error awarding XP:', error);
      toast({
        title: "Error awarding XP",
        description: "Please try again",
        variant: "error"
      });
    }
  };

  const testNotifications = () => {
    // Show example notifications
    setTimeout(() => showXPGained(150, "Vulnerability reported"), 500);
    setTimeout(() => showBadgeEarned("Security Expert", "🛡️", "rare"), 2000);
    setTimeout(() => showLevelUp(15, 200), 4000);
    setTimeout(() => showStreakMilestone(30), 6000);
    setTimeout(() => showChallengeCompleted("Daily Hunt", "500 XP + Special Badge"), 8000);
    setTimeout(() => showSurpriseReward("You found a rare artifact! +1000 XP"), 10000);
  };

  if (loading || !auditorXP) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Gamification Notifications */}
      <GamificationNotifications
        notifications={notifications}
        onDismiss={dismissNotification}
        position="top-right"
      />

      {/* Test Button for Notifications - Remove in production */}
      <div className="fixed top-4 left-4 z-40 space-y-2">
        <Button onClick={testNotifications} variant="outline" size="sm">
          Test Notifications
        </Button>
        <div className="space-y-1">
          <Button onClick={() => testXPGain(XPAction.DAILY_LOGIN)} variant="outline" size="sm" className="w-full">
            Daily Login (+10 XP)
          </Button>
          <Button onClick={() => testXPGain(XPAction.FINDING_REPORTED)} variant="outline" size="sm" className="w-full">
            Report Finding (+50 XP)
          </Button>
          <Button onClick={() => testXPGain(XPAction.CRITICAL_FINDING)} variant="outline" size="sm" className="w-full">
            Critical Finding (+200 XP)
          </Button>
        </div>
      </div>

      {/* Header with Level Progress */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 p-6 text-white">
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Avatar className="h-16 w-16 border-4 border-white/20">
                  <AvatarImage src={user?.user_metadata?.avatar_url} />
                  <AvatarFallback className="bg-white/20 text-white text-xl font-bold">
                    {user?.user_metadata?.full_name?.[0] || 'A'}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 bg-yellow-400 text-black text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {auditorXP.currentLevel}
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold">Level {auditorXP.currentLevel} Auditor</h2>
                <p className="text-white/80">
                  {auditorXP.totalXP.toLocaleString()} Total XP
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2 mb-2">
                <Flame className="h-5 w-5 text-orange-400" />
                <span className="font-bold">{auditorXP.dailyStreak} day streak</span>
              </div>
              <div className="text-sm text-white/80">
                Weekly streak: {auditorXP.weeklyStreak} weeks
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress to Level {auditorXP.currentLevel + 1}</span>
              <span>{auditorXP.currentLevelXP} / {auditorXP.nextLevelXP} XP</span>
            </div>
            <Progress 
              value={(auditorXP.currentLevelXP / auditorXP.nextLevelXP) * 100} 
              className="h-3 bg-white/20"
            />
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 opacity-10">
          <Trophy className="h-48 w-48" />
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview" className="flex items-center space-x-2">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="achievements" className="flex items-center space-x-2">
            <Award className="h-4 w-4" />
            <span className="hidden sm:inline">Badges</span>
          </TabsTrigger>
          <TabsTrigger value="challenges" className="flex items-center space-x-2">
            <Target className="h-4 w-4" />
            <span className="hidden sm:inline">Challenges</span>
          </TabsTrigger>
          <TabsTrigger value="leaderboard" className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Leaderboard</span>
          </TabsTrigger>
          <TabsTrigger value="unlockables" className="flex items-center space-x-2">
            <Gift className="h-4 w-4" />
            <span className="hidden sm:inline">Unlocks</span>
          </TabsTrigger>
          <TabsTrigger value="stats" className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4" />
            <span className="hidden sm:inline">Stats</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-yellow-800">Total XP</p>
                    <p className="text-2xl font-bold text-yellow-900">{auditorXP.totalXP.toLocaleString()}</p>
                  </div>
                  <Star className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-800">Current Level</p>
                    <p className="text-2xl font-bold text-blue-900">{auditorXP.currentLevel}</p>
                  </div>
                  <Crown className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-orange-800">Daily Streak</p>
                    <p className="text-2xl font-bold text-orange-900">{auditorXP.dailyStreak}</p>
                  </div>
                  <Flame className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-800">Badges Earned</p>
                    <p className="text-2xl font-bold text-purple-900">{earnedBadges.length}</p>
                  </div>
                  <Award className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="h-5 w-5 text-yellow-600" />
                <span>Recent Achievements</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {earnedBadges.slice(0, 3).map((badge) => (
                  <div key={badge.id} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="text-2xl">{badge.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{badge.name}</h4>
                      <p className="text-sm text-gray-600">{badge.description}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary" className={`${getRarityColor(badge.rarity)} text-white`}>
                        {badge.rarity}
                      </Badge>
                      <p className="text-sm text-gray-500 mt-1">+{badge.xpReward} XP</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Active Challenges Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-blue-600" />
                <span>Active Challenges</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {activeChallenges.slice(0, 2).map((challenge) => (
                  <div key={challenge.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{challenge.title}</h4>
                      <Badge variant="outline">{challenge.type}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{challenge.description}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{challenge.progress}%</span>
                      </div>
                      <Progress value={challenge.progress} className="h-2" />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{challenge.participants} participants</span>
                        <span>{formatTimeRemaining(challenge.endDate)} remaining</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          {/* Earned Badges */}
          <Card>
            <CardHeader>
              <CardTitle>Earned Badges ({earnedBadges.length})</CardTitle>
              <CardDescription>Your collection of earned achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {earnedBadges.map((badge) => (
                  <div 
                    key={badge.id} 
                    className={`p-4 border-2 rounded-lg text-center hover:scale-105 transition-transform shadow-lg ${getRarityGlow(badge.rarity)}`}
                  >
                    <div className="text-4xl mb-2">{badge.icon}</div>
                    <h4 className="font-bold mb-1">{badge.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{badge.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge className={`${getRarityColor(badge.rarity)} text-white`}>
                        {badge.rarity}
                      </Badge>
                      <span className="text-sm font-medium text-green-600">+{badge.xpReward} XP</span>
                    </div>
                    {badge.unlockedAt && (
                      <p className="text-xs text-gray-500 mt-2">
                        Earned {new Date(badge.unlockedAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Available Badges */}
          <Card>
            <CardHeader>
              <CardTitle>Available Badges</CardTitle>
              <CardDescription>Achievements you can work towards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {availableBadges.map((badge) => (
                  <div 
                    key={badge.id} 
                    className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center opacity-60 hover:opacity-80 transition-opacity"
                  >
                    <div className="text-4xl mb-2 grayscale">{badge.icon}</div>
                    <h4 className="font-bold mb-1">{badge.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{badge.description}</p>
                    <div className="space-y-2">
                      {badge.requirements.map((req, index) => (
                        <div key={index} className="text-xs text-gray-500 bg-gray-100 rounded p-2">
                          {req.description}
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <Badge variant="outline" className="text-gray-500">
                        {badge.rarity}
                      </Badge>
                      <span className="text-sm font-medium text-gray-500">+{badge.xpReward} XP</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="challenges" className="space-y-6">
          <div className="space-y-4">
            {activeChallenges.map((challenge) => (
              <Card key={challenge.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${
                        challenge.type === 'daily' ? 'bg-orange-100 text-orange-600' :
                        challenge.type === 'weekly' ? 'bg-blue-100 text-blue-600' :
                        'bg-purple-100 text-purple-600'
                      }`}>
                        {challenge.type === 'daily' ? <Clock className="h-4 w-4" /> :
                         challenge.type === 'weekly' ? <Calendar className="h-4 w-4" /> :
                         <Crown className="h-4 w-4" />}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{challenge.title}</CardTitle>
                        <CardDescription>{challenge.description}</CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline" className="capitalize">{challenge.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Requirements */}
                  <div className="space-y-2">
                    {challenge.requirements.map((req, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium">{req.action.replace('_', ' ')}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">{req.current} / {req.target}</span>
                          <Progress value={(req.current / req.target) * 100} className="h-2 w-20" />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Overall Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Overall Progress</span>
                      <span>{challenge.progress}%</span>
                    </div>
                    <Progress value={challenge.progress} className="h-3" />
                  </div>

                  {/* Rewards */}
                  <div className="space-y-2">
                    <h5 className="font-medium text-sm">Rewards:</h5>
                    <div className="flex flex-wrap gap-2">
                      {challenge.rewards.map((reward, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                          {reward.type === 'xp' && <Zap className="h-3 w-3" />}
                          {reward.type === 'badge' && <Award className="h-3 w-3" />}
                          {reward.type === 'unlock' && <Unlock className="h-3 w-3" />}
                          <span>{reward.description}</span>
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Challenge Info */}
                  <div className="flex items-center justify-between text-sm text-gray-500 pt-2 border-t">
                    <span>{challenge.participants} participants</span>
                    <span>{formatTimeRemaining(challenge.endDate)} remaining</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5 text-yellow-600" />
                  <span>Leaderboard</span>
                </CardTitle>
                <div className="flex space-x-2">
                  {(['daily', 'weekly', 'monthly', 'all-time'] as const).map((timeframe) => (
                    <Button
                      key={timeframe}
                      variant={selectedLeaderboardTimeframe === timeframe ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedLeaderboardTimeframe(timeframe)}
                      className="capitalize"
                    >
                      {timeframe}
                    </Button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leaderboard.map((entry, index) => (
                  <div 
                    key={entry.userId} 
                    className={`flex items-center space-x-4 p-4 rounded-lg transition-colors ${
                      entry.userId === user?.id ? 'bg-blue-50 border-blue-200 border-2' : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${
                      entry.rank === 1 ? 'bg-yellow-400 text-yellow-900' :
                      entry.rank === 2 ? 'bg-gray-300 text-gray-700' :
                      entry.rank === 3 ? 'bg-amber-600 text-white' :
                      'bg-gray-200 text-gray-600'
                    }`}>
                      {entry.rank}
                    </div>
                    
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={entry.avatar} />
                      <AvatarFallback>{entry.userName[0]}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold">{entry.userName}</h4>
                        {entry.userId === user?.id && (
                          <Badge variant="outline" className="text-xs">You</Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-3 text-sm text-gray-600">
                        <span>{entry.score.toLocaleString()} XP</span>
                        <div className="flex items-center space-x-1">
                          <Flame className="h-3 w-3 text-orange-500" />
                          <span>{entry.streak} day streak</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      {entry.change === 'up' && <TrendingUp className="h-4 w-4 text-green-500" />}
                      {entry.change === 'down' && <TrendingUp className="h-4 w-4 text-red-500 transform rotate-180" />}
                      {entry.change === 'same' && <div className="h-4 w-4" />}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="unlockables" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Unlockable Content</CardTitle>
              <CardDescription>Features and customizations you can unlock through achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {unlockables.map((item) => (
                  <div 
                    key={item.id} 
                    className={`p-4 border-2 rounded-lg transition-all ${
                      item.isUnlocked 
                        ? 'border-green-300 bg-green-50 shadow-green-100' 
                        : 'border-gray-300 bg-gray-50 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold">{item.name}</h4>
                      {item.isUnlocked ? (
                        <Unlock className="h-5 w-5 text-green-600" />
                      ) : (
                        <Lock className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                    
                    <div className="h-24 bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                      <span className="text-gray-500 text-sm">Preview</span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                    
                    <div className="space-y-2">
                      <h5 className="font-medium text-sm">Requirements:</h5>
                      {item.requirements.map((req, index) => (
                        <div key={index} className="text-xs bg-white rounded p-2 border">
                          {req.description}
                        </div>
                      ))}
                    </div>
                    
                    {item.isUnlocked && (
                      <Button className="w-full mt-3" size="sm">
                        Use Now
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>XP History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-gray-500">
                  XP History Chart
                  <br />
                  <span className="text-sm">(Chart implementation needed)</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Activity Patterns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-gray-500">
                  Activity Heatmap
                  <br />
                  <span className="text-sm">(Heatmap implementation needed)</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Detailed Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">0</div>
                  <div className="text-sm text-gray-600">Audits Completed</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">0</div>
                  <div className="text-sm text-gray-600">Vulnerabilities Found</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">0</div>
                  <div className="text-sm text-gray-600">Client Ratings (Avg)</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">0</div>
                  <div className="text-sm text-gray-600">Tools Mastered</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GamificationDashboard;
export { GamificationDashboard }; 