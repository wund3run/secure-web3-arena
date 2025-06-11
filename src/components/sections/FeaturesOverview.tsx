
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Users, BarChart3, DollarSign, Bell, Lock } from 'lucide-react';

export function FeaturesOverview() {
  const features = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Advanced Security Audits',
      description: 'Comprehensive smart contract reviews by verified experts'
    },
    {
      icon: <DollarSign className="h-8 w-8" />,
      title: 'Secure Escrow System',
      description: 'Milestone-based payments with smart contract protection'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Real-time Collaboration',
      description: 'Live document editing and team communication tools'
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: 'Advanced Analytics',
      description: 'Comprehensive insights and performance metrics'
    },
    {
      icon: <Bell className="h-8 w-8" />,
      title: 'Smart Notifications',
      description: 'AI-powered alerts and real-time updates'
    },
    {
      icon: <Lock className="h-8 w-8" />,
      title: 'Enterprise Security',
      description: 'SOC 2 compliant with end-to-end encryption'
    }
  ];

  return (
    <section className="py-20 bg-muted/50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Platform Features</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need for professional Web3 security auditing and project management
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto p-3 bg-primary/10 rounded-lg w-fit mb-4">
                  <div className="text-primary">
                    {feature.icon}
                  </div>
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
