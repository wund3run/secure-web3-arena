import React from 'react';
import { ComprehensivePrivacyPolicy } from '@/components/legal/ComprehensivePrivacyPolicy';
import { AppContainer } from '@/components/layout/AppContainer';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 py-12">
        <AppContainer maxWidth="max-w-6xl" padding="px-4 py-12" elevation>
          <ComprehensivePrivacyPolicy />
        </AppContainer>
      </div>
    </div>
  );
};

export default Privacy;
