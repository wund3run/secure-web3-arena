
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import WizardRequestForm from '@/components/audit-request/WizardRequestForm';

const AuditRequests = () => {
  return (
    <StandardLayout
      title="Audit Requests"
      description="Submit and manage your security audit requests"
    >
      <WizardRequestForm />
    </StandardLayout>
  );
};

export default AuditRequests;
