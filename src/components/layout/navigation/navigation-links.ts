
import { NavigationLinksStructure, NavigationLinkItem } from "./navigation-links.tsx";

/**
 * Navigation links for the platform header organized by category
 */
export const navigationLinksStructure: NavigationLinksStructure = {
  marketplace: [
    { title: "Browse Services", href: "/marketplace", description: "Find security services for your project" },
    { title: "Request Audit", href: "/request-audit", description: "Get your project audited by experts" },
    { title: "Security Insights", href: "/security-insights", description: "Learn about Web3 security trends" },
    { title: "Pricing", href: "/pricing", description: "View our pricing plans" },
  ],
  audits: [
    { title: "Request Audit", href: "/request-audit", description: "Submit your project for security review" },
    { title: "Audit Process", href: "/audit-guidelines", description: "Learn about our audit methodology" },
    { title: "Past Audits", href: "/audits", description: "Browse completed security audits", badge: "New" },
    { title: "Vulnerabilities Database", href: "/vulnerabilities", description: "Learn about common security issues" },
  ],
  resources: [
    { title: "Documentation", href: "/docs", description: "Reference materials and guides" },
    { title: "Security Resources", href: "/web3-security", description: "Learn about Web3 security" },
    { title: "AI Tools", href: "/ai-tools", description: "AI-powered security tools", badge: "Beta" },
    { title: "Blog", href: "/blog", description: "Articles and updates" },
    { title: "FAQ", href: "/faq", description: "Frequently asked questions" },
    { title: "Community", href: "/community", description: "Join our security community" },
    { title: "Roadmap", href: "/roadmap", description: "Our platform development plans" },
  ],
  dashboards: [
    { title: "Audit Analytics", href: "/dashboard/analytics", description: "View performance metrics and insights" },
    { title: "Escrow Management", href: "/escrow", description: "Manage secure payment transactions" },
    { title: "Reputation Center", href: "/leaderboard", description: "Track your platform reputation" },
  ],
};

/**
 * Flattened navigation links structure for components that need to map over an array
 */
export interface NavigationLink {
  title: string;
  href: string;
  description?: string;
  badge?: string;
  children?: NavigationLinkItem[];
}

export const navigationLinks: NavigationLink[] = [
  {
    title: "Marketplace",
    href: "/marketplace",
    children: navigationLinksStructure.marketplace,
  },
  {
    title: "Audits",
    href: "/audits", 
    children: navigationLinksStructure.audits,
  },
  {
    title: "Resources",
    href: "/resources",
    children: navigationLinksStructure.resources,
  },
];
