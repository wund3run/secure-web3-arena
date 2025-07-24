/**
 * Comprehensive Link Testing Utility for Hawkly Platform
 * Tests all navigation, footer, and header links for validity
 * Updated for June 2025
 */

import { validateLink, ROUTE_MAPPINGS, VALID_ROUTES } from './link-validation';

export interface LinkTestResult {
  component: string;
  linkText: string;
  href: string;
  status: 'valid' | 'broken' | 'redirect' | 'external';
  suggestedRoute?: string;
  category: 'navigation' | 'footer' | 'header' | 'content';
}

// Test all navigation links
export function testNavigationLinks(): LinkTestResult[] {
  const results: LinkTestResult[] = [];
  
  // Test main navigation links
  const navigationLinks = [
    { href: '/marketplace', text: 'Browse Marketplace', component: 'Navigation' },
    { href: '/services/security-audits', text: 'Security Audits', component: 'Navigation' },
    { href: '/services/code-reviews', text: 'Code Reviews', component: 'Navigation' },
    { href: '/services/penetration-testing', text: 'Penetration Testing', component: 'Navigation' },
    { href: '/services/consulting', text: 'Security Consulting', component: 'Navigation' },
    { href: '/request-audit', text: 'Request Audit', component: 'Navigation' },
    { href: '/tools/ai-tools', text: 'AI Security Tools', component: 'Navigation' },
    { href: '/tools/security-insights', text: 'Security Insights', component: 'Navigation' },
    { href: '/tools/vulnerability-scanner', text: 'Vulnerability Scanner', component: 'Navigation' },
    { href: '/tools/platform-reports', text: 'Platform Reports', component: 'Navigation' },
    { href: '/tools/file-management', text: 'File Management', component: 'Navigation' },
    { href: '/resources/security-guides', text: 'Security Guides', component: 'Navigation' },
    { href: '/resources/knowledge-base', text: 'Knowledge Base', component: 'Navigation' },
    { href: '/resources/tutorials', text: 'Tutorials', component: 'Navigation' },
    { href: '/resources/templates', text: 'Templates', component: 'Navigation' },
    { href: '/resources/audit-guidelines', text: 'Audit Guidelines', component: 'Navigation' },
    { href: '/resources/vulnerability-database', text: 'Vulnerability Database', component: 'Navigation' },
    { href: '/community/forum', text: 'Forum', component: 'Navigation' },
    { href: '/community/events', text: 'Events', component: 'Navigation' },
    { href: '/community/challenges', text: 'Challenges', component: 'Navigation' },
    { href: '/community/leaderboard', text: 'Leaderboard', component: 'Navigation' },
    { href: '/support', text: 'Help Center', component: 'Navigation' },
    { href: '/support/faq', text: 'FAQ', component: 'Navigation' },
    { href: '/support/documentation', text: 'Documentation', component: 'Navigation' },
    { href: '/auditor/enhanced-dashboard', text: 'Enhanced Dashboard', component: 'Navigation' },
    { href: '/auditor/code-analysis', text: 'Code Analysis Engine', component: 'Navigation' },
    { href: '/auditor/cross-chain-analysis', text: 'Cross-Chain Security', component: 'Navigation' },
    { href: '/auditor/ai-assistant', text: 'AI Assistant', component: 'Navigation' },
    { href: '/enterprise/dashboard', text: 'Enterprise Dashboard', component: 'Navigation' },
    { href: '/dashboard', text: 'Dashboard', component: 'Navigation' },
    { href: '/about', text: 'About', component: 'Navigation' },
    { href: '/pricing', text: 'Pricing', component: 'Navigation' },
    { href: '/business/careers', text: 'Careers', component: 'Navigation' },
    { href: '/contact', text: 'Contact', component: 'Navigation' }
  ];

  navigationLinks.forEach(link => {
    const validation = validateLink(link.href);
    results.push({
      component: link.component,
      linkText: link.text,
      href: link.href,
      status: validation.status as 'valid' | 'broken' | 'redirect' | 'external',
      suggestedRoute: validation.suggestedRoute,
      category: 'navigation'
    });
  });

  return results;
}

