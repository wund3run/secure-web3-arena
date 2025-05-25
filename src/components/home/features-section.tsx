
import React from 'react';
import { Shield, Zap, Users, Globe, Lock, Award } from 'lucide-react';

export function FeaturesSection() {
  const features = [
    {
      icon: Shield,
      title: "Comprehensive Security Audits",
      description: "Get thorough security reviews from verified experts who understand the latest Web3 vulnerabilities and attack vectors."
    },
    {
      icon: Zap,
      title: "Fast Turnaround Times",
      description: "Connect with auditors who can deliver high-quality results within your project timeline requirements."
    },
    {
      icon: Users,
      title: "Verified Expert Network",
      description: "Work with thoroughly vetted security professionals with proven track records in blockchain security."
    },
    {
      icon: Globe,
      title: "Multi-Chain Support",
      description: "Find experts specialized in various blockchain ecosystems including Ethereum, Solana, Polygon, and more."
    },
    {
      icon: Lock,
      title: "Secure Escrow System",
      description: "Protected payments through our smart contract escrow system ensuring fair compensation for all parties."
    },
    {
      icon: Award,
      title: "Quality Assurance",
      description: "Every audit goes through our quality review process to ensure comprehensive coverage and actionable insights."
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
            Why Choose Hawkly?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our platform connects you with the best security experts in Web3, ensuring your smart contracts are thoroughly audited and secure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="relative p-6 bg-card rounded-lg border shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-foreground">
                    {feature.title}
                  </h3>
                </div>
              </div>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
