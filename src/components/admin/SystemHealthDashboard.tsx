
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  RefreshCw, 
  TrendingUp,
  Database,
  Server,
  Users,
  Bug
} from 'lucide-react';
import { errorMonitoring } from '@/utils/testing/ErrorMonitoringService';
import { testRunner } from '@/utils/testing/AutomatedTestRunner';
import { analyticsTracker } from '@/utils/analytics-tracker';
import { PlatformHealthMonitor } from '../platform/platform-health-monitor';
import { SupabaseHealthCheck } from './SupabaseHealthCheck';

export function SystemHealthDashboard() {
  const [systemMetrics, setSystemMetrics] = useState({
    uptime: 0,
    errorRate: 0,
    activeUsers: 0,
    systemLoad: 0,
    lastHealthCheck: new Date()
  });
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshMetrics = async () => {
    setIsRefreshing(true);
    
    // Simulate metrics collection
    setTimeout(() => {
      const report = errorMonitoring.generateReport();
      const analyticsData = analyticsTracker.getAnalyticsSummary();
      
      setSystemMetrics({
        uptime: 99.8,
        errorRate: report.summary.totalBugs > 0 ? (report.summary.openBugs / report.summary.totalBugs) * 100 : 0,
        activeUsers: Math.floor(Math.random() * 150) + 50,
        systemLoad: Math.floor(Math.random() * 30) + 20,
        lastHealthCheck: new Date()
      });
      
      setIsRefreshing(false);
    }, 1500);
  };

  useEffect(() => {
    refreshMetrics();
    
    // Set up periodic refresh every 30 seconds
    const interval = setInterval(refreshMetrics, 30000);
    return () => clearInterval(interval);
  }, []);

  const getHealthStatus = () => {
    if (systemMetrics.errorRate > 10) return { status: 'critical', color: 'destructive' };
    if (systemMetrics.errorRate > 5) return { status: 'warning', color: 'secondary' };
    return { status: 'healthy', color: 'default' };
  };

  const healthStatus = getHealthStatus();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">System Health Dashboard</h1>
          <p className="text-muted-foreground">
            Real-time monitoring of platform health and performance
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={healthStatus.color as any}>
            {healthStatus.status === 'healthy' && <CheckCircle className="h-3 w-3 mr-1" />}
            {healthStatus.status === 'warning' && <AlertTriangle className="h-3 w-3 mr-1" />}
            {healthStatus.status === 'critical' && <AlertTriangle className="h-3 w-3 mr-1" />}
            System {healthStatus.status}
          </Badge>
          <Button onClick={refreshMetrics} disabled={isRefreshing} variant="outline">
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* System Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Uptime</p>
                <p className="text-2xl font-bold text-green-600">{systemMetrics.uptime}%</p>
              </div>
              <Activity className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Error Rate</p>
                <p className="text-2xl font-bold text-red-600">{systemMetrics.errorRate.toFixed(1)}%</p>
              </div>
              <Bug className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold">{systemMetrics.activeUsers}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">System Load</p>
                <p className="text-2xl font-bold">{systemMetrics.systemLoad}%</p>
              </div>
              <Server className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Health Monitoring */}
      <Tabs defaultValue="platform" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="platform">Platform Health</TabsTrigger>
          <TabsTrigger value="database">Database Status</TabsTrigger>
          <TabsTrigger value="testing">Testing Results</TabsTrigger>
        </TabsList>

        <TabsContent value="platform" className="space-y-4">
          <PlatformHealthMonitor />
        </TabsContent>

        <TabsContent value="database" className="space-y-4">
          <SupabaseHealthCheck />
        </TabsContent>

        <TabsContent value="testing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Testing & Quality Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Error Monitoring</span>
                  <Badge variant="default">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Automated Testing</span>
                  <Badge variant="default">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Performance Tracking</span>
                  <Badge variant="default">Running</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>System Health Score</span>
                    <span>{(100 - systemMetrics.errorRate).toFixed(1)}%</span>
                  </div>
                  <Progress value={100 - systemMetrics.errorRate} className="w-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="text-xs text-muted-foreground text-center">
        Last updated: {systemMetrics.lastHealthCheck.toLocaleString()}
      </div>
    </div>
  );
}
