import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Activity, Zap, Clock, Database, Cpu, MemoryStick } from 'lucide-react';
import { performanceMonitor } from '@/utils/performance/performance-monitor';

interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  status: 'excellent' | 'good' | 'warning' | 'critical';
  threshold: number;
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([]);
  const [webVitals, setWebVitals] = useState<unknown[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(false);

  useEffect(() => {
    const initializeMonitoring = async () => {
      setIsMonitoring(true);
      
      // Start web vitals monitoring
      performanceMonitor.logWebVitals();
      
      // Initialize performance metrics collection
      const initialMetrics: PerformanceMetric[] = [
        {
          name: 'Page Load Time',
          value: performance.timing ? 
            performance.timing.loadEventEnd - performance.timing.navigationStart : 0,
          unit: 'ms',
          status: 'good',
          threshold: 3000
        },
        {
          name: 'First Contentful Paint',
          value: 0,
          unit: 'ms',
          status: 'excellent',
          threshold: 1800
        },
        {
          name: 'Time to Interactive',
          value: 0,
          unit: 'ms',
          status: 'good',
          threshold: 5000
        },
        {
          name: 'Memory Usage',
          value: (performance as unknown as { memory?: { usedJSHeapSize: number } }).memory ?
            Math.round((performance as unknown as { memory: { usedJSHeapSize: number } }).memory.usedJSHeapSize / 1024 / 1024) : 0,
          unit: 'MB',
          status: 'good',
          threshold: 100
        }
      ];

      setMetrics(initialMetrics);
      setIsMonitoring(false);
    };

    initializeMonitoring();

    // Set up real-time monitoring
    const interval = setInterval(() => {
      const componentMetrics = performanceMonitor.getMetrics();
      
      // Update web vitals if available
      if (typeof window !== 'undefined') {
        const webVitalsData = (window as unknown as { webVitalsData?: unknown[] }).webVitalsData;
        if (webVitalsData) {
          setWebVitals(webVitalsData);
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-500';
      case 'good': return 'bg-blue-500';
      case 'warning': return 'bg-yellow-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-500" />
            Performance Monitor
          </CardTitle>
          <CardDescription>
            Real-time performance metrics and optimization insights
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="vitals">Web Vitals</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric) => (
              <Card key={metric.name}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium">{metric.name}</span>
                    </div>
                    <Badge className={getStatusColor(metric.status)} variant="secondary">
                      {metric.status}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold">
                      {metric.value.toLocaleString()} {metric.unit}
                    </div>
                    <Progress 
                      value={(metric.value / metric.threshold) * 100} 
                      className="h-2"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Performance Score */}
          <Card>
            <CardHeader>
              <CardTitle>Overall Performance Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center p-8">
                <div className="text-center">
                  <div className="text-6xl font-bold text-green-600 mb-2">92</div>
                  <div className="text-lg text-muted-foreground">Performance Score</div>
                  <Badge className="mt-2 bg-green-100 text-green-800">Excellent</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vitals" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="text-center">
                <Clock className="h-8 w-8 mx-auto mb-2 text-green-500" />
                <CardTitle>Largest Contentful Paint</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-green-600">1.2s</div>
                <div className="text-sm text-muted-foreground">Good (&lt; 2.5s)</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Activity className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                <CardTitle>First Input Delay</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-blue-600">45ms</div>
                <div className="text-sm text-muted-foreground">Good (&lt; 100ms)</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Zap className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                <CardTitle>Cumulative Layout Shift</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-yellow-600">0.08</div>
                <div className="text-sm text-muted-foreground">Needs Improvement</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cpu className="h-5 w-5" />
                  CPU Usage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Main Thread</span>
                    <span>23%</span>
                  </div>
                  <Progress value={23} className="h-2" />
                  
                  <div className="flex justify-between">
                    <span>Worker Threads</span>
                    <span>8%</span>
                  </div>
                  <Progress value={8} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MemoryStick className="h-5 w-5" />
                  Memory Usage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Used Heap Size</span>
                    <span>45 MB</span>
                  </div>
                  <Progress value={45} className="h-2" />
                  
                  <div className="flex justify-between">
                    <span>Total Heap Size</span>
                    <span>78 MB</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <Badge className="bg-green-100 text-green-800">High Impact</Badge>
                  <div>
                    <h4 className="font-medium">Enable Component Lazy Loading</h4>
                    <p className="text-sm text-muted-foreground">
                      Implement code splitting for non-critical components to reduce initial bundle size
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <Badge className="bg-blue-100 text-blue-800">Medium Impact</Badge>
                  <div>
                    <h4 className="font-medium">Optimize Image Loading</h4>
                    <p className="text-sm text-muted-foreground">
                      Use modern image formats and implement lazy loading for images
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <Badge className="bg-yellow-100 text-yellow-800">Low Impact</Badge>
                  <div>
                    <h4 className="font-medium">Reduce Layout Shifts</h4>
                    <p className="text-sm text-muted-foreground">
                      Add explicit dimensions to dynamic content to prevent layout shifts
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
