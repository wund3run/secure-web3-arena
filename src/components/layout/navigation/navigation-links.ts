
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
    requiresAuth: true,
    children: [
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
        title: "Consulting",
        href: "/consulting",
        description: "Strategic security guidance and planning"
      }
    ]
  },
  {
    title: "Resources",
    href: "/resources",
    requiresAuth: true,
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
      }
    ]
  },
  {
    title: "Tools",
    href: "/security-insights",
    requiresAuth: true,
    children: [
      {
        title: "Security Insights",
        href: "/security-insights",
        description: "Real-time vulnerability analysis"
      },
      {
        title: "AI Tools",
        href: "/ai-tools",
        description: "AI-powered security analysis tools"
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
      }
    ]
  },
  {
    title: "Community",
    href: "/community",
    requiresAuth: true,
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
  }
];
