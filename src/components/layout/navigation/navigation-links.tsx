
import { 
  Home, 
  Search, 
  FileText, 
  MessageSquare, 
  Shield, 
  Settings, 
  CreditCard,
  BookOpen,
  Users,
  GraduationCap,
  Bot,
  TrendingUp
} from 'lucide-react';

export interface NavigationItem {
  title: string;
  href: string;
  icon?: React.ComponentType<any>;
  description?: string;
  badge?: string;
  children?: NavigationItem[];
}

// Main navigation items for authenticated users
export const navigationItems: NavigationItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: Home,
    description: 'Overview of your activities'
  },
  {
    title: 'Marketplace',
    href: '/marketplace',
    icon: Search,
    description: 'Find security audit services'
  },
  {
    title: 'Audit Requests',
    href: '/audit-requests',
    icon: FileText,
    description: 'Submit and manage audit requests'
  },
  {
    title: 'Messages',
    href: '/messages',
    icon: MessageSquare,
    description: 'Communicate with auditors'
  }
];

// Phase 3: Content & Community navigation items
export const communityNavigationItems: NavigationItem[] = [
  {
    title: 'Knowledge Base',
    href: '/knowledge-base',
    icon: BookOpen,
    description: 'Comprehensive security guides'
  },
  {
    title: 'Community Forum',
    href: '/forum',
    icon: Users,
    description: 'Connect with security experts'
  },
  {
    title: 'Tutorials',
    href: '/tutorials',
    icon: GraduationCap,
    description: 'Learn through video tutorials'
  },
  {
    title: 'AI Tools',
    href: '/ai-tools',
    icon: Bot,
    description: 'Automated security analysis',
    badge: 'New'
  }
];

// Auditor-specific navigation items
export const auditorNavigationItems: NavigationItem[] = [
  {
    title: 'Service Management',
    href: '/service-management',
    icon: TrendingUp,
    description: 'Manage your audit services'
  }
];

// Settings and account navigation items
export const accountNavigationItems: NavigationItem[] = [
  {
    title: 'Profile',
    href: '/profile',
    icon: Shield,
    description: 'Manage your profile'
  },
  {
    title: 'Billing',
    href: '/billing',
    icon: CreditCard,
    description: 'Billing and payments'
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
    description: 'Account preferences'
  }
];

// Public navigation items for non-authenticated users
export const publicNavigationItems: NavigationItem[] = [
  {
    title: 'Home',
    href: '/',
    icon: Home
  },
  {
    title: 'Marketplace',
    href: '/marketplace',
    icon: Search
  },
  {
    title: 'Knowledge Base',
    href: '/knowledge-base',
    icon: BookOpen
  },
  {
    title: 'Community',
    href: '/forum',
    icon: Users
  },
  {
    title: 'Tutorials',
    href: '/tutorials',
    icon: GraduationCap
  }
];

// Combined navigation structure for authenticated users
export const mainNavigation = {
  main: navigationItems,
  community: communityNavigationItems,
  auditor: auditorNavigationItems,
  account: accountNavigationItems
};
