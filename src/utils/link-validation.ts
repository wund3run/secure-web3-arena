/**
 * Comprehensive Link Validation System for Hawkly Platform
 * Identifies and fixes broken hyperlinks in navigation, footer, and header components
 * Updated for June 2025 with accurate route mappings
 */

export interface LinkInfo {
  href: string;
  text: string;
  component: string;
  status: 'valid' | 'broken' | 'redirect' | 'missing';
  suggestedRoute?: string;
  category: 'navigation' | 'footer' | 'header' | 'content';
}

// Comprehensive route registry - all actual existing routes
export const VALID_ROUTES = new Set([
  // Core routes
  '/',
  '/auth',
  '/dashboard',
  '/marketplace',
  '/request-audit',
  '/pricing',
  '/contact',
  '/about',
  '/privacy',
  '/terms',
  '/pricing-calculator',
  '/faq',
  
  // Service routes
  '/services/security-audits',
  '/services/code-reviews',
  '/services/penetration-testing',
  '/services/consulting',
  '/security-audits',
  '/code-reviews',
  '/penetration-testing',
  '/consulting',
  
  // Resource routes
  '/resources/security-guides',
  '/resources/knowledge-base',
  '/resources/tutorials',
  '/resources/templates',
  '/resources/audit-guidelines',
  '/resources/vulnerability-database',
  '/security-guides',
  '/knowledge-base',
  '/tutorials',
  '/templates',
  '/audit-guidelines',
  '/vulnerability-database',
  '/vulnerabilities',
  '/resources',
  
  // Community routes
  '/community/forum',
  '/community/events',
  '/community/challenges',
  '/community/leaderboard',
  '/forum',
  '/events',
  '/challenges',
  '/leaderboard',
  '/community',
  
  // Tools routes
  '/tools/ai-tools',
  '/tools/security-insights',
  '/tools/vulnerability-scanner',
  '/tools/platform-reports',
  '/tools/file-management',
  '/ai-tools',
  '/security-insights',
  '/vulnerability-scanner',
  '/platform-reports',
  '/file-management',
  
  // Business routes
  '/business/careers',
  '/business/pricing',
  '/business/partners',
  '/careers',
  '/partners',
  
  // Support routes
  '/support/faq',
  '/support',
  '/support/documentation',
  '/documentation',
  
  // User routes
  '/user/profile',
  '/user/settings',
  '/profile',
  '/settings',
  
  // Other routes
  '/service-provider-onboarding',
  '/analytics',
  '/ai-analysis',
  '/ai-matching-hub',
  '/advanced-features',
  '/audit-details',
  '/calendar',
  '/collaboration',
  '/escrow',
  '/integrations',
  '/launch-readiness',
  
  // Admin routes
  '/admin',
  '/admin/users',
  '/admin/services',
  '/admin/settings',
  '/admin/security',
  '/admin/reports',
  '/admin/providers',
  '/admin/finance',
  
  // Enhanced Auditor Routes
  '/auditor/enhanced-dashboard',
  '/auditor/code-analysis',
  '/auditor/cross-chain-analysis',
  '/auditor/ai-assistant',
  '/auditor/security-analyzer',
  '/enterprise/dashboard',
  '/auditor/intelligent-workspace',
  '/learning',
  '/project-management',
  '/ai-enhanced',
  '/professional-growth'
]);

// Route mappings for broken links
export const ROUTE_MAPPINGS: Record<string, string> = {
  // Common broken patterns
  '/security-audits': '/services/security-audits',
  '/code-reviews': '/services/code-reviews',
  '/penetration-testing': '/services/penetration-testing',
  '/consulting': '/services/consulting',
  '/security-guides': '/resources/security-guides',
  '/knowledge-base': '/resources/knowledge-base',
  '/tutorials': '/resources/tutorials',
  '/templates': '/resources/templates',
  '/audit-guidelines': '/resources/audit-guidelines',
  '/vulnerability-database': '/resources/vulnerability-database',
  '/forum': '/community/forum',
  '/events': '/community/events',
  '/challenges': '/community/challenges',
  '/leaderboard': '/community/leaderboard',
  '/ai-tools': '/tools/ai-tools',
  '/security-insights': '/tools/security-insights',
  '/vulnerability-scanner': '/tools/vulnerability-scanner',
  '/platform-reports': '/tools/platform-reports',
  '/file-management': '/tools/file-management',
  '/careers': '/business/careers',
  '/partners': '/business/partners',
  '/faq': '/support/faq',
  '/documentation': '/support/documentation',
  '/profile': '/user/profile',
  '/settings': '/user/settings',
  
  // Legacy redirects
  '/legacy-marketplace': '/marketplace',
  '/legacy-auth': '/auth',
  '/legacy-request-audit': '/request-audit',
  '/enhanced-marketplace': '/marketplace',
  '/enhanced-auth': '/auth',
  '/enhanced-request-audit': '/request-audit',
  
  // SEO aliases
  '/docs': '/resources',
  '/guides': '/resources',
  '/help': '/support',
  '/contact-us': '/contact',
  '/about-us': '/about',
  '/pricing-inr': '/pricing',
  '/cost': '/pricing',
  '/price': '/pricing',
  '/security': '/marketplace',
  '/audit': '/request-audit',
  '/audits': '/dashboard',
  '/dashboard/auditor': '/auditor/enhanced-dashboard',
  '/dashboard/project': '/project-management',
  '/submit-service': '/service-provider-onboarding',
  '/security-policy': '/privacy',
  '/web3-security': '/resources',
  '/web-security': '/resources',
  '/vulnerabilities': '/resources/vulnerability-database',
  '/ai-analysis': '/tools/ai-tools',
  '/ai-matching-hub': '/tools/ai-tools',
  '/advanced-features': '/auditor/enhanced-dashboard',
  '/audit-details': '/dashboard',
  '/calendar': '/dashboard',
  '/collaboration': '/project-management',
  '/escrow': '/dashboard',
  '/integrations': '/tools/ai-tools',
  '/launch-readiness': '/dashboard',
  '/analytics': '/dashboard',
  '/files': '/tools/file-management'
};

