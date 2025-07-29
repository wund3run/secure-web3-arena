import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import AuditorProjectBrowser from '@/components/auditor-parameters/AuditorProjectBrowser';

const AuditorOpportunities = () => {
  return (
    <StandardLayout
      title="Audit Opportunities"
      description="Browse and apply for available security audit projects"
    >
      <div className="container py-8">
        <AuditorProjectBrowser />
      </div>
    </StandardLayout>
  );
};

export default AuditorOpportunities; 