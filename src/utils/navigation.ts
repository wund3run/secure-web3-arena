
/**
 * Utility functions for navigation and route handling
 */

export function getFallbackRoute(attemptedPath: string): string {
  // Enhanced route mappings including competitive positioning and distribution strategy
  const routeMappings: Record<string, string> = {
    '/dashboard': '/auth',
    '/profile': '/dashboard',
    '/settings': '/dashboard',
    '/admin': '/dashboard',
    '/auditor': '/service-provider-onboarding',
    '/audit': '/audits',
    '/security': '/marketplace',
    '/help': '/support',
    '/documentation': '/docs',
    '/guide': '/docs',
    '/api': '/docs',
    '/tools': '/ai-tools',
    '/cost': '/pricing',
    '/price': '/pricing',
    '/contact-us': '/contact',
    '/reach-out': '/contact',
    '/questions': '/faq',
    '/template': '/templates',
    '/resource': '/resources',
    '/compare': '/competitive-advantages',
    '/comparison': '/competitive-advantages',
    '/vs': '/competitive-advantages',
    '/competitors': '/competitive-advantages',
    '/advantages': '/competitive-advantages',
    '/coverage': '/comprehensive-security',
    '/services': '/comprehensive-security',
    '/features': '/',
    '/platform': '/',
    '/technology': '/docs',
    '/distribution': '/distribution-strategy',
    '/growth': '/distribution-strategy',
    '/scale': '/distribution-strategy',
    '/partnerships': '/distribution-strategy',
    '/expansion': '/distribution-strategy',
    '/strategy': '/distribution-strategy'
  };

  // Check for exact matches first
  if (routeMappings[attemptedPath]) {
    return routeMappings[attemptedPath];
  }

  // Check for partial matches
  for (const [pattern, suggestion] of Object.entries(routeMappings)) {
    if (attemptedPath.includes(pattern) || pattern.includes(attemptedPath.slice(1))) {
      return suggestion;
    }
  }

  // Default fallback
  return '/';
}

export function getPageMetadata(path: string) {
  const metadata: Record<string, { title: string; description: string }> = {
    '/': {
      title: 'Web3 Security Marketplace',
      description: 'Connect with top security auditors and protect your blockchain project.'
    },
    '/marketplace': {
      title: 'Security Marketplace',
      description: 'Find verified security auditors for your Web3 project.'
    },
    '/audits': {
      title: 'Security Audits',
      description: 'Browse completed and ongoing security audits.'
    },
    '/docs': {
      title: 'Documentation',
      description: 'Comprehensive guides and API documentation.'
    },
    '/pricing': {
      title: 'Pricing',
      description: 'Transparent pricing for Web3 security services.'
    },
    '/contact': {
      title: 'Contact Us',
      description: 'Get in touch with our security experts.'
    },
    '/support': {
      title: 'Support Center',
      description: 'Find help and support resources.'
    },
    '/competitive-advantages': {
      title: 'Why Choose Hawkly',
      description: 'See how Hawkly compares to traditional security audit services.'
    },
    '/comprehensive-security': {
      title: 'Complete Security Coverage',
      description: 'End-to-end security solutions for every layer of your Web3 application.'
    },
    '/audit-guidelines': {
      title: 'Security Audit Guidelines',
      description: 'Professional standards and best practices for security audits.'
    },
    '/blog': {
      title: 'Security Blog',
      description: 'Latest insights, trends, and best practices in Web3 security.'
    },
    '/vulnerabilities': {
      title: 'Vulnerability Database',
      description: 'Comprehensive database of Web3 security vulnerabilities.'
    },
    '/security-insights': {
      title: 'Security Insights',
      description: 'Latest trends, vulnerabilities, and security insights for Web3 projects.'
    },
    '/forum': {
      title: 'Security Forum',
      description: 'Community discussions about Web3 security and best practices.'
    },
    '/events': {
      title: 'Security Events',
      description: 'Upcoming and past Web3 security events and workshops.'
    },
    '/challenges': {
      title: 'Security Challenges',
      description: 'Test your skills with hands-on security challenges.'
    },
    '/leaderboard': {
      title: 'Security Leaderboard',
      description: 'Top-performing security auditors and projects.'
    },
    '/achievements': {
      title: 'Achievements',
      description: 'Track your progress and unlock achievements.'
    },
    '/terms': {
      title: 'Terms of Service',
      description: 'Terms and conditions for using Hawkly.'
    },
    '/privacy': {
      title: 'Privacy Policy',
      description: 'Privacy policy for the Hawkly platform.'
    },
    '/security-policy': {
      title: 'Security Policy',
      description: 'Security policy for the Hawkly platform.'
    }
  };

  return metadata[path] || {
    title: 'Hawkly',
    description: 'Web3 Security Marketplace'
  };
}

