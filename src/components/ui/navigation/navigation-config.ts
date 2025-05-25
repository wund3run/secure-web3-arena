
export interface NavigationItem {
  title: string;
  href: string;
  description?: string;
  icon?: string;
  badge?: string;
  children?: NavigationItem[];
  featured?: boolean;
  external?: boolean;
}

export interface NavigationSection {
  title: string;
  items: NavigationItem[];
  featured?: NavigationItem[];
}

export const mainNavigation: NavigationItem[] = [
  {
    title: "Marketplace",
    href: "/marketplace",
    description: "Find security experts and services",
    icon: "Shield"
  },
  {
    title: "Services",
    href: "/services",
    description: "Browse all security services",
    children: [
      {
        title: "Smart Contract Audits",
        href: "/marketplace?category=smart-contract-audit",
        description: "Comprehensive smart contract security reviews"
      },
      {
        title: "Security Consulting",
        href: "/marketplace?category=security-consulting",
        description: "Expert security guidance and strategy"
      },
      {
        title: "Penetration Testing",
        href: "/marketplace?category=penetration-testing",
        description: "In-depth security vulnerability assessment"
      },
      {
        title: "Request Custom Audit",
        href: "/request-audit",
        description: "Get a tailored security audit",
        featured: true
      }
    ]
  },
  {
    title: "Resources",
    href: "/resources",
    description: "Security knowledge and tools",
    children: [
      {
        title: "Security Guidelines",
        href: "/audit-guidelines",
        description: "Best practices for Web3 security"
      },
      {
        title: "Documentation",
        href: "/docs",
        description: "Platform guides and API docs"
      },
      {
        title: "Knowledge Base",
        href: "/knowledge-base",
        description: "Comprehensive security resources"
      },
      {
        title: "Templates",
        href: "/templates",
        description: "Ready-to-use security templates"
      },
      {
        title: "Tutorials",
        href: "/tutorials",
        description: "Step-by-step security guides"
      },
      {
        title: "AI Security Tools",
        href: "/ai-tools",
        description: "AI-powered security analysis",
        badge: "New"
      }
    ]
  },
  {
    title: "Community",
    href: "/community",
    description: "Connect with security professionals",
    children: [
      {
        title: "Forum",
        href: "/forum",
        description: "Discuss security topics"
      },
      {
        title: "Events",
        href: "/events",
        description: "Security conferences and meetups"
      },
      {
        title: "Leaderboard",
        href: "/leaderboard",
        description: "Top security professionals"
      },
      {
        title: "Achievements",
        href: "/achievements",
        description: "Recognition and badges"
      },
      {
        title: "Blog",
        href: "/blog",
        description: "Latest security insights"
      }
    ]
  }
];

export const footerNavigation: NavigationSection[] = [
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

export const userMenuItems = {
  authenticated: [
    { title: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
    { title: "My Audits", href: "/audits", icon: "ClipboardCheck" },
    { title: "Escrow", href: "/escrow", icon: "Shield" },
    { title: "Settings", href: "/settings", icon: "Settings" }
  ],
  unauthenticated: [
    { title: "Sign In", href: "/auth", icon: "LogIn" },
    { title: "Create Account", href: "/auth?mode=signup", icon: "UserPlus" },
    { title: "Become an Auditor", href: "/service-provider-onboarding", icon: "Shield" }
  ]
};
