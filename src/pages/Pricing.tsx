import React, { useState } from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, ArrowRight, IndianRupee, DollarSign, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Pricing() {
  const [currency, setCurrency] = useState<'USD' | 'INR'>('INR');
  const [exchangeRate] = useState(86.00); // Current USD to INR rate

  const plans = [
    {
      name: "Smart Contract Audit",
      priceUSD: 1500,
      priceINR: 129000,
      duration: "5-7 days",
      description: "Comprehensive security audit for smart contracts up to 1000 lines of code",
      features: [
        "Automated vulnerability scanning",
        "Manual code review by certified auditors",
        "Gas optimization analysis",
        "Detailed security report",
        "Fix verification",
        "30-day support"
      ],
      popular: false,
      category: "basic"
    },
    {
      name: "DeFi Protocol Audit",
      priceUSD: 12000,
      priceINR: 1032000,
      duration: "7-10 days",
      description: "Complete security assessment for DeFi protocols and complex dApps",
      features: [
        "Multi-contract system analysis",
        "Economic model review",
        "Flash loan attack simulation",
        "Governance mechanism audit",
        "Integration testing",
        "Post-deployment monitoring setup"
      ],
      popular: true,
      category: "comprehensive"
    },
    {
      name: "Enterprise Security Suite",
      priceUSD: 100000,
      priceINR: 8600000,
      duration: "14-21 days",
      description: "Full-scale security assessment for enterprise blockchain solutions",
      features: [
        "Complete ecosystem audit",
        "Infrastructure security review",
        "Compliance assessment",
        "Emergency response plan",
        "24/7 monitoring setup",
        "Team training sessions"
      ],
      popular: false,
      category: "enterprise"
    }
  ];

  const convertPrice = (usdPrice: number) => {
    return currency === 'USD' ? usdPrice : Math.round(usdPrice * exchangeRate);
  };

  const formatPrice = (price: number) => {
    if (currency === 'USD') {
      return `$${price.toLocaleString()}`;
    }
    return `₹${price.toLocaleString('en-IN')}`;
  };

  return (
    <StandardLayout 
      title="Pricing - Web3 Security Audits" 
      description="Professional Web3 security audit pricing in INR and USD"
    >
      <div className="container py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Transparent Security Audit Pricing</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
            Professional Web3 security audits by certified experts. Choose the package that fits your project needs.
          </p>
          
          <div className="flex justify-center items-center gap-4 mb-8">
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
            <div className="text-sm text-muted-foreground">
              Rate: 1 USD = ₹{exchangeRate}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => (
            <Card key={index} className={`hover:shadow-lg transition-shadow ${plan.popular ? 'ring-2 ring-primary border-primary' : ''}`}>
              <CardHeader>
                {plan.popular && (
                  <Badge className="w-fit mb-4 bg-primary text-primary-foreground">Most Popular</Badge>
                )}
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <div className="text-3xl font-bold text-primary">
                  {formatPrice(convertPrice(plan.priceUSD))}
                </div>
                <div className="text-sm text-muted-foreground">{plan.duration}</div>
                <CardDescription className="mt-2">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="space-y-3">
                  <Button className="w-full" variant={plan.popular ? "default" : "outline"} asChild>
                    <Link to="/request-audit">
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full" asChild>
                    <Link to="/pricing-calculator">
                      <Calculator className="mr-2 h-4 w-4" />
                      Calculate Custom Price
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-muted/50 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Why Choose Hawkly Security?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <h3 className="font-semibold mb-2">Certified Experts</h3>
              <p className="text-sm text-muted-foreground">
                Our auditors are certified by leading security organizations
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold mb-2">Fast Turnaround</h3>
              <p className="text-sm text-muted-foreground">
                Most audits completed within 7-14 days
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold mb-2">24/7 Support</h3>
              <p className="text-sm text-muted-foreground">
                Round-the-clock support throughout the audit process
              </p>
            </div>
          </div>
        </div>

        <div className="bg-primary/5 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">Need a Custom Quote?</h3>
          <p className="text-muted-foreground mb-4">
            For large projects or ongoing security partnerships, we offer custom pricing.
          </p>
          <Button asChild>
            <Link to="/contact">Get Custom Quote</Link>
          </Button>
        </div>
      </div>
    </StandardLayout>
  );
}
