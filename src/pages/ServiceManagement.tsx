
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { ServiceManagementDashboard } from '@/components/marketplace/enhanced-service-management/ServiceManagementDashboard';
import { useAuth } from '@/contexts/auth';
import { Navigate } from 'react-router-dom';

const ServiceManagement = () => {
  const { userProfile, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  // Only auditors can access service management
  if (!userProfile || userProfile.user_type !== 'auditor') {
    return <Navigate to="/marketplace" replace />;
  }

  return (
    <StandardLayout
      title="Service Management"
      description="Manage your security audit services and track performance"
    >
      <ServiceManagementDashboard />
    </StandardLayout>
  );
};

export default ServiceManagement;
