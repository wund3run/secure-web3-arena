
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlatformAnalyzer } from '@/components/analysis/PlatformAnalyzer';
import { AccessibilityValidator } from '@/components/accessibility/AccessibilityValidator';
import { PlatformHealthMonitor } from '@/components/platform/platform-health-monitor';
import { PlatformAuditSystem } from '@/components/platform/platform-audit-system';
import { EnhancedLoadingState } from '@/components/ui/enhanced-loading-state';
import { ProductionErrorBoundary } from '@/components/error/production-error-boundary';

export default function PlatformAnalysisPage() {
  return (
    <ProductionErrorBoundary>
      <div className="container mx-auto py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Platform Analysis Dashboard</h1>
          <p className="text-muted-foreground">
            Comprehensive analysis and monitoring of platform health, accessibility, and performance
          </p>
        </div>

        <Tabs defaultValue="launch-readiness" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="launch-readiness">Launch Readiness</TabsTrigger>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
            <TabsTrigger value="health">Health Monitor</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="launch-readiness">
            <PlatformAuditSystem />
          </TabsContent>

          <TabsContent value="overview">
            <PlatformAnalyzer />
          </TabsContent>

          <TabsContent value="accessibility">
            <AccessibilityValidator />
          </TabsContent>

          <TabsContent value="health">
            <PlatformHealthMonitor />
          </TabsContent>

          <TabsContent value="performance">
            <div className="grid gap-6">
              <EnhancedLoadingState 
                message="Performance analysis coming soon..." 
                variant="skeleton" 
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ProductionErrorBoundary>
  );
}
