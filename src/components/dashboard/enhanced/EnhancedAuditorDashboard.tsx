
import React from 'react';
import { EnhancedDashboardLayout } from '../enhanced-dashboard-layout';

export function EnhancedAuditorDashboard() {
  // Mock data - replace with real data from your API
  const stats = {
    totalProjects: 8,
    activeAudits: 2,
    completedAudits: 6,
    totalEarnings: 45000,
    responseTime: '< 12h',
    securityScore: 92, // Profile completion score
  };

  const recentActivity = [
    {
      title: 'New Project Available',
      description: 'DeFi lending protocol needs security audit',
      timestamp: '1 hour ago'
    },
    {
      title: 'Payment Received',
      description: '$8,500 for completed smart contract audit',
      timestamp: '3 hours ago'
    },
    {
      title: 'Client Feedback',
      description: '5-star review from TokenSwap project',
      timestamp: '6 hours ago'
    }
  ];

  return (
    <EnhancedDashboardLayout
      userType="auditor"
      stats={stats}
      recentActivity={recentActivity}
    />
  );
}
