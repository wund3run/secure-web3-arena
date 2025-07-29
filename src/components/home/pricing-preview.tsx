
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, IndianRupee } from 'lucide-react';

const PRICING_TIERS = [
  {
    name: "Smart Contract Audit",
    price: "From $2,500",
    priceINR: "From ₹2,08,250",
    description: "Perfect for individual contracts",
    features: [
      "Manual security review",
      "Automated vulnerability scanning", 
      "Detailed security report",
      "Remediation guidance",
      "5-7 day delivery"
    ],
    popular: false
  },
  {
    name: "Protocol Audit",
    price: "From $15,000",
    priceINR: "From ₹12,49,500", 
    description: "Comprehensive for DeFi protocols",
    features: [
      "Multi-contract audit",
      "Economic model review",
      "Gas optimization",
      "Post-audit support",
      "Priority matching",
      "3-5 day delivery"
    ],
    popular: true
  },
  {
    name: "Enterprise Security",
    price: "Custom",
    priceINR: "Custom Pricing",
    description: "End-to-end security solutions",
    features: [
      "Continuous monitoring",
      "Dedicated security team",
      "Custom security frameworks",
      "Compliance assistance",
      "24/7 support",
      "1-3 day delivery"
    ],
    popular: false
  }
];

export function PricingPreview() {
  return (
    <section className="py-16 bg-muted/20">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Transparent Pricing</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Professional Web3 security audits with clear pricing. No hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {PRICING_TIERS.map((tier, index) => (
            <Card 
              key={index} 
              className={`relative ${tier.popular ? 'border-primary shadow-lg scale-105' : 'border'}`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                  <div className="text-2xl font-bold text-primary mb-1">{tier.price}</div>
                  <div className="flex items-center justify-center text-lg text-muted-foreground mb-2">
                    <IndianRupee className="h-4 w-4 mr-1" />
                    {tier.priceINR}
                  </div>
                  <p className="text-muted-foreground text-sm">{tier.description}</p>
                </div>

                <ul className="space-y-3 mb-6">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  asChild 
                  className="w-full" 
                  variant={tier.popular ? "default" : "outline"}
                >
                  <Link to="/request-audit">
                    Get Started
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button asChild variant="outline">
            <Link to="/pricing" className="flex items-center">
              View Detailed Pricing <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
