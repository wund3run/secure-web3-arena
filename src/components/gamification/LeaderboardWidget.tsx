
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Crown, Trophy, Medal, Star, Users } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface LeaderboardUser {
  id: string;
  name: string;
  avatar?: string;
  xp: number;
  level: number;
  rank: number;
  auditsCompleted: number;
  vulnerabilitiesFound: number;
}

interface LeaderboardWidgetProps {
  className?: string;
}

export const LeaderboardWidget: React.FC<LeaderboardWidgetProps> = ({ className }) => {
  const [activePeriod, setActivePeriod] = useState<'weekly' | 'monthly' | 'allTime'>('weekly');

  // Mock leaderboard data
  const leaderboardData: Record<string, LeaderboardUser[]> = {
    weekly: [
      {
        id: '1',
        name: 'Alex Chen',
        avatar: '/avatars/alex.jpg',
        xp: 2450,
        level: 8,
        rank: 1,
        auditsCompleted: 12,
        vulnerabilitiesFound: 45
      },
      {
        id: '2',
        name: 'Sarah Wilson',
        avatar: '/avatars/sarah.jpg',
        xp: 2280,
        level: 7,
        rank: 2,
        auditsCompleted: 10,
        vulnerabilitiesFound: 38
      },
      {
        id: '3',
        name: 'Marcus Rodriguez',
        avatar: '/avatars/marcus.jpg',
        xp: 2150,
        level: 7,
        rank: 3,
        auditsCompleted: 9,
        vulnerabilitiesFound: 42
      },
      {
        id: '4',
        name: 'Emily Johnson',
        avatar: '/avatars/emily.jpg',
        xp: 1980,
        level: 6,
        rank: 4,
        auditsCompleted: 8,
        vulnerabilitiesFound: 35
      },
      {
        id: '5',
        name: 'David Kim',
        avatar: '/avatars/david.jpg',
        xp: 1850,
        level: 6,
        rank: 5,
        auditsCompleted: 7,
        vulnerabilitiesFound: 29
      }
    ],
    monthly: [
      {
        id: '1',
        name: 'Sarah Wilson',
        avatar: '/avatars/sarah.jpg',
        xp: 8750,
        level: 9,
        rank: 1,
        auditsCompleted: 35,
        vulnerabilitiesFound: 142
      },
      {
        id: '2',
        name: 'Alex Chen',
        avatar: '/avatars/alex.jpg',
        xp: 8200,
        level: 8,
        rank: 2,
        auditsCompleted: 33,
        vulnerabilitiesFound: 138
      },
      {
        id: '3',
        name: 'Marcus Rodriguez',
        avatar: '/avatars/marcus.jpg',
        xp: 7890,
        level: 8,
        rank: 3,
        auditsCompleted: 31,
        vulnerabilitiesFound: 125
      }
    ],
    allTime: [
      {
        id: '1',
        name: 'Alex Chen',
        avatar: '/avatars/alex.jpg',
        xp: 25600,
        level: 10,
        rank: 1,
        auditsCompleted: 156,
        vulnerabilitiesFound: 642
      },
      {
        id: '2',
        name: 'Sarah Wilson',
        avatar: '/avatars/sarah.jpg',
        xp: 23400,
        level: 10,
        rank: 2,
        auditsCompleted: 144,
        vulnerabilitiesFound: 598
      },
      {
        id: '3',
        name: 'Marcus Rodriguez',
        avatar: '/avatars/marcus.jpg',
        xp: 21800,
        level: 9,
        rank: 3,
        auditsCompleted: 138,
        vulnerabilitiesFound: 567
      }
    ]
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Trophy className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Medal className="h-5 w-5 text-amber-600" />;
      default:
        return <span className="text-sm font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getLevelBadgeColor = (level: number) => {
    if (level >= 9) return 'bg-purple-500';
    if (level >= 7) return 'bg-blue-500';
    if (level >= 5) return 'bg-green-500';
    if (level >= 3) return 'bg-yellow-500';
    return 'bg-gray-500';
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activePeriod} onValueChange={(value) => setActivePeriod(value as any)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="allTime">All Time</TabsTrigger>
          </TabsList>

          {(['weekly', 'monthly', 'allTime'] as const).map((period) => (
            <TabsContent key={period} value={period} className="mt-4">
              <div className="space-y-3">
                {leaderboardData[period].map((user, index) => (
                  <div
                    key={user.id}
                    className={`flex items-center gap-3 p-3 rounded-lg ${
                      user.rank <= 3 ? 'bg-gradient-to-r from-yellow-50 to-orange-50' : 'hover:bg-muted/50'
                    }`}
                  >
                    <div className="flex items-center justify-center w-8">
                      {getRankIcon(user.rank)}
                    </div>
                    
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold truncate">{user.name}</h4>
                        <Badge className={`${getLevelBadgeColor(user.level)} text-white text-xs`}>
                          L{user.level}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          {user.xp.toLocaleString()} XP
                        </span>
                        <span>{user.auditsCompleted} audits</span>
                        <span>{user.vulnerabilitiesFound} vulns</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};
