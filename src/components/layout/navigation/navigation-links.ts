
export interface NavigationLink {
  label: string;
  href: string;
  description?: string;
  children?: NavigationLink[];
  requiresAuth?: boolean;
}

export const navigationLinks: NavigationLink[] = [
  {
    label: "Services",
    href: "/marketplace",
    requiresAuth: true,
    children: [
      {
        label: "Security Audits",
        href: "/security-audits",
        description: "Comprehensive smart contract security reviews"
      },
      {
        label: "Code Reviews",
        href: "/code-reviews",
        description: "Expert code analysis and feedback"
      },
      {
        label: "Penetration Testing",
        href: "/penetration-testing",
        description: "Advanced security vulnerability testing"
      },
      {
        label: "Consulting",
        href: "/consulting",
        description: "Strategic security guidance and planning"
      }
    ]
  },
  {
    label: "Resources",
    href: "/resources",
    requiresAuth: true,
    children: [
      {
        label: "Security Guides",
        href: "/security-guides",
        description: "Best practices and security guidelines"
      },
      {
        label: "Knowledge Base",
        href: "/knowledge-base",
        description: "Comprehensive security documentation"
      },
      {
        label: "Tutorials",
        href: "/tutorials",
        description: "Step-by-step security tutorials"
      },
      {
        label: "Templates",
        href: "/templates",
        description: "Ready-to-use security templates"
      }
    ]
  },
  {
    label: "Tools",
    href: "/security-insights",
    requiresAuth: true,
    children: [
      {
        label: "Security Insights",
        href: "/security-insights",
        description: "Real-time vulnerability analysis"
      },
      {
        label: "Security Monitoring",
        href: "/security-monitoring",
        description: "Continuous security monitoring dashboard"
      },
      {
        label: "Enterprise Control",
        href: "/enterprise-control",
        description: "Enterprise security management center"
      },
      {
        label: "AI Tools",
        href: "/ai-tools",
        description: "AI-powered security analysis tools"
      },
      {
        label: "Vulnerability Scanner",
        href: "/vulnerability-scanner",
        description: "Automated security scanning"
      },
      {
        label: "Platform Reports",
        href: "/platform-reports",
        description: "Comprehensive security reports"
      }
    ]
  },
  {
    label: "Community",
    href: "/community",
    requiresAuth: true,
    children: [
      {
        label: "Forum",
        href: "/forum",
        description: "Community discussions and support"
      },
      {
        label: "Events",
        href: "/events",
        description: "Security events and workshops"
      },
      {
        label: "Challenges",
        href: "/challenges",
        description: "Security challenges and competitions"
      },
      {
        label: "Leaderboard",
        href: "/leaderboard",
        description: "Top security experts rankings"
      }
    ]
  }
];
