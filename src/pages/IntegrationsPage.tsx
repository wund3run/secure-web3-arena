
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { IntegrationDashboard } from '@/components/integrations/IntegrationDashboard';

const IntegrationsPage = () => {
  return (
    <>
      <Helmet>
        <title>Integrations | Hawkly</title>
        <meta name="description" content="Manage your Web3 SaaS platform integrations" />
      </Helmet>
      
      <StandardLayout
        title="Integrations"
        description="Connect and manage third-party services for your Web3 security platform"
      >
        <div className="container py-8">
          <IntegrationDashboard />
        </div>
      </StandardLayout>
    </>
  );
};

export default IntegrationsPage;
