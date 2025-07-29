
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, DollarSign, Users, BarChart3, Bell, MessageSquare, Zap, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RealtimeStatusIndicator } from '@/components/realtime/RealtimeStatusIndicator';

export function FeatureShowcase() {
  const features = [
    {
      icon: <DollarSign className="h-8 w-8" />,
      title: 'Smart Escrow System',
      description: 'Milestone-based payments with smart contract security',
      highlights: ['Multi-signature support', 'Automated releases', 'Dispute resolution'],
      href: '/escrow',
      status: 'live'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Real-time Collaboration',
      description: 'Live document editing and team communication',
      highlights: ['Real-time sync', 'Version control', 'Team chat'],
      href: '/collaboration',
      status: 'live'
    },
    {
      icon: <Bell className="h-8 w-8" />,
      title: 'Intelligent Notifications',
      description: 'AI-powered alerts and progress tracking',
      highlights: ['Smart routing', 'Custom rules', 'Multi-channel'],
      href: '/messages',
      status: 'live'
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: 'Advanced Analytics',
      description: 'Comprehensive insights and performance metrics',
      highlights: ['Real-time dashboards', 'Custom reports', 'Predictive analytics'],
      href: '/analytics',
      status: 'live'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Platform Features</h2>
          <p className="text-muted-foreground">
            Advanced tools for Web3 security professionals
          </p>
        </div>
        <RealtimeStatusIndicator />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="transition-all hover:shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    {feature.icon}
                  </div>
                  <div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </div>
                </div>
                <Badge variant={feature.status === 'live' ? 'default' : 'secondary'}>
                  {feature.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {feature.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm">
                    <Zap className="h-3 w-3 text-green-500" />
                    {highlight}
                  </li>
                ))}
              </ul>
              <Button asChild className="w-full">
                <Link to={feature.href}>
                  Explore {feature.title}
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-2 border-dashed">
        <CardContent className="text-center py-8">
          <Lock className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium mb-2">Enterprise Security</h3>
          <p className="text-muted-foreground mb-4">
            All features include enterprise-grade security, compliance, and audit trails
          </p>
          <div className="flex justify-center gap-2">
            <Badge variant="outline">SOC 2 Compliant</Badge>
            <Badge variant="outline">End-to-End Encrypted</Badge>
            <Badge variant="outline">Multi-factor Auth</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
