
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { AdvancedMatchingDashboard } from '@/components/ai-matching/AdvancedMatchingDashboard';

export default function AIMatchingHub() {
  return (
    <StandardLayout 
      title="AI Matching Hub - Hawkly"
      description="Advanced AI-powered matching algorithms and machine learning analytics"
    >
      <Helmet>
        <title>AI Matching Hub - Hawkly</title>
        <meta name="description" content="Advanced AI matching algorithms with machine learning analytics for optimal auditor-project pairing" />
      </Helmet>

      <div className="container py-8 max-w-7xl">
        <AdvancedMatchingDashboard />
      </div>
    </StandardLayout>
  );
}
