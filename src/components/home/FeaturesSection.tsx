
import React from 'react';
import { Shield, Zap, Users, Lock, Globe, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function FeaturesSection() {
  const features = [
    {
      icon: Shield,
      title: 'Expert Auditors',
      description: 'Access to vetted security professionals with proven track records in Web3 security.',
      highlights: ['500+ Certified Auditors', 'Rigorous Vetting Process', 'Continuous Performance Monitoring']
    },
    {
      icon: Zap,
      title: 'AI-Powered Matching',
      description: 'Smart algorithms match your project with the most suitable auditors based on expertise and requirements.',
      highlights: ['Instant Matching', 'Skill-Based Recommendations', 'Project Complexity Analysis']
    },
    {
      icon: Lock,
      title: 'Secure Escrow',
      description: 'Built-in escrow system ensures secure payments and milestone-based releases.',
      highlights: ['Blockchain-Based Escrow', 'Milestone Protection', 'Dispute Resolution']
    },
    {
      icon: Users,
      title: 'Collaborative Workspace',
      description: 'Integrated communication tools and project management for seamless collaboration.',
      highlights: ['Real-time Messaging', 'File Sharing', 'Progress Tracking']
    },
    {
      icon: Globe,
      title: 'Global Network',
      description: 'Connect with auditors worldwide, ensuring 24/7 availability and diverse expertise.',
      highlights: ['Worldwide Coverage', '24/7 Support', 'Multi-timezone Coordination']
    },
    {
      icon: CheckCircle,
      title: 'Quality Assurance',
      description: 'Comprehensive review process and quality metrics ensure top-tier audit deliverables.',
      highlights: ['Quality Metrics', 'Peer Review Process', 'Standardized Reports']
    }
  ];

  return (
    <section className="py-24">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need for Web3 Security
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive platform provides all the tools and connections you need to secure your blockchain projects effectively.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{feature.description}</p>
                <div className="space-y-2">
                  {feature.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
