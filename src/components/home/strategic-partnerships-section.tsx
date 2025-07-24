
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Globe, 
  Code, 
  Zap, 
  Shield, 
  ArrowRight,
  Building,
  Layers,
  Users,
  Rocket
} from 'lucide-react';

const PARTNERSHIPS = [
  {
    category: "Development Tools",
    partners: ["Hardhat", "Foundry", "Remix", "Truffle"],
    description: "Seamless integration with your existing workflow",
    icon: Code,
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    category: "Blockchain Foundations", 
    partners: ["Ethereum", "Polygon", "Arbitrum", "Optimism"],
    description: "Official partnerships for enhanced security",
    icon: Layers,
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  },
  {
    category: "Accelerators & VCs",
    partners: ["Y Combinator", "Binance Labs", "Coinbase Ventures"],
    description: "Priority access for portfolio companies",
    icon: Rocket,
    color: "text-green-600",
    bgColor: "bg-green-50"
  },
  {
    category: "Enterprise Clients",
    partners: ["Fortune 500", "DeFi Protocols", "Layer 2 Networks"],
    description: "Trusted by industry leaders worldwide",
    icon: Building,
    color: "text-orange-600",
    bgColor: "bg-orange-50"
  }
];

const INTEGRATION_FEATURES = [
  {
    title: "One-Click Audit Requests",
    description: "Request audits directly from your IDE or deployment pipeline",
    icon: Zap
  },
  {
    title: "Automated Security Monitoring",
    description: "Continuous scanning integrated with your CI/CD workflows",
    icon: Shield
  },
  {
    title: "White-Label Solutions",
    description: "Security firms can offer Hawkly under their own brand",
    icon: Users
  },
  {
    title: "API-First Architecture",
    description: "Build custom integrations with our comprehensive API",
    icon: Globe
  }
];

export function StrategicPartnershipsSection() {
  return (
    <section className="py-16 bg-muted/20">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
            <Users className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">Strategic Distribution Partnerships</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Integrated Into Every Workflow
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're building the infrastructure to make security audits as easy as deploying code. 
            Our partnerships ensure Hawkly is wherever developers build.
          </p>
        </div>

        {/* Partnership Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {PARTNERSHIPS.map((partnership, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-all border-2 hover:border-primary/20">
              <div className="flex items-center mb-4">
                <div className={`p-3 rounded-lg ${partnership.bgColor} mr-4`}>
                  <partnership.icon className={`h-6 w-6 ${partnership.color}`} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{partnership.category}</h3>
                  <p className="text-sm text-muted-foreground">{partnership.description}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {partnership.partners.map((partner, partnerIndex) => (
                  <div 
                    key={partnerIndex} 
                    className="px-3 py-1 bg-background border rounded-full text-xs font-medium"
                  >
                    {partner}
                  </div>
                ))}
                <div className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-xs font-medium">
                  +{Math.floor(Math.random() * 20) + 10} more
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Integration Features */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Built for Integration</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {INTEGRATION_FEATURES.map((feature, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-all">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <h4 className="font-semibold mb-2">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Partnership CTA */}
        <div className="bg-card rounded-xl p-8 border-2 border-primary/10">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">Scale With Us</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Whether you're a tool provider, blockchain foundation, or enterprise client, 
              let's build the future of Web3 security together.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <h4 className="font-semibold mb-2">Tool Providers</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Integrate security into your development tools
              </p>
              <Button asChild variant="outline" size="sm">
                <Link to="/docs" className="flex items-center">
                  View API Docs <ArrowRight className="ml-2 h-3 w-3" />
                </Link>
              </Button>
            </div>
            
            <div className="text-center">
              <h4 className="font-semibold mb-2">Enterprise Clients</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Custom security solutions for your organization
              </p>
              <Button asChild variant="outline" size="sm">
                <Link to="/contact" className="flex items-center">
                  Contact Sales <ArrowRight className="ml-2 h-3 w-3" />
                </Link>
              </Button>
            </div>
            
            <div className="text-center">
              <h4 className="font-semibold mb-2">Investors & Accelerators</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Portfolio company benefits and partnerships
              </p>
              <Button asChild variant="outline" size="sm">
                <Link to="/contact" className="flex items-center">
                  Learn More <ArrowRight className="ml-2 h-3 w-3" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
