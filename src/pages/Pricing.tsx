
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Star, Zap, Shield, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "$99",
      period: "per audit",
      description: "Perfect for small projects and individual developers",
      features: [
        "Basic smart contract audit",
        "Automated vulnerability scanning",
        "Standard security report",
        "Email support",
        "7-day turnaround"
      ],
      icon: <Shield className="h-6 w-6 text-blue-500" />,
      popular: false,
      cta: "Get Started"
    },
    {
      name: "Professional",
      price: "$299",
      period: "per audit",
      description: "Advanced security auditing for growing projects",
      features: [
        "Comprehensive smart contract audit",
        "Manual code review",
        "Advanced vulnerability scanning",
        "Detailed security report",
        "Priority support",
        "3-day turnaround",
        "Post-audit consultation"
      ],
      icon: <Star className="h-6 w-6 text-yellow-500" />,
      popular: true,
      cta: "Most Popular"
    },
    {
      name: "Enterprise",
      price: "$999",
      period: "per audit",
      description: "Complete security solution for large-scale projects",
      features: [
        "Full security audit suite",
        "Penetration testing",
        "Economic model analysis",
        "Custom security framework",
        "24/7 dedicated support",
        "1-day turnaround",
        "Ongoing security monitoring",
        "Team training sessions"
      ],
      icon: <Crown className="h-6 w-6 text-purple-500" />,
      popular: false,
      cta: "Contact Sales"
    }
  ];

  const additionalServices = [
    { name: "Code Review", price: "$150", description: "Line-by-line code analysis" },
    { name: "Penetration Testing", price: "$500", description: "Real-world attack simulation" },
    { name: "Security Consulting", price: "$200/hour", description: "Expert security guidance" },
    { name: "Emergency Audit", price: "+50%", description: "24-hour rush service" }
  ];

  return (
    <StandardLayout
      title="Pricing"
      description="Transparent pricing for Web3 security services - March 2025"
    >
      <div className="container py-12">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Transparent Pricing</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Choose the security audit plan that fits your project needs. 
            All plans include our industry-leading security expertise.
          </p>
        </div>

        {/* Main Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                </div>
              )}
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">{plan.icon}</div>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription className="text-base">{plan.description}</CardDescription>
                <div className="flex items-baseline justify-center gap-1 mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/request-audit">
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90' : ''}`}
                    variant={plan.popular ? 'default' : 'outline'}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold mb-2">{service.name}</h3>
                  <div className="text-2xl font-bold text-primary mb-2">{service.price}</div>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "What's included in a security audit?",
                answer: "Our audits include comprehensive smart contract analysis, vulnerability detection, gas optimization review, and a detailed security report with recommendations."
              },
              {
                question: "How long does an audit take?",
                answer: "Audit timeframes depend on your chosen plan and project complexity. Standard audits take 7 days, Professional takes 3 days, and Enterprise takes 1 day."
              },
              {
                question: "Do you offer custom pricing for large projects?",
                answer: "Yes! For projects requiring extensive auditing or ongoing security partnerships, we offer custom enterprise pricing. Contact our sales team for details."
              },
              {
                question: "What happens if vulnerabilities are found?",
                answer: "We provide detailed remediation guidance and offer follow-up reviews to ensure all issues are properly addressed before your project launch."
              }
            ].map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8">
          <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Ready to Secure Your Project?</h2>
          <p className="text-muted-foreground mb-6">
            Join 5,000+ projects that trust Hawkly for their Web3 security needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/request-audit">
              <Button size="lg">Start Security Audit</Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline">Contact Sales</Button>
            </Link>
          </div>
        </div>
      </div>
    </StandardLayout>
  );
};

export default Pricing;
