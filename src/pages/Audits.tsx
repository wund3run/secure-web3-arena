
import React from 'react';
import { PlaceholderPage } from './placeholder-template';
import { FileCheck } from 'lucide-react';

const Audits = () => {
  return (
    <PlaceholderPage
      title="My Audits"
      description="Track and manage your security audits, view reports, and monitor audit progress."
      icon={<FileCheck className="h-6 w-6" />}
      features={[
        "Audit tracking",
        "Progress monitoring",
        "Report access",
        "Communication hub"
      ]}
    />
  );
};

export default Audits;
