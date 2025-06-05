
import React from 'react';
import { useAuth } from '@/contexts/auth';
import { ProjectOwnerDashboard } from './enhanced/ProjectOwnerDashboard';
import { AuditorDashboard } from './enhanced/AuditorDashboard';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { LoadingDashboard } from './LoadingDashboard';
import { UnauthenticatedDashboard } from './UnauthenticatedDashboard';

export const DashboardRouter = () => {
  const { user, getUserType, loading } = useAuth();

  if (loading) {
    return <LoadingDashboard />;
  }

  if (!user) {
    return <UnauthenticatedDashboard />;
  }

  const userType = getUserType();

  switch (userType) {
    case 'project_owner':
      return <ProjectOwnerDashboard />;
    case 'auditor':
      return <AuditorDashboard />;
    case 'admin':
      return <AdminDashboard />;
    default:
      return <ProjectOwnerDashboard />;
  }
};
