
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
  Star
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Templates Page
export function Templates() {
  const templates = [
    {
      title: "DeFi Protocol Audit Template",
      description: "Comprehensive security checklist for DeFi applications",
      category: "DeFi",
      downloadCount: "2.3k",
      rating: 4.9
    },
    {
      title: "NFT Smart Contract Template",
      description: "Security guidelines for NFT and token contracts",
      category: "NFT",
      downloadCount: "1.8k",
      rating: 4.8
    },
    {
      title: "DAO Governance Audit",
      description: "Security framework for decentralized governance",
      category: "DAO",
      downloadCount: "1.2k",
      rating: 4.7
    },
    {
      title: "Cross-Chain Bridge Template",
      description: "Multi-chain security assessment template",
      category: "Bridge",
      downloadCount: "945",
      rating: 4.9
    }
  ];

  return (
    <StandardLayout 
      title="Security Templates" 
      description="Download professional security audit templates and checklists"
    >
      <div className="container py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Security Audit Templates</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional templates and checklists used by top security auditors. 
            Start your security assessment with battle-tested frameworks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {templates.map((template, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{template.title}</CardTitle>
                    <CardDescription className="mt-2">{template.description}</CardDescription>
                  </div>
                  <Badge variant="secondary">{template.category}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
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
                  <Button size="sm">
                    Download <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
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
      title: "Smart Contract Security Fundamentals",
      description: "Learn the basics of smart contract vulnerabilities and how to prevent them",
      duration: "45 min",
      level: "Beginner",
      views: "12.5k"
    },
    {
      title: "Advanced DeFi Security Patterns",
      description: "Deep dive into flash loan attacks, oracle manipulation, and MEV protection",
      duration: "75 min", 
      level: "Advanced",
      views: "8.2k"
    },
    {
      title: "Audit Report Reading Guide",
      description: "How to understand and act on security audit findings",
      duration: "30 min",
      level: "Intermediate", 
      views: "15.3k"
    },
    {
      title: "Building Secure Cross-Chain Applications",
      description: "Security considerations for multi-chain and bridge applications",
      duration: "60 min",
      level: "Advanced",
      views: "6.7k"
    }
  ];

  return (
    <StandardLayout 
      title="Security Tutorials" 
      description="Learn Web3 security from industry experts"
    >
      <div className="container py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Security Learning Center</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Master Web3 security with our comprehensive video tutorials and hands-on guides. 
            Learn from real-world exploits and best practices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {tutorials.map((tutorial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg mb-4 flex items-center justify-center">
                  <Video className="h-12 w-12 text-primary" />
                </div>
                <CardTitle className="text-lg">{tutorial.title}</CardTitle>
                <CardDescription>{tutorial.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {tutorial.duration}
                    </span>
                    <Badge variant={tutorial.level === 'Beginner' ? 'secondary' : tutorial.level === 'Intermediate' ? 'default' : 'destructive'}>
                      {tutorial.level}
                    </Badge>
                  </div>
                  <span className="text-sm text-muted-foreground">{tutorial.views} views</span>
                </div>
                <Button className="w-full">
                  Watch Tutorial <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Apply Your Knowledge?</h3>
          <p className="text-muted-foreground mb-6">
            Put your security skills to work with real projects or get your own code audited.
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

// Placeholder component for missing pages
function PlaceholderPage({ title, description }: { title: string; description: string }) {
  return (
    <StandardLayout title={title} description={description}>
      <div className="container py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          <p className="text-xl text-muted-foreground mb-8">{description}</p>
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <div className="text-center text-muted-foreground">
                <FileText className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg mb-4">This page is under construction.</p>
                <p>We're working hard to bring you amazing content. Check back soon!</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </StandardLayout>
  );
}

// Export all the missing page components
export const Achievements = () => <PlaceholderPage title="Achievements" description="Track your security audit achievements and milestones" />;
export const AdminAudits = () => <PlaceholderPage title="Admin Audits" description="Manage platform audit operations" />;
export const AdminDashboard = () => <PlaceholderPage title="Admin Dashboard" description="Administrative platform overview" />;
export const AdminDisputes = () => <PlaceholderPage title="Admin Disputes" description="Manage platform disputes and resolutions" />;
export const AdminFinance = () => <PlaceholderPage title="Admin Finance" description="Financial operations and reporting" />;
export const AdminProviders = () => <PlaceholderPage title="Admin Providers" description="Manage service providers" />;
export const AdminReports = () => <PlaceholderPage title="Admin Reports" description="Platform analytics and reports" />;
export const AdminSecurity = () => <PlaceholderPage title="Admin Security" description="Platform security management" />;
export const AdminServices = () => <PlaceholderPage title="Admin Services" description="Manage platform services" />;
export const AdminSettings = () => <PlaceholderPage title="Admin Settings" description="Platform configuration settings" />;
export const AdminUsers = () => <PlaceholderPage title="Admin Users" description="User management and administration" />;
export const AuditGuidelines = () => <PlaceholderPage title="Audit Guidelines" description="Security audit best practices and guidelines" />;
export const AuditorDashboard = () => <PlaceholderPage title="Auditor Dashboard" description="Auditor workspace and tools" />;
export const Blog = () => <PlaceholderPage title="Blog" description="Latest Web3 security insights and news" />;
export const CancellationRefund = () => <PlaceholderPage title="Cancellation & Refund" description="Cancellation and refund policies" />;
export const Challenges = () => <PlaceholderPage title="Challenges" description="Security challenges and competitions" />;
export const ContactProvider = () => <PlaceholderPage title="Contact Provider" description="Get in touch with service providers" />;
export const Events = () => <PlaceholderPage title="Events" description="Web3 security events and workshops" />;
export const Forum = () => <PlaceholderPage title="Forum" description="Community discussions and support" />;
export const Leaderboard = () => <PlaceholderPage title="Leaderboard" description="Top auditors and security experts" />;
export const PlatformReport = () => <PlaceholderPage title="Platform Report" description="Platform performance and analytics" />;
export const Privacy = () => <PlaceholderPage title="Privacy Policy" description="How we protect your privacy" />;
export const ProjectDashboard = () => <PlaceholderPage title="Project Dashboard" description="Manage your security projects" />;
export const SecurityInsights = () => <PlaceholderPage title="Security Insights" description="Advanced security analytics and insights" />;
export const SecurityPolicy = () => <PlaceholderPage title="Security Policy" description="Platform security policies and procedures" />;
export const ShippingDelivery = () => <PlaceholderPage title="Shipping & Delivery" description="Service delivery information" />;
export const SubmitService = () => <PlaceholderPage title="Submit Service" description="Submit your security service" />;
export const Terms = () => <PlaceholderPage title="Terms of Service" description="Platform terms and conditions" />;
export const UserDashboard = () => <PlaceholderPage title="User Dashboard" description="Your personalized dashboard" />;
