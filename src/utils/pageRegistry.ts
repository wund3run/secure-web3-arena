
/**
 * Centralized page registry for better organization and management
 * Cleaned up to include only active, functioning pages
 */

export interface PageInfo {
  path: string;
  name: string;
  category: 'core' | 'service' | 'resource' | 'community' | 'business' | 'legacy';
  isPrimary: boolean;
  redirectsTo?: string;
  description: string;
  keywords: string[];
}

export const PAGE_REGISTRY: PageInfo[] = [
  // Core Pages (Primary - Enhanced Versions)
  {
    path: '/',
    name: 'Home',
    category: 'core',
    isPrimary: true,
    description: 'Hawkly Web3 Security Marketplace Homepage',
    keywords: ['web3', 'security', 'marketplace', 'audits']
  },
  {
    path: '/marketplace',
    name: 'Marketplace',
    category: 'core',
    isPrimary: true,
    description: 'Browse security services and auditors',
    keywords: ['marketplace', 'auditors', 'services', 'security']
  },
  {
    path: '/auth',
    name: 'Authentication',
    category: 'core',
    isPrimary: true,
    description: 'Sign in or create an account',
    keywords: ['login', 'signup', 'authentication']
  },
  {
    path: '/request-audit',
    name: 'Request Audit',
    category: 'core',
    isPrimary: true,
    description: 'Submit your project for security audit',
    keywords: ['audit', 'request', 'security', 'review']
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    category: 'core',
    isPrimary: true,
    description: 'Unified user dashboard',
    keywords: ['dashboard', 'account', 'management']
  },
  {
    path: '/audits',
    name: 'Audits',
    category: 'core',
    isPrimary: true,
    description: 'View and manage your audits',
    keywords: ['audits', 'reports', 'security']
  },

  // Service Pages
  {
    path: '/security-audits',
    name: 'Security Audits',
    category: 'service',
    isPrimary: true,
    description: 'Comprehensive security audit services',
    keywords: ['security', 'audit', 'smart contract']
  },
  {
    path: '/code-reviews',
    name: 'Code Reviews',
    category: 'service',
    isPrimary: true,
    description: 'Professional code review services',
    keywords: ['code', 'review', 'analysis']
  },
  {
    path: '/penetration-testing',
    name: 'Penetration Testing',
    category: 'service',
    isPrimary: true,
    description: 'Comprehensive penetration testing services',
    keywords: ['penetration', 'testing', 'security']
  },
  {
    path: '/consulting',
    name: 'Security Consulting',
    category: 'service',
    isPrimary: true,
    description: 'Expert security consulting services',
    keywords: ['consulting', 'advisory', 'security']
  },
  {
    path: '/web3-security',
    name: 'Web3 Security',
    category: 'service',
    isPrimary: true,
    description: 'Web3 and blockchain security information',
    keywords: ['web3', 'blockchain', 'security']
  },

  // Resource Pages
  {
    path: '/resources',
    name: 'Resources',
    category: 'resource',
    isPrimary: true,
    description: 'Security guides and educational content',
    keywords: ['resources', 'guides', 'education']
  },
  {
    path: '/vulnerabilities',
    name: 'Vulnerability Database',
    category: 'resource',
    isPrimary: true,
    description: 'Database of known security vulnerabilities',
    keywords: ['vulnerabilities', 'database', 'security']
  },
  {
    path: '/ai-tools',
    name: 'AI Tools',
    category: 'resource',
    isPrimary: true,
    description: 'AI-powered security analysis tools',
    keywords: ['ai', 'tools', 'security', 'analysis']
  },
  {
    path: '/vulnerability-scanner',
    name: 'Vulnerability Scanner',
    category: 'resource',
    isPrimary: true,
    description: 'Automated vulnerability scanning tools',
    keywords: ['scanner', 'vulnerability', 'automated']
  },

  // Community Pages
  {
    path: '/community',
    name: 'Community',
    category: 'community',
    isPrimary: true,
    description: 'Join the security community',
    keywords: ['community', 'forum', 'discussion']
  },
  {
    path: '/faq',
    name: 'FAQ',
    category: 'community',
    isPrimary: true,
    description: 'Frequently asked questions',
    keywords: ['faq', 'help', 'questions']
  },
  {
    path: '/support',
    name: 'Support',
    category: 'community',
    isPrimary: true,
    description: 'Get help and support',
    keywords: ['support', 'help', 'assistance']
  },

  // Business Pages
  {
    path: '/pricing',
    name: 'Pricing',
    category: 'business',
    isPrimary: true,
    description: 'Transparent pricing for all services',
    keywords: ['pricing', 'cost', 'plans']
  },
  {
    path: '/about',
    name: 'About',
    category: 'business',
    isPrimary: true,
    description: 'Learn about Hawkly',
    keywords: ['about', 'company', 'mission']
  },
  {
    path: '/contact',
    name: 'Contact',
    category: 'business',
    isPrimary: true,
    description: 'Get in touch with us',
    keywords: ['contact', 'support', 'help']
  },
  {
    path: '/careers',
    name: 'Careers',
    category: 'business',
    isPrimary: true,
    description: 'Join our team',
    keywords: ['careers', 'jobs', 'hiring']
  },
  {
    path: '/terms',
    name: 'Terms of Service',
    category: 'business',
    isPrimary: true,
    description: 'Terms and conditions',
    keywords: ['terms', 'legal', 'conditions']
  },
  {
    path: '/privacy',
    name: 'Privacy Policy',
    category: 'business',
    isPrimary: true,
    description: 'Privacy policy and data protection',
    keywords: ['privacy', 'policy', 'data']
  },

  // User Management
  {
    path: '/profile',
    name: 'Profile',
    category: 'core',
    isPrimary: true,
    description: 'User profile management',
    keywords: ['profile', 'user', 'account']
  },
  {
    path: '/settings',
    name: 'Settings',
    category: 'core',
    isPrimary: true,
    description: 'Account settings and preferences',
    keywords: ['settings', 'preferences', 'account']
  },
  {
    path: '/service-provider-onboarding',
    name: 'Service Provider Onboarding',
    category: 'service',
    isPrimary: true,
    description: 'Onboarding for security service providers',
    keywords: ['onboarding', 'provider', 'auditor']
  },

  // Legacy redirects (for backward compatibility)
  {
    path: '/legacy-marketplace',
    name: 'Legacy Marketplace',
    category: 'legacy',
    isPrimary: false,
    redirectsTo: '/marketplace',
    description: 'Legacy marketplace page',
    keywords: ['legacy']
  },
  {
    path: '/legacy-auth',
    name: 'Legacy Auth',
    category: 'legacy',
    isPrimary: false,
    redirectsTo: '/auth',
    description: 'Legacy authentication page',
    keywords: ['legacy']
  },
  {
    path: '/legacy-request-audit',
    name: 'Legacy Request Audit',
    category: 'legacy',
    isPrimary: false,
    redirectsTo: '/request-audit',
    description: 'Legacy request audit page',
    keywords: ['legacy']
  },

  // SEO aliases (redirect to main content)
  {
    path: '/security-insights',
    name: 'Security Insights',
    category: 'legacy',
    isPrimary: false,
    redirectsTo: '/vulnerabilities',
    description: 'Security insights and vulnerability data',
    keywords: ['security', 'insights']
  },
  {
    path: '/docs',
    name: 'Documentation',
    category: 'legacy',
    isPrimary: false,
    redirectsTo: '/resources',
    description: 'Platform documentation',
    keywords: ['docs', 'documentation']
  },
  {
    path: '/templates',
    name: 'Templates',
    category: 'legacy',
    isPrimary: false,
    redirectsTo: '/resources',
    description: 'Security templates and guides',
    keywords: ['templates', 'guides']
  }
];

export function getPrimaryPages(): PageInfo[] {
  return PAGE_REGISTRY.filter(page => page.isPrimary);
}

export function getLegacyPages(): PageInfo[] {
  return PAGE_REGISTRY.filter(page => page.category === 'legacy');
}

export function getPagesByCategory(category: PageInfo['category']): PageInfo[] {
  return PAGE_REGISTRY.filter(page => page.category === category);
}

export function findPageInfo(path: string): PageInfo | undefined {
  return PAGE_REGISTRY.find(page => page.path === path);
}

export function getPageRedirect(path: string): string | undefined {
  const page = findPageInfo(path);
  return page?.redirectsTo;
}
