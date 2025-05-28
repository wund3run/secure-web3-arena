
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Check, Star, Shield, Zap, Users, Crown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

export default function Pricing() {
  const plans = [
    {
      name: "Starter Audit",
      icon: <Shield className="h-6 w-6" />,
      price: "$2,500",
      priceRange: "$2,500 - $5,000",
      description: "Perfect for small projects and individual developers",
      features: [
        "Up to 500 lines of code",
        "Basic vulnerability assessment", 
        "1-2 smart contracts",
        "Standard report delivery (5-7 days)",
        "Email support",
        "Basic remediation guidance"
      ],
      popular: false,
      cta: "Get Started"
    },
    {
      name: "Professional Audit", 
      icon: <Star className="h-6 w-6" />,
      price: "$7,500",
      priceRange: "$5,000 - $15,000",
      description: "Comprehensive audits for production-ready projects",
      features: [
        "Up to 2,000 lines of code",
        "Comprehensive security analysis",
        "Up to 10 smart contracts", 
        "Priority delivery (3-5 days)",
        "24/7 chat support",
        "Detailed remediation plan",
        "Post-audit verification",
        "Security badge for marketing"
      ],
      popular: true,
      cta: "Most Popular"
    },
    {
      name: "Enterprise Audit",
      icon: <Crown className="h-6 w-6" />,
      price: "$25,000",
      priceRange: "$15,000 - $50,000+", 
      description: "Complete security solutions for large-scale projects",
      features: [
        "Unlimited lines of code",
        "Full ecosystem security audit",
        "Unlimited smart contracts",
        "Express delivery (1-3 days)",
        "Dedicated security manager",
        "Custom security framework",
        "Ongoing monitoring setup",
        "Emergency response plan",
        "Compliance documentation",
        "Team security training"
      ],
      popular: false,
      cta: "Contact Sales"
    }
  ];

  const additionalServices = [
    {
      title: "Continuous Monitoring",
      price: "From $500/month",
      description: "24/7 automated monitoring of your deployed contracts",
      icon: <Zap className="h-5 w-5" />
    },
    {
      title: "Security Training",
      price: "From $2,000",
      description: "Comprehensive security training for your development team",
      icon: <Users className="h-5 w-5" />
    },
    {
      title: "Emergency Response",
      price: "From $5,000",
      description: "Rapid response for security incidents and vulnerabilities",
      icon: <Shield className="h-5 w-5" />
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Security Audit Pricing | Hawkly</title>
        <meta name="description" content="Transparent pricing for professional Web3 security audits. Choose from starter, professional, or enterprise audit packages." />
      </Helmet>
      
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
            <Shield className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">Transparent Pricing</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Security Audit 
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> Pricing</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Choose the right security audit package for your project. All audits include comprehensive 
            vulnerability assessment and detailed remediation guidance.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                </div>
              )}
              
              <CardHeader className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4 mx-auto">
                  {plan.icon}
                </div>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription className="text-base">{plan.description}</CardDescription>
                <div className="mt-4">
                  <div className="text-3xl font-bold">{plan.price}</div>
                  <div className="text-sm text-muted-foreground">Starting from</div>
                  <div className="text-sm text-muted-foreground">{plan.priceRange}</div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link to="/request-audit" className="block">
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90' : ''}`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Services */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Additional Services</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {additionalServices.map((service, index) => (
              <Card key={index} className="text-center hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg mb-3 mx-auto">
                    {service.icon}
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                  <div className="text-lg font-semibold text-primary">{service.price}</div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <Button variant="outline" size="sm">Learn More</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold mb-2">How long does an audit take?</h3>
              <p className="text-muted-foreground">Audit duration depends on the complexity and size of your project. Starter audits typically take 5-7 days, Professional audits 3-5 days, and Enterprise audits 1-3 days with express service.</p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold mb-2">What's included in the audit report?</h3>
              <p className="text-muted-foreground">All audits include a comprehensive report detailing vulnerabilities found, severity ratings, and specific remediation recommendations. Professional and Enterprise audits also include post-audit verification.</p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold mb-2">Do you offer custom pricing for large projects?</h3>
              <p className="text-muted-foreground">Yes, we offer custom pricing for large-scale projects, multi-protocol audits, and ongoing security partnerships. Contact our sales team for a personalized quote.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Ready to Secure Your Project?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Get started with a professional security audit today. Our expert auditors will help identify 
            and fix vulnerabilities before you deploy to mainnet.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/request-audit">
              <Button size="lg">Request Audit</Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg">Talk to Sales</Button>
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
