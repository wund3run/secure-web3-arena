
import React from 'react';
import { ActivityLog } from '../widgets/ActivityLog';
import { AuditPerformanceWidget } from '../widgets/AuditPerformanceWidget';
import { EarningsWidget } from '../widgets/EarningsWidget';
import { UpcomingDeadlinesWidget } from '../widgets/UpcomingDeadlinesWidget';
import { ReputationWidget } from '../widgets/ReputationWidget';
import { AuditorStats } from '../widgets/AuditorStats';

export const AuditorDashboardConfig = [
  {
    id: 'auditor-stats',
    title: 'Performance Overview',
    size: 'medium' as const,
    type: 'stats',
    content: <AuditorStats />,
    colSpan: 2,
    minimizable: true
  },
  {
    id: 'earnings',
    title: 'Earnings',
    size: 'small' as const,
    type: 'chart',
    content: <EarningsWidget />,
    minimizable: true,
    resizable: true
  },
  {
    id: 'reputation',
    title: 'Reputation & Reviews',
    size: 'small' as const,
    type: 'stats',
    content: <ReputationWidget />,
    minimizable: true
  },
  {
    id: 'activity',
    title: 'Recent Activity',
    size: 'medium' as const,
    type: 'activity',
    content: <ActivityLog userType="auditor" />,
    colSpan: 2,
    minimizable: true
  },
  {
    id: 'performance',
    title: 'Audit Performance',
    size: 'medium' as const,
    type: 'chart',
    content: <AuditPerformanceWidget />,
    minimizable: true
  },
  {
    id: 'deadlines',
    title: 'Upcoming Deadlines',
    size: 'small' as const,
    type: 'list',
    content: <UpcomingDeadlinesWidget />,
    minimizable: true
  }
];
