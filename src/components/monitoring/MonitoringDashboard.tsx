import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Monitor, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp,
  Database,
  Server,
  Wifi,
  Clock
} from 'lucide-react';

interface SystemMetric {
  name: string;
  value: number;
  unit: string;
  status: 'healthy' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
}

interface AlertItem {
  id: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  timestamp: Date;
  resolved: boolean;
}

export function MonitoringDashboard() {
  const [metrics, setMetrics] = useState<SystemMetric[]>([]);
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [systemHealth, setSystemHealth] = useState<'healthy' | 'degraded' | 'down'>('healthy');

  useEffect(() => {
    // Mock data - in production this would come from monitoring APIs
    const mockMetrics: SystemMetric[] = [
      {
        name: 'Response Time',
        value: 245,
        unit: 'ms',
        status: 'healthy',
        trend: 'stable'
      },
      {
        name: 'CPU Usage',
        value: 67,
        unit: '%',
        status: 'warning',
        trend: 'up'
      },
      {
        name: 'Memory Usage',
        value: 82,
        unit: '%',
        status: 'critical',
        trend: 'up'
      },
      {
        name: 'Active Users',
        value: 1247,
        unit: 'users',
        status: 'healthy',
        trend: 'up'
      },
      {
        name: 'Error Rate',
        value: 0.8,
        unit: '%',
        status: 'healthy',
        trend: 'down'
      },
      {
        name: 'Database Connections',
        value: 45,
        unit: 'connections',
        status: 'healthy',
        trend: 'stable'
      }
    ];

    const mockAlerts: AlertItem[] = [
      {
        id: '1',
        severity: 'high',
        message: 'High memory usage detected on server-01',
        timestamp: new Date(Date.now() - 300000),
        resolved: false
      },
      {
        id: '2',
        severity: 'medium',
        message: 'Slow query detected in audit_requests table',
        timestamp: new Date(Date.now() - 600000),
        resolved: false
      },
      {
        id: '3',
        severity: 'low',
        message: 'SSL certificate expires in 30 days',
        timestamp: new Date(Date.now() - 900000),
        resolved: true
      }
    ];

    setMetrics(mockMetrics);
    setAlerts(mockAlerts);
    
    // Determine overall system health
    const criticalIssues = mockMetrics.filter(m => m.status === 'critical').length;
    const warningIssues = mockMetrics.filter(m => m.status === 'warning').length;
    
    if (criticalIssues > 0) {
      setSystemHealth('down');
    } else if (warningIssues > 0) {
      setSystemHealth('degraded');
    } else {
      setSystemHealth('healthy');
    }
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'healthy': return 'default';
      case 'warning': return 'secondary';
      case 'critical': return 'destructive';
      default: return 'outline';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-blue-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-orange-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m ago`;
    }
    return `${minutes}m ago`;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Monitor className="h-6 w-6" />
          <h1 className="text-2xl font-bold">System Monitoring</h1>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={getStatusBadgeVariant(systemHealth)} className="capitalize">
            {systemHealth === 'healthy' && <CheckCircle className="h-3 w-3 mr-1" />}
            {systemHealth === 'degraded' && <AlertTriangle className="h-3 w-3 mr-1" />}
            {systemHealth === 'down' && <AlertTriangle className="h-3 w-3 mr-1" />}
            {systemHealth}
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {metrics.slice(0, 6).map((metric, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
                    <Badge variant="outline" className={getStatusColor(metric.status)}>
                      {metric.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">
                      {metric.value}{metric.unit}
                    </span>
                    <div className="flex items-center">
                      <TrendingUp 
                        className={`h-4 w-4 ${
                          metric.trend === 'up' ? 'text-red-500' : 
                          metric.trend === 'down' ? 'text-green-500' : 
                          'text-gray-500'
                        }`} 
                      />
                    </div>
                  </div>
                  {metric.name === 'CPU Usage' || metric.name === 'Memory Usage' ? (
                    <Progress value={metric.value} className="mt-2" />
                  ) : null}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="h-4 w-4" />
                  Server Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {metrics.filter(m => ['Response Time', 'CPU Usage', 'Memory Usage'].includes(m.name)).map((metric, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm">{metric.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{metric.value}{metric.unit}</span>
                      <Badge variant="outline" className={getStatusColor(metric.status)}>
                        {metric.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  Database & Network
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {metrics.filter(m => ['Database Connections', 'Error Rate', 'Active Users'].includes(m.name)).map((metric, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm">{metric.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{metric.value}{metric.unit}</span>
                      <Badge variant="outline" className={getStatusColor(metric.status)}>
                        {metric.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <div className="space-y-4">
            {alerts.map((alert) => (
              <Card key={alert.id} className={alert.resolved ? 'opacity-60' : ''}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className={`h-4 w-4 mt-0.5 ${getSeverityColor(alert.severity)}`} />
                      <div>
                        <p className="font-medium">{alert.message}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className={getSeverityColor(alert.severity)}>
                            {alert.severity}
                          </Badge>
                          <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatTimestamp(alert.timestamp)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {alert.resolved ? (
                        <Badge variant="outline" className="text-green-600">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Resolved
                        </Badge>
                      ) : (
                        <Button variant="outline" size="sm">
                          Resolve
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent System Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm font-mono">
                <div className="text-green-600">[2024-01-27 10:30:15] INFO: Audit request processed successfully</div>
                <div className="text-yellow-600">[2024-01-27 10:28:42] WARN: High memory usage detected</div>
                <div className="text-blue-600">[2024-01-27 10:25:33] INFO: New user registration completed</div>
                <div className="text-green-600">[2024-01-27 10:23:18] INFO: Database backup completed</div>
                <div className="text-red-600">[2024-01-27 10:20:45] ERROR: Failed to send notification email</div>
                <div className="text-green-600">[2024-01-27 10:18:22] INFO: System health check passed</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
