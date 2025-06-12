
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { AdvancedAnalyticsDashboard } from '@/components/analytics/AdvancedAnalyticsDashboard';

export default function Analytics() {
  return (
    <>
      <Helmet>
        <title>Advanced Analytics | Hawkly</title>
        <meta name="description" content="Advanced analytics dashboard with AI-powered insights, gamification tracking, and comprehensive reporting for the Hawkly security platform." />
      </Helmet>

      <StandardLayout
        title="Advanced Analytics Dashboard"
        description="Comprehensive insights and gamification tracking"
      >
        <div className="container py-8 max-w-7xl">
          <AdvancedAnalyticsDashboard />
        </div>
      </StandardLayout>
    </>
  );
}
