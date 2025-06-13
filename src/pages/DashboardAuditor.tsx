
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { EnhancedAuditorDashboard } from '@/components/dashboard/enhanced/EnhancedAuditorDashboard';

const DashboardAuditor = () => {
  return (
    <StandardLayout
      title="Auditor Dashboard"
      description="Your comprehensive security auditing workspace"
    >
      <div className="container py-8">
        <EnhancedAuditorDashboard />
      </div>
    </StandardLayout>
  );
};

export default DashboardAuditor;
