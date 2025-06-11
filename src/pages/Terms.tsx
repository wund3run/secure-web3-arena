
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { ServiceTerms } from '@/components/legal/ServiceTerms';

export default function Terms() {
  return (
    <StandardLayout
      title="Terms of Service | Hawkly"
      description="Comprehensive service terms, payment policies, and dispute resolution procedures"
    >
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <ServiceTerms />
      </div>
    </StandardLayout>
  );
}
