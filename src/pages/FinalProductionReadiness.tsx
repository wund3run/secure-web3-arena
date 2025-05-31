
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { FinalProductionReadiness } from '@/components/production-readiness/FinalProductionReadiness';

export default function FinalProductionReadinessPage() {
  return (
    <StandardLayout
      title="Final Production Readiness - Hawkly"
      description="Complete the final 5% to achieve 100% production readiness with load testing, security audit, analytics integration, and CDN optimization."
    >
      <Helmet>
        <title>Final Production Readiness - Hawkly</title>
        <meta name="description" content="Achieve 100% production readiness with comprehensive load testing, security auditing, analytics integration, and CDN optimization." />
      </Helmet>

      <div className="container py-8 max-w-7xl">
        <FinalProductionReadiness />
      </div>
    </StandardLayout>
  );
}
