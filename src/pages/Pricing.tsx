
import { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { EnhancedTooltip } from "@/components/ui/enhanced-tooltip";
import { Check, Shield, Zap, Star } from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [showEnterprise, setShowEnterprise] = useState(false);

  const pricingTiers = [
    {
      name: "Starter",
      description: "For projects just getting started with security",
      price: isAnnual ? 99 : 129,
      billingPeriod: "month",
      discountBadge: isAnnual ? "Save 23%" : null,
      features: [
        "Security assessment requests",
        "3 marketplace providers",
        "Basic vulnerability reports",
        "Community support",
        "7-day audit turnaround",
      ],
      cta: "Start Free Trial",
      icon: <Shield className="h-6 w-6" />,
      popular: false,
      trialDays: 14,
    },
    {
      name: "Professional",
      description: "For established projects requiring comprehensive security",
      price: isAnnual ? 299 : 349,
      billingPeriod: "month",
      discountBadge: isAnnual ? "Save 14%" : null,
      features: [
        "Everything in Starter",
        "Unlimited marketplace providers",
        "Detailed vulnerability reports",
        "Priority support",
        "3-day audit turnaround",
        "Escrow payment protection",
        "Continuous monitoring (3 contracts)",
      ],
      cta: "Start Free Trial",
      icon: <Zap className="h-6 w-6" />,
      popular: true,
      trialDays: 14,
    },
    {
      name: "Enterprise",
      description: "For large-scale projects with advanced security needs",
      price: showEnterprise ? (isAnnual ? 599 : 699) : null,
      billingPeriod: "month",
      discountBadge: isAnnual ? "Save 14%" : null,
      features: [
        "Everything in Professional",
        "Custom audit workflows",
        "Dedicated security advisor",
        "24-hour emergency response",
        "White-glove onboarding",
        "Continuous monitoring (unlimited)",
        "Security integration APIs",
        "On-chain reputation verification",
      ],
      cta: showEnterprise ? "Start Free Trial" : "Contact Sales",
      icon: <Star className="h-6 w-6" />,
      popular: false,
      trialDays: showEnterprise ? 30 : null,
      onClickCta: showEnterprise ? undefined : () => setShowEnterprise(true)
    },
  ];

  return (
    <>
      <Helmet>
        <title>Pricing | Hawkly - Web3 Security Platform</title>
        <meta 
          name="description" 
          content="Flexible pricing plans for projects of all sizes. Start with a free trial and scale your Web3 security as you grow."
        />
      </Helmet>
      
      <Navbar />
      
      <main className="min-h-screen bg-gradient-to-br from-white via-primary/5 to-secondary/5 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block">
              <Badge variant="outline" className="mb-4 py-1 px-3 text-primary border-primary/30 bg-primary/5">
                14-day free trial on all plans
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Security Plans for Every Project</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From startups to enterprise protocols, choose the right security plan for your needs.
            </p>
            
            {/* Billing toggle */}
            <div className="flex items-center justify-center mt-8 gap-3">
              <span className={`text-sm font-medium ${!isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
                Monthly
              </span>
              <Switch
                checked={isAnnual}
                onCheckedChange={setIsAnnual}
                id="billing-toggle"
              />
              <div className="flex items-center gap-2">
                <span className={`text-sm font-medium ${isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
                  Annual
                </span>
                {isAnnual && (
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-green-200">
                    2 months free
                  </Badge>
                )}
              </div>
            </div>
          </div>
          
          {/* Pricing cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-12">
            {pricingTiers.map((tier) => (
              <div 
                key={tier.name} 
                className={`relative flex flex-col rounded-2xl border bg-card shadow-sm transition-all duration-200 hover:shadow-md ${
                  tier.popular ? 'border-primary/50 ring-1 ring-primary/20 md:scale-105' : ''
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-0 right-0 mx-auto w-32">
                    <Badge className="w-full bg-primary py-1">Most Popular</Badge>
                  </div>
                )}
                
                <div className="p-6 md:p-8">
                  <div className="mb-5 flex items-center gap-3">
                    <div className={`rounded-full p-1.5 ${tier.popular ? 'bg-primary/10' : 'bg-muted'}`}>
                      {tier.icon}
                    </div>
                    <h3 className="text-xl font-bold">{tier.name}</h3>
                    {tier.discountBadge && (
                      <Badge variant="outline" className="ml-auto bg-green-50 text-green-700 border-green-200">
                        {tier.discountBadge}
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-muted-foreground mb-5 min-h-[50px]">{tier.description}</p>
                  
                  <div className="mb-6">
                    {tier.price !== null ? (
                      <>
                        <span className="text-4xl font-bold">${tier.price}</span>
                        <span className="text-muted-foreground">/{tier.billingPeriod}</span>
                        {isAnnual && (
                          <div className="text-sm text-muted-foreground mt-1">
                            Billed annually (${tier.price * 12})
                          </div>
                        )}
                      </>
                    ) : (
                      <span className="text-3xl font-bold">Custom Pricing</span>
                    )}
                  </div>
                  
                  <Button 
                    className={`w-full ${
                      tier.popular 
                        ? 'bg-gradient-to-r from-primary to-secondary hover:opacity-90' 
                        : ''
                    }`}
                    onClick={tier.onClickCta}
                  >
                    {tier.cta}
                  </Button>
                  
                  {tier.trialDays && (
                    <div className="text-center mt-2 text-sm text-muted-foreground">
                      {tier.trialDays}-day free trial, no credit card required
                    </div>
                  )}
                </div>
                
                <div className="border-t p-6 md:p-8">
                  <p className="font-medium mb-3">What's included:</p>
                  <ul className="space-y-3">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          
          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto mt-24">
            <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-medium mb-2">Can I switch plans later?</h3>
                <p className="text-muted-foreground">
                  Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll get immediate access to the new features. When downgrading, the changes take effect at the end of your billing cycle.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-2">What payment methods do you accept?</h3>
                <p className="text-muted-foreground">
                  We accept major credit cards, cryptocurrency payments (ETH, USDC, DAI), and wire transfers for annual enterprise plans.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-2">Is there a contract or commitment?</h3>
                <p className="text-muted-foreground">
                  No long-term contracts. Monthly plans can be canceled anytime. Annual plans can be canceled but are non-refundable after the first 14 days.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-2">Do I need to enter payment info for the free trial?</h3>
                <p className="text-muted-foreground">
                  No, you can start your free trial without entering any payment information. We'll notify you before the trial ends so you can decide if you want to continue.
                </p>
              </div>
            </div>
          </div>
          
          {/* CTA */}
          <div className="mt-24 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 md:p-10 max-w-5xl mx-auto">
            <div className="md:flex items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-3">Ready to secure your Web3 project?</h2>
                <p className="text-muted-foreground">
                  Start your free trial today and discover how Hawkly can protect your blockchain assets.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-primary">Start Free Trial</Button>
                <Button size="lg" variant="outline">Schedule Demo</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}
