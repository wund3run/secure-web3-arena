
import React from 'react';
import { ProductionLayout } from '@/components/layout/ProductionLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Construction, ArrowLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface PlaceholderPageProps {
  title: string;
  description: string;
  comingSoon?: boolean;
}

export function PlaceholderPage({ title, description, comingSoon = true }: PlaceholderPageProps) {
  const location = useLocation();
  
  return (
    <ProductionLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <Card>
            <CardHeader className="pt-12">
              <Construction className="h-16 w-16 mx-auto mb-4 text-primary" />
              <CardTitle className="text-3xl mb-4">{title}</CardTitle>
            </CardHeader>
            <CardContent className="pb-12">
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                {description}
              </p>
              
              {comingSoon && (
                <div className="bg-muted/50 rounded-lg p-6 mb-8">
                  <h3 className="text-lg font-semibold mb-2">Coming Soon</h3>
                  <p className="text-muted-foreground">
                    We're working hard to bring you this feature. Stay tuned for updates!
                  </p>
                </div>
              )}
              
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Current path: <code className="bg-muted px-2 py-1 rounded">{location.pathname}</code>
                </p>
                
                <div className="flex gap-4 justify-center">
                  <Button asChild>
                    <Link to="/">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Go Home
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/marketplace">Browse Services</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProductionLayout>
  );
}

// Individual page exports for easier routing
export const KnowledgeBase = () => (
  <PlaceholderPage 
    title="Knowledge Base" 
    description="Comprehensive documentation and guides for Web3 security best practices."
  />
);

export const Tutorials = () => (
  <PlaceholderPage 
    title="Security Tutorials" 
    description="Step-by-step tutorials to help you implement security best practices."
  />
);

export const Templates = () => (
  <PlaceholderPage 
    title="Security Templates" 
    description="Ready-to-use templates and boilerplates for secure smart contract development."
  />
);

export const AuditGuidelines = () => (
  <PlaceholderPage 
    title="Audit Guidelines" 
    description="Professional standards and procedures for conducting security audits."
  />
);

export const VulnerabilityDatabase = () => (
  <PlaceholderPage 
    title="Vulnerability Database" 
    description="Comprehensive database of known vulnerabilities and their fixes."
  />
);

export const Events = () => (
  <PlaceholderPage 
    title="Security Events" 
    description="Workshops, conferences, and community events focused on Web3 security."
  />
);

export const Challenges = () => (
  <PlaceholderPage 
    title="Security Challenges" 
    description="Test your skills with hands-on security challenges and competitions."
  />
);

export const Leaderboard = () => (
  <PlaceholderPage 
    title="Expert Leaderboard" 
    description="Rankings of top security experts based on contributions and expertise."
  />
);

export const SecurityInsights = () => (
  <PlaceholderPage 
    title="Security Insights" 
    description="Real-time analysis and insights into Web3 security trends."
  />
);

export const VulnerabilityScanner = () => (
  <PlaceholderPage 
    title="Vulnerability Scanner" 
    description="Automated scanning tool for identifying security vulnerabilities."
  />
);

export const PlatformReports = () => (
  <PlaceholderPage 
    title="Platform Reports" 
    description="Comprehensive security reports and analytics for your projects."
  />
);

export const FileManagement = () => (
  <PlaceholderPage 
    title="File Management" 
    description="Secure file upload, storage, and sharing for audit materials."
  />
);

export const Careers = () => (
  <PlaceholderPage 
    title="Careers at Hawkly" 
    description="Join our mission to secure the Web3 ecosystem. Explore open positions."
  />
);

export const BusinessPricing = () => (
  <PlaceholderPage 
    title="Enterprise Pricing" 
    description="Custom pricing solutions for enterprise clients and large-scale projects."
  />
);

export const Partners = () => (
  <PlaceholderPage 
    title="Partner Program" 
    description="Join our partner network and grow your security practice with Hawkly."
  />
);

export const Support = () => (
  <PlaceholderPage 
    title="Support Center" 
    description="Get help with our platform, services, and technical support."
  />
);

export const Documentation = () => (
  <PlaceholderPage 
    title="Platform Documentation" 
    description="Technical documentation for using the Hawkly platform and APIs."
  />
);

export const Profile = () => (
  <PlaceholderPage 
    title="User Profile" 
    description="Manage your profile, credentials, and platform settings."
  />
);

export const Settings = () => (
  <PlaceholderPage 
    title="Account Settings" 
    description="Configure your account preferences and security settings."
  />
);

export default PlaceholderPage;
