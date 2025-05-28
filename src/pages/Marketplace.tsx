
import React from 'react';
import { PlaceholderPage } from './placeholder-template';
import { Store } from 'lucide-react';

const Marketplace = () => {
  return (
    <PlaceholderPage
      title="Security Marketplace"
      description="Browse and connect with verified security auditors and experts for your Web3 projects."
      icon={<Store className="h-6 w-6" />}
      features={[
        "Verified auditors",
        "Expert matching",
        "Transparent pricing",
        "Quality guarantees"
      ]}
    />
  );
};

export default Marketplace;
