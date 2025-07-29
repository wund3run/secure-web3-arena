
export interface NavigationItem {
  title: string;
  href: string;
  description?: string;
  children?: NavigationItem[];
  requiresAuth?: boolean;
  icon?: string;
}

export const mainNavigation: NavigationItem[] = [
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
        title: "Security Guides",
        href: "/security-guides",
        description: "Best practices and security tutorials"
      },
      {
        title: "Tutorials",
        href: "/tutorials",
        description: "Step-by-step video tutorials"
      },
      {
        title: "Documentation",
        href: "/documentation",
        description: "Technical documentation and API references"
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
    title: "Platform",
    href: "/features",
    children: [
      {
        title: "Features Overview",
        href: "/features",
        description: "Explore our comprehensive platform capabilities"
      },
      {
        title: "Escrow & Payments",
        href: "/escrow",
        description: "Secure milestone-based payment system"
      },
      {
        title: "Real-time Collaboration",
        href: "/collaboration",
        description: "Live document editing and team communication"
      },
      {
        title: "Analytics Dashboard",
        href: "/analytics",
        description: "Advanced insights and performance metrics"
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
        title: "Careers",
        href: "/careers",
        description: "Join our security team"
      },
      {
        title: "Pricing",
        href: "/pricing",
        description: "Transparent pricing for all services"
      },
      {
        title: "Contact Us",
        href: "/contact",
        description: "Get in touch with our team"
      }
    ]
  }
];

export const authenticatedNavigation: NavigationItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    requiresAuth: true
  },
  {
    title: "My Audits",
    href: "/audits",
    requiresAuth: true
  },
  {
    title: "Messages",
    href: "/messages",
    requiresAuth: true
  }
];

export const footerNavigation = {
  services: [
    { title: "Security Audits", href: "/security-audits" },
    { title: "Code Reviews", href: "/code-reviews" },
    { title: "Penetration Testing", href: "/penetration-testing" },
    { title: "Security Consulting", href: "/consulting" },
    { title: "Browse Marketplace", href: "/marketplace" },
    { title: "Request Audit", href: "/request-audit" }
  ],
  resources: [
    { title: "Resource Hub", href: "/resources" },
    { title: "Security Guides", href: "/security-guides" },
    { title: "Tutorials", href: "/tutorials" },
    { title: "Documentation", href: "/documentation" },
    { title: "Audit Guidelines", href: "/audit-guidelines" },
    { title: "AI Tools", href: "/ai-tools" },
    { title: "Support Center", href: "/support" }
  ],
  platform: [
    { title: "Features", href: "/features" },
    { title: "Escrow System", href: "/escrow" },
    { title: "Collaboration", href: "/collaboration" },
    { title: "Analytics", href: "/analytics" }
  ],
  company: [
    { title: "About Us", href: "/about" },
    { title: "Careers", href: "/careers" },
    { title: "Pricing", href: "/pricing" },
    { title: "Contact", href: "/contact" },
    { title: "Become an Auditor", href: "/service-provider-onboarding" }
  ],
  legal: [
    { title: "Privacy Policy", href: "/privacy" },
    { title: "Terms of Service", href: "/terms" },
    { title: "FAQ", href: "/faq" }
  ]
};

export const socialLinks = [
  { title: "Twitter", href: "https://twitter.com/hawkly", external: true },
  { title: "GitHub", href: "https://github.com/hawkly", external: true },
  { title: "Discord", href: "https://discord.gg/hawkly", external: true },
  { title: "LinkedIn", href: "https://linkedin.com/company/hawkly", external: true }
];
