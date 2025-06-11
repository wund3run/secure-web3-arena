
import React from 'react';
import { ProductionLayout } from '@/components/layout/ProductionLayout';
import { ComprehensivePrivacyPolicy } from '@/components/legal/ComprehensivePrivacyPolicy';

export default function Privacy() {
  return (
    <ProductionLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <ComprehensivePrivacyPolicy />
        </div>
      </div>
    </ProductionLayout>
  );
}
