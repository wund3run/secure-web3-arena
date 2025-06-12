
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Users, 
  Shield, 
  Award, 
  Target, 
  Zap, 
  BarChart3, 
  Trophy,
  Star,
  Flame,
  Crown,
  Medal
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface AnalyticsData {
  revenue: { month: string; value: number }[];
  users: { month: string; active: number; new: number }[];
  audits: { month: string; completed: number; pending: number }[];
  security: { type: string; count: number; color: string }[];
}

interface UserLevel {
  level: number;
  title: string;
  xp: number;
  maxXp: number;
  rewards: string[];
  badge: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export const AdvancedAnalyticsDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock analytics data
  const analyticsData: AnalyticsData = {
    revenue: [
      { month: 'Jan', value: 45000 },
      { month: 'Feb', value: 52000 },
      { month: 'Mar', value: 48000 },
      { month: 'Apr', value: 61000 },
      { month: 'May', value: 55000 },
      { month: 'Jun', value: 67000 }
    ],
    users: [
      { month: 'Jan', active: 1250, new: 180 },
      { month: 'Feb', active: 1380, new: 220 },
      { month: 'Mar', active: 1520, new: 195 },
      { month: 'Apr', active: 1680, new: 240 },
      { month: 'May', active: 1850, new: 210 },
      { month: 'Jun', active: 2020, new: 280 }
    ],
    audits: [
      { month: 'Jan', completed: 45, pending: 12 },
      { month: 'Feb', completed: 52, pending: 18 },
      { month: 'Mar', completed: 48, pending: 15 },
      { month: 'Apr', completed: 61, pending: 20 },
      { month: 'May', completed: 55, pending: 16 },
      { month: 'Jun', completed: 67, pending: 22 }
    ],
    security: [
      { type: 'Critical', count: 23, color: '#ef4444' },
      { type: 'High', count: 45, color: '#f97316' },
      { type: 'Medium', count: 78, color: '#eab308' },
      { type: 'Low', count: 156, color: '#22c55e' }
    ]
  };

  // Mock user level data
  const userLevel: UserLevel = {
    level: 7,
    title: 'Security Expert',
    xp: 2450,
    maxXp: 3000,
    rewards: ['Platform Badge', 'Priority Support', '10% Fee Reduction'],
    badge: 'security-expert'
  };

  // Mock achievements
  const achievements: Achievement[] = [
    {
      id: 'first-audit',
      title: 'First Steps',
      description: 'Complete your first security audit',
      icon: <Shield className="h-6 w-6" />,
      unlocked: true,
      progress: 1,
      maxProgress: 1,
      rarity: 'common'
    },
    {
      id: 'audit-streak',
      title: 'On Fire!',
      description: 'Complete 10 audits in a row',
      icon: <Flame className="h-6 w-6" />,
      unlocked: true,
      progress: 10,
      maxProgress: 10,
      rarity: 'rare'
    },
    {
      id: 'vulnerability-hunter',
      title: 'Vulnerability Hunter',
      description: 'Find 100 critical vulnerabilities',
      icon: <Target className="h-6 w-6" />,
      unlocked: false,
      progress: 67,
      maxProgress: 100,
      rarity: 'epic'
    },
    {
      id: 'community-leader',
      title: 'Community Leader',
      description: 'Help 50 community members',
      icon: <Crown className="h-6 w-6" />,
      unlocked: false,
      progress: 23,
      maxProgress: 50,
      rarity: 'legendary'
    }
  ];

