
import React from 'react';
import { Code, Database, Key, Activity, MessageSquare, Layout } from 'lucide-react';

const SECURITY_SERVICES = [
  {
    icon: Code,
    title: "Smart Contract Security",
    description: "Comprehensive audits for blockchain contracts",
    color: "text-purple-600",
    bgColor: "bg-purple-600",
    features: [
      "Reentrancy protection",
      "Access control validation", 
      "Logic optimization"
    ]
  },
  {
    icon: Database,
    title: "Infrastructure Security",
    description: "Secure blockchain nodes and endpoints",
    color: "text-cyan-600", 
    bgColor: "bg-cyan-600",
    features: [
      "Node configuration hardening",
      "RPC endpoint protection",
      "DDoS mitigation strategies"
    ]
  },
  {
    icon: Key,
    title: "Key Management", 
    description: "Secure wallet and multi-signature setup",
    color: "text-red-500",
    bgColor: "bg-red-500", 
    features: [
      "Hardware security modules",
      "Multi-sig architecture",
      "Key rotation protocols"
    ]
  },
  {
    icon: Activity,
    title: "Oracle Security",
    description: "Protection against price manipulation",
    color: "text-orange-600",
    bgColor: "bg-orange-600",
    features: [
      "Price feed validation",
      "Multiple data sources", 
      "Heartbeat monitoring"
    ]
  },
  {
    icon: MessageSquare,
    title: "API Security",
    description: "Secure Web2-Web3 connections",
    color: "text-green-600",
    bgColor: "bg-green-600",
    features: [
      "Message signing verification",
      "Rate limiting",
      "Authentication best practices"
    ]
  },
  {
    icon: Layout,
    title: "Frontend Security",
    description: "Protection for web interfaces",
    color: "text-blue-600", 
    bgColor: "bg-blue-600",
    features: [
      "Wallet connection validation",
      "Transaction simulation",
      "User interface safeguards"
    ]
  }
];

export function ComprehensiveSecurity() {
  return (
    <section className="py-16 border-t">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Complete Security Coverage</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            End-to-end security solutions for every layer of your Web3 application
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SECURITY_SERVICES.map((service, index) => (
            <div key={index} className="bg-card border rounded-lg p-6 hover:shadow-md transition-all">
              <div className="flex items-center mb-4">
                <service.icon className={`h-6 w-6 ${service.color} mr-2`} />
                <h3 className="text-xl font-semibold">{service.title}</h3>
              </div>
              <p className="mb-4 text-muted-foreground">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <div className={`h-2 w-2 rounded-full ${service.bgColor} mr-2`}></div>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
