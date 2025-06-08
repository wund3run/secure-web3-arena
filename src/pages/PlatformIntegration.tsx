
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { UnifiedPlatformDashboard } from '@/components/platform/UnifiedPlatformDashboard';

export default function PlatformIntegration() {
  return (
    <StandardLayout 
      title="Platform Integration - Hawkly"
      description="Unified platform dashboard with integrated monitoring, security, and optimization"
    >
      <Helmet>
        <title>Platform Integration - Hawkly</title>
        <meta name="description" content="Comprehensive platform integration and monitoring dashboard" />
      </Helmet>

      <div className="container py-8 max-w-7xl">
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Platform Integration Center</h1>
            <p className="text-muted-foreground text-lg">
              Unified view of all platform components, services, and integrations
            </p>
          </div>

          <UnifiedPlatformDashboard />
        </div>
      </div>
    </StandardLayout>
  );
}
