
import { NavigationItem } from '@/utils/auth/roleBasedRouting';

export const navigationLinks: NavigationItem[] = [
  {
    title: 'Marketplace',
    href: '/marketplace',
    description: 'Find security auditors and browse services'
  },
  {
    title: 'Audits',
    href: '/audits',
    description: 'View and manage audit requests'
  },
  {
    title: 'Services',
    href: '/services',
    description: 'Browse available security services',
    children: [
      {
        title: 'Smart Contract Audits',
        href: '/services/smart-contract',
        description: 'Comprehensive smart contract security reviews'
      },
      {
        title: 'Protocol Audits',
        href: '/services/protocol',
        description: 'Full protocol security assessments'
      },
      {
        title: 'Security Consulting',
        href: '/services/consulting',
        description: 'Expert security guidance and recommendations'
      }
    ]
  },
  {
    title: 'Resources',
    href: '/resources',
    description: 'Educational content and tools',
    children: [
      {
        title: 'Tutorials',
        href: '/tutorials',
        description: 'Learn about Web3 security best practices'
      },
      {
        title: 'Guidelines',
        href: '/guidelines',
        description: 'Platform guidelines and standards'
      },
      {
        title: 'Documentation',
        href: '/docs',
        description: 'API documentation and guides'
      }
    ]
  }
];
