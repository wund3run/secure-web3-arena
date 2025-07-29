
import React from 'react';
import { Badge } from '@/components/ui/badge';

const features = [
  "Smart contract audits",
  "NFT & DeFi security checks",
  "Automated vulnerability scanning",
  "Customizable audit scopes",
  "Multi-chain support",
  "Audit history & analytics",
  "Secure document sharing",
  "24/7 support"
];

export function FeaturesGlanceSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Features at a Glance</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Everything you need for comprehensive Web3 security
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <Badge 
              key={index} 
              variant="secondary" 
              className="text-base py-2 px-4 bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              {feature}
            </Badge>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-lg font-semibold text-muted-foreground">
            Trusted by Leading Web3 Projects
          </p>
          <div className="mt-6 text-sm text-muted-foreground">
            [Project Logos Carousel - Integration pending]
          </div>
        </div>
      </div>
    </section>
  );
}
