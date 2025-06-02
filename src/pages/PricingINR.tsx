
import React, { useState } from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, ArrowRight, IndianRupee, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PricingINR() {
  const [currency, setCurrency] = useState<'USD' | 'INR'>('INR');

  const plans = [
    {
      name: "Basic Audit",
      priceUSD: "$5,000",
      priceINR: "₹4,16,500",
      description: "Perfect for simple smart contracts and small projects",
      features: [
        "Up to 500 lines of code",
        "Basic security review",
        "Standard report",
        "5-7 day delivery",
        "Email support"
      ],
      popular: false
    },
    {
      name: "Comprehensive Audit",
      priceUSD: "$15,000",
      priceINR: "₹12,49,500",
      description: "Ideal for DeFi protocols and complex applications",
      features: [
        "Up to 2,000 lines of code",
        "Comprehensive security analysis",
        "Detailed report with recommendations",
        "3-5 day delivery",
        "Priority support",
        "Post-audit consultation"
      ],
      popular: true
    },
    {
      name: "Enterprise Audit",
      priceUSD: "Custom",
      priceINR: "Custom",
      description: "For large protocols and ongoing security partnerships",
      features: [
        "Unlimited lines of code",
        "Full security ecosystem review",
        "Custom reporting",
        "1-3 day delivery",
        "24/7 dedicated support",
        "Ongoing monitoring",
        "Emergency response"
      ],
      popular: false
    }
  ];

  return (
    <StandardLayout 
      title="Pricing - Indian Market" 
      description="Transparent pricing for professional Web3 security audits in India"
    >
      <div className="container py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
            Choose the audit package that fits your project needs. All plans include 
            our comprehensive security analysis by verified experts.
          </p>
          
          <div className="flex justify-center mb-8">
            <div className="flex bg-muted rounded-lg p-1">
              <Button
                variant={currency === 'USD' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setCurrency('USD')}
                className="flex items-center"
              >
                <DollarSign className="h-4 w-4 mr-1" />
                USD
              </Button>
              <Button
                variant={currency === 'INR' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setCurrency('INR')}
                className="flex items-center"
              >
                <IndianRupee className="h-4 w-4 mr-1" />
                INR
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => (
            <Card key={index} className={`hover:shadow-lg transition-shadow ${plan.popular ? 'ring-2 ring-primary' : ''}`}>
              <CardHeader>
                {plan.popular && (
                  <Badge className="w-fit mb-4">Most Popular</Badge>
                )}
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="text-3xl font-bold text-primary">
                  {currency === 'USD' ? plan.priceUSD : plan.priceINR}
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full" variant={plan.popular ? "default" : "outline"} asChild>
                  <Link to="/request-audit">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-muted/50 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-center">Why Choose Hawkly?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <h3 className="font-semibold mb-2">Local Expertise</h3>
              <p className="text-sm text-muted-foreground">
                Understanding of Indian regulatory environment and market needs
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold mb-2">Flexible Payment</h3>
              <p className="text-sm text-muted-foreground">
                Accept payments in INR, USD, and major cryptocurrencies
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold mb-2">24/7 Support</h3>
              <p className="text-sm text-muted-foreground">
                Round-the-clock support in multiple Indian languages
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            All prices are estimates. Final pricing depends on project complexity and requirements.
            <br />
            Exchange rate: 1 USD = 83.30 INR (rates may vary)
          </p>
          <Button asChild>
            <Link to="/contact">Get Custom Quote</Link>
          </Button>
        </div>
      </div>
    </StandardLayout>
  );
}
