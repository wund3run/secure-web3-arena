
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

export interface FooterNavigationSection {
  title: string;
  items: Array<{
    title: string;
    href: string;
    external?: boolean;
  }>;
}

export const footerNavigation: FooterNavigationSection[] = [
  {
    title: "Platform",
    items: [
      { title: "Marketplace", href: "/marketplace" },
      { title: "Request Audit", href: "/request-audit" },
      { title: "Become an Auditor", href: "/service-provider-onboarding" },
      { title: "Pricing", href: "/pricing" },
      { title: "Stats", href: "/stats" }
    ]
  },
  {
    title: "Resources",
    items: [
      { title: "Documentation", href: "/docs" },
      { title: "Security Guidelines", href: "/audit-guidelines" },
      { title: "Knowledge Base", href: "/knowledge-base" },
      { title: "Templates", href: "/templates" },
      { title: "Tutorials", href: "/tutorials" }
    ]
  },
  {
    title: "Community",
    items: [
      { title: "Forum", href: "/forum" },
      { title: "Blog", href: "/blog" },
      { title: "Events", href: "/events" },
      { title: "Leaderboard", href: "/leaderboard" },
      { title: "Discord", href: "https://discord.gg/hawkly", external: true }
    ]
  },
  {
    title: "Support",
    items: [
      { title: "Help Center", href: "/support" },
      { title: "FAQ", href: "/faq" },
      { title: "Contact", href: "/contact" },
      { title: "Status", href: "/platform-report" }
    ]
  },
  {
    title: "Legal",
    items: [
      { title: "Terms of Service", href: "/terms" },
      { title: "Privacy Policy", href: "/privacy" },
      { title: "Security Policy", href: "/security-policy" }
    ]
  }
];
