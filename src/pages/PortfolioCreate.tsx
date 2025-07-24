import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import PortfolioCreationWizard from '@/components/portfolio/PortfolioCreationWizard';
import { AppContainer } from '@/components/layout/AppContainer';

export default function PortfolioCreate() {
  return (
    <StandardLayout title="Create Portfolio" description="Build your professional auditor portfolio">
      <AppContainer maxWidth="max-w-4xl" padding="px-4 py-8" elevation>
        <PortfolioCreationWizard />
      </AppContainer>
    </StandardLayout>
  );
} 