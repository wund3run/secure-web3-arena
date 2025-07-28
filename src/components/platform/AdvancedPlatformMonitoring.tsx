
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Activity, 
  Server, 
  Database, 
  Globe, 
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Users,
  Clock,
  Shield,
  Zap,
  RefreshCw
} from 'lucide-react';

interface SystemMetric {
  name: string;
  value: number;
  unit: string;
  status: 'healthy' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
  threshold: {
    warning: number;
    critical: number;
  };
}

interface PerformanceData {
  responseTime: number;
  throughput: number;
  errorRate: number;
  uptime: number;
  activeUsers: number;
  databaseConnections: number;
}

export const AdvancedPlatformMonitoring = () => {
  const [metrics, setMetrics] = useState<SystemMetric[]>([]);
  const [performance, setPerformance] = useState<PerformanceData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const initializeMetrics = () => {
    const systemMetrics: SystemMetric[] = [
      {
        name: 'CPU Usage',
        value: Math.random() * 100,
        unit: '%',
        status: 'healthy',
        trend: 'stable',
        threshold: { warning: 70, critical: 85 }
      },
      {
        name: 'Memory Usage',
        value: Math.random() * 100,
        unit: '%',
        status: 'healthy',
        trend: 'up',
        threshold: { warning: 80, critical: 90 }
      },
      {
        name: 'Database Response Time',
        value: Math.random() * 500 + 50,
        unit: 'ms',
        status: 'healthy',
        trend: 'down',
        threshold: { warning: 200, critical: 500 }
      },
      {
        name: 'API Error Rate',
        value: Math.random() * 5,
        unit: '%',
        status: 'healthy',
        trend: 'stable',
        threshold: { warning: 2, critical: 5 }
      },
      {
        name: 'Active WebSocket Connections',
        value: Math.floor(Math.random() * 1000) + 100,
        unit: 'connections',
        status: 'healthy',
        trend: 'up',
        threshold: { warning: 800, critical: 950 }
      },
      {
        name: 'Storage Usage',
        value: Math.random() * 100,
        unit: '%',
        status: 'healthy',
        trend: 'up',
        threshold: { warning: 75, critical: 90 }
      }
    ];

    // Update status based on thresholds
    systemMetrics.forEach(metric => {
      if (metric.value >= metric.threshold.critical) {
        metric.status = 'critical';
      } else if (metric.value >= metric.threshold.warning) {
        metric.status = 'warning';
      }
    });

    setMetrics(systemMetrics);
  };

  const updatePerformanceData = () => {
    setPerformance({
      responseTime: Math.random() * 200 + 50,
      throughput: Math.floor(Math.random() * 1000) + 500,
      errorRate: Math.random() * 2,
      uptime: 99.8 + Math.random() * 0.2,
      activeUsers: Math.floor(Math.random() * 500) + 100,
      databaseConnections: Math.floor(Math.random() * 50) + 10
    });
  };

  const refreshMetrics = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    initializeMetrics();
    updatePerformanceData();
    setLastUpdate(new Date());
    setIsLoading(false);
  };

  useEffect(() => {
    initializeMetrics();
    updatePerformanceData();
    
    const interval = setInterval(() => {
      initializeMetrics();
      updatePerformanceData();
      setLastUpdate(new Date());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'critical': return <AlertTriangle className="h-4 w-4 text-red-500" />;
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

  const criticalAlerts = metrics.filter(m => m.status === 'critical');
  const warningAlerts = metrics.filter(m => m.status === 'warning');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Advanced Platform Monitoring</h2>
          <p className="text-muted-foreground">
            Real-time system health and performance analytics
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            Last updated: {lastUpdate.toLocaleTimeString()}
          </span>
          <Button onClick={refreshMetrics} disabled={isLoading} variant="outline">
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Critical Alerts */}
      {criticalAlerts.length > 0 && (
        <Alert variant="error">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>{criticalAlerts.length} critical issues</strong> require immediate attention
          </AlertDescription>
        </Alert>
      )}

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {performance && (
          <>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium">Response Time</p>
                    <p className="text-2xl font-bold">{Math.round(performance.responseTime)}ms</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-sm font-medium">Active Users</p>
                    <p className="text-2xl font-bold">{performance.activeUsers}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  <div>
                    <p className="text-sm font-medium">Throughput</p>
                    <p className="text-2xl font-bold">{performance.throughput}/min</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-purple-500" />
                  <div>
                    <p className="text-sm font-medium">Uptime</p>
                    <p className="text-2xl font-bold">{performance.uptime.toFixed(2)}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Detailed Metrics */}
      <Tabs defaultValue="system" className="space-y-4">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="system">System Metrics</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="system" className="space-y-4">
          <div className="grid gap-4">
            {metrics.map((metric, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(metric.status)}
                      <div>
                        <p className="font-medium">{metric.name}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{metric.value.toFixed(1)} {metric.unit}</span>
                          {getTrendIcon(metric.trend)}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant={metric.status === 'healthy' ? 'default' : 'destructive'}
                        className={getStatusColor(metric.status)}
                      >
                        {metric.status}
                      </Badge>
                      <div className="mt-2 w-32">
                        <Progress 
                          value={Math.min(100, (metric.value / metric.threshold.critical) * 100)} 
                          className="h-2"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="h-5 w-5" />
                  Server Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {performance && (
                  <>
                    <div className="flex justify-between">
                      <span>Response Time</span>
                      <span className="font-medium">{Math.round(performance.responseTime)}ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Throughput</span>
                      <span className="font-medium">{performance.throughput} req/min</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Error Rate</span>
                      <span className="font-medium">{performance.errorRate.toFixed(2)}%</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Database Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {performance && (
                  <>
                    <div className="flex justify-between">
                      <span>Active Connections</span>
                      <span className="font-medium">{performance.databaseConnections}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Query Response Time</span>
                      <span className="font-medium">{Math.round(performance.responseTime * 0.3)}ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Connection Pool Usage</span>
                      <span className="font-medium">{Math.round(performance.databaseConnections / 50 * 100)}%</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Monitoring
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Authentication Success Rate</span>
                    <Badge variant="default">98.5%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Failed Login Attempts (24h)</span>
                    <Badge variant="secondary">23</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>API Rate Limit Violations</span>
                    <Badge variant="secondary">5</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>SSL Certificate Status</span>
                    <Badge variant="default">Valid</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  User Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Daily Active Users</p>
                    <p className="text-2xl font-bold">1,247</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Session Duration</p>
                    <p className="text-2xl font-bold">12.4m</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Page Views</p>
                    <p className="text-2xl font-bold">8,932</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Bounce Rate</p>
                    <p className="text-2xl font-bold">23.1%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
