
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PerformanceMonitor } from '@/components/performance/PerformanceMonitor';
import { CacheManager } from '@/components/caching/CacheManager';
import { SystemHealthDashboard } from '@/components/monitoring/SystemHealthDashboard';
import { ResourceOptimizer } from '@/components/optimization/ResourceOptimizer';

export default function PerformanceOptimization() {
  return (
    <StandardLayout 
      title="Performance Optimization - Hawkly"
      description="Advanced performance monitoring, optimization, and system health tools"
    >
      <Helmet>
        <title>Performance Optimization - Hawkly</title>
        <meta name="description" content="Monitor and optimize platform performance with advanced tools" />
      </Helmet>

      <div className="container py-8 max-w-7xl">
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Performance Optimization</h1>
            <p className="text-muted-foreground text-lg">
              Advanced performance monitoring, caching, and optimization tools for the Hawkly platform
            </p>
          </div>

          <Tabs defaultValue="performance" className="space-y-6">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="performance">Performance Monitor</TabsTrigger>
              <TabsTrigger value="optimization">Resource Optimizer</TabsTrigger>
              <TabsTrigger value="caching">Cache Manager</TabsTrigger>
              <TabsTrigger value="health">System Health</TabsTrigger>
            </TabsList>

            <TabsContent value="performance">
              <PerformanceMonitor />
            </TabsContent>

            <TabsContent value="optimization">
              <ResourceOptimizer />
            </TabsContent>

            <TabsContent value="caching">
              <CacheManager />
            </TabsContent>

            <TabsContent value="health">
              <SystemHealthDashboard />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </StandardLayout>
  );
}
