
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Activity, Server, Database, Wifi, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface SystemMetric {
  name: string;
  value: number;
  status: 'healthy' | 'warning' | 'critical';
  unit: string;
  threshold: number;
  trend: 'up' | 'down' | 'stable';
}

interface ServiceStatus {
  name: string;
  status: 'operational' | 'degraded' | 'down';
  uptime: number;
  responseTime: number;
  lastCheck: Date;
}

export function SystemHealthDashboard() {
  const [systemMetrics, setSystemMetrics] = useState<SystemMetric[]>([]);
  const [serviceStatuses, setServiceStatuses] = useState<ServiceStatus[]>([]);
  const [performanceData, setPerformanceData] = useState<any[]>([]);
  const [overallHealth, setOverallHealth] = useState(98.5);

  useEffect(() => {
    const initializeMetrics = () => {
      const metrics: SystemMetric[] = [
        {
          name: 'API Response Time',
          value: 245,
          status: 'healthy',
          unit: 'ms',
          threshold: 500,
          trend: 'stable'
        },
        {
          name: 'Database Query Time',
          value: 45,
          status: 'healthy',
          unit: 'ms',
          threshold: 100,
          trend: 'down'
        },
        {
          name: 'Memory Usage',
          value: 67,
          status: 'warning',
          unit: '%',
          threshold: 80,
          trend: 'up'
        },
        {
          name: 'CPU Usage',
          value: 34,
          status: 'healthy',
          unit: '%',
          threshold: 70,
          trend: 'stable'
        },
        {
          name: 'Error Rate',
          value: 0.12,
          status: 'healthy',
          unit: '%',
          threshold: 1.0,
          trend: 'down'
        },
        {
          name: 'Active Connections',
          value: 1247,
          status: 'healthy',
          unit: 'connections',
          threshold: 2000,
          trend: 'up'
        }
      ];

      const services: ServiceStatus[] = [
        {
          name: 'Authentication Service',
          status: 'operational',
          uptime: 99.9,
          responseTime: 150,
          lastCheck: new Date()
        },
        {
          name: 'Database Service',
          status: 'operational',
          uptime: 99.8,
          responseTime: 45,
          lastCheck: new Date()
        },
        {
          name: 'File Storage Service',
          status: 'degraded',
          uptime: 98.2,
          responseTime: 850,
          lastCheck: new Date()
        },
        {
          name: 'Email Service',
          status: 'operational',
          uptime: 99.95,
          responseTime: 320,
          lastCheck: new Date()
        },
        {
          name: 'Analytics Service',
          status: 'operational',
          uptime: 99.7,
          responseTime: 180,
          lastCheck: new Date()
        }
      ];

      const perfData = Array.from({ length: 24 }, (_, i) => ({
        time: `${String(i).padStart(2, '0')}:00`,
        responseTime: Math.floor(Math.random() * 200) + 150,
        throughput: Math.floor(Math.random() * 1000) + 800,
        errors: Math.floor(Math.random() * 5),
        uptime: 99 + Math.random()
      }));

      setSystemMetrics(metrics);
      setServiceStatuses(services);
      setPerformanceData(perfData);
    };

    initializeMetrics();

    // Update metrics every 30 seconds
    const interval = setInterval(() => {
      initializeMetrics();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'operational':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning':
      case 'degraded':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'critical':
      case 'down':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'operational':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'warning':
      case 'degraded':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'critical':
      case 'down':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <span className="text-green-500">↗</span>;
      case 'down':
        return <span className="text-red-500">↘</span>;
      case 'stable':
        return <span className="text-blue-500">→</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-green-500" />
            System Health Dashboard
          </CardTitle>
          <CardDescription>
            Real-time monitoring of platform health and performance metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-green-600">{overallHealth}%</div>
              <div className="text-sm text-muted-foreground">Overall System Health</div>
            </div>
            <Badge className="bg-green-100 text-green-800">All Systems Operational</Badge>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {systemMetrics.map((metric) => (
              <Card key={metric.name}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(metric.status)}
                      <span className="text-sm font-medium">{metric.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {getTrendIcon(metric.trend)}
                      <Badge className={getStatusColor(metric.status)} variant="outline">
                        {metric.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold">
                      {metric.value} {metric.unit}
                    </div>
                    <Progress 
                      value={(metric.value / metric.threshold) * 100} 
                      className="h-2"
                    />
                    <div className="text-xs text-muted-foreground">
                      Threshold: {metric.threshold} {metric.unit}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Performance Chart */}
          <Card>
            <CardHeader>
              <CardTitle>24-Hour Performance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="responseTime" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
                  <Area type="monotone" dataKey="throughput" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="space-y-4">
          {serviceStatuses.map((service) => (
            <Card key={service.name}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(service.status)}
                    <div>
                      <h4 className="font-medium">{service.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Last checked: {service.lastCheck.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={getStatusColor(service.status)} variant="outline">
                      {service.status}
                    </Badge>
                    <div className="text-sm text-muted-foreground mt-1">
                      {service.uptime}% uptime
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {service.responseTime}ms response
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Response Time Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={performanceData.slice(-12)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="responseTime" stroke="#3B82F6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Throughput Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={performanceData.slice(-12)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="throughput" stroke="#10B981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent System Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 border rounded-lg border-yellow-200 bg-yellow-50">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">High Memory Usage</h4>
                    <p className="text-sm text-muted-foreground">
                      Memory usage has exceeded 65% threshold
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      2 minutes ago
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 border rounded-lg border-green-200 bg-green-50">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Database Performance Improved</h4>
                    <p className="text-sm text-muted-foreground">
                      Query response time has improved by 15%
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      15 minutes ago
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 border rounded-lg border-blue-200 bg-blue-50">
                  <Activity className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">System Maintenance Scheduled</h4>
                    <p className="text-sm text-muted-foreground">
                      Maintenance window scheduled for tonight at 2:00 AM UTC
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      1 hour ago
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
