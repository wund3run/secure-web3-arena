
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, ArrowRight, Shield, Zap } from 'lucide-react';
import { SEOOptimization } from '@/components/seo/SEOOptimization';

const PricingPage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Hawkly Web3 Security Audits",
    "description": "Professional Web3 security audit services with transparent pricing",
    "provider": {
      "@type": "Organization",
      "name": "Hawkly"
    },
    "offers": [
      {
        "@type": "Offer",
        "name": "Basic Security Audit",
        "price": "2999",
        "priceCurrency": "USD"
      },
      {
        "@type": "Offer", 
        "name": "Professional Security Audit",
        "price": "7999",
        "priceCurrency": "USD"
      }
    ]
  };

  return (
    <>
      <SEOOptimization
        title="Transparent Pricing for Web3 Security Audits | Hawkly"
        description="Simple, transparent pricing for Web3 security audits and services. From basic smart contract audits to comprehensive enterprise security solutions."
        type="service"
        canonicalUrl="/pricing"
        structuredData={structuredData}
      />
      
      <StandardLayout
        title="Pricing | Hawkly"
        description="Transparent pricing for Web3 security audits and services"
      >
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <Badge variant="outline" className="px-4 py-2 mb-4">
              <Shield className="h-4 w-4 mr-2" />
              Transparent Pricing
            </Badge>
            <h1 className="text-4xl font-bold text-hawkly-gradient mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose the security solution that fits your project's needs and budget. 
              No hidden fees, no surprises.
            </p>
          </div>

          {/* Audit Pricing */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-center mb-8">Security Audit Pricing</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-2 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Badge variant="outline" className="w-fit mb-2">Basic</Badge>
                  <CardTitle>Essential Security</CardTitle>
                  <div className="text-3xl font-bold">$2,999</div>
                  <p className="text-muted-foreground">Perfect for small contracts and startups</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">Up to 500 lines of code</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">Security vulnerability assessment</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">Detailed report with findings</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">5-7 day delivery</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">Email support</span>
                    </li>
                  </ul>
                  <Button className="w-full group">
                    Choose Basic
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-hawkly-primary relative hover:shadow-xl transition-shadow">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-hawkly-primary flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    Most Popular
                  </Badge>
                </div>
                <CardHeader>
                  <Badge variant="outline" className="w-fit mb-2">Professional</Badge>
                  <CardTitle>Comprehensive Security</CardTitle>
                  <div className="text-3xl font-bold">$7,999</div>
                  <p className="text-muted-foreground">Complete security review for production</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">Up to 2,000 lines of code</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">Advanced security analysis</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">Gas optimization review</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">Architecture assessment</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">1-hour consultation call</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">7-10 day delivery</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">Priority support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">Free re-audit after fixes</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-hawkly-primary hover:bg-hawkly-primary/90 group">
                    Choose Professional
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Badge variant="outline" className="w-fit mb-2">Enterprise</Badge>
                  <CardTitle>Enterprise Security</CardTitle>
                  <div className="text-3xl font-bold">Custom</div>
                  <p className="text-muted-foreground">For complex protocols and large teams</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">Unlimited lines of code</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">Multi-auditor team</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">Economic model review</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">Formal verification</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">Dedicated security consultant</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">Ongoing support & monitoring</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">Custom timeline</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">SLA guarantees</span>
                    </li>
                  </ul>
                  <Button className="w-full" variant="outline" className="group">
                    Contact Sales
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Additional Services */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-center mb-8">Additional Security Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-5 w-5 text-yellow-500" />
                    <Badge variant="outline">Popular</Badge>
                  </div>
                  <CardTitle>Penetration Testing</CardTitle>
                  <div className="text-2xl font-bold">Starting at $5,999</div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Comprehensive security testing including smart contracts, dApp frontend, 
                    and infrastructure penetration testing.
                  </p>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="h-3 w-3 text-green-500" />
                      Full-stack penetration testing
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="h-3 w-3 text-green-500" />
                      Infrastructure assessment
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="h-3 w-3 text-green-500" />
                      Social engineering tests
                    </li>
                  </ul>
                  <Button className="w-full" variant="outline">Learn More</Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-5 w-5 text-blue-500" />
                    <Badge variant="outline">Flexible</Badge>
                  </div>
                  <CardTitle>Security Consulting</CardTitle>
                  <div className="text-2xl font-bold">$250/hour</div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Expert guidance on security architecture, best practices, incident response, 
                    and security strategy planning.
                  </p>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="h-3 w-3 text-green-500" />
                      Security architecture review
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="h-3 w-3 text-green-500" />
                      Incident response planning
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="h-3 w-3 text-green-500" />
                      Team training sessions
                    </li>
                  </ul>
                  <Button className="w-full" variant="outline">Learn More</Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ Section */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">What's included in the audit report?</h3>
                  <p className="text-muted-foreground">Our comprehensive audit reports include detailed vulnerability findings with severity assessments, step-by-step remediation recommendations, gas optimization suggestions, architecture analysis, and industry best practice recommendations.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">How long does an audit take?</h3>
                  <p className="text-muted-foreground">Audit timelines depend on code complexity and package selected. Basic audits typically take 5-7 days, professional audits require 7-10 days, and enterprise audits have custom timelines based on scope and requirements.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Do you offer re-audits after fixes?</h3>
                  <p className="text-muted-foreground">Yes! We offer re-audits at a discounted rate after you've implemented our recommended fixes. Professional and Enterprise packages include one free re-audit to verify all issues have been properly addressed.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
                  <p className="text-muted-foreground">We accept both cryptocurrency (ETH, USDC, USDT, BTC) and traditional payment methods (credit cards, wire transfers, ACH) to accommodate all clients worldwide.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <Card className="bg-hawkly-primary/5 border-hawkly-primary/20">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to Secure Your Project?</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Join 500+ projects that trust Hawkly for their security needs. 
                Get started with a free consultation to discuss your requirements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-hawkly-primary hover:bg-hawkly-primary/90">
                  Start Your Audit
                </Button>
                <Button size="lg" variant="outline">
                  Schedule Consultation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </StandardLayout>
    </>
  );
};

export default PricingPage;
