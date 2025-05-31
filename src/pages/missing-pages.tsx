import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Video, 
  FileText, 
  Code, 
  Shield, 
  Zap,
  ArrowRight,
  Clock,
  Users,
  Star,
  Calendar,
  Trophy,
  Settings,
  BarChart,
  MessageSquare,
  UserPlus,
  FileCheck,
  HelpCircle,
  Briefcase,
  Search,
  Mail,
  TrendingUp,
  Database,
  Lock,
  Globe,
  Truck,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Templates Page
export function Templates() {
  const templates = [
    {
      title: "DeFi Protocol Audit Template",
      description: "Comprehensive security checklist for DeFi applications including flash loan protection, oracle security, and liquidity risks - Updated March 2025",
      category: "DeFi",
      downloadCount: "3.2k",
      rating: 4.9,
      lastUpdated: "March 2025",
      new: true
    },
    {
      title: "AI-Enhanced Smart Contract Template",
      description: "Advanced template incorporating AI-powered vulnerability detection patterns and automated security checks",
      category: "AI Security",
      downloadCount: "2.8k",
      rating: 4.9,
      lastUpdated: "March 2025",
      new: true
    },
    {
      title: "NFT Smart Contract Template",
      description: "Security guidelines for NFT and token contracts covering minting, royalties, and marketplace integrations",
      category: "NFT",
      downloadCount: "2.1k",
      rating: 4.8,
      lastUpdated: "March 2025"
    },
    {
      title: "DAO Governance Audit",
      description: "Security framework for decentralized governance including voting mechanisms and proposal systems",
      category: "DAO",
      downloadCount: "1.7k",
      rating: 4.7,
      lastUpdated: "February 2025"
    },
    {
      title: "Cross-Chain Bridge Template",
      description: "Multi-chain security assessment template covering bridge architecture and cross-chain risks",
      category: "Bridge",
      downloadCount: "1.4k",
      rating: 4.9,
      lastUpdated: "March 2025"
    },
    {
      title: "Layer 2 Security Checklist",
      description: "Specialized template for L2 solutions including rollup security and state verification",
      category: "Layer 2",
      downloadCount: "1.1k",
      rating: 4.6,
      lastUpdated: "March 2025"
    },
    {
      title: "Staking Protocol Audit",
      description: "Security framework for staking mechanisms, slashing conditions, and reward distribution",
      category: "Staking",
      downloadCount: "956",
      rating: 4.8,
      lastUpdated: "February 2025"
    }
  ];

  return (
    <StandardLayout 
      title="Security Templates" 
      description="Professional audit templates used by top security experts - Updated March 2025"
    >
      <div className="container py-12">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">Updated March 2025</Badge>
          <h1 className="text-4xl font-bold mb-4">Security Audit Templates</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional templates and checklists used by top security auditors. 
            Start your security assessment with battle-tested frameworks updated for 2025.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {templates.map((template, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{template.title}</CardTitle>
                    {template.new && (
                      <Badge variant="default" className="mt-2 mb-2">New for 2025</Badge>
                    )}
                    <CardDescription className="mt-2">{template.description}</CardDescription>
                  </div>
                  <Badge variant="secondary">{template.category}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {template.downloadCount}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      {template.rating}
                    </span>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground mb-4">
                  Updated: {template.lastUpdated}
                </div>
                <Button size="sm" className="w-full">
                  Download Template <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg">
            <Link to="/request-audit">
              Get Professional Audit <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </StandardLayout>
  );
}

// Tutorials Page
export function Tutorials() {
  const tutorials = [
    {
      title: "Smart Contract Security Fundamentals for 2025",
      description: "Updated guide covering the latest vulnerability patterns, including MEV attacks, AI-assisted exploits, and advanced reentrancy scenarios",
      duration: "45 min",
      level: "Beginner",
      views: "18.7k",
      instructor: "Dr. Elena Rodriguez",
      publishDate: "March 2025",
      new: true
    },
    {
      title: "AI-Powered Security Analysis Techniques",
      description: "Learn to leverage GPT-4 and other AI tools for automated vulnerability detection and smart contract analysis",
      duration: "60 min",
      level: "Intermediate",
      views: "15.2k",
      instructor: "Dr. Jennifer Wu",
      publishDate: "March 2025",
      new: true
    },
    {
      title: "Advanced DeFi Security Patterns",
      description: "Deep dive into flash loan attacks, oracle manipulation, and cross-protocol vulnerabilities in the current DeFi landscape",
      duration: "85 min", 
      level: "Advanced",
      views: "12.3k",
      instructor: "Marcus Chen",
      publishDate: "March 2025"
    },
    {
      title: "Layer 2 Security Architecture",
      description: "Comprehensive coverage of rollup security, state verification, and cross-layer communication vulnerabilities",
      duration: "65 min",
      level: "Intermediate", 
      views: "9.8k",
      instructor: "Sarah Kim",
      publishDate: "February 2025"
    },
    {
      title: "Cross-Chain Bridge Security Analysis",
      description: "Security considerations for multi-chain applications, bridge vulnerabilities, and secure cross-chain communication",
      duration: "70 min",
      level: "Advanced",
      views: "8.1k",
      instructor: "Ahmed Hassan",
      publishDate: "February 2025"
    },
    {
      title: "AI-Powered Security Auditing Tools",
      description: "Learn to use the latest AI tools for vulnerability detection, including GPT-4 powered analysis and automated testing",
      duration: "55 min",
      level: "Intermediate",
      views: "15.2k",
      instructor: "Dr. Jennifer Wu",
      publishDate: "March 2025"
    },
    {
      title: "Zero-Knowledge Protocol Security",
      description: "Security analysis of ZK-SNARK and ZK-STARK implementations, privacy-preserving protocols, and circuit vulnerabilities",
      duration: "90 min",
      level: "Expert",
      views: "6.4k",
      instructor: "Dr. Alex Thompson",
      publishDate: "March 2025"
    }
  ];

  return (
    <StandardLayout 
      title="Security Tutorials" 
      description="Master Web3 security with expert-led video tutorials - Updated March 2025"
    >
      <div className="container py-12">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">Updated March 2025</Badge>
          <h1 className="text-4xl font-bold mb-4">Web3 Security Learning Center</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Master Web3 security with our comprehensive video tutorials and hands-on guides. 
            Learn from real-world exploits and cutting-edge security practices updated for 2025.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {tutorials.map((tutorial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg mb-4 flex items-center justify-center">
                  <Video className="h-12 w-12 text-primary" />
                </div>
                {tutorial.new && (
                  <Badge variant="default" className="mb-2 w-fit">New for 2025</Badge>
                )}
                <CardTitle className="text-lg">{tutorial.title}</CardTitle>
                <CardDescription>{tutorial.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {tutorial.duration}
                    </span>
                    <Badge variant={tutorial.level === 'Beginner' ? 'secondary' : tutorial.level === 'Intermediate' ? 'default' : tutorial.level === 'Advanced' ? 'destructive' : 'outline'}>
                      {tutorial.level}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{tutorial.instructor}</span>
                    <span>{tutorial.views} views</span>
                  </div>
                  <div className="text-xs text-muted-foreground">{tutorial.publishDate}</div>
                </div>
                <Button className="w-full mt-4">
                  Watch Tutorial <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Apply Your Knowledge?</h3>
          <p className="text-muted-foreground mb-6">
            Put your security skills to work with real projects or get your own code audited by our expert community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link to="/marketplace">Find Audit Work</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/request-audit">Get Code Audited</Link>
            </Button>
          </div>
        </div>
      </div>
    </StandardLayout>
  );
}

// New service page components with March 2025 content
export const PenetrationTesting = () => (
  <PlaceholderPage 
    title="Penetration Testing Services" 
    description="Advanced security testing and vulnerability assessment for Web3 applications - March 2025"
    icon={Shield}
    features={[
      "Comprehensive Security Testing",
      "Real-world Attack Simulations", 
      "Infrastructure Penetration Testing",
      "Smart Contract Exploit Testing",
      "Social Engineering Assessments",
      "Detailed Remediation Reports"
    ]}
  />
);

export const Consulting = () => (
  <PlaceholderPage 
    title="Security Consulting Services" 
    description="Strategic security guidance and implementation support for Web3 projects - March 2025"
    icon={Users}
    features={[
      "Security Architecture Review",
      "Threat Modeling & Risk Assessment",
      "Compliance & Regulatory Guidance",
      "Security Training & Workshops",
      "Incident Response Planning",
      "Ongoing Security Advisory"
    ]}
  />
);

export const SecurityGuides = () => (
  <PlaceholderPage 
    title="Security Guides & Best Practices" 
    description="Comprehensive security guides for Web3 development updated for March 2025"
    icon={BookOpen}
    comingSoon={false}
    features={[
      "Smart Contract Security Patterns",
      "DeFi Security Best Practices",
      "Cross-Chain Security Guidelines",
      "Layer 2 Security Considerations",
      "Zero-Knowledge Protocol Security",
      "Regulatory Compliance Guides"
    ]}
  />
);

export const AITools = () => (
  <PlaceholderPage 
    title="AI-Powered Security Tools" 
    description="Advanced AI tools for automated security analysis and vulnerability detection - March 2025"
    icon={Zap}
    features={[
      "GPT-4 Powered Code Analysis",
      "Automated Vulnerability Detection",
      "Smart Contract Risk Scoring",
      "Predictive Security Analytics",
      "AI-Assisted Audit Reports",
      "Machine Learning Threat Detection"
    ]}
  />
);

export const VulnerabilityScanner = () => (
  <PlaceholderPage 
    title="Vulnerability Scanner" 
    description="Automated vulnerability detection and scanning for smart contracts and Web3 applications"
    icon={Search}
    features={[
      "Real-time Vulnerability Scanning",
      "Multi-blockchain Support",
      "Continuous Monitoring",
      "Custom Rule Engine",
      "Integration with CI/CD",
      "Comprehensive Reporting"
    ]}
  />
);

export const PlatformReports = () => (
  <PlaceholderPage 
    title="Platform Security Reports" 
    description="Comprehensive security reports and analytics for blockchain platforms and protocols"
    icon={FileText}
    features={[
      "Platform Security Assessments",
      "Ecosystem Threat Analysis",
      "Security Trend Reports",
      "Risk Assessment Dashboards",
      "Compliance Status Reports",
      "Security Benchmark Analysis"
    ]}
  />
);

// Updated existing components with March 2025 enhancements
export const Templates = () => {
  const templates = [
    {
      title: "DeFi Protocol Audit Template",
      description: "Comprehensive security checklist for DeFi applications including flash loan protection, oracle security, and liquidity risks - Updated March 2025",
      category: "DeFi",
      downloadCount: "3.2k",
      rating: 4.9,
      lastUpdated: "March 2025",
      new: true
    },
    {
      title: "AI-Enhanced Smart Contract Template",
      description: "Advanced template incorporating AI-powered vulnerability detection patterns and automated security checks",
      category: "AI Security",
      downloadCount: "2.8k",
      rating: 4.9,
      lastUpdated: "March 2025",
      new: true
    },
    {
      title: "NFT Smart Contract Template",
      description: "Security guidelines for NFT and token contracts covering minting, royalties, and marketplace integrations",
      category: "NFT",
      downloadCount: "2.1k",
      rating: 4.8,
      lastUpdated: "March 2025"
    },
    {
      title: "DAO Governance Audit",
      description: "Security framework for decentralized governance including voting mechanisms and proposal systems",
      category: "DAO",
      downloadCount: "1.7k",
      rating: 4.7,
      lastUpdated: "February 2025"
    },
    {
      title: "Cross-Chain Bridge Template",
      description: "Multi-chain security assessment template covering bridge architecture and cross-chain risks",
      category: "Bridge",
      downloadCount: "1.4k",
      rating: 4.9,
      lastUpdated: "March 2025"
    },
    {
      title: "Layer 2 Security Checklist",
      description: "Specialized template for L2 solutions including rollup security and state verification",
      category: "Layer 2",
      downloadCount: "1.1k",
      rating: 4.6,
      lastUpdated: "March 2025"
    },
    {
      title: "Staking Protocol Audit",
      description: "Security framework for staking mechanisms, slashing conditions, and reward distribution",
      category: "Staking",
      downloadCount: "956",
      rating: 4.8,
      lastUpdated: "February 2025"
    }
  ];

  return (
    <StandardLayout 
      title="Security Templates" 
      description="Professional audit templates used by top security experts - Updated March 2025"
    >
      <div className="container py-12">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">Updated March 2025</Badge>
          <h1 className="text-4xl font-bold mb-4">Security Audit Templates</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional templates and checklists used by top security auditors. 
            Start your security assessment with battle-tested frameworks updated for 2025.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {templates.map((template, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{template.title}</CardTitle>
                    {template.new && (
                      <Badge variant="default" className="mt-2 mb-2">New for 2025</Badge>
                    )}
                    <CardDescription className="mt-2">{template.description}</CardDescription>
                  </div>
                  <Badge variant="secondary">{template.category}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {template.downloadCount}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      {template.rating}
                    </span>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground mb-4">
                  Updated: {template.lastUpdated}
                </div>
                <Button size="sm" className="w-full">
                  Download Template <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg">
            <Link to="/request-audit">
              Get Professional Audit <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </StandardLayout>
  );
};

export const Tutorials = () => {
  const tutorials = [
    {
      title: "Smart Contract Security Fundamentals for 2025",
      description: "Updated guide covering the latest vulnerability patterns, including MEV attacks, AI-assisted exploits, and advanced reentrancy scenarios",
      duration: "45 min",
      level: "Beginner",
      views: "18.7k",
      instructor: "Dr. Elena Rodriguez",
      publishDate: "March 2025",
      new: true
    },
    {
      title: "AI-Powered Security Analysis Techniques",
      description: "Learn to leverage GPT-4 and other AI tools for automated vulnerability detection and smart contract analysis",
      duration: "60 min",
      level: "Intermediate",
      views: "15.2k",
      instructor: "Dr. Jennifer Wu",
      publishDate: "March 2025",
      new: true
    },
    {
      title: "Advanced DeFi Security Patterns",
      description: "Deep dive into flash loan attacks, oracle manipulation, and cross-protocol vulnerabilities in the current DeFi landscape",
      duration: "85 min", 
      level: "Advanced",
      views: "12.3k",
      instructor: "Marcus Chen",
      publishDate: "March 2025"
    },
    {
      title: "Layer 2 Security Architecture",
      description: "Comprehensive coverage of rollup security, state verification, and cross-layer communication vulnerabilities",
      duration: "65 min",
      level: "Intermediate", 
      views: "9.8k",
      instructor: "Sarah Kim",
      publishDate: "February 2025"
    },
    {
      title: "Cross-Chain Bridge Security Analysis",
      description: "Security considerations for multi-chain applications, bridge vulnerabilities, and secure cross-chain communication",
      duration: "70 min",
      level: "Advanced",
      views: "8.1k",
      instructor: "Ahmed Hassan",
      publishDate: "February 2025"
    },
    {
      title: "AI-Powered Security Auditing Tools",
      description: "Learn to use the latest AI tools for vulnerability detection, including GPT-4 powered analysis and automated testing",
      duration: "55 min",
      level: "Intermediate",
      views: "15.2k",
      instructor: "Dr. Jennifer Wu",
      publishDate: "March 2025"
    },
    {
      title: "Zero-Knowledge Protocol Security",
      description: "Security analysis of ZK-SNARK and ZK-STARK implementations, privacy-preserving protocols, and circuit vulnerabilities",
      duration: "90 min",
      level: "Expert",
      views: "6.4k",
      instructor: "Dr. Alex Thompson",
      publishDate: "March 2025"
    }
  ];

  return (
    <StandardLayout 
      title="Security Tutorials" 
      description="Master Web3 security with expert-led video tutorials - Updated March 2025"
    >
      <div className="container py-12">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">Updated March 2025</Badge>
          <h1 className="text-4xl font-bold mb-4">Web3 Security Learning Center</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Master Web3 security with our comprehensive video tutorials and hands-on guides. 
            Learn from real-world exploits and cutting-edge security practices updated for 2025.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {tutorials.map((tutorial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg mb-4 flex items-center justify-center">
                  <Video className="h-12 w-12 text-primary" />
                </div>
                {tutorial.new && (
                  <Badge variant="default" className="mb-2 w-fit">New for 2025</Badge>
                )}
                <CardTitle className="text-lg">{tutorial.title}</CardTitle>
                <CardDescription>{tutorial.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {tutorial.duration}
                    </span>
                    <Badge variant={tutorial.level === 'Beginner' ? 'secondary' : tutorial.level === 'Intermediate' ? 'default' : tutorial.level === 'Advanced' ? 'destructive' : 'outline'}>
                      {tutorial.level}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{tutorial.instructor}</span>
                    <span>{tutorial.views} views</span>
                  </div>
                  <div className="text-xs text-muted-foreground">{tutorial.publishDate}</div>
                </div>
                <Button className="w-full mt-4">
                  Watch Tutorial <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Apply Your Knowledge?</h3>
          <p className="text-muted-foreground mb-6">
            Put your security skills to work with real projects or get your own code audited by our expert community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link to="/marketplace">Find Audit Work</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/request-audit">Get Code Audited</Link>
            </Button>
          </div>
        </div>
      </div>
    </StandardLayout>
  );
};

// Placeholder component for other missing pages
function PlaceholderPage({ 
  title, 
  description, 
  icon: Icon = FileText, 
  comingSoon = true,
  features = []
}: { 
  title: string; 
  description: string; 
  icon?: any;
  comingSoon?: boolean;
  features?: string[];
}) {
  return (
    <StandardLayout title={title} description={description}>
      <div className="container py-12">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
            <Icon className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">{description}</p>
          
          {comingSoon ? (
            <Card className="max-w-2xl mx-auto mb-8">
              <CardContent className="p-8">
                <div className="text-center text-muted-foreground">
                  <Icon className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg mb-4">This feature is coming soon!</p>
                  <p>We're working hard to bring you amazing functionality. Check back soon for updates.</p>
                  
                  {features.length > 0 && (
                    <div className="mt-6">
                      <h4 className="font-semibold mb-3">What to expect:</h4>
                      <ul className="text-left space-y-2 max-w-md mx-auto">
                        {features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="max-w-4xl mx-auto">
              {features.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {features.map((feature, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <p className="text-center">{feature}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link to="/marketplace">Explore Marketplace</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </div>
    </StandardLayout>
  );
}

// Export all the missing page components with enhanced descriptions and features
export const Achievements = () => (
  <PlaceholderPage 
    title="Achievements & Badges" 
    description="Track your security expertise and unlock achievements as you complete audits and contribute to the community"
    icon={Trophy}
    features={[
      "Security Expert Badges",
      "Audit Completion Certificates", 
      "Community Contribution Rewards",
      "Skill-based Achievement Levels",
      "Public Profile Showcases"
    ]}
  />
);

export const AdminAudits = () => (
  <PlaceholderPage 
    title="Admin Audit Management" 
    description="Comprehensive audit oversight and management tools for platform administrators"
    icon={FileCheck}
    features={[
      "Audit Status Monitoring",
      "Quality Assurance Tools",
      "Auditor Performance Analytics",
      "Dispute Resolution Dashboard",
      "Automated Compliance Checks"
    ]}
  />
);

export const AdminDashboard = () => (
  <PlaceholderPage 
    title="Administrative Dashboard" 
    description="Central command center for platform operations, analytics, and management"
    icon={BarChart}
    features={[
      "Real-time Platform Metrics",
      "User Growth Analytics", 
      "Revenue and Transaction Data",
      "Security Incident Monitoring",
      "Performance Benchmarking"
    ]}
  />
);

export const AdminDisputes = () => (
  <PlaceholderPage 
    title="Dispute Resolution Center" 
    description="Manage and resolve conflicts between auditors and project teams"
    icon={AlertTriangle}
    features={[
      "Automated Dispute Detection",
      "Mediation Workflow Tools",
      "Evidence Collection System",
      "Resolution Tracking",
      "Appeals Process Management"
    ]}
  />
);

export const AdminFinance = () => (
  <PlaceholderPage 
    title="Financial Operations" 
    description="Comprehensive financial management and reporting for platform transactions"
    icon={TrendingUp}
    features={[
      "Revenue Analytics Dashboard",
      "Payment Processing Oversight",
      "Escrow Management Tools",
      "Financial Reporting Suite",
      "Fraud Detection Systems"
    ]}
  />
);

export const AdminProviders = () => (
  <PlaceholderPage 
    title="Service Provider Management" 
    description="Oversee auditor onboarding, verification, and performance management"
    icon={UserPlus}
    features={[
      "Auditor Verification Process",
      "Skill Assessment Tools",
      "Performance Monitoring",
      "Certification Management",
      "Quality Score Tracking"
    ]}
  />
);

export const AdminReports = () => (
  <PlaceholderPage 
    title="Administrative Reports" 
    description="Generate comprehensive reports on platform performance and security metrics"
    icon={FileText}
    features={[
      "Custom Report Builder",
      "Scheduled Report Generation",
      "Data Export Tools",
      "Visualization Dashboards",
      "Compliance Reporting"
    ]}
  />
);

export const AdminSecurity = () => (
  <PlaceholderPage 
    title="Platform Security Management" 
    description="Monitor and manage platform security, access controls, and threat detection"
    icon={Shield}
    features={[
      "Security Incident Dashboard",
      "Access Control Management",
      "Threat Detection Analytics",
      "Vulnerability Monitoring",
      "Security Policy Enforcement"
    ]}
  />
);

export const AdminServices = () => (
  <PlaceholderPage 
    title="Service Management" 
    description="Manage platform services, features, and integrations"
    icon={Settings}
    features={[
      "Service Configuration Tools",
      "Feature Flag Management",
      "Integration Monitoring",
      "API Management Dashboard",
      "Service Health Monitoring"
    ]}
  />
);

export const AdminSettings = () => (
  <PlaceholderPage 
    title="Platform Configuration" 
    description="Configure global platform settings, policies, and operational parameters"
    icon={Settings}
    features={[
      "Global Configuration Panel",
      "Policy Management Tools",
      "Feature Toggles",
      "Environment Settings",
      "Maintenance Mode Controls"
    ]}
  />
);

export const AdminUsers = () => (
  <PlaceholderPage 
    title="User Management" 
    description="Comprehensive user administration, support, and account management tools"
    icon={Users}
    features={[
      "User Account Overview",
      "Role and Permission Management",
      "Account Verification Tools",
      "Support Ticket Integration",
      "User Analytics Dashboard"
    ]}
  />
);

export const AuditGuidelines = () => (
  <PlaceholderPage 
    title="Security Audit Guidelines" 
    description="Comprehensive guidelines and best practices for conducting Web3 security audits in 2025"
    icon={BookOpen}
    comingSoon={false}
    features={[
      "Updated OWASP Web3 Security Standards",
      "Smart Contract Audit Methodologies", 
      "DeFi-specific Security Patterns",
      "Cross-chain Security Considerations",
      "AI-assisted Audit Techniques",
      "Regulatory Compliance Guidelines"
    ]}
  />
);

export const AuditorDashboard = () => (
  <PlaceholderPage 
    title="Auditor Workspace" 
    description="Professional dashboard for security auditors with advanced tools and project management"
    icon={Search}
    features={[
      "Active Project Dashboard",
      "Audit Tool Integration",
      "Client Communication Hub",
      "Earnings and Analytics",
      "Reputation Management"
    ]}
  />
);

export const CancellationRefund = () => (
  <PlaceholderPage 
    title="Cancellation & Refund Policy" 
    description="Transparent policies for project cancellations, refunds, and dispute resolution"
    icon={RefreshCw}
    comingSoon={false}
    features={[
      "Clear Cancellation Terms",
      "Automated Refund Processing",
      "Dispute Resolution Procedures",
      "Partial Work Compensation",
      "Emergency Cancellation Protocols"
    ]}
  />
);

export const Challenges = () => (
  <PlaceholderPage 
    title="Security Challenges" 
    description="Test and improve your Web3 security skills with hands-on challenges and competitions"
    icon={Trophy}
    features={[
      "Weekly Security CTF Challenges",
      "Smart Contract Debugging Puzzles",
      "DeFi Exploit Simulations",
      "Bug Bounty Training Scenarios",
      "Community Leaderboards"
    ]}
  />
);

export const ContactProvider = () => (
  <PlaceholderPage 
    title="Contact Security Providers" 
    description="Connect directly with verified security auditors and get personalized quotes"
    icon={Mail}
    features={[
      "Direct Auditor Messaging",
      "Consultation Scheduling",
      "Project Requirement Forms",
      "Quote Comparison Tools",
      "Provider Rating System"
    ]}
  />
);

export const Events = () => (
  <PlaceholderPage 
    title="Security Events & Workshops" 
    description="Join virtual and in-person Web3 security events, workshops, and conferences"
    icon={Calendar}
    features={[
      "Monthly Security Webinars",
      "Conference Speaker Series",
      "Hands-on Workshop Sessions",
      "Networking Events",
      "Industry Expert Panels"
    ]}
  />
);

export const Forum = () => (
  <PlaceholderPage 
    title="Community Forum" 
    description="Engage with the Web3 security community, share knowledge, and get expert advice"
    icon={MessageSquare}
    features={[
      "Technical Discussion Boards",
      "Vulnerability Disclosure Discussions",
      "Best Practices Sharing",
      "Expert Q&A Sessions",
      "Project Showcase Gallery"
    ]}
  />
);

export const Leaderboard = () => (
  <PlaceholderPage 
    title="Security Expert Leaderboard" 
    description="Discover top-performing security auditors and track community contributions"
    icon={TrendingUp}
    features={[
      "Monthly Top Auditors",
      "Community Contribution Scores",
      "Vulnerability Discovery Rankings",
      "Client Satisfaction Ratings",
      "Annual Award Categories"
    ]}
  />
);

export const PlatformReport = () => (
  <PlaceholderPage 
    title="Platform Analytics Report" 
    description="Comprehensive insights into platform performance, security metrics, and industry trends"
    icon={BarChart}
    features={[
      "Security Vulnerability Trends",
      "Audit Completion Statistics",
      "Market Growth Analytics",
      "User Satisfaction Metrics",
      "Industry Benchmarking"
    ]}
  />
);

export const ProjectDashboard = () => (
  <PlaceholderPage 
    title="Project Management Dashboard" 
    description="Comprehensive project tracking and management tools for security audits"
    icon={Briefcase}
    features={[
      "Real-time Project Status",
      "Milestone Tracking",
      "Communication Timeline",
      "Document Management",
      "Payment Status Overview"
    ]}
  />
);

export const SecurityInsights = () => (
  <PlaceholderPage 
    title="Advanced Security Insights" 
    description="AI-powered security analytics and threat intelligence for Web3 projects"
    icon={TrendingUp}
    features={[
      "Threat Intelligence Feed",
      "Vulnerability Pattern Analysis",
      "Security Score Benchmarking",
      "Risk Assessment Tools",
      "Predictive Security Analytics"
    ]}
  />
);

export const ShippingDelivery = () => (
  <PlaceholderPage 
    title="Service Delivery Information" 
    description="Learn about our audit delivery process, timelines, and quality assurance"
    icon={Truck}
    comingSoon={false}
    features={[
      "Standard Delivery Timelines",
      "Quality Assurance Process",
      "Milestone-based Delivery",
      "Emergency Audit Services",
      "Post-delivery Support"
    ]}
  />
);

export const SubmitService = () => (
  <PlaceholderPage 
    title="Submit Your Security Service" 
    description="Join our marketplace as a verified security service provider"
    icon={UserPlus}
    features={[
      "Service Provider Application",
      "Verification Process Guide",
      "Skill Assessment Tests",
      "Profile Setup Wizard",
      "Onboarding Checklist"
    ]}
  />
);

export const UserDashboard = () => (
  <PlaceholderPage 
    title="Personal Dashboard" 
    description="Your personalized hub for managing audits, tracking progress, and accessing resources"
    icon={BarChart}
    features={[
      "Audit Request Management",
      "Progress Tracking",
      "Communication Center",
      "Resource Library Access",
      "Profile Settings"
    ]}
  />
);
