import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { AuditPreparationDashboard } from '@/components/audit-preparation/AuditPreparationDashboard';

const AuditPreparation = () => {
  return (
    <StandardLayout
      title="Audit Preparation"
      description="Prepare for your upcoming security audit with our comprehensive checklist and tools"
    >
      <div className="container py-8">
        <AuditPreparationDashboard />
      </div>
    </StandardLayout>
  );
};

export default AuditPreparation; 