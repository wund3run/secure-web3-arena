
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Activity, 
  Brain, 
  Target,
  Zap,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Shield
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from 'recharts';

interface AnalyticsMetric {
  id: string;
  name: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  category: 'user' | 'audit' | 'security' | 'financial';
}

interface PredictiveInsight {
  id: string;
  type: 'opportunity' | 'risk' | 'trend';
  title: string;
  description: string;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  timeframe: string;
  actions: string[];
}

export function AdvancedAnalyticsDashboard() {
  const [metrics, setMetrics] = useState<AnalyticsMetric[]>([]);
  const [insights, setInsights] = useState<PredictiveInsight[]>([]);
  const [timeRange, setTimeRange] = useState('7d');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAnalytics = async () => {
      setIsLoading(true);
      
      // Simulate analytics data loading
      setTimeout(() => {
        const mockMetrics: AnalyticsMetric[] = [
          {
            id: '1',
            name: 'Active Users',
            value: 1247,
            change: 12.5,
            trend: 'up',
            category: 'user'
          },
          {
            id: '2',
            name: 'Audit Completion Rate',
            value: 94.2,
            change: 3.1,
            trend: 'up',
            category: 'audit'
          },
          {
            id: '3',
            name: 'Security Score',
            value: 98.7,
            change: -0.3,
            trend: 'down',
            category: 'security'
          },
          {
            id: '4',
            name: 'Revenue (30d)',
            value: 127450,
            change: 18.7,
            trend: 'up',
            category: 'financial'
          }
        ];

        const mockInsights: PredictiveInsight[] = [
          {
            id: '1',
            type: 'opportunity',
            title: 'Expansion Opportunity in DeFi Sector',
            description: 'Analytics show 45% increase in DeFi audit requests. Recommend expanding auditor pool.',
            confidence: 87,
            impact: 'high',
            timeframe: '30 days',
            actions: ['Recruit DeFi specialists', 'Create DeFi audit templates', 'Launch targeted marketing']
          },
          {
            id: '2',
            type: 'risk',
            title: 'Potential Auditor Capacity Issue',
            description: 'Current booking rate suggests potential bottleneck in Q2.',
            confidence: 72,
            impact: 'medium',
            timeframe: '60 days',
            actions: ['Onboard new auditors', 'Optimize scheduling', 'Implement priority queuing']
          },
          {
            id: '3',
            type: 'trend',
            title: 'AI-Assisted Audits Growing',
            description: 'AI-assisted audit requests up 156% - opportunity for premium pricing.',
            confidence: 94,
            impact: 'high',
            timeframe: '90 days',
            actions: ['Develop AI audit packages', 'Train auditors on AI tools', 'Create premium tier']
          }
        ];

        setMetrics(mockMetrics);
        setInsights(mockInsights);
        setIsLoading(false);
      }, 1500);
    };

    initializeAnalytics();
  }, [timeRange]);

  const userGrowthData = [
    { month: 'Jan', users: 850, audits: 234 },
    { month: 'Feb', users: 920, audits: 267 },
    { month: 'Mar', users: 1050, audits: 312 },
    { month: 'Apr', users: 1180, audits: 389 },
    { month: 'May', users: 1247, audits: 456 }
  ];

  const auditCategoryData = [
    { name: 'Smart Contracts', value: 45, color: '#8884d8' },
    { name: 'Web Applications', value: 30, color: '#82ca9d' },
    { name: 'Infrastructure', value: 15, color: '#ffc658' },
    { name: 'Mobile Apps', value: 10, color: '#ff7300' }
  ];

  const getMetricIcon = (category: string) => {
    switch (category) {
      case 'user': return Users;
      case 'audit': return Shield;
      case 'security': return CheckCircle;
      case 'financial': return DollarSign;
      default: return Activity;
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'opportunity': return Target;
      case 'risk': return AlertTriangle;
      case 'trend': return TrendingUp;
      default: return Brain;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-muted rounded"></div>
            ))}
          </div>
          <div className="h-96 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-500" />
            Advanced Analytics & Intelligence
          </CardTitle>
          <CardDescription>
            AI-powered insights, predictive analytics, and comprehensive platform intelligence
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Time Range Selector */}
      <div className="flex gap-2">
        {['7d', '30d', '90d', '1y'].map((range) => (
          <Button
            key={range}
            variant={timeRange === range ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange(range)}
          >
            {range}
          </Button>
        ))}
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => {
          const IconComponent = getMetricIcon(metric.category);
          return (
            <Card key={metric.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <IconComponent className="h-4 w-4 text-blue-500" />
                  <Badge variant={metric.trend === 'up' ? 'default' : metric.trend === 'down' ? 'destructive' : 'secondary'}>
                    {metric.change > 0 ? '+' : ''}{metric.change}%
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">{metric.name}</p>
                  <p className="text-2xl font-bold">
                    {metric.category === 'financial' ? '$' : ''}
                    {metric.value.toLocaleString()}
                    {metric.name.includes('Rate') || metric.name.includes('Score') ? '%' : ''}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
          <TabsTrigger value="behavior">User Behavior</TabsTrigger>
          <TabsTrigger value="predictive">Predictive</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>User Growth & Audit Volume</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={userGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="users" stroke="#8884d8" strokeWidth={2} />
                    <Line type="monotone" dataKey="audits" stroke="#82ca9d" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Audit Categories Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={auditCategoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {auditCategoryData.map((entry, index) => (
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

        <TabsContent value="insights" className="space-y-6">
          <div className="grid gap-4">
            {insights.map((insight) => {
              const IconComponent = getInsightIcon(insight.type);
              return (
                <Card key={insight.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <IconComponent className="h-6 w-6 text-blue-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold">{insight.title}</h3>
                          <div className="flex gap-2">
                            <Badge className={getImpactColor(insight.impact)}>
                              {insight.impact} impact
                            </Badge>
                            <Badge variant="outline">
                              {insight.confidence}% confidence
                            </Badge>
                          </div>
                        </div>
                        <p className="text-muted-foreground mb-3">{insight.description}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {insight.timeframe}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Recommended Actions:</p>
                          <ul className="text-sm space-y-1">
                            {insight.actions.map((action, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <CheckCircle className="h-3 w-3 text-green-500" />
                                {action}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="behavior" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>User Journey Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Registration to First Audit</span>
                    <span className="font-medium">3.2 days avg</span>
                  </div>
                  <Progress value={75} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Audit Completion Rate</span>
                    <span className="font-medium">94.2%</span>
                  </div>
                  <Progress value={94} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">User Retention (30d)</span>
                    <span className="font-medium">87.1%</span>
                  </div>
                  <Progress value={87} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Platform Engagement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <Activity className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium">Daily Active Users</p>
                      <p className="text-sm text-muted-foreground">847 users (+12% from last week)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <Clock className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium">Avg Session Duration</p>
                      <p className="text-sm text-muted-foreground">18m 34s (+2m from last week)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <Target className="h-5 w-5 text-purple-500" />
                    <div>
                      <p className="font-medium">Feature Adoption</p>
                      <p className="text-sm text-muted-foreground">AI Matching: 73% | Chat: 89%</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="predictive" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Predictive Models</CardTitle>
              <CardDescription>AI-powered forecasting and trend analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="font-medium">Revenue Forecast</span>
                  </div>
                  <p className="text-2xl font-bold text-green-600">$2.3M</p>
                  <p className="text-sm text-muted-foreground">Next quarter projection</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-4 w-4 text-blue-500" />
                    <span className="font-medium">User Growth</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">+34%</p>
                  <p className="text-sm text-muted-foreground">Expected monthly growth</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-4 w-4 text-yellow-500" />
                    <span className="font-medium">Capacity</span>
                  </div>
                  <p className="text-2xl font-bold text-yellow-600">92%</p>
                  <p className="text-sm text-muted-foreground">Utilization forecast</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Automated Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Weekly Performance Report
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Monthly Growth Analysis
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="h-4 w-4 mr-2" />
                    Security Compliance Report
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Export Options</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full">
                    Generate Executive Summary
                  </Button>
                  <Button variant="outline" className="w-full">
                    Export to PDF
                  </Button>
                  <Button variant="outline" className="w-full">
                    Download CSV Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
