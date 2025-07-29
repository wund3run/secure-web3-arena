
import React from 'react';
import { ActivityLog } from '../widgets/ActivityLog';
import { SecurityScoreWidget } from '../widgets/SecurityScoreWidget';
import { VulnerabilityWidget } from '../widgets/VulnerabilityWidget';
import { AuditProgressWidget } from '../widgets/AuditProgressWidget';
import { ProjectsWidget } from '../widgets/ProjectsWidget';
import { ProjectOwnerStats } from '../widgets/ProjectOwnerStats';

export const ProjectOwnerDashboardConfig = [
  {
    id: 'project-stats',
    title: 'Project Overview',
    size: 'medium' as const,
    type: 'stats',
    content: <ProjectOwnerStats />,
    colSpan: 2,
    minimizable: true
  },
  {
    id: 'security-score',
    title: 'Security Score',
    size: 'small' as const,
    type: 'score',
    content: <SecurityScoreWidget />,
    minimizable: true
  },
  {
    id: 'vulnerabilities',
    title: 'Vulnerability Breakdown',
    size: 'small' as const,
    type: 'chart',
    content: <VulnerabilityWidget />,
    minimizable: true
  },
  {
    id: 'audit-progress',
    title: 'Audit Progress',
    size: 'medium' as const,
    type: 'progress',
    content: <AuditProgressWidget />,
    colSpan: 2,
    minimizable: true
  },
  {
    id: 'projects',
    title: 'Projects Status',
    size: 'medium' as const,
    type: 'list',
    content: <ProjectsWidget />,
    minimizable: true
  },
  {
    id: 'activity',
    title: 'Recent Activity',
    size: 'small' as const,
    type: 'activity',
    content: <ActivityLog userType="project_owner" />,
    minimizable: true
  }
];
