
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserExperienceOptimizer } from '@/components/user-experience/UserExperienceOptimizer';
import { AdvancedPerformanceMonitor } from '@/components/performance/AdvancedPerformanceMonitor';

export default function UserExperience() {
  return (
    <StandardLayout 
      title="User Experience - Hawkly"
      description="Advanced user experience optimization and performance monitoring"
    >
      <Helmet>
        <title>User Experience - Hawkly</title>
        <meta name="description" content="Optimize user experience with advanced analytics and performance monitoring" />
      </Helmet>

      <div className="container py-8 max-w-7xl">
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">User Experience Center</h1>
            <p className="text-muted-foreground text-lg">
              Advanced user experience optimization, performance monitoring, and analytics
            </p>
          </div>

          <Tabs defaultValue="ux" className="space-y-6">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="ux">UX Optimization</TabsTrigger>
              <TabsTrigger value="performance">Performance Monitor</TabsTrigger>
            </TabsList>

            <TabsContent value="ux">
              <UserExperienceOptimizer />
            </TabsContent>

            <TabsContent value="performance">
              <AdvancedPerformanceMonitor />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </StandardLayout>
  );
}
