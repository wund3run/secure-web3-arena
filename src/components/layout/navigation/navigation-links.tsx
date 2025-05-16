
import { ReactNode } from "react";

export type NavigationLinkItem = {
  title: string;
  description: string;
  href: string;
  badge?: string;
};

export type NavigationLinksStructure = {
  marketplace: NavigationLinkItem[];
  audits: NavigationLinkItem[];
  resources: NavigationLinkItem[];
};

// Navigation links structure for consistency between desktop and mobile views
export const navigationLinks: NavigationLinksStructure = {
  marketplace: [
    { title: "Security Services", description: "Browse auditors and security services", href: "/marketplace" },
    { title: "Request Audit", description: "Submit your project for security assessment", href: "/request-audit" },
    { title: "Pricing", description: "Flexible plans for projects of all sizes", href: "/pricing" }
  ],
  audits: [
    { title: "Security Audits", description: "Browse completed security audits and reports from our verified providers", href: "/audits" },
    { title: "Audit Progress Tracking", badge: "New", description: "Monitor your audit progress in real-time", href: "/audit/:id" },
    { title: "Request New Audit", description: "Start the process of getting your project audited", href: "/request-audit" },
    { title: "Audit Guidelines", description: "Best practices and standards for security audits", href: "/audit-guidelines" }
  ],
  resources: [
    { title: "Audit Guidelines", description: "Best practices for secure development", href: "/audit-guidelines" },
    { title: "Documentation", description: "Comprehensive guides and tutorials", href: "/docs" },
    { title: "Security Insights", description: "Latest trends and vulnerabilities in Web3 security", href: "/security-insights" },
    { title: "Learning Center", description: "Educational resources on Web3 security", href: "/web3-security" },
    { title: "AI Security Tools", badge: "New", description: "AI-powered security assessment tools", href: "/ai-tools" },
    { title: "Vulnerability Database", description: "Comprehensive database of known vulnerabilities", href: "/vulnerabilities" }
  ]
};
