
export interface NavigationItem {
  title: string;
  href: string;
  description?: string;
  badge?: string;
  featured?: boolean;
  children?: NavigationItem[];
}

export const mainNavigation: NavigationItem[] = [
  {
    title: "Marketplace",
    href: "/marketplace",
    children: [
      {
        title: "Browse Services",
        href: "/marketplace",
        description: "Find security services for your project",
        featured: true
      },
      {
        title: "Request Audit",
        href: "/request-audit",
        description: "Get your project audited by experts"
      },
      {
        title: "Security Insights",
        href: "/security-insights",
        description: "Learn about Web3 security trends"
      },
      {
        title: "Pricing",
        href: "/pricing",
        description: "View our pricing plans"
      }
    ]
  },
  {
    title: "Audits",
    href: "/audits",
    children: [
      {
        title: "Request Audit",
        href: "/request-audit",
        description: "Submit your project for security review"
      },
      {
        title: "Audit Process",
        href: "/audit-guidelines",
        description: "Learn about our audit methodology"
      },
      {
        title: "Past Audits",
        href: "/audits",
        description: "Browse completed security audits",
        badge: "New"
      },
      {
        title: "Vulnerabilities Database",
        href: "/vulnerabilities",
        description: "Learn about common security issues"
      }
    ]
  },
  {
    title: "Resources",
    href: "/resources",
    children: [
      {
        title: "Documentation",
        href: "/docs",
        description: "Reference materials and guides"
      },
      {
        title: "Security Resources",
        href: "/web3-security",
        description: "Learn about Web3 security"
      },
      {
        title: "AI Tools",
        href: "/ai-tools",
        description: "AI-powered security tools",
        badge: "Beta"
      },
      {
        title: "Blog",
        href: "/blog",
        description: "Articles and updates"
      },
      {
        title: "FAQ",
        href: "/faq",
        description: "Frequently asked questions"
      },
      {
        title: "Community",
        href: "/community",
        description: "Join our security community"
      }
    ]
  }
];
