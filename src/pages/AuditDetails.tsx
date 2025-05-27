
import React from 'react';
import { PlaceholderPage } from './placeholder-template';
import { FileText } from 'lucide-react';

const AuditDetails = () => {
  return (
    <PlaceholderPage
      title="Audit Details"
      description="Detailed view of security audit progress and results. This page will show audit status, findings, and reports."
      icon={FileText}
    />
  );
};

export default AuditDetails;
