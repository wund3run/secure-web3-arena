
export interface NavigationLink {
  title: string;
  href: string;
  description?: string;
  children?: NavigationLink[];
  requiresAuth?: boolean;
}

export const navigationLinks: NavigationLink[] = [
  {
    title: "Services",
    href: "/marketplace",
    children: [
      {
        title: "Browse Marketplace",
        href: "/marketplace",
        description: "Find security experts for your project"
      },
      {
        title: "Security Audits",
        href: "/security-audits",
        description: "Comprehensive smart contract security reviews"
      },
      {
        title: "Code Reviews",
        href: "/code-reviews",
        description: "Expert code analysis and feedback"
      },
      {
        title: "Penetration Testing",
        href: "/penetration-testing",
        description: "Advanced security vulnerability testing"
      },
      {
        title: "Security Consulting",
        href: "/consulting",
        description: "Strategic security guidance and planning"
      },
      {
        title: "Request Audit",
        href: "/request-audit",
        description: "Submit your project for security review"
      }
    ]
  },
  {
    title: "Tools",
    href: "/ai-tools",
    children: [
      {
        title: "AI Security Tools",
        href: "/ai-tools",
        description: "AI-powered security analysis tools"
      },
      {
        title: "Security Insights",
        href: "/security-insights",
        description: "Real-time vulnerability analysis"
      },
      {
        title: "Vulnerability Scanner",
        href: "/vulnerability-scanner",
        description: "Automated security scanning"
      },
      {
        title: "Platform Reports",
        href: "/platform-reports",
        description: "Comprehensive security reports"
      },
      {
        title: "File Management",
        href: "/files",
        description: "Secure file upload and management"
      }
    ]
  },
  {
    title: "Resources",
    href: "/security-guides",
    children: [
      {
        title: "Security Guides",
        href: "/security-guides",
        description: "Best practices and security guidelines"
      },
      {
        title: "Knowledge Base",
        href: "/knowledge-base",
        description: "Comprehensive security documentation"
      },
      {
        title: "Tutorials",
        href: "/tutorials",
        description: "Step-by-step security tutorials"
      },
      {
        title: "Templates",
        href: "/templates",
        description: "Ready-to-use security templates"
      },
      {
        title: "Audit Guidelines",
        href: "/audit-guidelines",
        description: "Professional audit standards and procedures"
      },
      {
        title: "Vulnerability Database",
        href: "/vulnerabilities",
        description: "Known vulnerabilities and fixes"
      }
    ]
  },
  {
    title: "Community",
    href: "/forum",
    children: [
      {
        title: "Forum",
        href: "/forum",
        description: "Community discussions and support"
      },
      {
        title: "Events",
        href: "/events",
        description: "Security events and workshops"
      },
      {
        title: "Challenges",
        href: "/challenges",
        description: "Security challenges and competitions"
      },
      {
        title: "Leaderboard",
        href: "/leaderboard",
        description: "Top security experts rankings"
      }
    ]
  },
  {
    title: "Support",
    href: "/support",
    children: [
      {
        title: "Help Center",
        href: "/support",
        description: "Get help and support"
      },
      {
        title: "FAQ",
        href: "/faq",
        description: "Frequently asked questions"
      },
      {
        title: "Documentation",
        href: "/documentation",
        description: "Platform documentation"
      }
    ]
  },
  {
    title: "Dashboard",
    href: "/dashboard",
    requiresAuth: true
  },
  {
    title: "My Audits",
    href: "/audits",
    requiresAuth: true
  }
];
