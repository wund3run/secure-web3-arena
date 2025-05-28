
import React from 'react';
import { PlaceholderPage } from './placeholder-template';
import { Users } from 'lucide-react';

const Community = () => {
  return (
    <PlaceholderPage
      title="Security Community"
      description="Join our vibrant community of security professionals, developers, and enthusiasts working together to secure Web3."
      icon={<Users className="h-6 w-6" />}
      features={[
        "Expert discussions",
        "Knowledge sharing",
        "Networking opportunities",
        "Community events"
      ]}
    />
  );
};

export default Community;
