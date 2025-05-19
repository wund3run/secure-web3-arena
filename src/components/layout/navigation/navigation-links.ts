
import { NavigationLinksStructure, NavigationLinkItem } from "./navigation-links.tsx";

export const navigationLinks: NavigationLinksStructure = {
  marketplace: [
    { title: "Browse Services", href: "/marketplace", description: "Find security services for your project" },
    { title: "Request Audit", href: "/request-audit", description: "Get your project audited by experts" },
    { title: "Service Comparison", href: "/marketplace?compare=true", description: "Compare different security services" },
    { title: "Security Insights", href: "/security-insights", description: "Learn about Web3 security trends" },
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
    { title: "Roadmap", href: "/roadmap", description: "Our platform development plans" },
    { title: "Blog", href: "/blog", description: "Articles and updates" },
    { title: "Community", href: "/community", description: "Join our security community" },
  ],
};

// Also export the types here for convenience
export { NavigationLinksStructure, NavigationLinkItem };
