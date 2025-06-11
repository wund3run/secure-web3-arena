
import React, { useState } from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Trophy, 
  Medal, 
  Award, 
  Star, 
  TrendingUp,
  Shield,
  Target,
  Zap,
  Crown,
  ChevronUp,
  ChevronDown
} from 'lucide-react';

const Leaderboard = () => {
  const [selectedCategory, setSelectedCategory] = useState('overall');

  const categories = [
    { id: 'overall', name: 'Overall', icon: Trophy },
    { id: 'auditors', name: 'Top Auditors', icon: Shield },
    { id: 'contributors', name: 'Contributors', icon: Star },
    { id: 'challenges', name: 'Challenges', icon: Target }
  ];

  const leaderboardData = {
    overall: [
      {
        rank: 1,
        name: 'Sarah Chen',
        avatar: '/lovable-uploads/6286d686-7daf-4eb4-8d7b-51a3de242644.png',
        points: 15847,
        change: 'up',
        changeAmount: 125,
        badges: ['Expert', 'Top Contributor', 'Verified'],
        specialization: 'DeFi Security',
        completedAudits: 47,
        vulnerabilitiesFound: 312
      },
      {
        rank: 2,
        name: 'Marcus Rodriguez',
        avatar: '/lovable-uploads/ba568bdc-629c-43ca-a343-58b3c786ecba.png',
        points: 14293,
        change: 'up',
        changeAmount: 89,
        badges: ['Expert', 'Verified'],
        specialization: 'Smart Contracts',
        completedAudits: 38,
        vulnerabilitiesFound: 267
      },
      {
        rank: 3,
        name: 'Alex Kim',
        avatar: null,
        points: 12956,
        change: 'down',
        changeAmount: 23,
        badges: ['Verified', 'Active'],
        specialization: 'Protocol Security',
        completedAudits: 31,
        vulnerabilitiesFound: 198
      },
      {
        rank: 4,
        name: 'Emma Thompson',
        avatar: '/lovable-uploads/6286d686-7daf-4eb4-8d7b-51a3de242644.png',
        points: 11487,
        change: 'up',
        changeAmount: 156,
        badges: ['Expert', 'Rising Star'],
        specialization: 'NFT Security',
        completedAudits: 24,
        vulnerabilitiesFound: 176
      },
      {
        rank: 5,
        name: 'David Park',
        avatar: null,
        points: 10238,
        change: 'same',
        changeAmount: 0,
        badges: ['Verified'],
        specialization: 'Cross-chain',
        completedAudits: 19,
        vulnerabilitiesFound: 143
      }
    ]
  };

  const achievements = [
    {
      title: 'Vulnerability Hunter',
      description: 'Found 100+ critical vulnerabilities',
      icon: Target,
      rarity: 'legendary',
      holders: 12
    },
    {
      title: 'Audit Master',
      description: 'Completed 50+ security audits',
      icon: Shield,
      rarity: 'epic',
      holders: 28
    },
    {
      title: 'Community Champion',
      description: 'Top contributor to forum discussions',
      icon: Star,
      rarity: 'rare',
      holders: 67
    }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold">#{rank}</span>;
    }
  };

  const getChangeIcon = (change: string, amount: number) => {
    if (change === 'up') {
      return <ChevronUp className="h-4 w-4 text-green-500" />;
    } else if (change === 'down') {
      return <ChevronDown className="h-4 w-4 text-red-500" />;
    }
    return null;
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary':
        return 'border-orange-500 bg-orange-50';
      case 'epic':
        return 'border-purple-500 bg-purple-50';
      case 'rare':
        return 'border-blue-500 bg-blue-50';
      default:
        return 'border-gray-300 bg-gray-50';
    }
  };

  return (
    <StandardLayout
      title="Security Leaderboard | Hawkly"
      description="Rankings of top security experts, auditors, and contributors in the Web3 space"
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-hawkly-gradient mb-4">
            Security Leaderboard
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover and celebrate the top security experts, auditors, and contributors 
            making the Web3 ecosystem safer.
          </p>
        </div>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto">
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
                <category.icon className="h-4 w-4" />
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Leaderboard */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  Top Security Experts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaderboardData.overall.map((user) => (
                    <div key={user.rank} className="flex items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-center w-12 h-12">
                        {getRankIcon(user.rank)}
                      </div>
                      
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg">{user.name}</h3>
                          {user.change !== 'same' && (
                            <div className="flex items-center gap-1 text-sm">
                              {getChangeIcon(user.change, user.changeAmount)}
                              <span className={user.change === 'up' ? 'text-green-500' : 'text-red-500'}>
                                {user.changeAmount}
                              </span>
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{user.specialization}</p>
                        <div className="flex flex-wrap gap-1">
                          {user.badges.map((badge) => (
                            <Badge key={badge} variant="secondary" className="text-xs">
                              {badge}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">
                          {user.points.toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">points</div>
                        <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                          <div>
                            <div className="font-medium">{user.completedAudits}</div>
                            <div className="text-muted-foreground">audits</div>
                          </div>
                          <div>
                            <div className="font-medium">{user.vulnerabilitiesFound}</div>
                            <div className="text-muted-foreground">bugs</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Current Season */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Current Season</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-primary">Q1 2024</div>
                  <div className="text-sm text-muted-foreground">Security Champions</div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between">
                      <span>Time left</span>
                      <span className="font-semibold">45 days</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total participants</span>
                      <span className="font-semibold">1,247</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {achievements.map((achievement) => (
                    <div key={achievement.title} className={`p-3 rounded-lg border-2 ${getRarityColor(achievement.rarity)}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <achievement.icon className="h-5 w-5" />
                        <span className="font-semibold text-sm">{achievement.title}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        {achievement.description}
                      </p>
                      <div className="text-xs">
                        <Badge variant="outline" className="text-xs">
                          {achievement.holders} holders
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  This Week
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">New vulnerabilities</span>
                  <span className="font-semibold text-green-600">+127</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Audits completed</span>
                  <span className="font-semibold text-blue-600">23</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">New experts</span>
                  <span className="font-semibold text-purple-600">8</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </StandardLayout>
  );
};

export default Leaderboard;