// Test all footer links
export function testFooterLinks(): LinkTestResult[] {
  const results: LinkTestResult[] = [];
  
  const footerLinks = [
    { href: '/marketplace', text: 'Browse Services', component: 'Footer' },
    { href: '/request-audit', text: 'Request Audit', component: 'Footer' },
    { href: '/pricing', text: 'Pricing', component: 'Footer' },
    { href: '/service-provider-onboarding', text: 'Become a Provider', component: 'Footer' },
    { href: '/resources/templates', text: 'Audit Templates', component: 'Footer' },
    { href: '/support/documentation', text: 'Documentation', component: 'Footer' },
    { href: '/resources/security-guides', text: 'Security Blog', component: 'Footer' },
    { href: '/resources/tutorials', text: 'Video Tutorials', component: 'Footer' },
    { href: '/resources/vulnerability-database', text: 'Vulnerability Database', component: 'Footer' },
    { href: '/tools/security-insights', text: 'Security Insights', component: 'Footer' },
    { href: '/support/faq', text: 'FAQ', component: 'Footer' },
    { href: '/community/forum', text: 'Join Community', component: 'Footer' },
    { href: '/community/events', text: 'Events & Workshops', component: 'Footer' },
    { href: '/community/challenges', text: 'Security Challenges', component: 'Footer' },
    { href: '/community/leaderboard', text: 'Expert Leaderboard', component: 'Footer' },
    { href: '/about', text: 'About Us', component: 'Footer' },
    { href: '/contact', text: 'Contact Support', component: 'Footer' },
    { href: '/business/careers', text: 'Careers', component: 'Footer' },
    { href: '/terms', text: 'Terms of Service', component: 'Footer' },
    { href: '/privacy', text: 'Privacy Policy', component: 'Footer' },
    { href: '/privacy', text: 'Security Policy', component: 'Footer' }
  ];

  footerLinks.forEach(link => {
    const validation = validateLink(link.href);
    results.push({
      component: link.component,
      linkText: link.text,
      href: link.href,
      status: validation.status as 'valid' | 'broken' | 'redirect' | 'external',
      suggestedRoute: validation.suggestedRoute,
      category: 'footer'
    });
  });

  return results;
}

// Test all header links
export function testHeaderLinks(): LinkTestResult[] {
  const results: LinkTestResult[] = [];
  
  const headerLinks = [
    { href: '/', text: 'Home', component: 'Header' },
    { href: '/marketplace', text: 'Marketplace', component: 'Header' },
    { href: '/auth', text: 'Sign In', component: 'Header' },
    { href: '/request-audit', text: 'Request Audit', component: 'Header' },
    { href: '/dashboard', text: 'Dashboard', component: 'Header' }
  ];

  headerLinks.forEach(link => {
    const validation = validateLink(link.href);
    results.push({
      component: link.component,
      linkText: link.text,
      href: link.href,
      status: validation.status as 'valid' | 'broken' | 'redirect' | 'external',
      suggestedRoute: validation.suggestedRoute,
      category: 'header'
    });
  });

  return results;
}

// Generate comprehensive test report
export function generateTestReport(): string {
  const navigationResults = testNavigationLinks();
  const footerResults = testFooterLinks();
  const headerResults = testHeaderLinks();
  
  const allResults = [...navigationResults, ...footerResults, ...headerResults];
  
  const validLinks = allResults.filter(r => r.status === 'valid');
  const brokenLinks = allResults.filter(r => r.status === 'broken');
  const redirectLinks = allResults.filter(r => r.status === 'redirect');
  const externalLinks = allResults.filter(r => r.status === 'external');

  const report = [
    '# Hawkly Platform Link Testing Report',
    `Generated: ${new Date().toISOString()}`,
    '',
    '## Summary',
    `- Total Links Tested: ${allResults.length}`,
    `- Valid Links: ${validLinks.length}`,
    `- Broken Links: ${brokenLinks.length}`,
    `- Redirect Links: ${redirectLinks.length}`,
    `- External Links: ${externalLinks.length}`,
    `- Success Rate: ${((validLinks.length / allResults.length) * 100).toFixed(1)}%`,
    '',
    '## Navigation Links',
    ...navigationResults.map(r => `- ${r.linkText}: ${r.href} (${r.status})`),
    '',
    '## Footer Links',
    ...footerResults.map(r => `- ${r.linkText}: ${r.href} (${r.status})`),
    '',
    '## Header Links',
    ...headerResults.map(r => `- ${r.linkText}: ${r.href} (${r.status})`),
    '',
    '## Broken Links (Need Fixing)',
    ...brokenLinks.map(r => `- ${r.component}: ${r.linkText} (${r.href}) → Suggested: ${r.suggestedRoute}`),
    '',
    '## Redirect Links (Working but could be optimized)',
    ...redirectLinks.map(r => `- ${r.component}: ${r.linkText} (${r.href}) → ${r.suggestedRoute}`)
  ].join('\n');

  return report;
}

// Quick validation function
export function validateAllLinks(): { valid: number; broken: number; total: number } {
  const navigationResults = testNavigationLinks();
  const footerResults = testFooterLinks();
  const headerResults = testHeaderLinks();
  
  const allResults = [...navigationResults, ...footerResults, ...headerResults];
  
  const validLinks = allResults.filter(r => r.status === 'valid').length;
  const brokenLinks = allResults.filter(r => r.status === 'broken').length;
  
  return {
    valid: validLinks,
    broken: brokenLinks,
    total: allResults.length
  };
} 