
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Activity, Shield, Zap, BarChart3, Settings, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PlatformMetric {
  name: string;
  value: number;
  unit?: string;
  status: 'excellent' | 'good' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
  change?: number;
}

interface SystemStatus {
  component: string;
  status: 'operational' | 'degraded' | 'down';
  lastCheck: string;
  responseTime?: number;
}

export function UnifiedPlatformDashboard() {
  const [platformMetrics, setPlatformMetrics] = useState<PlatformMetric[]>([
    { name: 'Security Score', value: 95, unit: '%', status: 'excellent', trend: 'up', change: 2 },
    { name: 'Performance Score', value: 87, unit: '%', status: 'good', trend: 'stable' },
    { name: 'Compliance Rating', value: 92, unit: '%', status: 'excellent', trend: 'up', change: 5 },
    { name: 'System Uptime', value: 99.9, unit: '%', status: 'excellent', trend: 'stable' },
    { name: 'User Satisfaction', value: 4.7, unit: '/5', status: 'excellent', trend: 'up', change: 0.2 },
    { name: 'Response Time', value: 245, unit: 'ms', status: 'good', trend: 'down', change: -15 }
  ]);

  const [systemStatus, setSystemStatus] = useState<SystemStatus[]>([
    { component: 'Security Monitoring', status: 'operational', lastCheck: '2 min ago', responseTime: 120 },
    { component: 'Performance Monitor', status: 'operational', lastCheck: '1 min ago', responseTime: 89 },
    { component: 'Compliance Framework', status: 'operational', lastCheck: '3 min ago', responseTime: 156 },
    { component: 'Analytics Engine', status: 'operational', lastCheck: '1 min ago', responseTime: 203 },
    { component: 'AI Matching System', status: 'degraded', lastCheck: '5 min ago', responseTime: 450 },
    { component: 'Cache Manager', status: 'operational', lastCheck: '30 sec ago', responseTime: 45 }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': case 'operational': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'warning': case 'degraded': return 'text-yellow-600 bg-yellow-100';
      case 'critical': case 'down': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'degraded': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'down': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-3 w-3 text-green-500" />;
      case 'down': return <TrendingUp className="h-3 w-3 text-red-500 rotate-180" />;
      default: return <div className="h-3 w-3 bg-gray-400 rounded-full" />;
    }
  };

  const overallHealthScore = Math.round(
    systemStatus.filter(s => s.status === 'operational').length / systemStatus.length * 100
  );

  return (
    <div className="space-y-6">
      {/* Platform Health Overview */}
      <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-500" />
                Platform Health Overview
              </CardTitle>
              <CardDescription>Real-time status of all platform components and services</CardDescription>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">{overallHealthScore}%</div>
              <div className="text-sm text-muted-foreground">System Health</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={overallHealthScore} className="h-3 mb-4" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {systemStatus.map((system) => (
              <div key={system.component} className="text-center p-3 border rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  {getStatusIcon(system.status)}
                </div>
                <div className="text-sm font-medium mb-1">{system.component}</div>
                <Badge className={`text-xs ${getStatusColor(system.status)}`} variant="secondary">
                  {system.status}
                </Badge>
                {system.responseTime && (
                  <div className="text-xs text-muted-foreground mt-1">
                    {system.responseTime}ms
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {platformMetrics.map((metric) => (
          <Card key={metric.name}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium text-muted-foreground">{metric.name}</div>
                {getTrendIcon(metric.trend)}
              </div>
              <div className="text-2xl font-bold">
                {metric.value}{metric.unit}
              </div>
              {metric.change && (
                <div className={`text-sm ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.trend === 'up' ? '+' : ''}{metric.change}{metric.unit}
                </div>
              )}
              <Badge className={`mt-2 text-xs ${getStatusColor(metric.status)}`} variant="secondary">
                {metric.status}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions and Navigation */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="overview">Platform Overview</TabsTrigger>
          <TabsTrigger value="security">Security Center</TabsTrigger>
          <TabsTrigger value="performance">Performance Hub</TabsTrigger>
          <TabsTrigger value="analytics">Analytics Center</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="text-center">
                <Shield className="h-8 w-8 mx-auto mb-2 text-green-500" />
                <CardTitle className="text-lg">Security & Compliance</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-3">
                <p className="text-sm text-muted-foreground">
                  Advanced security monitoring and compliance management
                </p>
                <Link to="/security-compliance">
                  <Button className="w-full">
                    Access Security Center
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="text-center">
                <Zap className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                <CardTitle className="text-lg">Performance Optimization</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-3">
                <p className="text-sm text-muted-foreground">
                  Monitor and optimize platform performance
                </p>
                <Link to="/performance-optimization">
                  <Button className="w-full" variant="outline">
                    View Performance Hub
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="text-center">
                <BarChart3 className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                <CardTitle className="text-lg">Analytics Dashboard</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-3">
                <p className="text-sm text-muted-foreground">
                  Comprehensive analytics and insights
                </p>
                <Button className="w-full" variant="outline">
                  Open Analytics
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="text-center">
                <Settings className="h-8 w-8 mx-auto mb-2 text-gray-500" />
                <CardTitle className="text-lg">Platform Optimization</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-3">
                <p className="text-sm text-muted-foreground">
                  Advanced platform monitoring and optimization
                </p>
                <Link to="/platform-optimization">
                  <Button className="w-full" variant="outline">
                    Configure Platform
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">All systems secure</div>
                      <div className="text-sm text-muted-foreground">No active threats detected</div>
                    </div>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Compliance Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>SOC 2 Type II</span>
                    <Badge className="bg-green-100 text-green-800">Compliant</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>GDPR</span>
                    <Badge className="bg-green-100 text-green-800">Compliant</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>ISO 27001</span>
                    <Badge className="bg-green-100 text-green-800">Compliant</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="text-center">
                <CardTitle>Response Time</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-blue-600">245ms</div>
                <div className="text-sm text-muted-foreground">Average API Response</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <CardTitle>Uptime</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-green-600">99.9%</div>
                <div className="text-sm text-muted-foreground">Last 30 Days</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <CardTitle>Cache Hit Rate</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-purple-600">94.2%</div>
                <div className="text-sm text-muted-foreground">Cache Efficiency</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>User Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="text-4xl font-bold text-blue-600 mb-2">1,247</div>
                  <div className="text-sm text-muted-foreground">Active Users</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Platform Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="text-4xl font-bold text-purple-600 mb-2">156</div>
                  <div className="text-sm text-muted-foreground">Active Audits</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
