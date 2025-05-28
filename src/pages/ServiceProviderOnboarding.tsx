
import React from 'react';
import { PlaceholderPage } from './placeholder-template';
import { UserCheck } from 'lucide-react';

const ServiceProviderOnboarding = () => {
  return (
    <PlaceholderPage
      title="Service Provider Onboarding"
      description="Join our network of security experts and offer your audit services to Web3 projects worldwide."
      icon={<UserCheck className="h-6 w-6" />}
      features={[
        "Expert verification",
        "Profile creation",
        "Skill assessment",
        "Platform training"
      ]}
    />
  );
};

export default ServiceProviderOnboarding;
