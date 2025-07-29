import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PerformanceMonitor } from '@/utils/monitoring/performanceMonitor';
import { HealthChecker } from '@/utils/system/healthChecker';

interface HealthCheck {
  component: string;
  status: 'healthy' | 'warning' | 'error';
  responseTime?: number;
  details?: string;
}

interface SystemHealth {
  overall: 'healthy' | 'warning' | 'error';
  results: HealthCheck[];
}

interface PerformanceMetric {
  value: number;
  timestamp?: number;
}

export const SystemMonitor: React.FC = () => {
  const [systemHealth, setSystemHealth] = useState<SystemHealth | null>(null);
  const [performanceMetrics, setPerformanceMetrics] = useState<any[] | null>(null);

  useEffect(() => {
    const loadSystemData = async () => {
      try {
        const health = await HealthChecker.performComprehensiveCheck();
        setSystemHealth(health as SystemHealth);

        const performanceMonitor = PerformanceMonitor.getInstance();
        const metrics = performanceMonitor.getMetrics('page_load_time');
        setPerformanceMetrics(metrics as any[]);
      } catch (error) {
        console.error('Failed to load system data:', error);
      }
    };

    loadSystemData();
    const interval = setInterval(loadSystemData, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getHealthBadgeVariant = (status: string) => {
    switch (status) {
      case 'healthy': return 'default';
      case 'warning': return 'secondary';
      case 'error': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">System Monitor</h2>
        <Badge variant={systemHealth?.overall === 'healthy' ? 'default' : 'destructive'}>
          {systemHealth?.overall || 'Loading...'}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {systemHealth?.results?.map((check: HealthCheck, index: number) => (
          <Card key={check.component || index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{check.component}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Badge variant={getHealthBadgeVariant(check.status)}>
                  {check.status}
                </Badge>
                {check.responseTime && (
                  <span className="text-sm text-muted-foreground">
                    {check.responseTime}ms
                  </span>
                )}
              </div>
              {check.details && (
                <p className="text-xs text-muted-foreground mt-2">
                  {check.details}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {performanceMetrics && performanceMetrics.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {performanceMetrics.slice(-5).map((metric: any, index: number) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span>Page Load Time</span>
                  <span className="font-mono">{Math.round(metric.value || 0)}ms</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