/**
 * Extract all routes from the App.tsx routing configuration
 * @returns Array of route paths defined in the application
 */
export function extractRoutesFromApp(): string[] {
  // Define all the routes that exist in the App.tsx file
  const routes = [
    '/',
    '/auth',
    '/marketplace',
    '/request-audit',
    '/service-provider-onboarding',
    '/pricing',
    '/audits',
    '/audit/:id',
    '/escrow',
    '/docs',
    '/web3-security',
    '/guides',
    '/tutorials',
    '/knowledge-base',
    '/faq',
    '/security-insights',
    '/vulnerabilities',
    '/templates',
    '/ai-tools',
    '/platform-report',
    '/forum',
    '/events',
    '/challenges',
    '/leaderboard',
    '/blog',
    '/achievements',
    '/dashboard',
    '/dashboard/user',
    '/dashboard/auditor',
    '/dashboard/project',
    '/dashboard/analytics',
    '/submit-service',
    '/calendar',
    '/contact-provider/:id',
    '/admin',
    '/admin/dashboard',
    '/admin/users',
    '/admin/providers',
    '/admin/audits',
    '/admin/reports',
    '/admin/services',
    '/admin/disputes',
    '/admin/security',
    '/admin/finance',
    '/admin/settings',
    '/contact',
    '/support',
    '/terms',
    '/privacy',
    '/security-policy',
    '/resources',
    '/community',
    '/competitive-advantages',
    '/comprehensive-security',
    '/audit-guidelines',
    '/distribution-strategy',
    '/for-project-owners',
    '/for-auditors',
    '/for-enterprises',
    '/for-developers'
  ];

  return routes;
}

export function routeExists(route: string): boolean {
  const validRoutes = extractRoutesFromApp();
  
  // Check for exact matches first
  if (validRoutes.includes(route)) {
    return true;
  }
  
  // Check for dynamic route patterns
  const dynamicRoutes = validRoutes.filter(r => r.includes(':'));
  for (const dynamicRoute of dynamicRoutes) {
    const pattern = dynamicRoute.replace(/:[^/]+/g, '[^/]+');
    const regex = new RegExp(`^${pattern}$`);
    if (regex.test(route)) {
      return true;
    }
  }
  
  return false;
}

/**
 * Check if a navigation path should be considered valid
 */
export function isValidNavigationPath(path: string): boolean {
  // Skip external links and anchors
  if (path.startsWith('http') || path.startsWith('#') || path === '') {
    return true;
  }

  return routeExists(path);
}

/**
 * Get the current route category for styling purposes
 */
export function getRouteCategory(path: string): string {
  if (path.startsWith('/admin')) return 'admin';
  if (path.startsWith('/dashboard')) return 'dashboard';
  if (path.startsWith('/audit')) return 'audit';
  if (['/marketplace', '/request-audit', '/service-provider-onboarding', '/pricing'].includes(path)) return 'marketplace';
  if (['/docs', '/web3-security', '/guides', '/tutorials', '/knowledge-base', '/faq'].includes(path)) return 'resources';
  if (['/forum', '/events', '/challenges', '/leaderboard', '/blog'].includes(path)) return 'community';
  if (['/ai-tools', '/platform-report', '/templates'].includes(path)) return 'tools';
  return 'general';
}
