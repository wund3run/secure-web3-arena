
import React from 'react';
import { EnhancedDashboardLayout } from '../enhanced-dashboard-layout';

export function ProjectOwnerDashboard() {
  // Mock data - replace with real data from your API
  const stats = {
    totalProjects: 12,
    activeAudits: 3,
    completedAudits: 9,
    securityScore: 87,
  };

  const recentActivity = [
    {
      title: 'Audit Report Received',
      description: 'DeFi Protocol audit completed by John Smith',
      timestamp: '2 hours ago'
    },
    {
      title: 'New Proposal',
      description: 'Alice Johnson submitted a proposal for your NFT project',
      timestamp: '5 hours ago'
    },
    {
      title: 'Milestone Completed',
      description: 'Smart contract review phase finished',
      timestamp: '1 day ago'
    }
  ];

  return (
    <EnhancedDashboardLayout
      userType="project_owner"
      stats={stats}
      recentActivity={recentActivity}
    />
  );
}
