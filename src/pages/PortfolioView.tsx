import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import PortfolioShowcase from '@/components/portfolio/PortfolioShowcase';

export default function PortfolioView() {
  return (
    <StandardLayout title="Auditor Portfolio" description="Professional security auditor portfolio">
      <div className="container mx-auto px-4 py-8">
        <PortfolioShowcase />
      </div>
    </StandardLayout>
  );
} 