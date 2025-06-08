
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Activity, 
  Server, 
  Database, 
  Wifi, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Cpu,
  MemoryStick,
  HardDrive,
  Network,
  Shield,
  Zap
} from 'lucide-react';
import { platformOrchestrator } from '@/services/platformOrchestration';

interface HealthMetric {
  name: string;
  value: number;
  status: 'healthy' | 'warning' | 'critical';
  unit: string;
  threshold: number;
  lastUpdated: Date;
}

interface SystemService {
  name: string;
  status: 'online' | 'offline' | 'degraded';
  uptime: number;
  responseTime: number;
  errorRate: number;
  lastCheck: Date;
}

export function SystemHealthDashboard() {
  const [healthMetrics, setHealthMetrics] = useState<HealthMetric[]>([]);
  const [services, setServices] = useState<SystemService[]>([]);
  const [overallHealth, setOverallHealth] = useState(100);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeHealthData = async () => {
      setIsLoading(true);
      
      try {
        // Get system health from platform orchestrator
        const systemHealth = platformOrchestrator.getSystemHealth();
        setOverallHealth(systemHealth.overall);
        
        // Simulate detailed health metrics
        const mockMetrics: HealthMetric[] = [
          {
            name: 'CPU Usage',
            value: 23,
            status: 'healthy',
            unit: '%',
            threshold: 80,
            lastUpdated: new Date()
          },
          {
            name: 'Memory Usage',
            value: 67,
            status: 'warning',
            unit: '%',
            threshold: 80,
            lastUpdated: new Date()
          },
          {
            name: 'Disk Usage',
            value: 45,
            status: 'healthy',
            unit: '%',
            threshold: 90,
            lastUpdated: new Date()
          },
          {
            name: 'Network Latency',
            value: 34,
            status: 'healthy',
            unit: 'ms',
            threshold: 100,
            lastUpdated: new Date()
          },
          {
            name: 'Error Rate',
            value: 0.2,
            status: 'healthy',
            unit: '%',
            threshold: 5,
            lastUpdated: new Date()
          },
          {
            name: 'Active Connections',
            value: 847,
            status: 'healthy',
            unit: '',
            threshold: 1000,
            lastUpdated: new Date()
          }
        ];

        const mockServices: SystemService[] = [
          {
            name: 'Authentication Service',
            status: 'online',
            uptime: 99.8,
            responseTime: 45,
            errorRate: 0.1,
            lastCheck: new Date()
          },
          {
            name: 'Database',
            status: 'online',
            uptime: 99.9,
            responseTime: 23,
            errorRate: 0.0,
            lastCheck: new Date()
          },
          {
            name: 'Cache Service',
            status: 'degraded',
            uptime: 97.2,
            responseTime: 89,
            errorRate: 2.1,
            lastCheck: new Date()
          },
          {
            name: 'File Storage',
            status: 'online',
            uptime: 99.6,
            responseTime: 67,
            errorRate: 0.3,
            lastCheck: new Date()
          },
          {
            name: 'Security Monitor',
            status: 'online',
            uptime: 99.9,
            responseTime: 12,
            errorRate: 0.0,
            lastCheck: new Date()
          }
        ];

        setHealthMetrics(mockMetrics);
        setServices(mockServices);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to load health data:', error);
        setIsLoading(false);
      }
    };

    initializeHealthData();
    
    // Update health data every 30 seconds
    const interval = setInterval(initializeHealthData, 30000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'online':
        return 'bg-green-100 text-green-800';
      case 'warning':
      case 'degraded':
        return 'bg-yellow-100 text-yellow-800';
      case 'critical':
      case 'offline':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getMetricIcon = (name: string) => {
    if (name.includes('CPU')) return Cpu;
    if (name.includes('Memory')) return MemoryStick;
    if (name.includes('Disk')) return HardDrive;
    if (name.includes('Network')) return Network;
    if (name.includes('Error')) return AlertTriangle;
    return Activity;
  };

  const getServiceIcon = (name: string) => {
    if (name.includes('Database')) return Database;
    if (name.includes('Cache')) return Zap;
    if (name.includes('Security')) return Shield;
    if (name.includes('Storage')) return HardDrive;
    return Server;
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-muted rounded"></div>
            ))}
          </div>
          <div className="h-64 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-green-500" />
            System Health Dashboard
          </CardTitle>
          <CardDescription>
            Real-time monitoring of system performance and service health
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Overall Health Score */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="col-span-1">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="relative w-24 h-24">
                  <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="3"
                    />
                    <path
                      d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                      fill="none"
                      stroke={overallHealth >= 95 ? "#10b981" : overallHealth >= 80 ? "#f59e0b" : "#ef4444"}
                      strokeWidth="3"
                      strokeDasharray={`${overallHealth}, 100`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold">{overallHealth}%</span>
                  </div>
                </div>
              </div>
              <h3 className="text-lg font-semibold">Overall Health</h3>
              <Badge className={getStatusColor(overallHealth >= 95 ? 'healthy' : overallHealth >= 80 ? 'warning' : 'critical')}>
                {overallHealth >= 95 ? 'Excellent' : overallHealth >= 80 ? 'Good' : 'Needs Attention'}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
                <p className="text-sm font-medium">Services Online</p>
                <p className="text-2xl font-bold text-green-600">
                  {services.filter(s => s.status === 'online').length}/{services.length}
                </p>
              </div>
              
              <div>
                <Clock className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                <p className="text-sm font-medium">Avg Response</p>
                <p className="text-2xl font-bold text-blue-600">
                  {Math.round(services.reduce((sum, s) => sum + s.responseTime, 0) / services.length)}ms
                </p>
              </div>
              
              <div>
                <Wifi className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                <p className="text-sm font-medium">Uptime</p>
                <p className="text-2xl font-bold text-purple-600">99.8%</p>
              </div>
              
              <div>
                <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                <p className="text-sm font-medium">Alerts</p>
                <p className="text-2xl font-bold text-orange-600">2</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="metrics" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="metrics">System Metrics</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="metrics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {healthMetrics.map((metric) => {
              const IconComponent = getMetricIcon(metric.name);
              return (
                <Card key={metric.name}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <IconComponent className="h-4 w-4 text-blue-500" />
                        <span className="font-medium text-sm">{metric.name}</span>
                      </div>
                      <Badge className={getStatusColor(metric.status)} variant="secondary">
                        {metric.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold">
                          {metric.value.toLocaleString()}{metric.unit}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          /{metric.threshold}{metric.unit}
                        </span>
                      </div>
                      
                      <Progress 
                        value={(metric.value / metric.threshold) * 100} 
                        className="h-2"
                      />
                      
                      <div className="text-xs text-muted-foreground">
                        Updated {metric.lastUpdated.toLocaleTimeString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="services" className="space-y-4">
          {services.map((service) => {
            const IconComponent = getServiceIcon(service.name);
            return (
              <Card key={service.name}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <IconComponent className="h-5 w-5 text-blue-500" />
                      <div>
                        <h3 className="font-medium">{service.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Last check: {service.lastCheck.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Uptime</p>
                        <p className="font-medium">{service.uptime}%</p>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Response</p>
                        <p className="font-medium">{service.responseTime}ms</p>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Errors</p>
                        <p className="font-medium">{service.errorRate}%</p>
                      </div>
                      
                      <Badge className={getStatusColor(service.status)}>
                        {service.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <div className="space-y-3">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-medium">Memory Usage Warning</h3>
                    <p className="text-sm text-muted-foreground">
                      Memory usage has exceeded 65% threshold on production servers
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      2 minutes ago
                    </p>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-medium">Cache Service Degraded</h3>
                    <p className="text-sm text-muted-foreground">
                      Cache service response time has increased significantly
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      8 minutes ago
                    </p>
                  </div>
                  <Badge className="bg-orange-100 text-orange-800">Medium</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>System Performance History</CardTitle>
              <CardDescription>
                Historical trends and performance patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-500" />
                    <p className="text-sm font-medium">24h Uptime</p>
                    <p className="text-2xl font-bold text-green-600">99.8%</p>
                  </div>
                  
                  <div className="text-center p-4 border rounded-lg">
                    <Activity className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                    <p className="text-sm font-medium">Avg Response</p>
                    <p className="text-2xl font-bold text-blue-600">42ms</p>
                  </div>
                  
                  <div className="text-center p-4 border rounded-lg">
                    <CheckCircle className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                    <p className="text-sm font-medium">Incidents</p>
                    <p className="text-2xl font-bold text-purple-600">0</p>
                  </div>
                </div>
                
                <Button className="w-full">
                  View Detailed Reports
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
