
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Search, FileCheck, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: "Find Expert Auditors",
    description: "Browse our verified network of security professionals or let our AI match you with the perfect auditor for your project."
  },
  {
    icon: Shield,
    title: "Secure Escrow Setup",
    description: "Set up milestone-based payments with our smart contract escrow system for complete protection and transparency."
  },
  {
    icon: FileCheck,
    title: "Comprehensive Audit",
    description: "Receive detailed security reports with vulnerability assessments, recommendations, and verification of fixes."
  },
  {
    icon: CheckCircle,
    title: "Ongoing Protection",
    description: "Get continuous monitoring and support to keep your project secure as it grows and evolves."
  }
];

export function HowItWorksSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How Hawkly Works</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get your Web3 project audited by top security experts in four simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card key={index} className="relative text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="mb-4">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <step.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
