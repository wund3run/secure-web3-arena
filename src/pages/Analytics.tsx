
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { EnhancedAnalyticsDashboard } from '@/components/analytics/EnhancedAnalyticsDashboard';

export default function Analytics() {
  return (
    <StandardLayout
      title="Analytics - Hawkly"
      description="Advanced analytics and insights for security auditing"
    >
      <Helmet>
        <title>Analytics Dashboard - Hawkly</title>
        <meta name="description" content="Comprehensive analytics dashboard with AI-powered insights, data consistency checking, and enhanced KPI visualizations for security auditing" />
      </Helmet>

      <div className="container py-8 max-w-7xl">
        <EnhancedAnalyticsDashboard />
      </div>
    </StandardLayout>
  );
}
