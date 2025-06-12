
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { AuditRequestForm } from '@/components/audit-request/AuditRequestForm';

const AuditRequests = () => {
  return (
    <StandardLayout
      title="Audit Requests"
      description="Submit and manage your security audit requests"
    >
      <AuditRequestForm />
    </StandardLayout>
  );
};

export default AuditRequests;
