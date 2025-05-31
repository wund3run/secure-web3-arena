
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Shield, Users, Zap, DollarSign, Search, ArrowRight, CheckCircle } from 'lucide-react';

const USER_PATHS = [
  {
    id: 'project-owner',
    title: 'Project Owner',
    subtitle: 'Need Security Help?',
    description: 'Whether you\'re a startup founder or technical lead, protect your Web3 project from vulnerabilities',
    icon: Shield,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    features: [
      { icon: Zap, text: 'AI-powered auditor matching in under 2 hours' },
      { icon: DollarSign, text: 'Smart contract escrow - pay only when satisfied' },
      { icon: CheckCircle, text: 'Continuous monitoring after launch' },
      { icon: Shield, text: 'Support for 15+ blockchain ecosystems' }
    ],
    primaryAction: {
      text: 'Get Security Audit',
      href: '/request-audit',
      className: 'bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90'
    },
    secondaryAction: {
      text: 'Browse Auditors',
      href: '/marketplace'
    }
  },
  {
    id: 'security-expert',
    title: 'Security Expert',
    subtitle: 'Ready to Audit?',
    description: 'Join our verified network of top security professionals and earn competitive rates',
    icon: Users,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    features: [
      { icon: Search, text: 'Get matched with quality projects instantly' },
      { icon: DollarSign, text: 'Earn competitive rates with secure payments' },
      { icon: CheckCircle, text: 'Build reputation with verified credentials' },
      { icon: Zap, text: 'Access cutting-edge security tools' }
    ],
    primaryAction: {
      text: 'Join as Expert',
      href: '/auditor-onboarding',
      className: 'bg-gradient-to-r from-green-600 to-teal-600 hover:opacity-90'
    },
    secondaryAction: {
      text: 'View Opportunities',
      href: '/audits'
    }
  }
];

const STATS = [
  { value: '500+', label: 'Security Experts' },
  { value: '$350M+', label: 'Assets Protected' },
  { value: '12,800+', label: 'Vulnerabilities Found' },
  { value: '4.9/5', label: 'Client Satisfaction' }
];

export function UserJourneySection() {
  return (
    <section className="py-16 bg-muted/20">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Path</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Whether you're securing your project or offering expertise, we've got you covered
          </p>
        </div>

        {/* User Paths */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {USER_PATHS.map((path) => (
            <Card key={path.id} className="relative overflow-hidden border-2 hover:border-primary/20 transition-all hover:shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className={`p-3 rounded-xl ${path.iconBg}`}>
                    <path.icon className={`h-6 w-6 ${path.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{path.title}</h3>
                    <p className="text-muted-foreground">{path.subtitle}</p>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6">{path.description}</p>

                <div className="space-y-3 mb-8">
                  {path.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <feature.icon className={`h-4 w-4 ${path.iconColor}`} />
                      <span className="text-sm">{feature.text}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <Button asChild size="lg" className={`w-full ${path.primaryAction.className}`}>
                    <Link to={path.primaryAction.href} className="flex items-center justify-center">
                      {path.primaryAction.text}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="w-full">
                    <Link to={path.secondaryAction.href}>
                      {path.secondaryAction.text}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
