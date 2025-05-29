
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AdvancedPlatformMonitoring } from '@/components/platform/AdvancedPlatformMonitoring';
import { ScalabilityOptimization } from '@/components/platform/ScalabilityOptimization';
import { AdvancedSecurityAudit } from '@/components/platform/AdvancedSecurityAudit';
import { PlatformAuditSystem } from '@/components/platform/platform-audit-system';
import { ProductionReadinessAssessment } from '@/components/production-readiness/ProductionReadinessAssessment';

export default function PlatformOptimization() {
  return (
    <StandardLayout 
      title="Platform Optimization - Hawkly"
      description="Advanced platform monitoring, security auditing, and optimization tools"
    >
      <Helmet>
        <title>Platform Optimization - Hawkly</title>
        <meta name="description" content="Comprehensive platform optimization and monitoring dashboard" />
      </Helmet>

      <div className="container py-8 max-w-7xl">
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Platform Optimization</h1>
            <p className="text-muted-foreground text-lg">
              Long-term strategic improvements and advanced monitoring for the Hawkly platform
            </p>
          </div>

          <Tabs defaultValue="monitoring" className="space-y-6">
            <TabsList className="grid grid-cols-5 w-full">
              <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
              <TabsTrigger value="scalability">Scalability</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="audit">Platform Audit</TabsTrigger>
              <TabsTrigger value="readiness">Production Readiness</TabsTrigger>
            </TabsList>

            <TabsContent value="monitoring">
              <AdvancedPlatformMonitoring />
            </TabsContent>

            <TabsContent value="scalability">
              <ScalabilityOptimization />
            </TabsContent>

            <TabsContent value="security">
              <AdvancedSecurityAudit />
            </TabsContent>

            <TabsContent value="audit">
              <PlatformAuditSystem />
            </TabsContent>

            <TabsContent value="readiness">
              <ProductionReadinessAssessment />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </StandardLayout>
  );
}
