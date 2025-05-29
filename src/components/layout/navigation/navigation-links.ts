
import { Shield, Search, Users, BookOpen, HeadphonesIcon, BarChart3, Gavel, Settings, UserCheck, Building, AlertTriangle } from 'lucide-react';

export interface NavigationLink {
  name: string;
  href: string;
  icon?: any;
  description?: string;
  roles?: string[];
  submenu?: NavigationLink[];
}

export const navigationLinks: NavigationLink[] = [
  {
    name: 'Marketplace',
    href: '/marketplace',
    icon: Search,
    description: 'Find security services',
    submenu: [
      { name: 'Browse Services', href: '/marketplace' },
      { name: 'Service Providers', href: '/service-provider-onboarding' },
      { name: 'Submit Service', href: '/submit-service' },
    ]
  },
  {
    name: 'Security Services',
    href: '/security-services',
    icon: Shield,
    description: 'Security-as-a-Service platform',
    submenu: [
      { name: 'Continuous Monitoring', href: '/security-services?tab=monitoring' },
      { name: 'Threat Intelligence', href: '/security-services?tab=monitoring' },
      { name: 'Certifications', href: '/security-services?tab=certifications' },
      { name: 'Compliance', href: '/security-services?tab=analytics' },
    ]
  },
  {
    name: 'Audits',
    href: '/audits',
    icon: Shield,
    description: 'Security audit services',
    submenu: [
      { name: 'Browse Audits', href: '/audits' },
      { name: 'Request Audit', href: '/request-audit' },
      { name: 'AI Matching', href: '/ai-matching-hub' },
    ]
  },
  {
    name: 'Resources',
    href: '/resources',
    icon: BookOpen,
    description: 'Learning and guides',
    submenu: [
      { name: 'Security Guides', href: '/security-guides' },
      { name: 'Guidelines', href: '/audit-guidelines' },
      { name: 'Knowledge Base', href: '/knowledge-base' },
      { name: 'Tutorials', href: '/tutorials' },
    ]
  },
  {
    name: 'Community',
    href: '/community',
    icon: Users,
    description: 'Connect with peers',
    submenu: [
      { name: 'Forum', href: '/forum' },
      { name: 'Leaderboard', href: '/leaderboard' },
      { name: 'Events', href: '/events' },
    ]
  },
];

// Role-specific navigation for authenticated users
export const getNavigationForRole = (role: string): NavigationLink[] => {
  const baseLinks = [...navigationLinks];
  
  switch (role) {
    case 'admin':
      baseLinks.push({
        name: 'Admin',
        href: '/admin',
        icon: Settings,
        description: 'Platform management',
        roles: ['admin'],
        submenu: [
          { name: 'Dashboard', href: '/admin' },
          { name: 'Users', href: '/admin/users' },
          { name: 'Audits', href: '/admin/audits' },
          { name: 'Services', href: '/admin/services' },
          { name: 'Reports', href: '/admin/reports' },
        ]
      });
      break;
      
    case 'auditor':
      baseLinks.push({
        name: 'Auditor Tools',
        href: '/auditor-dashboard',
        icon: UserCheck,
        description: 'Auditor workspace',
        roles: ['auditor'],
        submenu: [
          { name: 'Dashboard', href: '/auditor-dashboard' },
          { name: 'Active Audits', href: '/audits?status=active' },
          { name: 'AI Tools', href: '/ai-tools' },
        ]
      });
      break;
      
    case 'project_owner':
      baseLinks.push({
        name: 'Project Tools',
        href: '/project-dashboard',
        icon: Building,
        description: 'Project management',
        roles: ['project_owner'],
        submenu: [
          { name: 'Dashboard', href: '/project-dashboard' },
          { name: 'My Projects', href: '/dashboard?tab=projects' },
          { name: 'Request Audit', href: '/request-audit' },
        ]
      });
      break;
  }
  
  return baseLinks;
};
