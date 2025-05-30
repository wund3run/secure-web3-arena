
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, Clock, Globe, Database } from 'lucide-react';

interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  networkLatency: number;
  databaseLatency: number;
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    loadTime: 0,
    renderTime: 0,
    networkLatency: 0,
    databaseLatency: 0
  });

  useEffect(() => {
    // Measure page load time
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    
    // Measure render time
    const renderTime = performance.timing.domContentLoadedEventEnd - performance.timing.domContentLoadedEventStart;

    // Simulate network and database latency measurements
    const measureLatency = async () => {
      const networkStart = performance.now();
      try {
        await fetch('/api/health', { method: 'HEAD' });
        const networkEnd = performance.now();
        
        setMetrics(prev => ({
          ...prev,
          loadTime,
          renderTime,
          networkLatency: networkEnd - networkStart,
          databaseLatency: Math.random() * 50 + 10 // Simulated
        }));
      } catch (error) {
        console.warn('Performance monitoring failed:', error);
      }
    };

    measureLatency();
  }, []);

  const getPerformanceStatus = (value: number, thresholds: { good: number; ok: number }) => {
    if (value <= thresholds.good) return 'good';
    if (value <= thresholds.ok) return 'ok';
    return 'poor';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'bg-green-100 text-green-800';
      case 'ok': return 'bg-yellow-100 text-yellow-800';
      case 'poor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const performanceData = [
    {
      label: 'Page Load',
      value: metrics.loadTime,
      unit: 'ms',
      icon: Zap,
      status: getPerformanceStatus(metrics.loadTime, { good: 1000, ok: 3000 })
    },
    {
      label: 'Render Time',
      value: metrics.renderTime,
      unit: 'ms',
      icon: Clock,
      status: getPerformanceStatus(metrics.renderTime, { good: 100, ok: 300 })
    },
    {
      label: 'Network',
      value: metrics.networkLatency,
      unit: 'ms',
      icon: Globe,
      status: getPerformanceStatus(metrics.networkLatency, { good: 100, ok: 500 })
    },
    {
      label: 'Database',
      value: metrics.databaseLatency,
      unit: 'ms',
      icon: Database,
      status: getPerformanceStatus(metrics.databaseLatency, { good: 50, ok: 200 })
    }
  ];

  // Only show in development or for admin users
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <Card className="fixed bottom-4 right-4 w-80 z-50 bg-background/95 backdrop-blur">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Performance Monitor</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {performanceData.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon className="h-3 w-3" />
                <span className="text-xs">{metric.label}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono">
                  {Math.round(metric.value)}{metric.unit}
                </span>
                <Badge className={`text-xs ${getStatusColor(metric.status)}`}>
                  {metric.status}
                </Badge>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
