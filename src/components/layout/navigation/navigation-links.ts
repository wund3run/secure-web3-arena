
import { Shield, Search, Users, BookOpen, HeadphonesIcon, BarChart3, Gavel, Settings, UserCheck, Building, AlertTriangle } from 'lucide-react';

export interface NavigationLink {
  title: string;
  href: string;
  icon?: any;
  description?: string;
  roles?: string[];
  children?: NavigationLink[];
}

export const navigationLinks: NavigationLink[] = [
  {
    title: 'Marketplace',
    href: '/marketplace',
    icon: Search,
    description: 'Find security services',
    children: [
      { title: 'Browse Services', href: '/marketplace', description: 'Explore available security services' },
      { title: 'Service Providers', href: '/service-provider-onboarding', description: 'Join as a service provider' },
      { title: 'Submit Service', href: '/submit-service', description: 'List your security service' },
    ]
  },
  {
    title: 'Security Services',
    href: '/security-services',
    icon: Shield,
    description: 'Security-as-a-Service platform',
    children: [
      { title: 'Continuous Monitoring', href: '/security-services?tab=monitoring', description: 'Real-time security monitoring' },
      { title: 'Threat Intelligence', href: '/security-services?tab=monitoring', description: 'Advanced threat detection' },
      { title: 'Certifications', href: '/security-services?tab=certifications', description: 'Professional certifications' },
      { title: 'Compliance', href: '/security-services?tab=analytics', description: 'Regulatory compliance tools' },
    ]
  },
  {
    title: 'Audits',
    href: '/audits',
    icon: Shield,
    description: 'Security audit services',
    children: [
      { title: 'Browse Audits', href: '/audits', description: 'View completed audits' },
      { title: 'Request Audit', href: '/request-audit', description: 'Submit audit request' },
      { title: 'AI Matching', href: '/ai-matching-hub', description: 'AI-powered auditor matching' },
    ]
  },
  {
    title: 'Resources',
    href: '/resources',
    icon: BookOpen,
    description: 'Learning and guides',
    children: [
      { title: 'Security Guides', href: '/security-guides', description: 'Security best practices' },
      { title: 'Guidelines', href: '/audit-guidelines', description: 'Audit standards and procedures' },
      { title: 'Knowledge Base', href: '/knowledge-base', description: 'Comprehensive documentation' },
      { title: 'Tutorials', href: '/tutorials', description: 'Step-by-step tutorials' },
    ]
  },
  {
    title: 'Community',
    href: '/community',
    icon: Users,
    description: 'Connect with peers',
    children: [
      { title: 'Forum', href: '/forum', description: 'Community discussions' },
      { title: 'Leaderboard', href: '/leaderboard', description: 'Top performers' },
      { title: 'Events', href: '/events', description: 'Upcoming events' },
    ]
  },
];

// Role-specific navigation for authenticated users
export const getNavigationForRole = (role: string): NavigationLink[] => {
  const baseLinks = [...navigationLinks];
  
  switch (role) {
    case 'admin':
      baseLinks.push({
        title: 'Admin',
        href: '/admin',
        icon: Settings,
        description: 'Platform management',
        roles: ['admin'],
        children: [
          { title: 'Dashboard', href: '/admin', description: 'Admin overview' },
          { title: 'Users', href: '/admin/users', description: 'User management' },
          { title: 'Audits', href: '/admin/audits', description: 'Audit management' },
          { title: 'Services', href: '/admin/services', description: 'Service management' },
          { title: 'Reports', href: '/admin/reports', description: 'Platform reports' },
        ]
      });
      break;
      
    case 'auditor':
      baseLinks.push({
        title: 'Auditor Tools',
        href: '/auditor-dashboard',
        icon: UserCheck,
        description: 'Auditor workspace',
        roles: ['auditor'],
        children: [
          { title: 'Dashboard', href: '/auditor-dashboard', description: 'Auditor overview' },
          { title: 'Active Audits', href: '/audits?status=active', description: 'Current audits' },
          { title: 'AI Tools', href: '/ai-tools', description: 'AI-powered tools' },
        ]
      });
      break;
      
    case 'project_owner':
      baseLinks.push({
        title: 'Project Tools',
        href: '/project-dashboard',
        icon: Building,
        description: 'Project management',
        roles: ['project_owner'],
        children: [
          { title: 'Dashboard', href: '/project-dashboard', description: 'Project overview' },
          { title: 'My Projects', href: '/dashboard?tab=projects', description: 'Project list' },
          { title: 'Request Audit', href: '/request-audit', description: 'New audit request' },
        ]
      });
      break;
  }
  
  return baseLinks;
};
