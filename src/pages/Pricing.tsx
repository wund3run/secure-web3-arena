
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "$1,500",
      period: "per audit",
      description: "Perfect for small projects and individual developers",
      features: [
        "Basic smart contract audit",
        "Up to 500 lines of code",
        "Standard report",
        "3-5 day turnaround",
        "Email support",
        "1 revision included"
      ],
      popular: false,
      color: "border-gray-200"
    },
    {
      name: "Professional",
      price: "$5,000",
      period: "per audit",
      description: "Ideal for growing projects and startups",
      features: [
        "Comprehensive security audit",
        "Up to 2,000 lines of code",
        "Detailed security report",
        "Gas optimization review",
        "2-3 day turnaround",
        "Priority support",
        "2 revisions included",
        "Video walkthrough"
      ],
      popular: true,
      color: "border-blue-500"
    },
    {
      name: "Enterprise",
      price: "$15,000",
      period: "per audit",
      description: "For large-scale protocols and institutions",
      features: [
        "Full security assessment",
        "Unlimited lines of code",
        "Executive summary",
        "Multiple auditor review",
        "1-2 day turnaround",
        "24/7 dedicated support",
        "Unlimited revisions",
        "Live presentation",
        "Ongoing monitoring",
        "Insurance coverage"
      ],
      popular: false,
      color: "border-purple-500"
    }
  ];

  const additionalServices = [
    {
      name: "Emergency Audit",
      price: "$2,500",
      description: "24-48 hour turnaround for critical issues",
      icon: <Zap className="h-5 w-5 text-yellow-500" />
    },
    {
      name: "Re-audit",
      price: "$500",
      description: "Follow-up audit after implementing fixes",
      icon: <Shield className="h-5 w-5 text-green-500" />
    },
    {
      name: "Continuous Monitoring",
      price: "$200",
      description: "Monthly security monitoring and alerts",
      icon: <Star className="h-5 w-5 text-blue-500" />
    }
  ];

  return (
    <>
      <Helmet>
        <title>Pricing | Hawkly</title>
        <meta name="description" content="Transparent pricing for Web3 security audits" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <div className="container mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional security audits with fixed pricing. No hidden fees, no surprises.
              Choose the plan that fits your project's needs.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.color} ${plan.popular ? 'border-2 shadow-lg' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-500 text-white px-3 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600 ml-2">{plan.period}</span>
                  </div>
                  <p className="text-gray-600 mt-2">{plan.description}</p>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    asChild 
                    className={`w-full ${plan.popular ? 'bg-blue-500 hover:bg-blue-600' : ''}`}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    <Link to="/request-audit">
                      Get Started
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Services */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Additional Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {additionalServices.map((service, index) => (
                <Card key={index}>
                  <CardContent className="p-6 text-center">
                    <div className="mb-4">{service.icon}</div>
                    <h3 className="font-semibold text-lg mb-2">{service.name}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <div className="text-2xl font-bold text-gray-900 mb-4">
                      {service.price}
                    </div>
                    <Button variant="outline" className="w-full">
                      Add to Audit
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-lg p-8">
            <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-2">What's included in an audit?</h3>
                <p className="text-gray-600 text-sm">
                  Every audit includes a comprehensive security review, detailed report with findings, 
                  and recommendations for fixes.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">How long does an audit take?</h3>
                <p className="text-gray-600 text-sm">
                  Timeline depends on your plan and project complexity. Most audits complete 
                  within 1-5 business days.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Do you offer refunds?</h3>
                <p className="text-gray-600 text-sm">
                  We offer a 100% satisfaction guarantee. If you're not happy with your audit, 
                  we'll refund your payment.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Can I upgrade my plan?</h3>
                <p className="text-gray-600 text-sm">
                  Yes, you can upgrade during the audit process. We'll apply the price difference 
                  and extend the scope.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <h2 className="text-3xl font-bold mb-4">Ready to Secure Your Project?</h2>
            <p className="text-gray-600 mb-8">
              Join thousands of projects that trust Hawkly for their security needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/request-audit">
                  Request Audit
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/contact">
                  Talk to Sales
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </>
  );
};

export default Pricing;
