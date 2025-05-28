
import React from 'react';
import { PlaceholderPage } from './placeholder-template';
import { FileText } from 'lucide-react';

const RequestAudit = () => {
  return (
    <PlaceholderPage
      title="Request Security Audit"
      description="Submit your Web3 project for professional security audit. Get matched with expert auditors in minutes."
      icon={<FileText className="h-6 w-6" />}
      features={[
        "Quick submission",
        "Expert matching",
        "Transparent pricing",
        "Quality reports"
      ]}
    />
  );
};

export default RequestAudit;
