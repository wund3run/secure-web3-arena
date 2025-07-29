
import React from 'react';
import { PlaceholderPage } from './placeholder-template';
import { Send } from 'lucide-react';

const AuditRequestForService = () => {
  return (
    <PlaceholderPage
      title="Request Audit for Service"
      description="Submit a specific audit request for a selected security service provider."
      icon={<Send className="h-6 w-6" />}
      features={[
        "Service-specific requests",
        "Direct provider contact",
        "Custom requirements",
        "Streamlined process"
      ]}
    />
  );
};

export default AuditRequestForService;
