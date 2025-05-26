
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Zap, Users, DollarSign, Clock, Award } from 'lucide-react';

const VALUE_PROPS = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Get matched with expert auditors in under 2 hours",
    stat: "67% faster",
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    icon: Shield,
    title: "Bulletproof Security",
    description: "Smart contract escrow ensures secure payments",
    stat: "100% protected",
    color: "text-green-600",
    bgColor: "bg-green-50"
  },
  {
    icon: DollarSign,
    title: "Transparent Pricing",
    description: "No hidden fees, clear fixed rates from day one",
    stat: "43% savings",
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  }
];

const COMPARISON_METRICS = [
  { label: "Response Time", hawkly: "< 2 hours", others: "3-7 days" },
  { label: "Payment Security", hawkly: "Smart Contract Escrow", others: "Traditional Contracts" },
  { label: "Multi-Chain Support", hawkly: "15+ Blockchains", others: "2-3 Chains" },
  { label: "AI Matching", hawkly: "Instant Expert Matching", others: "Manual Assignment" }
];

export function ValuePropositionSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-background to-muted/10">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Hawkly Changes Everything
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We've reimagined Web3 security from the ground up. Here's how we deliver 
            what traditional audit firms and competitor platforms simply can't.
          </p>
        </div>

        {/* Core Value Props */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {VALUE_PROPS.map((prop, index) => (
            <Card key={index} className="relative overflow-hidden border-2 hover:border-primary/20 transition-all hover:shadow-lg">
              <CardContent className="p-6">
                <div className={`inline-flex p-3 rounded-lg ${prop.bgColor} mb-4`}>
                  <prop.icon className={`h-6 w-6 ${prop.color}`} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{prop.title}</h3>
                <p className="text-muted-foreground mb-4">{prop.description}</p>
                <div className={`text-2xl font-bold ${prop.color}`}>{prop.stat}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Comparison */}
        <div className="bg-card rounded-xl p-8 border-2 border-primary/10">
          <h3 className="text-2xl font-bold text-center mb-8">Hawkly vs Traditional Platforms</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {COMPARISON_METRICS.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="font-semibold text-sm text-muted-foreground mb-2">{metric.label}</div>
                <div className="bg-primary/10 rounded-lg p-3 mb-2">
                  <div className="text-sm font-medium text-primary">Hawkly</div>
                  <div className="text-xs">{metric.hawkly}</div>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="text-sm font-medium text-muted-foreground">Others</div>
                  <div className="text-xs text-muted-foreground">{metric.others}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