  const getRarityColor = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'common': return 'bg-gray-500';
      case 'rare': return 'bg-blue-500';
      case 'epic': return 'bg-purple-500';
      case 'legendary': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Level Progress */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Advanced Analytics</h1>
          <p className="text-muted-foreground">
            Comprehensive insights and gamification dashboard
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <span className="font-semibold">Level {userLevel.level}</span>
              <Badge variant="secondary">{userLevel.title}</Badge>
            </div>
            <div className="text-sm text-muted-foreground">
              {userLevel.xp} / {userLevel.maxXp} XP
            </div>
          </div>
          <div className="w-32">
            <Progress value={(userLevel.xp / userLevel.maxXp) * 100} className="h-2" />
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="gamification">Gamification</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-muted-foreground">Revenue</span>
                </div>
                <div className="text-2xl font-bold">$67,000</div>
                <p className="text-xs text-green-600">+12% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-500" />
                  <span className="text-sm text-muted-foreground">Active Users</span>
                </div>
                <div className="text-2xl font-bold">2,020</div>
                <p className="text-xs text-green-600">+280 new this month</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-purple-500" />
                  <span className="text-sm text-muted-foreground">Audits Completed</span>
                </div>
                <div className="text-2xl font-bold">67</div>
                <p className="text-xs text-green-600">+22 pending</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-orange-500" />
                  <span className="text-sm text-muted-foreground">Avg Rating</span>
                </div>
                <div className="text-2xl font-bold">4.9</div>
                <p className="text-xs text-green-600">+0.2 from last month</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={analyticsData.revenue}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={analyticsData.users}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="active" stroke="#8884d8" name="Active Users" />
                    <Line type="monotone" dataKey="new" stroke="#82ca9d" name="New Users" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Audit Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analyticsData.audits}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="completed" fill="#22c55e" name="Completed" />
                    <Bar dataKey="pending" fill="#f59e0b" name="Pending" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Issues by Severity</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={analyticsData.security}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                      label={({ type, count }) => `${type}: ${count}`}
                    >
                      {analyticsData.security.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="gamification" className="space-y-6">
          {/* Level Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                Level Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Level {userLevel.level} - {userLevel.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {userLevel.xp} / {userLevel.maxXp} XP
                  </p>
                </div>
                <Badge className="bg-yellow-500">{Math.round((userLevel.xp / userLevel.maxXp) * 100)}%</Badge>
              </div>
              <Progress value={(userLevel.xp / userLevel.maxXp) * 100} className="h-3" />
              <div className="flex flex-wrap gap-2">
                {userLevel.rewards.map((reward, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {reward}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-purple-500" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-4 rounded-lg border ${
                      achievement.unlocked ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-full ${getRarityColor(achievement.rarity)} text-white`}>
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{achievement.title}</h4>
                          {achievement.unlocked && <Medal className="h-4 w-4 text-yellow-500" />}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {achievement.description}
                        </p>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Progress</span>
                            <span>{achievement.progress} / {achievement.maxProgress}</span>
                          </div>
                          <Progress 
                            value={(achievement.progress / achievement.maxProgress) * 100} 
                            className="h-2"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-blue-500" />
                  AI-Powered Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-semibold text-blue-900">Revenue Opportunity</h4>
                  <p className="text-sm text-blue-700">
                    Based on current trends, you could increase revenue by 23% by targeting 
                    enterprise clients in the DeFi sector.
                  </p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-semibold text-green-900">User Retention</h4>
                  <p className="text-sm text-green-700">
                    Users who complete gamification challenges have 40% higher retention rates.
                    Consider expanding the achievement system.
                  </p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                  <h4 className="font-semibold text-orange-900">Performance Alert</h4>
                  <p className="text-sm text-orange-700">
                    Average audit completion time has increased by 15%. Consider providing 
                    additional training resources.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-purple-500" />
                  Predictive Analytics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Next Month Revenue</span>
                    <span className="font-semibold">$73,500</span>
                  </div>
                  <Progress value={85} className="h-2" />
                  <p className="text-xs text-muted-foreground">85% confidence</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">User Growth Rate</span>
                    <span className="font-semibold">+18%</span>
                  </div>
                  <Progress value={72} className="h-2" />
                  <p className="text-xs text-muted-foreground">72% confidence</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Platform Efficiency</span>
                    <span className="font-semibold">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                  <p className="text-xs text-muted-foreground">High accuracy</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Report</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Comprehensive monthly performance analysis
                </p>
                <Button className="w-full">Generate Report</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Assessment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Platform security metrics and vulnerability trends
                </p>
                <Button className="w-full" variant="outline">Generate Report</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Engagement</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Detailed user behavior and engagement analytics
                </p>
                <Button className="w-full" variant="outline">Generate Report</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
