
import { Shield, BookOpen, Zap, Users } from 'lucide-react';

export interface NavigationLink {
  title: string;
  href: string;
  description?: string;
  icon?: any;
  children?: NavigationLink[];
  requiresAuth?: boolean;
}

export const navigationLinks: NavigationLink[] = [
  {
    title: "Services",
    href: "/marketplace",
    icon: Shield,
    requiresAuth: false,
    children: [
      {
        title: "Security Audits",
        href: "/marketplace",
        description: "Comprehensive smart contract security audits by verified experts"
      },
      {
        title: "Code Reviews",
        href: "/marketplace",
        description: "Expert code review services for Web3 projects with AI-enhanced analysis"
      },
      {
        title: "Penetration Testing",
        href: "/marketplace",
        description: "Advanced security testing and vulnerability assessment"
      },
      {
        title: "Security Consulting",
        href: "/marketplace",
        description: "Strategic security guidance and implementation support"
      }
    ]
  },
  {
    title: "Resources",
    href: "/resources",
    icon: BookOpen,
    requiresAuth: false,
    children: [
      {
        title: "Security Guides",
        href: "/resources",
        description: "Comprehensive security guides for Web3 development"
      },
      {
        title: "Knowledge Base",
        href: "/docs",
        description: "Extensive documentation and best practices"
      },
      {
        title: "Video Tutorials",
        href: "/resources",
        description: "Expert-led tutorials covering security analysis"
      },
      {
        title: "Audit Templates",
        href: "/templates",
        description: "Professional audit templates and frameworks"
      }
    ]
  },
  {
    title: "Tools",
    href: "/ai-tools",
    icon: Zap,
    requiresAuth: false,
    children: [
      {
        title: "Security Insights",
        href: "/security-insights",
        description: "AI-powered security analytics and threat intelligence"
      },
      {
        title: "AI Security Tools",
        href: "/ai-tools",
        description: "GPT-4 powered analysis and automated vulnerability detection"
      },
      {
        title: "Vulnerability Scanner",
        href: "/vulnerabilities",
        description: "Automated vulnerability detection with multi-blockchain support"
      },
      {
        title: "Platform Reports",
        href: "/platform-report",
        description: "Comprehensive security reports and compliance dashboards"
      }
    ]
  },
  {
    title: "Community",
    href: "/community",
    icon: Users,
    requiresAuth: false,
    children: [
      {
        title: "Community Forum",
        href: "/forum",
        description: "Technical discussions and expert Q&A sessions"
      },
      {
        title: "Security Events",
        href: "/events",
        description: "Workshops, conferences, and training sessions"
      },
      {
        title: "Security Challenges",
        href: "/challenges",
        description: "CTF challenges and skill-building competitions"
      },
      {
        title: "Expert Leaderboard",
        href: "/leaderboard",
        description: "Top security experts and community contributors"
      }
    ]
  }
];
