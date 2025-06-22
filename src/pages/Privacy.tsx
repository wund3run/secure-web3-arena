
import React from 'react';
import { ComprehensivePrivacyPolicy } from '@/components/legal/ComprehensivePrivacyPolicy';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 py-12">
        <ComprehensivePrivacyPolicy />
      </div>
    </div>
  );
};

export default Privacy;
