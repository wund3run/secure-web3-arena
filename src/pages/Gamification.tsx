
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useGamification } from '@/components/gamification/GamificationEngine';
import { LeaderboardWidget } from '@/components/gamification/LeaderboardWidget';
import { AchievementNotification } from '@/components/gamification/AchievementNotification';
import { XPNotification } from '@/components/gamification/XPNotification';
import { 
  Trophy, 
  Star, 
  Award, 
  Target, 
  Zap, 
  Crown, 
  Medal,
  Gift,
  Calendar,
  Users
} from 'lucide-react';

export default function Gamification() {
  const {
    userLevel,
    achievements,
    recentXPGains,
    addXP,
    checkAchievements,
    getNextLevelRequirement
  } = useGamification();

  const [showAchievement, setShowAchievement] = useState(false);
  const [showXPGain, setShowXPGain] = useState(false);
  const [currentAchievement, setCurrentAchievement] = useState(null);
  const [currentXPGain, setCurrentXPGain] = useState({ amount: 0, reason: '' });

  // Mock daily challenges
  const dailyChallenges = [
    {
      id: '1',
      title: 'Complete 2 Code Reviews',
      description: 'Review and provide feedback on 2 community code submissions',
      progress: 1,
      maxProgress: 2,
      xpReward: 100,
      timeLeft: '8h 32m'
    },
    {
      id: '2',
      title: 'Find a Critical Vulnerability',
      description: 'Identify and report a critical security vulnerability',
      progress: 0,
      maxProgress: 1,
      xpReward: 500,
      timeLeft: '8h 32m'
    },
    {
      id: '3',
      title: 'Help 3 Community Members',
      description: 'Answer questions or provide assistance in the community forum',
      progress: 2,
      maxProgress: 3,
      xpReward: 150,
      timeLeft: '8h 32m'
    }
  ];

  // Mock weekly quests
  const weeklyQuests = [
    {
      id: '1',
      title: 'Security Marathon',
      description: 'Complete 5 security audits this week',
      progress: 3,
      maxProgress: 5,
      xpReward: 1000,
      timeLeft: '3 days'
    },
    {
      id: '2',
      title: 'Knowledge Sharer',
      description: 'Write 2 educational articles for the knowledge base',
      progress: 0,
      maxProgress: 2,
      xpReward: 750,
      timeLeft: '3 days'
    }
  ];

  const handleTestXP = () => {
    const amount = 50;
    const reason = 'Test XP gain';
    setCurrentXPGain({ amount, reason });
    setShowXPGain(true);
    addXP(amount, reason);
  };

  const handleTestAchievement = () => {
    const testAchievement = {
      id: 'test',
      title: 'Test Achievement',
      description: 'This is a test achievement',
      icon: 'trophy',
      rarity: 'rare' as const,
      xpReward: 200
    };
    setCurrentAchievement(testAchievement as any);
    setShowAchievement(true);
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-500';
      case 'rare': return 'bg-blue-500';
      case 'epic': return 'bg-purple-500';
      case 'legendary': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getAchievementIcon = (iconName: string) => {
    switch (iconName) {
      case 'shield': return <Award className="h-6 w-6" />;
      case 'flame': return <Zap className="h-6 w-6" />;
      case 'star': return <Star className="h-6 w-6" />;
      case 'target': return <Target className="h-6 w-6" />;
      case 'trophy': return <Trophy className="h-6 w-6" />;
      case 'crown': return <Crown className="h-6 w-6" />;
      default: return <Award className="h-6 w-6" />;
    }
  };

  return (
    <>
      <Helmet>
        <title>Gamification | Hawkly</title>
        <meta name="description" content="Track your progress, unlock achievements, and climb the leaderboards in the Hawkly security platform." />
      </Helmet>

      <StandardLayout
        title="Gamification Hub"
        description="Track your progress and unlock achievements"
      >
        <div className="container py-8 max-w-7xl">
          <div className="space-y-8">
            {/* Level Progress Header */}
            <Card className="bg-gradient-to-r from-purple-500 to-blue-600 text-white">
              <CardContent className="p-8">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <Trophy className="h-8 w-8 text-yellow-300" />
                      <div>
                        <h2 className="text-2xl font-bold">Level {userLevel.level}</h2>
                        <p className="text-purple-100">{userLevel.title}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {userLevel.badges.map((badge, index) => (
                        <Badge key={index} variant="secondary" className="bg-white/20 text-white">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{userLevel.xp.toLocaleString()} XP</div>
                    <div className="text-purple-200 text-sm">
                      {getNextLevelRequirement()} XP to next level
                    </div>
                    <div className="w-48 mt-2">
                      <Progress 
                        value={(userLevel.xp / userLevel.maxXp) * 100} 
                        className="h-3 bg-white/20"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="achievements" className="space-y-6">
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                <TabsTrigger value="challenges">Daily Challenges</TabsTrigger>
                <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
                <TabsTrigger value="rewards">Rewards</TabsTrigger>
              </TabsList>

              <TabsContent value="achievements" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {achievements.map((achievement) => (
                    <Card 
                      key={achievement.id} 
                      className={`transition-all duration-200 ${
                        achievement.unlocked 
                          ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200' 
                          : 'hover:shadow-md'
                      }`}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-full ${getRarityColor(achievement.rarity)} text-white`}>
                            {getAchievementIcon(achievement.icon)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">{achievement.title}</h3>
                              {achievement.unlocked && <Medal className="h-4 w-4 text-yellow-500" />}
                              <Badge variant="outline" className="text-xs capitalize">
                                {achievement.rarity}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">
                              {achievement.description}
                            </p>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Progress</span>
                                <span>{achievement.progress} / {achievement.maxProgress}</span>
                              </div>
                              <Progress 
                                value={(achievement.progress / achievement.maxProgress) * 100} 
                                className="h-2"
                              />
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-muted-foreground">
                                  +{achievement.xpReward} XP
                                </span>
                                {achievement.unlocked && achievement.unlockedAt && (
                                  <span className="text-xs text-green-600">
                                    Unlocked {achievement.unlockedAt.toLocaleDateString()}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Test Buttons */}
                <div className="flex gap-4 justify-center">
                  <Button onClick={handleTestXP} variant="outline">
                    Test XP Gain
                  </Button>
                  <Button onClick={handleTestAchievement} variant="outline">
                    Test Achievement
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="challenges" className="space-y-6">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Daily Challenges
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {dailyChallenges.map((challenge) => (
                        <div key={challenge.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-semibold">{challenge.title}</h4>
                            <p className="text-sm text-muted-foreground">{challenge.description}</p>
                            <div className="flex items-center gap-4 mt-2">
                              <div className="text-xs text-muted-foreground">
                                Progress: {challenge.progress}/{challenge.maxProgress}
                              </div>
                              <div className="text-xs text-green-600">
                                +{challenge.xpReward} XP
                              </div>
                              <div className="text-xs text-orange-600">
                                {challenge.timeLeft} left
                              </div>
                            </div>
                            <Progress 
                              value={(challenge.progress / challenge.maxProgress) * 100} 
                              className="h-2 mt-2 w-48"
                            />
                          </div>
                          {challenge.progress >= challenge.maxProgress && (
                            <Button size="sm" className="ml-4">
                              Claim Reward
                            </Button>
                          )}
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        Weekly Quests
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {weeklyQuests.map((quest) => (
                        <div key={quest.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-semibold">{quest.title}</h4>
                            <p className="text-sm text-muted-foreground">{quest.description}</p>
                            <div className="flex items-center gap-4 mt-2">
                              <div className="text-xs text-muted-foreground">
                                Progress: {quest.progress}/{quest.maxProgress}
                              </div>
                              <div className="text-xs text-green-600">
                                +{quest.xpReward} XP
                              </div>
                              <div className="text-xs text-orange-600">
                                {quest.timeLeft} left
                              </div>
                            </div>
                            <Progress 
                              value={(quest.progress / quest.maxProgress) * 100} 
                              className="h-2 mt-2 w-48"
                            />
                          </div>
                          {quest.progress >= quest.maxProgress && (
                            <Button size="sm" className="ml-4">
                              Claim Reward
                            </Button>
                          )}
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="leaderboard">
                <LeaderboardWidget />
              </TabsContent>

              <TabsContent value="rewards" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <Gift className="h-12 w-12 mx-auto mb-4 text-purple-500" />
                      <h3 className="font-semibold mb-2">Premium Badge</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Unlock premium features and priority support
                      </p>
                      <Badge variant="outline" className="mb-4">Level 5 Required</Badge>
                      <Button 
                        disabled={userLevel.level < 5}
                        className="w-full"
                      >
                        {userLevel.level >= 5 ? 'Claim Reward' : 'Locked'}
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6 text-center">
                      <Users className="h-12 w-12 mx-auto mb-4 text-blue-500" />
                      <h3 className="font-semibold mb-2">VIP Status</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Access to exclusive events and features
                      </p>
                      <Badge variant="outline" className="mb-4">Level 10 Required</Badge>
                      <Button 
                        disabled={userLevel.level < 10}
                        className="w-full"
                      >
                        {userLevel.level >= 10 ? 'Claim Reward' : 'Locked'}
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6 text-center">
                      <Medal className="h-12 w-12 mx-auto mb-4 text-yellow-500" />
                      <h3 className="font-semibold mb-2">Fee Reduction</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        10% reduction on all platform fees
                      </p>
                      <Badge variant="outline" className="mb-4">Level 7 Required</Badge>
                      <Button 
                        disabled={userLevel.level < 7}
                        className="w-full"
                      >
                        {userLevel.level >= 7 ? 'Active' : 'Locked'}
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Current Perks */}
                <Card>
                  <CardHeader>
                    <CardTitle>Your Current Perks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {userLevel.perks.map((perk, index) => (
                        <div key={index} className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                          <Star className="h-4 w-4 text-green-500" />
                          <span className="font-medium">{perk}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Notifications */}
        {currentAchievement && (
          <AchievementNotification
            achievement={currentAchievement}
            show={showAchievement}
            onClose={() => {
              setShowAchievement(false);
              setCurrentAchievement(null);
            }}
          />
        )}

        <XPNotification
          amount={currentXPGain.amount}
          reason={currentXPGain.reason}
          show={showXPGain}
          onComplete={() => setShowXPGain(false)}
        />
      </StandardLayout>
    </>
  );
}
