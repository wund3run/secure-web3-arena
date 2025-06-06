
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { SecurityMonitoringDashboard } from '@/components/integrations/SecurityMonitoringDashboard';

const SecurityMonitoringPage = () => {
  return (
    <>
      <Helmet>
        <title>Security Monitoring | Hawkly</title>
        <meta name="description" content="Continuous security monitoring with Forta, OpenZeppelin Defender, and automated scanning" />
      </Helmet>
      
      <StandardLayout
        title="Security Monitoring"
        description="Multi-layer security monitoring and threat detection for Web3 applications"
      >
        <div className="container py-8">
          <SecurityMonitoringDashboard />
        </div>
      </StandardLayout>
    </>
  );
};

export default SecurityMonitoringPage;
