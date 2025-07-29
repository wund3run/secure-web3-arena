
import React from 'react';
import { PlaceholderPage } from './placeholder-template';
import { Info } from 'lucide-react';

const ServiceDetails = () => {
  return (
    <PlaceholderPage
      title="Service Details"
      description="Detailed information about security audit services, pricing, and provider profiles."
      icon={<Info className="h-6 w-6" />}
      features={[
        "Service specifications",
        "Provider information",
        "Pricing details",
        "Review system"
      ]}
    />
  );
};

export default ServiceDetails;
