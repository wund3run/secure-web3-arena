
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';

export default function BusinessPricing() {
  return (
    <StandardLayout
      title="Business Pricing | Hawkly"
      description="Enterprise security solutions and pricing"
    >
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Business Pricing</h1>
        <p className="text-muted-foreground">
          Enterprise security solutions and pricing coming soon...
        </p>
      </div>
    </StandardLayout>
  );
}
