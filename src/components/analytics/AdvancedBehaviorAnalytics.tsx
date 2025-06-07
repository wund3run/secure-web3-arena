
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Users, Mouse, Eye, Clock, TrendingUp, Activity } from 'lucide-react';

interface BehaviorMetric {
  metric: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
}

interface UserSegment {
  name: string;
  count: number;
  percentage: number;
  color: string;
  behavior: string;
}

export function AdvancedBehaviorAnalytics() {
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('7d');

  useEffect(() => {
    // Simulate loading analytics data
    const loadAnalytics = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsLoading(false);
    };

    loadAnalytics();
  }, [timeRange]);

  const behaviorMetrics: BehaviorMetric[] = [
    { metric: 'Session Duration', value: 4.2, change: +12, trend: 'up' },
    { metric: 'Page Views/Session', value: 6.8, change: +8, trend: 'up' },
    { metric: 'Bounce Rate', value: 23.5, change: -15, trend: 'down' },
    { metric: 'Conversion Rate', value: 3.4, change: +22, trend: 'up' },
  ];

  const userSegments: UserSegment[] = [
    { name: 'Active Explorers', count: 1247, percentage: 42, color: '#3B82F6', behavior: 'High engagement, explores multiple pages' },
    { name: 'Quick Browsers', count: 892, percentage: 30, color: '#10B981', behavior: 'Fast sessions, goal-oriented' },
    { name: 'Deep Researchers', count: 534, percentage: 18, color: '#F59E0B', behavior: 'Long sessions, detailed analysis' },
    { name: 'Returning Users', count: 298, percentage: 10, color: '#8B5CF6', behavior: 'Frequent visits, familiar with platform' }
  ];

  const engagementData = [
    { time: '00:00', users: 45, engagement: 72 },
    { time: '04:00', users: 23, engagement: 68 },
    { time: '08:00', users: 156, engagement: 85 },
    { time: '12:00', users: 234, engagement: 92 },
    { time: '16:00', users: 189, engagement: 88 },
    { time: '20:00', users: 167, engagement: 79 },
  ];

  const conversionFunnelData = [
    { step: 'Landing', users: 1000, rate: 100 },
    { step: 'Browse Services', users: 750, rate: 75 },
    { step: 'View Details', users: 450, rate: 60 },
    { step: 'Start Request', users: 280, rate: 62 },
    { step: 'Complete', users: 180, rate: 64 },
  ];

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (trend === 'down') return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />;
    return <Activity className="h-4 w-4 text-gray-500" />;
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-8">
          <div className="flex items-center gap-4">
            <Activity className="h-8 w-8 text-blue-500 animate-pulse" />
            <div>
              <h3 className="text-xl font-semibold">Loading Advanced Analytics...</h3>
              <p className="text-muted-foreground">Processing user behavior data</p>
            </div>
          </div>
          <Progress value={75} className="mt-4" />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Advanced Behavior Analytics
              </CardTitle>
              <CardDescription>
                Deep insights into user behavior patterns and engagement metrics
              </CardDescription>
            </div>
            <div className="flex gap-2">
              {(['24h', '7d', '30d'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    timeRange === range
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="segments">User Segments</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="conversion">Conversion</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {behaviorMetrics.map((metric) => (
              <Card key={metric.metric}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{metric.metric}</span>
                    {getTrendIcon(metric.trend)}
                  </div>
                  <div className="text-2xl font-bold">{metric.value}{metric.metric.includes('Rate') ? '%' : metric.metric.includes('Duration') ? 'min' : ''}</div>
                  <div className={`text-sm ${metric.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {metric.change > 0 ? '+' : ''}{metric.change}% vs last period
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Engagement Over Time */}
          <Card>
            <CardHeader>
              <CardTitle>User Engagement Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Line yAxisId="left" type="monotone" dataKey="users" stroke="#3B82F6" strokeWidth={2} />
                  <Line yAxisId="right" type="monotone" dataKey="engagement" stroke="#10B981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="segments" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Segment Pie Chart */}
            <Card>
              <CardHeader>
                <CardTitle>User Segment Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={userSegments}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="count"
                      label={({ name, percentage }) => `${name}: ${percentage}%`}
                    >
                      {userSegments.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Segment Details */}
            <Card>
              <CardHeader>
                <CardTitle>Segment Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {userSegments.map((segment) => (
                  <div key={segment.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: segment.color }}
                        />
                        <span className="font-medium">{segment.name}</span>
                      </div>
                      <Badge variant="secondary">{segment.count} users</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground pl-5">{segment.behavior}</p>
                    <Progress value={segment.percentage} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="text-center">
                <Mouse className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                <CardTitle>Click Patterns</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold">2,847</div>
                <div className="text-sm text-muted-foreground">Total Clicks Today</div>
                <div className="text-sm text-green-600 mt-1">+18% vs yesterday</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Eye className="h-8 w-8 mx-auto mb-2 text-green-500" />
                <CardTitle>Page Views</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold">12,456</div>
                <div className="text-sm text-muted-foreground">Views This Week</div>
                <div className="text-sm text-blue-600 mt-1">+24% vs last week</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Clock className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                <CardTitle>Session Time</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold">4.2m</div>
                <div className="text-sm text-muted-foreground">Average Duration</div>
                <div className="text-sm text-green-600 mt-1">+12% improvement</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="conversion" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Conversion Funnel Analysis</CardTitle>
              <CardDescription>Track user journey from landing to conversion</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={conversionFunnelData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="step" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="users" fill="#3B82F6" />
                  <Bar dataKey="rate" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
