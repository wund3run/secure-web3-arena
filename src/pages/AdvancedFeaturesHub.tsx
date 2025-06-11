
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, DollarSign, Users, BarChart3, Bell, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdvancedFeaturesHub() {
  const features = [
    {
      id: 'escrow',
      title: 'Escrow & Payments',
      description: 'Secure milestone-based payments with smart contracts',
      icon: <DollarSign className="h-6 w-6" />,
      status: 'active',
      route: '/escrow'
    },
    {
      id: 'collaboration',
      title: 'Real-time Collaboration',
      description: 'Live document editing and team communication',
      icon: <Users className="h-6 w-6" />,
      status: 'active',
      route: '/collaboration'
    },
    {
      id: 'notifications',
      title: 'Smart Notifications',
      description: 'AI-powered alerts and real-time updates',
      icon: <Bell className="h-6 w-6" />,
      status: 'active',
      route: '/messages'
    },
    {
      id: 'analytics',
      title: 'Advanced Analytics',
      description: 'Comprehensive dashboards and insights',
      icon: <BarChart3 className="h-6 w-6" />,
      status: 'active',
      route: '/analytics'
    }
  ];

  return (
    <StandardLayout
      title="Advanced Features Hub - Hawkly"
      description="Access powerful tools for security auditing, collaboration, and project management"
    >
      <Helmet>
        <title>Advanced Features Hub - Hawkly</title>
        <meta name="description" content="Advanced tools for security auditing including escrow payments, real-time collaboration, smart notifications, and comprehensive analytics" />
      </Helmet>

      <div className="container py-8 max-w-7xl">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Advanced Features Hub</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Powerful tools designed for Web3 security professionals and project teams
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature) => (
              <Card key={feature.id} className="transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        {feature.icon}
                      </div>
                      <div>
                        <CardTitle className="text-xl">{feature.title}</CardTitle>
                        <CardDescription>{feature.description}</CardDescription>
                      </div>
                    </div>
                    <Badge variant={feature.status === 'active' ? 'default' : 'secondary'}>
                      {feature.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link to={feature.route}>
                      Access {feature.title}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="integrations">Integrations</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Platform Security Features
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Escrow Protection</h4>
                    <p className="text-sm text-muted-foreground">
                      Smart contract-based escrow with milestone payments
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Real-time Collaboration</h4>
                    <p className="text-sm text-muted-foreground">
                      Live document editing and secure communication
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">AI-Powered Notifications</h4>
                    <p className="text-sm text-muted-foreground">
                      Smart alerts based on audit progress and findings
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Advanced Analytics</h4>
                    <p className="text-sm text-muted-foreground">
                      Comprehensive insights and performance metrics
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="integrations">
              <Card>
                <CardHeader>
                  <CardTitle>Third-party Integrations</CardTitle>
                  <CardDescription>
                    Connect with your favorite tools and services
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['Stripe', 'GitHub', 'Slack', 'Discord', 'Telegram', 'Circle', 'OpenAI', 'Ceramic'].map((integration) => (
                      <div key={integration} className="p-3 border rounded-lg text-center">
                        <div className="font-medium">{integration}</div>
                        <Badge variant="outline" className="mt-1">Available</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security & Compliance</CardTitle>
                  <CardDescription>
                    Enterprise-grade security features
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium">End-to-End Encryption</h4>
                      <p className="text-sm text-muted-foreground">
                        All communications and file transfers are encrypted
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">Multi-signature Escrow</h4>
                      <p className="text-sm text-muted-foreground">
                        Require multiple approvals for large transactions
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">Audit Trail</h4>
                      <p className="text-sm text-muted-foreground">
                        Complete history of all platform activities
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">SOC 2 Compliance</h4>
                      <p className="text-sm text-muted-foreground">
                        Meeting enterprise security standards
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="roadmap">
              <Card>
                <CardHeader>
                  <CardTitle>Feature Roadmap</CardTitle>
                  <CardDescription>
                    Upcoming enhancements and new capabilities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { feature: 'AI-Powered Code Analysis', status: 'In Development', timeline: 'Q1 2024' },
                      { feature: 'Mobile App', status: 'Planning', timeline: 'Q2 2024' },
                      { feature: 'Advanced Reporting', status: 'In Development', timeline: 'Q1 2024' },
                      { feature: 'API Marketplace', status: 'Planning', timeline: 'Q3 2024' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{item.feature}</div>
                          <div className="text-sm text-muted-foreground">{item.timeline}</div>
                        </div>
                        <Badge variant={item.status === 'In Development' ? 'default' : 'outline'}>
                          {item.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </StandardLayout>
  );
}
