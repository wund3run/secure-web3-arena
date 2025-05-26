
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ContentPage } from '@/components/content/content-page';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Book, Code, Shield, Users, Zap, FileText } from 'lucide-react';

const Docs = () => {
  const documentationSections = [
    {
      title: "Getting Started",
      icon: Book,
      description: "Learn the basics of using Hawkly's security marketplace",
      badge: "Essential",
      articles: [
        { title: "Platform Overview", description: "Understanding Hawkly's ecosystem" },
        { title: "Account Setup", description: "Creating and configuring your profile" },
        { title: "First Security Audit", description: "Step-by-step guide to requesting your first audit" },
        { title: "Navigation Guide", description: "Finding your way around the platform" }
      ]
    },
    {
      title: "For Project Owners",
      icon: Shield,
      description: "Complete guide for securing your blockchain projects",
      badge: "Popular",
      articles: [
        { title: "Audit Request Process", description: "How to submit effective audit requests" },
        { title: "Choosing the Right Auditor", description: "Evaluating auditor profiles and expertise" },
        { title: "Understanding Audit Reports", description: "Reading and acting on security findings" },
        { title: "Post-Audit Best Practices", description: "Maintaining security after your audit" }
      ]
    },
    {
      title: "For Security Auditors",
      icon: Users,
      description: "Resources and guidelines for security professionals",
      badge: "Professional",
      articles: [
        { title: "Auditor Onboarding", description: "Complete verification and profile setup" },
        { title: "Audit Methodology", description: "Standard procedures and best practices" },
        { title: "Report Writing Guidelines", description: "Creating clear, actionable reports" },
        { title: "Client Communication", description: "Professional interaction standards" }
      ]
    },
    {
      title: "API Documentation",
      icon: Code,
      description: "Technical documentation for developers",
      badge: "Technical",
      articles: [
        { title: "API Overview", description: "Introduction to Hawkly's API" },
        { title: "Authentication", description: "API keys and security tokens" },
        { title: "Endpoints Reference", description: "Complete API endpoint documentation" },
        { title: "SDKs and Libraries", description: "Available development tools" }
      ]
    },
    {
      title: "Security Standards",
      icon: FileText,
      description: "Security frameworks and compliance guidelines",
      badge: "Important",
      articles: [
        { title: "Audit Standards", description: "Industry-standard audit procedures" },
        { title: "Vulnerability Classification", description: "Severity levels and categories" },
        { title: "Compliance Requirements", description: "Regulatory and industry compliance" },
        { title: "Risk Assessment", description: "Evaluating and prioritizing security risks" }
      ]
    },
    {
      title: "Platform Features",
      icon: Zap,
      description: "Advanced features and integrations",
      badge: "Advanced",
      articles: [
        { title: "Escrow System", description: "Secure payment management" },
        { title: "Real-time Notifications", description: "Stay updated on audit progress" },
        { title: "Integration Options", description: "Connecting with your existing tools" },
        { title: "AI Security Tools", description: "Leveraging automated security analysis" }
      ]
    }
  ];

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Essential':
        return 'bg-green-500';
      case 'Popular':
        return 'bg-blue-500';
      case 'Professional':
        return 'bg-purple-500';
      case 'Technical':
        return 'bg-orange-500';
      case 'Important':
        return 'bg-red-500';
      case 'Advanced':
        return 'bg-indigo-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <ContentPage 
      title="Documentation" 
      description="Comprehensive guides and API documentation for Hawkly's Web3 security marketplace."
    >
      <h1>Documentation</h1>
      
      <p className="text-muted-foreground text-lg mb-8">
        Everything you need to know about using Hawkly effectively. From getting started guides 
        to advanced API documentation, find the resources that match your needs.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {documentationSections.map((section, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <section.icon className="h-8 w-8 text-primary" />
                <Badge className={getBadgeColor(section.badge)}>
                  {section.badge}
                </Badge>
              </div>
              <CardTitle>{section.title}</CardTitle>
              <CardDescription>{section.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {section.articles.map((article, i) => (
                  <div key={i} className="border-l-2 border-primary/20 pl-4">
                    <h4 className="font-medium text-sm">{article.title}</h4>
                    <p className="text-xs text-muted-foreground">{article.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-12 bg-muted/40 rounded-lg p-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Need Help?</h3>
          <p className="text-muted-foreground mb-6">
            Our documentation is continuously updated. If you can't find what you're looking for, 
            our support team is ready to help.
          </p>
          <div className="flex justify-center gap-4">
            <a href="/support" className="inline-flex items-center px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
              Get Support
            </a>
            <a href="/contact" className="inline-flex items-center px-6 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md transition-colors">
              Request Documentation
            </a>
          </div>
        </div>
      </div>
    </ContentPage>
  );
};

export default Docs;
