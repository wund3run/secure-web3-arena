
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Shield, 
  Users, 
  Workflow, 
  Zap, 
  Bell, 
  MessageCircle, 
  Star, 
  CreditCard 
} from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: "Comprehensive Security Audits",
    description: "Protect your blockchain, DeFi, and NFT projects with rigorous, industry-leading audits."
  },
  {
    icon: Users,
    title: "Elite Auditor Network",
    description: "Access a global pool of verified, experienced Web3 security experts."
  },
  {
    icon: Workflow,
    title: "Seamless Workflow",
    description: "Submit projects, track progress, and communicate—all in one intuitive dashboard."
  },
  {
    icon: Zap,
    title: "Instant Matching",
    description: "Our smart algorithm connects you with the best auditor for your specific needs."
  },
  {
    icon: Bell,
    title: "Real-Time Notifications",
    description: "Stay updated on every milestone and message."
  },
  {
    icon: MessageCircle,
    title: "Built-In Chat & Collaboration",
    description: "Direct, secure communication between project owners and auditors."
  },
  {
    icon: Star,
    title: "Transparent Ratings & Reviews",
    description: "Make informed choices with verified feedback and auditor profiles."
  },
  {
    icon: CreditCard,
    title: "Fast, Secure Payments",
    description: "Escrow-protected, crypto-friendly, and instant."
  }
];

export function WhyHawklySection() {
  return (
    <section className="py-20 bg-background">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Hawkly?</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The most comprehensive Web3 security platform built for modern blockchain projects
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow border-2 hover:border-primary/20">
              <CardContent className="p-0">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
