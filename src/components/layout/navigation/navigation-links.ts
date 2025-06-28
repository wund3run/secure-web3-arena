
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
        description: "Find verified security experts for your project"
      },
      {
        title: "Security Audits",
        href: "/security-audits",
        description: "Comprehensive smart contract security reviews"
      },
      {
        title: "Code Reviews",
        href: "/code-reviews",
        description: "Expert code analysis and improvement recommendations"
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
    title: "Resources",
    href: "/resources",
    children: [
      {
        title: "Resource Hub",
        href: "/resources",
        description: "Comprehensive security resources and guides"
      },
      {
        title: "Audit Guidelines",
        href: "/audit-guidelines",
        description: "Professional audit standards and procedures"
      },
      {
        title: "Support Center",
        href: "/support",
        description: "Get help and find answers to common questions"
      },
      {
        title: "AI Security Tools",
        href: "/ai-tools",
        description: "AI-powered security analysis tools"
      }
    ]
  },
  {
    title: "Company",
    href: "/about",
    children: [
      {
        title: "About Hawkly",
        href: "/about",
        description: "Learn about our mission and team"
      },
      {
        title: "Contact Us",
        href: "/contact",
        description: "Get in touch with our team"
      }
    ]
  },
  {
    title: "Dashboard",
    href: "/dashboard",
    requiresAuth: true
  }
];
