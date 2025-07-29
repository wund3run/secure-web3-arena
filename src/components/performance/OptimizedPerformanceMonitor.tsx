import React, { useEffect, useState } from 'react';
import { performanceOptimizer } from '@/utils/performance-optimizer';
import { analyticsTracker } from '@/utils/analytics-tracker';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Zap, Clock, TrendingUp } from 'lucide-react';

export function OptimizedPerformanceMonitor() {
  const [metrics, setMetrics] = useState<Record<string, unknown>>({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Initialize performance monitoring
    performanceOptimizer.init();
    
    // Initialize analytics tracking
    analyticsTracker.track('performance_monitor', 'system', 'initialized');
    
    // Update metrics every 5 seconds
    const interval = setInterval(() => {
      const currentMetrics = performanceOptimizer.getMetrics();
      setMetrics(currentMetrics);
    }, 5000);

    // Check for development mode to show monitor
    if (import.meta.env.MODE === 'development') {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.altKey && e.key === 'p') {
          setIsVisible(prev => !prev);
          analyticsTracker.track('performance_monitor', 'interaction', 'toggle_visibility');
        }
      };
      
      document.addEventListener('keydown', handleKeyDown);
      
      return () => {
        clearInterval(interval);
        document.removeEventListener('keydown', handleKeyDown);
        performanceOptimizer.destroy();
      };
    }

    return () => {
      clearInterval(interval);
      performanceOptimizer.destroy();
    };
  }, []);

  if (!isVisible || import.meta.env.MODE !== 'development') {
    return null;
  }

  const getPerformanceStatus = (metric: string, value: number) => {
    const thresholds = {
      'page-load-time': { good: 2000, poor: 4000 },
      'first-byte': { good: 200, poor: 600 },
      'dom-content-loaded': { good: 1000, poor: 2000 }
    };

    const threshold = thresholds[metric as keyof typeof thresholds];
    if (!threshold) return 'secondary';

    if (value <= threshold.good) return 'default';
    if (value <= threshold.poor) return 'secondary';
    return 'destructive';
  };

  return (
    <div className="fixed bottom-4 left-4 z-50 w-80">
      <Card className="bg-background/95 backdrop-blur border-2">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Activity className="h-4 w-4" />
            Performance Monitor
            <Badge variant="outline" className="text-xs">DEV</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {Object.entries(metrics).map(([key, metric]) => {
            // Type guard for metric data
            const isValidMetric = (m: unknown): m is { latest: number; average: number; count: number } => {
              return typeof m === 'object' && m !== null && 'latest' in m && typeof (m as any).latest === 'number';
            };

            if (!isValidMetric(metric)) {
              return null;
            }

            return (
              <div key={key} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {key.includes('load') && <Clock className="h-3 w-3" />}
                  {key.includes('byte') && <Zap className="h-3 w-3" />}
                  {key.includes('dom') && <TrendingUp className="h-3 w-3" />}
                  <span className="text-xs font-medium">
                    {key.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                </div>
                <Badge variant={getPerformanceStatus(key, metric.latest)} className="text-xs">
                  {Math.round(metric.latest)}ms
                </Badge>
              </div>
            );
          })}
          <div className="text-xs text-muted-foreground border-t pt-2">
            Press Alt+P to toggle • Analytics: {analyticsTracker.getAnalyticsSummary().total_events} events
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
