
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  monitor, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Users,
  Activity,
  Zap,
  RefreshCw
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface MetricData {
  name: string;
  value: number;
  change: number;
  status: 'good' | 'warning' | 'critical';
  unit: string;
}

interface SystemHealth {
  overall: number;
  api: number;
  database: number;
  cache: number;
  cdn: number;
}

export function MonitoringDashboard() {
  const [metrics, setMetrics] = useState<MetricData[]>([]);
  const [systemHealth, setSystemHealth] = useState<SystemHealth>({
    overall: 98.5,
    api: 99.2,
    database: 97.8,
    cache: 99.9,
    cdn: 98.1
  });
  const [performanceData, setPerformanceData] = useState<any[]>([]);
  const [userActivityData, setUserActivityData] = useState<any[]>([]);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    // Initialize data
    loadMetrics();
    loadPerformanceData();
    loadUserActivityData();

    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      if (autoRefresh) {
        loadMetrics();
        setLastUpdated(new Date());
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const loadMetrics = () => {
    // Mock real-time metrics
    const baseMetrics: MetricData[] = [
      {
        name: 'Response Time',
        value: 145 + Math.random() * 50,
        change: (Math.random() - 0.5) * 10,
        status: 'good',
        unit: 'ms'
      },
      {
        name: 'Active Users',
        value: 1247 + Math.floor(Math.random() * 100),
        change: Math.random() * 15,
        status: 'good',
        unit: ''
      },
      {
        name: 'Error Rate',
        value: 0.2 + Math.random() * 0.3,
        change: (Math.random() - 0.5) * 0.2,
        status: Math.random() > 0.7 ? 'warning' : 'good',
        unit: '%'
      },
      {
        name: 'CPU Usage',
        value: 65 + Math.random() * 20,
        change: (Math.random() - 0.5) * 10,
        status: 'good',
        unit: '%'
      },
      {
        name: 'Memory Usage',
        value: 78 + Math.random() * 15,
        change: (Math.random() - 0.5) * 5,
        status: 'good',
        unit: '%'
      },
      {
        name: 'Audit Requests',
        value: 23 + Math.floor(Math.random() * 10),
        change: Math.random() * 20,
        status: 'good',
        unit: '/hour'
      }
    ];

    setMetrics(baseMetrics);
  };

  const loadPerformanceData = () => {
    const data = [];
    const now = new Date();
    
    for (let i = 23; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 60 * 60 * 1000);
      data.push({
        time: time.getHours() + ':00',
        responseTime: 120 + Math.random() * 80,
        throughput: 800 + Math.random() * 400,
        errorRate: Math.random() * 2
      });
    }
    
    setPerformanceData(data);
  };

  const loadUserActivityData = () => {
    const data = [];
    const now = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      data.push({
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        activeUsers: 800 + Math.random() * 600,
        newUsers: 50 + Math.random() * 100,
        auditRequests: 15 + Math.random() * 25
      });
    }
    
    setUserActivityData(data);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'critical': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default: return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  const refreshData = () => {
    loadMetrics();
    loadPerformanceData();
    loadUserActivityData();
    setLastUpdated(new Date());
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <monitor className="h-6 w-6" />
            Platform Monitoring
          </h1>
          <p className="text-muted-foreground">
            Real-time system health and performance metrics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">
            <Clock className="h-3 w-3 mr-1" />
            Updated {lastUpdated.toLocaleTimeString()}
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={refreshData}
            className="flex items-center gap-1"
          >
            <RefreshCw className="h-3 w-3" />
            Refresh
          </Button>
          <Button
            variant={autoRefresh ? "default" : "outline"}
            size="sm"
            onClick={() => setAutoRefresh(!autoRefresh)}
          >
            Auto-refresh {autoRefresh ? 'ON' : 'OFF'}
          </Button>
        </div>
      </div>

      {/* System Health Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            System Health
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{systemHealth.overall}%</div>
              <div className="text-sm text-muted-foreground">Overall</div>
              <Progress value={systemHealth.overall} className="mt-2" />
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold">{systemHealth.api}%</div>
              <div className="text-sm text-muted-foreground">API</div>
              <Progress value={systemHealth.api} className="mt-2" />
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold">{systemHealth.database}%</div>
              <div className="text-sm text-muted-foreground">Database</div>
              <Progress value={systemHealth.database} className="mt-2" />
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold">{systemHealth.cache}%</div>
              <div className="text-sm text-muted-foreground">Cache</div>
              <Progress value={systemHealth.cache} className="mt-2" />
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold">{systemHealth.cdn}%</div>
              <div className="text-sm text-muted-foreground">CDN</div>
              <Progress value={systemHealth.cdn} className="mt-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{metric.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-2xl font-bold">
                      {typeof metric.value === 'number' ? metric.value.toFixed(metric.name.includes('Rate') ? 1 : 0) : metric.value}
                      {metric.unit}
                    </p>
                    <div className={`flex items-center gap-1 text-sm ${getStatusColor(metric.status)}`}>
                      {metric.change > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      {Math.abs(metric.change).toFixed(1)}%
                    </div>
                  </div>
                </div>
                {getStatusIcon(metric.status)}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="activity">User Activity</TabsTrigger>
          <TabsTrigger value="errors">Error Tracking</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Response Time (24h)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="responseTime" stroke="#8884d8" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Throughput (24h)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="throughput" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">User Activity (7 days)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={userActivityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="activeUsers" stackId="1" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="newUsers" stackId="1" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="errors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Error Rate (24h)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="errorRate" stroke="#ff7300" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
