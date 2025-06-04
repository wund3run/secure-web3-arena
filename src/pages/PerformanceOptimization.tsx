
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { OptimizedPerformanceMonitor } from '@/components/performance/OptimizedPerformanceMonitor';
import { performanceOptimizer } from '@/utils/performance-optimizer';
import { bundleOptimizer } from '@/utils/bundle-optimizer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Activity, Zap, Database, Image, Globe } from 'lucide-react';

export default function PerformanceOptimization() {
  const [optimizationStatus, setOptimizationStatus] = React.useState({
    codeSplitting: false,
    dbOptimization: false,
    cdnCaching: false,
    imageOptimization: false
  });

  const handleOptimize = (task: keyof typeof optimizationStatus) => {
    setOptimizationStatus(prev => ({ ...prev, [task]: true }));
    
    switch (task) {
      case 'codeSplitting':
        bundleOptimizer.intelligentPreload('/');
        break;
      case 'dbOptimization':
        // Database optimization would be handled by backend
        break;
      case 'cdnCaching':
        performanceOptimizer.preloadCriticalResources([
          '/src/assets/hawkly-logo.svg'
        ]);
        break;
      case 'imageOptimization':
        performanceOptimizer.optimizeImages();
        break;
    }
  };

  const tasks = [
    {
      id: 'codeSplitting' as const,
      title: 'Code Splitting',
      description: 'Route/module chunking with AI-identified split points',
      icon: Zap,
      deliverable: 'Route/module chunking',
      validation: 'Bundle size tracking + Lighthouse'
    },
    {
      id: 'dbOptimization' as const,
      title: 'Database Optimization',
      description: 'Indexed queries and materialized views',
      icon: Database,
      deliverable: 'Indexed queries/materialized views',
      validation: 'EXPLAIN ANALYZE reports'
    },
    {
      id: 'cdnCaching' as const,
      title: 'CDN + Caching',
      description: 'Cloudflare Workers cache rules',
      icon: Globe,
      deliverable: 'Cloudflare Workers cache rules',
      validation: 'Load-testing (k6)'
    },
    {
      id: 'imageOptimization' as const,
      title: 'Image Optimization',
      description: 'AVIF/WebP conversion pipeline',
      icon: Image,
      deliverable: 'AVIF/WebP conversion pipeline',
      validation: 'CI/CD size thresholds'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Performance Optimization | Hawkly</title>
        <meta name="description" content="Optimize application performance with code splitting, database optimization, CDN caching, and image optimization." />
      </Helmet>

      <StandardLayout 
        title="Performance Optimization" 
        description="Phase 2: Comprehensive performance optimization tools and monitoring"
      >
        <div className="space-y-6">
          {/* Performance Monitor */}
          <OptimizedPerformanceMonitor />
          
          {/* Optimization Tasks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tasks.map((task) => {
              const Icon = task.icon;
              const isOptimized = optimizationStatus[task.id];
              
              return (
                <Card key={task.id} className="relative">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Icon className="h-5 w-5" />
                        {task.title}
                      </CardTitle>
                      <Badge variant={isOptimized ? "default" : "secondary"}>
                        {isOptimized ? 'Optimized' : 'Pending'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {task.description}
                    </p>
                    
                    <div className="space-y-2">
                      <div className="text-xs">
                        <span className="font-medium">Deliverable:</span> {task.deliverable}
                      </div>
                      <div className="text-xs">
                        <span className="font-medium">Validation:</span> {task.validation}
                      </div>
                    </div>
                    
                    <Button 
                      onClick={() => handleOptimize(task.id)}
                      disabled={isOptimized}
                      className="w-full"
                      variant={isOptimized ? "outline" : "default"}
                    >
                      {isOptimized ? 'Optimized' : 'Optimize'}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Status Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Optimization Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {tasks.map((task) => (
                  <div key={task.id} className="text-center">
                    <div className={`text-2xl font-bold ${optimizationStatus[task.id] ? 'text-green-600' : 'text-muted-foreground'}`}>
                      {optimizationStatus[task.id] ? '✓' : '○'}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {task.title}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </StandardLayout>
    </>
  );
}
