
import React from 'react';
import { ProductionLayout } from '@/components/layout/ProductionLayout';
import { ComprehensiveServiceTerms } from '@/components/legal/ComprehensiveServiceTerms';

export default function Terms() {
  return (
    <ProductionLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <ComprehensiveServiceTerms />
        </div>
      </div>
    </ProductionLayout>
  );
}
