
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Activity, 
  Users, 
  Shield, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign
} from 'lucide-react';

interface SystemMetrics {
  uptime: number;
  responseTime: number;
  errorRate: number;
  activeUsers: number;
  totalAudits: number;
  completedAudits: number;
  revenue: number;
  securityScore: number;
}

interface SystemAlert {
  id: string;
  type: 'warning' | 'error' | 'info';
  message: string;
  timestamp: Date;
  resolved: boolean;
}

export const ProductionMonitoring: React.FC = () => {
  const [metrics, setMetrics] = useState<SystemMetrics>({
    uptime: 99.9,
    responseTime: 150,
    errorRate: 0.1,
    activeUsers: 47,
    totalAudits: 128,
    completedAudits: 115,
    revenue: 245000,
    securityScore: 98
  });

  const [alerts, setAlerts] = useState<SystemAlert[]>([
    {
      id: '1',
      type: 'warning',
      message: 'High response time detected on audit request endpoints',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      resolved: false
    },
    {
      id: '2',
      type: 'info',
      message: 'Daily backup completed successfully',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      resolved: true
    }
  ]);

  const [realTimeData, setRealTimeData] = useState({
    requestsPerMinute: 23,
    activeConnections: 156,
    cpuUsage: 45,
    memoryUsage: 62,
    diskUsage: 34
  });

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        requestsPerMinute: Math.floor(Math.random() * 50) + 10,
        activeConnections: Math.floor(Math.random() * 100) + 100,
        cpuUsage: Math.floor(Math.random() * 30) + 30,
        memoryUsage: Math.floor(Math.random() * 40) + 40,
        diskUsage: Math.floor(Math.random() * 20) + 25
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getHealthStatus = () => {
    if (metrics.uptime > 99.5 && metrics.errorRate < 0.5) return 'healthy';
    if (metrics.uptime > 99.0 && metrics.errorRate < 1.0) return 'warning';
    return 'critical';
  };

  const healthStatus = getHealthStatus();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Production Monitoring</h2>
        <Badge 
          className={
            healthStatus === 'healthy' ? 'bg-green-500' :
            healthStatus === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
          }
        >
          <CheckCircle className="h-3 w-3 mr-1" />
          System {healthStatus === 'healthy' ? 'Healthy' : healthStatus === 'warning' ? 'Warning' : 'Critical'}
        </Badge>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Uptime</p>
                <p className="text-2xl font-bold">{metrics.uptime}%</p>
              </div>
              <Activity className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold">{metrics.activeUsers}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Security Score</p>
                <p className="text-2xl font-bold">{metrics.securityScore}%</p>
              </div>
              <Shield className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Revenue</p>
                <p className="text-2xl font-bold">${metrics.revenue.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="business">Business</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>System Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">CPU Usage</span>
                    <span className="text-sm">{realTimeData.cpuUsage}%</span>
                  </div>
                  <Progress value={realTimeData.cpuUsage} />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Memory Usage</span>
                    <span className="text-sm">{realTimeData.memoryUsage}%</span>
                  </div>
                  <Progress value={realTimeData.memoryUsage} />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Disk Usage</span>
                    <span className="text-sm">{realTimeData.diskUsage}%</span>
                  </div>
                  <Progress value={realTimeData.diskUsage} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Response Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Average Response Time</span>
                  <span className="font-semibold">{metrics.responseTime}ms</span>
                </div>
                <div className="flex justify-between">
                  <span>Requests/Minute</span>
                  <span className="font-semibold">{realTimeData.requestsPerMinute}</span>
                </div>
                <div className="flex justify-between">
                  <span>Error Rate</span>
                  <span className="font-semibold">{metrics.errorRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Active Connections</span>
                  <span className="font-semibold">{realTimeData.activeConnections}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="business" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Audit Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Total Audits</span>
                  <span className="font-semibold">{metrics.totalAudits}</span>
                </div>
                <div className="flex justify-between">
                  <span>Completed Audits</span>
                  <span className="font-semibold">{metrics.completedAudits}</span>
                </div>
                <div className="flex justify-between">
                  <span>Completion Rate</span>
                  <span className="font-semibold">
                    {Math.round((metrics.completedAudits / metrics.totalAudits) * 100)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Average Audit Duration</span>
                  <span className="font-semibold">8.5 days</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Analytics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Monthly Revenue</span>
                  <span className="font-semibold">${metrics.revenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Average Audit Value</span>
                  <span className="font-semibold">$15,750</span>
                </div>
                <div className="flex justify-between">
                  <span>Platform Fee Revenue</span>
                  <span className="font-semibold">$12,250</span>
                </div>
                <div className="flex justify-between">
                  <span>Growth Rate</span>
                  <span className="font-semibold text-green-600">+23%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <Shield className="h-12 w-12 mx-auto mb-2 text-green-500" />
                  <p className="font-semibold">SSL/TLS</p>
                  <p className="text-sm text-muted-foreground">A+ Rating</p>
                </div>
                <div className="text-center">
                  <CheckCircle className="h-12 w-12 mx-auto mb-2 text-green-500" />
                  <p className="font-semibold">Authentication</p>
                  <p className="text-sm text-muted-foreground">Multi-factor enabled</p>
                </div>
                <div className="text-center">
                  <Activity className="h-12 w-12 mx-auto mb-2 text-green-500" />
                  <p className="font-semibold">Monitoring</p>
                  <p className="text-sm text-muted-foreground">Real-time alerts</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <div className="space-y-3">
            {alerts.map((alert) => (
              <Alert key={alert.id} className={
                alert.type === 'error' ? 'border-red-500' :
                alert.type === 'warning' ? 'border-yellow-500' : 'border-blue-500'
              }>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <div className="flex justify-between items-start">
                    <div>
                      <p>{alert.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {alert.timestamp.toLocaleString()}
                      </p>
                    </div>
                    <Badge variant={alert.resolved ? "secondary" : "error"}>
                      {alert.resolved ? 'Resolved' : 'Active'}
                    </Badge>
                  </div>
                </AlertDescription>
              </Alert>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
