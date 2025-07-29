import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, Zap, Activity, RefreshCw } from 'lucide-react';
import { EnhancedSystemInitializer } from '@/utils/initialization/SystemInitializer';

interface SystemStatus {
  security: 'healthy' | 'warning' | 'error';
  performance: 'optimal' | 'degraded' | 'poor';
  availability: 'online' | 'degraded' | 'offline';
  lastCheck: string;
}

export function SystemStatusMonitor() {
  const [status, setStatus] = useState<SystemStatus>({
    security: 'healthy',
    performance: 'optimal',
    availability: 'online',
    lastCheck: new Date().toISOString()
  });
  const [isLoading, setIsLoading] = useState(false);

  const checkSystemStatus = async () => {
    setIsLoading(true);
    
    try {
      // Check if enhanced system is initialized
      const isInitialized = EnhancedSystemInitializer.isInitialized();
      
      // Check performance metrics
      const performanceEntries = performance.getEntriesByType('navigation');
      const loadTime = performanceEntries[0] ? (performanceEntries[0] as PerformanceNavigationTiming).loadEventEnd : 0;
      
      // Check memory usage if available
      let memoryUsage = 0;
      if ('memory' in performance) {
        const memory = (performance as Performance & { memory: { usedJSHeapSize: number; totalJSHeapSize: number } }).memory;
        memoryUsage = memory.usedJSHeapSize / memory.totalJSHeapSize;
      }

      setStatus({
        security: isInitialized ? 'healthy' : 'warning',
        performance: memoryUsage > 0.8 || loadTime > 3000 ? 'degraded' : 'optimal',
        availability: 'online',
        lastCheck: new Date().toISOString()
      });

    } catch (error) {
      setStatus(prev => ({
        ...prev,
        availability: 'degraded',
        lastCheck: new Date().toISOString()
      }));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkSystemStatus();
    const interval = setInterval(checkSystemStatus, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'optimal':
      case 'online':
        return 'default';
      case 'warning':
      case 'degraded':
        return 'secondary';
      case 'error':
      case 'poor':
      case 'offline':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              System Status
            </CardTitle>
            <CardDescription>
              Real-time monitoring of platform health and performance
            </CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={checkSystemStatus}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center justify-between p-3 border rounded">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-blue-500" />
              <span className="font-medium">Security</span>
            </div>
            <Badge variant={getStatusColor(status.security)}>
              {status.security}
            </Badge>
          </div>

          <div className="flex items-center justify-between p-3 border rounded">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span className="font-medium">Performance</span>
            </div>
            <Badge variant={getStatusColor(status.performance)}>
              {status.performance}
            </Badge>
          </div>

          <div className="flex items-center justify-between p-3 border rounded">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-green-500" />
              <span className="font-medium">Availability</span>
            </div>
            <Badge variant={getStatusColor(status.availability)}>
              {status.availability}
            </Badge>
          </div>
        </div>

        <div className="text-sm text-muted-foreground">
          Last checked: {new Date(status.lastCheck).toLocaleString()}
        </div>
      </CardContent>
    </Card>
  );
}
