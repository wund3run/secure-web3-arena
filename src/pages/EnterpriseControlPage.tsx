
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { EnterpriseControlPanel } from '@/components/integrations/EnterpriseControlPanel';

const EnterpriseControlPage = () => {
  return (
    <>
      <Helmet>
        <title>Enterprise Control Panel | Hawkly</title>
        <meta name="description" content="Enterprise-grade features including compliance, identity management, and scalable deployment" />
      </Helmet>
      
      <StandardLayout
        title="Enterprise Control Panel"
        description="Advanced enterprise features for compliance, debugging, and deployment management"
      >
        <div className="container py-8">
          <EnterpriseControlPanel />
        </div>
      </StandardLayout>
    </>
  );
};

export default EnterpriseControlPage;
