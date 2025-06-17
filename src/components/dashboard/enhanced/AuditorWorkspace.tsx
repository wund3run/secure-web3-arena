
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { AuditorStats } from '../auditor/AuditorStats';
import { ActiveProjects } from '../auditor/ActiveProjects';
import { RecentActivity } from '../auditor/RecentActivity';

export function AuditorWorkspace() {
  // Mock data - in real app this would come from props or API
  const stats = {
    activeProjects: 3,
    hoursThisWeek: 32,
    pendingEarnings: '$35K',
    activeClients: 3,
  };

  const activeProjects = [
    {
      id: 1,
      name: 'DeFi Protocol Audit',
      client: 'CryptoFi Labs',
      progress: 75,
      deadline: '2024-01-25',
      priority: 'High',
      earnings: '$15,000',
      status: 'in-progress'
    },
    {
      id: 2,
      name: 'NFT Marketplace Review',
      client: 'MetaArt Studio',
      progress: 40,
      deadline: '2024-02-10',
      priority: 'Medium',
      earnings: '$8,000',
      status: 'in-progress'
    },
    {
      id: 3,
      name: 'Smart Contract Security',
      client: 'BlockVault Inc',
      progress: 90,
      deadline: '2024-01-20',
      priority: 'Critical',
      earnings: '$12,000',
      status: 'review'
    }
  ];

  const recentActivities = [
    { action: 'Completed vulnerability analysis for DeFi Protocol', time: '2 hours ago' },
    { action: 'Submitted interim report for NFT Marketplace', time: '5 hours ago' },
    { action: 'Started code review for Smart Contract Security', time: '1 day ago' },
    { action: 'Client meeting scheduled for tomorrow', time: '2 days ago' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Auditor Workspace</h2>
        <Button>
          <Calendar className="h-4 w-4 mr-2" />
          Schedule Meeting
        </Button>
      </div>

      <AuditorStats stats={stats} />
      <ActiveProjects projects={activeProjects} />
      <RecentActivity activities={recentActivities} />
    </div>
  );
}