export function validateLink(href: string): LinkInfo {
  // Remove query parameters and hash for validation
  const cleanHref = href.split('?')[0].split('#')[0];
  
  // Check if it's an external link
  if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return {
      href,
      text: '',
      component: '',
      status: 'valid',
      category: 'content'
    };
  }
  
  // Check if route exists
  if (VALID_ROUTES.has(cleanHref)) {
    return {
      href,
      text: '',
      component: '',
      status: 'valid',
      category: 'content'
    };
  }
  
  // Check for mapping
  if (ROUTE_MAPPINGS[cleanHref]) {
    return {
      href,
      text: '',
      component: '',
      status: 'redirect',
      suggestedRoute: ROUTE_MAPPINGS[cleanHref],
      category: 'content'
    };
  }
  
  // Check for dynamic routes
  if (cleanHref.includes(':')) {
    return {
      href,
      text: '',
      component: '',
      status: 'valid',
      category: 'content'
    };
  }
  
  // Suggest fallback
  const fallback = getFallbackRoute(cleanHref);
  return {
    href,
    text: '',
    component: '',
    status: 'broken',
    suggestedRoute: fallback,
    category: 'content'
  };
}

export function getFallbackRoute(path: string): string {
  // Enhanced fallback logic
  if (path.includes('audit')) return '/request-audit';
  if (path.includes('security')) return '/marketplace';
  if (path.includes('resource')) return '/resources';
  if (path.includes('tool')) return '/tools/ai-tools';
  if (path.includes('community')) return '/community/forum';
  if (path.includes('support')) return '/support';
  if (path.includes('help')) return '/support';
  if (path.includes('contact')) return '/contact';
  if (path.includes('about')) return '/about';
  if (path.includes('pricing')) return '/pricing';
  if (path.includes('career')) return '/business/careers';
  if (path.includes('term')) return '/terms';
  if (path.includes('privacy')) return '/privacy';
  if (path.includes('dashboard')) return '/dashboard';
  if (path.includes('profile')) return '/profile';
  if (path.includes('setting')) return '/settings';
  
  return '/';
}

export function fixBrokenLinks(links: LinkInfo[]): LinkInfo[] {
  return links.map(link => {
    if (link.status === 'broken' && link.suggestedRoute) {
      return {
        ...link,
        href: link.suggestedRoute,
        status: 'redirect' as const
      };
    }
    return link;
  });
}

// Common broken link patterns found in the codebase
export const COMMON_BROKEN_LINKS = [
  '/security-audits',
  '/code-reviews', 
  '/penetration-testing',
  '/consulting',
  '/security-guides',
  '/knowledge-base',
  '/tutorials',
  '/templates',
  '/audit-guidelines',
  '/vulnerability-database',
  '/forum',
  '/events',
  '/challenges',
  '/leaderboard',
  '/ai-tools',
  '/security-insights',
  '/vulnerability-scanner',
  '/platform-reports',
  '/file-management',
  '/careers',
  '/partners',
  '/faq',
  '/documentation',
  '/profile',
  '/settings',
  '/docs',
  '/guides',
  '/help',
  '/contact-us',
  '/about-us',
  '/pricing-inr',
  '/cost',
  '/price',
  '/security',
  '/audit',
  '/audits',
  '/submit-service',
  '/security-policy',
  '/web3-security',
  '/web-security',
  '/vulnerabilities',
  '/ai-analysis',
  '/ai-matching-hub',
  '/advanced-features',
  '/audit-details',
  '/calendar',
  '/collaboration',
  '/escrow',
  '/integrations',
  '/launch-readiness',
  '/analytics',
  '/files'
];

export function generateLinkReport(): string {
  const report = [
    '# Hawkly Platform Link Validation Report',
    `Generated: ${new Date().toISOString()}`,
    '',
    '## Summary',
    `- Total Valid Routes: ${VALID_ROUTES.size}`,
    `- Common Broken Links: ${COMMON_BROKEN_LINKS.length}`,
    `- Route Mappings: ${Object.keys(ROUTE_MAPPINGS).length}`,
    '',
    '## Valid Routes',
    ...Array.from(VALID_ROUTES).sort().map(route => `- ${route}`),
    '',
    '## Common Broken Links (with fixes)',
    ...COMMON_BROKEN_LINKS.map(link => `- ${link} → ${ROUTE_MAPPINGS[link] || getFallbackRoute(link)}`),
    '',
    '## Route Mappings',
    ...Object.entries(ROUTE_MAPPINGS).map(([from, to]) => `- ${from} → ${to}`)
  ].join('\n');
  
  return report;
} 