
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X, Zap, Shield, Star } from 'lucide-react';
import { StructuredData, organizationData, serviceData } from '@/components/seo/StructuredData';

const PricingPage = () => {
  const plans = [
    {
      name: "Basic Security Audit",
      price: "$2,999",
      duration: "5-7 days",
      features: [
        "Smart contract security review",
        "Basic vulnerability assessment",
        "Standard audit report",
        "Email support",
        "1 revision round"
      ],
      excluded: [
        "Advanced threat modeling",
        "Gas optimization analysis",
        "Priority support"
      ],
      popular: false,
      cta: "Get Started"
    },
    {
      name: "Professional Security Audit",
      price: "$7,999",
      duration: "10-14 days",
      features: [
        "Comprehensive security audit",
        "Advanced vulnerability testing",
        "Detailed security report",
        "Gas optimization analysis",
        "Threat modeling assessment",
        "Priority support",
        "2 revision rounds",
        "Post-audit consultation"
      ],
      excluded: [
        "24/7 emergency support"
      ],
      popular: true,
      cta: "Most Popular"
    },
    {
      name: "Enterprise Security Suite",
      price: "Custom",
      duration: "2-4 weeks",
      features: [
        "Full security ecosystem audit",
        "Custom security framework",
        "Ongoing security monitoring",
        "24/7 emergency support",
        "Dedicated security team",
        "Custom reporting dashboard",
        "Unlimited revisions",
        "Training and workshops",
        "Compliance certification support"
      ],
      excluded: [],
      popular: false,
      cta: "Contact Sales"
    }
  ];

  const addOns = [
    {
      name: "Gas Optimization",
      price: "$1,500",
      description: "Comprehensive gas usage optimization and cost reduction analysis"
    },
    {
      name: "Formal Verification",
      price: "$3,000",
      description: "Mathematical proof of contract correctness using formal methods"
    },
    {
      name: "Economic Analysis",
      price: "$2,500",
      description: "Tokenomics and economic security model evaluation"
    },
    {
      name: "Emergency Response",
      price: "$5,000/year",
      description: "24/7 incident response and security emergency support"
    }
  ];

  return (
    <StandardLayout
      title="Pricing | Hawkly"
      description="Transparent pricing for professional Web3 security audits and services"
    >
      <StructuredData type="Service" data={serviceData} />
      <StructuredData type="Organization" data={organizationData} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="px-4 py-2 mb-4">
            <Shield className="h-4 w-4 mr-2" />
            Transparent Pricing
          </Badge>
          <h1 className="text-4xl font-bold text-hawkly-gradient mb-4">
            Security Audit Pricing
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional Web3 security audits with transparent pricing. No hidden fees, 
            clear timelines, and guaranteed quality.
          </p>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="text-center">
            <div className="text-2xl font-bold text-hawkly-primary">500+</div>
            <p className="text-sm text-muted-foreground">Audits Completed</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-hawkly-primary">$50M+</div>
            <p className="text-sm text-muted-foreground">Assets Secured</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-hawkly-primary">99.8%</div>
            <p className="text-sm text-muted-foreground">Success Rate</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-hawkly-primary">24h</div>
            <p className="text-sm text-muted-foreground">Avg Response</p>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative hover:shadow-lg transition-shadow ${
                plan.popular ? 'border-hawkly-primary ring-2 ring-hawkly-primary/20' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-hawkly-primary text-white px-4 py-1">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl mb-2">{plan.name}</CardTitle>
                <div className="text-3xl font-bold text-hawkly-primary mb-1">
                  {plan.price}
                </div>
                <p className="text-sm text-muted-foreground">
                  Delivery: {plan.duration}
                </p>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                  
                  {plan.excluded.map((excluded, excludedIndex) => (
                    <div key={excludedIndex} className="flex items-center gap-3 opacity-50">
                      <X className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{excluded}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-hawkly-primary hover:bg-hawkly-primary/90' 
                      : ''
                  }`}
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add-ons Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Additional Services</h2>
            <p className="text-muted-foreground">
              Enhance your audit with specialized security services
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {addOns.map((addon, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{addon.name}</CardTitle>
                    <Badge variant="outline" className="text-hawkly-primary">
                      {addon.price}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{addon.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-muted/30 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-2">What's included in the audit report?</h4>
              <p className="text-muted-foreground text-sm">
                Detailed vulnerability findings, severity classifications, remediation recommendations, 
                and executive summary with risk assessment.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">How long does an audit take?</h4>
              <p className="text-muted-foreground text-sm">
                Timeline depends on code complexity. Basic audits: 5-7 days, 
                Professional: 10-14 days, Enterprise: 2-4 weeks.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Do you offer refunds?</h4>
              <p className="text-muted-foreground text-sm">
                We offer full refund if we can't identify any security improvements 
                or if you're not satisfied with the audit quality.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Can I get a custom quote?</h4>
              <p className="text-muted-foreground text-sm">
                Yes! Contact our sales team for custom enterprise solutions, 
                multi-project discounts, or specialized security requirements.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h3 className="text-3xl font-bold mb-4">Ready to Secure Your Project?</h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join hundreds of projects that trust Hawkly for their security needs. 
            Get started with a free consultation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-hawkly-primary hover:bg-hawkly-primary/90">
              <Zap className="h-4 w-4 mr-2" />
              Start Free Consultation
            </Button>
            <Button size="lg" variant="outline">
              Contact Sales Team
            </Button>
          </div>
        </div>
      </div>
    </StandardLayout>
  );
};

export default PricingPage;
