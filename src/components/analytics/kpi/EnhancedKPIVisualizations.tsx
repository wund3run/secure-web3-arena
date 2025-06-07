
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { TrendingUp, Users, DollarSign, Shield, Target, Clock } from 'lucide-react';

interface KPIMetric {
  name: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  target: number;
  unit: string;
  category: string;
}

export function EnhancedKPIVisualizations() {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'7d' | '30d' | '90d'>('30d');

  const kpiMetrics: KPIMetric[] = [
    { name: 'Active Users', value: 2847, change: 12, trend: 'up', target: 3000, unit: '', category: 'engagement' },
    { name: 'Conversion Rate', value: 3.4, change: 8, trend: 'up', target: 4.0, unit: '%', category: 'conversion' },
    { name: 'Revenue Growth', value: 23.5, change: 15, trend: 'up', target: 25.0, unit: '%', category: 'financial' },
    { name: 'Security Score', value: 94.2, change: 2, trend: 'up', target: 95.0, unit: '%', category: 'security' },
    { name: 'Response Time', value: 1.2, change: -8, trend: 'down', target: 1.0, unit: 's', category: 'performance' },
    { name: 'User Satisfaction', value: 4.6, change: 5, trend: 'up', target: 4.8, unit: '/5', category: 'satisfaction' }
  ];

  const monthlyTrends = [
    { month: 'Jan', users: 1200, revenue: 45000, audits: 89, satisfaction: 4.2 },
    { month: 'Feb', users: 1450, revenue: 52000, audits: 104, satisfaction: 4.3 },
    { month: 'Mar', users: 1680, revenue: 58000, audits: 127, satisfaction: 4.4 },
    { month: 'Apr', users: 1920, revenue: 67000, audits: 145, satisfaction: 4.5 },
    { month: 'May', users: 2340, revenue: 78000, audits: 168, satisfaction: 4.6 },
    { month: 'Jun', users: 2847, revenue: 89000, audits: 192, satisfaction: 4.6 }
  ];

  const performanceRadarData = [
    { subject: 'User Growth', A: 95, B: 85, fullMark: 100 },
    { subject: 'Revenue', A: 87, B: 75, fullMark: 100 },
    { subject: 'Security', A: 94, B: 88, fullMark: 100 },
    { subject: 'Performance', A: 88, B: 82, fullMark: 100 },
    { subject: 'Satisfaction', A: 92, B: 87, fullMark: 100 },
    { subject: 'Retention', A: 89, B: 79, fullMark: 100 }
  ];

  const categoryDistribution = [
    { name: 'Smart Contract Audits', value: 45, color: '#3B82F6' },
    { name: 'Security Reviews', value: 30, color: '#10B981' },
    { name: 'Code Analysis', value: 15, color: '#F59E0B' },
    { name: 'Compliance Checks', value: 10, color: '#8B5CF6' }
  ];

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (trend === 'down') return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />;
    return <TrendingUp className="h-4 w-4 text-gray-500 rotate-90" />;
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'engagement': return <Users className="h-5 w-5 text-blue-500" />;
      case 'conversion': return <Target className="h-5 w-5 text-green-500" />;
      case 'financial': return <DollarSign className="h-5 w-5 text-yellow-500" />;
      case 'security': return <Shield className="h-5 w-5 text-red-500" />;
      case 'performance': return <Clock className="h-5 w-5 text-purple-500" />;
      default: return <TrendingUp className="h-5 w-5 text-gray-500" />;
    }
  };

  const getProgressColor = (value: number, target: number) => {
    const percentage = (value / target) * 100;
    if (percentage >= 90) return 'bg-green-500';
    if (percentage >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Enhanced KPI Visualizations
              </CardTitle>
              <CardDescription>
                Advanced analytics and performance indicators with interactive visualizations
              </CardDescription>
            </div>
            <div className="flex gap-2">
              {(['7d', '30d', '90d'] as const).map((timeframe) => (
                <button
                  key={timeframe}
                  onClick={() => setSelectedTimeframe(timeframe)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    selectedTimeframe === timeframe
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {timeframe}
                </button>
              ))}
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="distribution">Distribution</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {kpiMetrics.map((metric) => (
              <Card key={metric.name} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    {getCategoryIcon(metric.category)}
                    {getTrendIcon(metric.trend)}
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold">
                      {metric.value}{metric.unit}
                    </div>
                    <div className="text-sm font-medium">{metric.name}</div>
                    <div className={`text-sm ${
                      metric.change > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {metric.change > 0 ? '+' : ''}{metric.change}%
                    </div>
                    {/* Progress to target */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Target</span>
                        <span>{metric.target}{metric.unit}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className={`h-1.5 rounded-full ${getProgressColor(metric.value, metric.target)}`}
                          style={{ width: `${Math.min((metric.value / metric.target) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          {/* Monthly Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Performance Trends</CardTitle>
              <CardDescription>Key metrics progression over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Line yAxisId="left" type="monotone" dataKey="users" stroke="#3B82F6" strokeWidth={2} />
                  <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2} />
                  <Line yAxisId="left" type="monotone" dataKey="audits" stroke="#F59E0B" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Growth Rate Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Growth Rate Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="users" fill="#3B82F6" />
                  <Bar dataKey="audits" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          {/* Performance Radar */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Radar</CardTitle>
              <CardDescription>
                Multi-dimensional performance analysis comparing current vs previous period
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={performanceRadarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis />
                  <Radar name="Current" dataKey="A" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
                  <Radar name="Previous" dataKey="B" stroke="#10B981" fill="#10B981" fillOpacity={0.2} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Performance Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-blue-600">98.7%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
                <Badge className="mt-2 bg-green-100 text-green-800">Excellent</Badge>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-green-600">1.2s</div>
                <div className="text-sm text-muted-foreground">Avg Response</div>
                <Badge className="mt-2 bg-green-100 text-green-800">Good</Badge>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-purple-600">94.2%</div>
                <div className="text-sm text-muted-foreground">Security Score</div>
                <Badge className="mt-2 bg-blue-100 text-blue-800">Strong</Badge>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-orange-600">4.6/5</div>
                <div className="text-sm text-muted-foreground">User Rating</div>
                <Badge className="mt-2 bg-yellow-100 text-yellow-800">High</Badge>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="distribution" className="space-y-6">
          {/* Service Category Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Service Category Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {categoryDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Category Details */}
            <Card>
              <CardHeader>
                <CardTitle>Category Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {categoryDistribution.map((category) => (
                  <div key={category.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: category.color }}
                        />
                        <span className="font-medium text-sm">{category.name}</span>
                      </div>
                      <Badge variant="secondary">{category.value}%</Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full"
                        style={{ 
                          width: `${category.value}%`,
                          backgroundColor: category.color 
                        }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
