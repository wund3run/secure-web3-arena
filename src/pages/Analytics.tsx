
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { AdvancedAnalyticsDashboard } from '@/components/analytics/AdvancedAnalyticsDashboard';

export default function Analytics() {
  return (
    <StandardLayout 
      title="Analytics Center - Hawkly"
      description="Comprehensive analytics, insights, and intelligence dashboard"
    >
      <Helmet>
        <title>Analytics Center - Hawkly</title>
        <meta name="description" content="Advanced analytics and intelligence dashboard with AI-powered insights" />
      </Helmet>

      <div className="container py-8 max-w-7xl">
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Analytics Center</h1>
            <p className="text-muted-foreground text-lg">
              Comprehensive analytics, AI-powered insights, and predictive intelligence
            </p>
          </div>

          <AdvancedAnalyticsDashboard />
        </div>
      </div>
    </StandardLayout>
  );
}
