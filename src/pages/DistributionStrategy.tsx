
import React from 'react';
import { PlaceholderPage } from './placeholder-template';
import { MapPin } from 'lucide-react';

const DistributionStrategy = () => {
  return (
    <PlaceholderPage
      title="Distribution Strategy"
      description="Learn about our global distribution strategy and how we're expanding Web3 security services worldwide."
      icon={<MapPin className="h-6 w-6" />}
      features={[
        "Global reach",
        "Regional partnerships",
        "Local expertise",
        "Market expansion"
      ]}
    />
  );
};

export default DistributionStrategy;
