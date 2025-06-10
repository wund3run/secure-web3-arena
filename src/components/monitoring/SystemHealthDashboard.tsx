
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
  Bug,
  Wifi,
  WifiOff
} from 'lucide-react';
import { useRealtimeSync } from '@/hooks/useRealtimeSync';

export function SystemHealthDashboard() {
  const { isConnected, lastSync, forceSync } = useRealtimeSync({ channel: 'system-health' });
  const [systemMetrics, setSystemMetrics] = useState({
    uptime: 99.8,
    errorRate: 2.1,
    activeUsers: 127,
    systemLoad: 25,
    responseTime: 45,
    databaseHealth: 98,
    lastHealthCheck: new Date()
  });
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshMetrics = async () => {
    setIsRefreshing(true);
    
    // Simulate metrics collection
    setTimeout(() => {
      setSystemMetrics({
        uptime: 99.8 + Math.random() * 0.2 - 0.1,
        errorRate: Math.random() * 5,
        activeUsers: Math.floor(Math.random() * 150) + 50,
        systemLoad: Math.floor(Math.random() * 30) + 20,
        responseTime: Math.floor(Math.random() * 100) + 20,
        databaseHealth: 95 + Math.random() * 5,
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
          <Badge variant={isConnected ? "default" : "destructive"}>
            {isConnected ? (
              <>
                <Wifi className="h-3 w-3 mr-1" />
                Connected
              </>
            ) : (
              <>
                <WifiOff className="h-3 w-3 mr-1" />
                Disconnected
              </>
            )}
          </Badge>
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
                <p className="text-2xl font-bold text-green-600">{systemMetrics.uptime.toFixed(1)}%</p>
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

      {/* Detailed Health Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Database Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Database Health</span>
                <span>{systemMetrics.databaseHealth.toFixed(1)}%</span>
              </div>
              <Progress value={systemMetrics.databaseHealth} className="w-full" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Response Time</span>
                <span>{systemMetrics.responseTime}ms</span>
              </div>
              <Progress value={100 - systemMetrics.responseTime} className="w-full" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Connection:</span>
                <div className="font-medium capitalize">{isConnected ? 'Connected' : 'Disconnected'}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Last Sync:</span>
                <div className="font-medium">{lastSync?.toLocaleTimeString()}</div>
              </div>
            </div>
            <div className="pt-2 border-t">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Overall System Health</span>
                <Badge variant="default">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Operational
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-xs text-muted-foreground text-center">
        Last updated: {systemMetrics.lastHealthCheck.toLocaleString()}
      </div>
    </div>
  );
}
