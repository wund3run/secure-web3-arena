
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { AdvancedAnalyticsDashboard } from '@/components/analytics/AdvancedAnalyticsDashboard';

export default function Analytics() {
  return (
    <>
      <Helmet>
        <title>Advanced Analytics | Hawkly</title>
        <meta name="description" content="Advanced analytics dashboard with AI-powered insights, gamification tracking, and comprehensive reporting for the Hawkly security platform." />
      </Helmet>

      <div className="container py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Advanced Analytics Dashboard</h1>
          <p className="text-muted-foreground">Comprehensive insights and gamification tracking</p>
        </div>
        <AdvancedAnalyticsDashboard />
      </div>
    </>
  );
}
