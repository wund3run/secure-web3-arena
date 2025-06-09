
/**
 * Centralized page registry for better organization and management
 */

export interface PageInfo {
  path: string;
  name: string;
  category: 'core' | 'service' | 'resource' | 'community' | 'business' | 'admin' | 'legacy';
  isPrimary: boolean;
  redirectsTo?: string;
  description: string;
  keywords: string[];
}

export const PAGE_REGISTRY: PageInfo[] = [
  // Core Pages (Primary)
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
    description: 'User dashboard and account management',
    keywords: ['dashboard', 'account', 'management']
  },

  // Service Pages
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
    path: '/forum',
    name: 'Forum',
    category: 'community',
    isPrimary: true,
    description: 'Community discussions and support',
    keywords: ['forum', 'discussion', 'community']
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

  // Legacy redirects (marked for cleanup)
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
