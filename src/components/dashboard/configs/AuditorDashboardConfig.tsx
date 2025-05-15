
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
    size: 'medium',
    type: 'stats',
    content: <AuditorStats />,
    colSpan: 2,
    minimizable: true
  },
  {
    id: 'earnings',
    title: 'Earnings',
    size: 'small',
    type: 'chart',
    content: <EarningsWidget />,
    minimizable: true,
    resizable: true
  },
  {
    id: 'reputation',
    title: 'Reputation & Reviews',
    size: 'small',
    type: 'stats',
    content: <ReputationWidget />,
    minimizable: true
  },
  {
    id: 'activity',
    title: 'Recent Activity',
    size: 'medium',
    type: 'activity',
    content: <ActivityLog userType="auditor" />,
    colSpan: 2,
    minimizable: true
  },
  {
    id: 'performance',
    title: 'Audit Performance',
    size: 'medium',
    type: 'chart',
    content: <AuditPerformanceWidget />,
    minimizable: true
  },
  {
    id: 'deadlines',
    title: 'Upcoming Deadlines',
    size: 'small',
    type: 'list',
    content: <UpcomingDeadlinesWidget />,
    minimizable: true
  }
];
