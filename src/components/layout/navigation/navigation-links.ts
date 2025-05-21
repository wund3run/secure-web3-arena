import { NavigationLinksStructure, NavigationLinkItem } from "./navigation-links.tsx";

/**
 * Navigation links for the platform header
 */
export const navigationLinks: NavigationLinksStructure = {
  marketplace: [
    { title: "Browse Services", href: "/marketplace", description: "Find security services for your project" },
    { title: "Request Audit", href: "/request-audit", description: "Get your project audited by experts" },
    { title: "Security Insights", href: "/security-insights", description: "Learn about Web3 security trends" },
  ],
  audits: [
    { title: "Request Audit", href: "/request-audit", description: "Submit your project for security review" },
    { title: "Audit Process", href: "/audit-guidelines", description: "Learn about our audit methodology" },
    { title: "Past Audits", href: "/audits", description: "Browse completed security audits", badge: "New" },
    { title: "Vulnerabilities Database", href: "/vulnerabilities", description: "Learn about common security issues" },
    { title: "Platform Report", href: "/platform-report", description: "View UI/UX audit report of the platform", badge: "New" },
  ],
  resources: [
    { title: "Documentation", href: "/docs", description: "Reference materials and guides" },
    { title: "Security Resources", href: "/web3-security", description: "Learn about Web3 security" },
    { title: "AI Tools", href: "/ai-tools", description: "AI-powered security tools", badge: "Beta" },
    { title: "Roadmap", href: "/roadmap", description: "Our platform development plans" },
    { title: "Blog", href: "/blog", description: "Articles and updates" },
    { title: "Community", href: "/community", description: "Join our security community" },
  ],
  dashboards: [
    // Enhanced dashboard links with specific role-based options
    { title: "Auditor Dashboard", href: "/dashboard/auditor", description: "Access your auditor workspace" },
    { title: "Project Dashboard", href: "/dashboard/project", description: "Manage your project security" },
    { title: "Audit Analytics", href: "/dashboard/analytics", description: "View performance metrics and insights" },
    { title: "Escrow Management", href: "/escrow", description: "Manage secure payment transactions" },
    { title: "Reputation Center", href: "/leaderboard", description: "Track your platform reputation" },
  ],
};

// Remove the duplicate type exports since we're importing them
