
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { ComprehensivePlatformReview } from '@/components/platform/comprehensive-platform-review';

const PlatformReview = () => {
  return (
    <StandardLayout
      title="Platform Review"
      description="Comprehensive platform review for launch readiness"
      className="container py-8"
    >
      <ComprehensivePlatformReview />
    </StandardLayout>
  );
};

export default PlatformReview;
