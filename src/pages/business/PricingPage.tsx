
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star } from 'lucide-react';

const PricingPage = () => {
  return (
    <StandardLayout
      title="Pricing | Hawkly"
      description="Transparent pricing for Web3 security audits and services"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-hawkly-gradient mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose the security solution that fits your project's needs and budget
          </p>
        </div>

        {/* Audit Pricing */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Security Audit Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Basic Audit</CardTitle>
                <div className="text-3xl font-bold">$2,999</div>
                <p className="text-muted-foreground">Perfect for small contracts</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    Up to 500 lines of code
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    Security vulnerability assessment
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    Detailed report with findings
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    5-7 day delivery
                  </li>
                </ul>
                <Button className="w-full">Choose Basic</Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-hawkly-primary relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-hawkly-primary flex items-center gap-1">
                  <Star className="h-3 w-3" />
                  Most Popular
                </Badge>
              </div>
              <CardHeader>
                <CardTitle>Professional Audit</CardTitle>
                <div className="text-3xl font-bold">$7,999</div>
                <p className="text-muted-foreground">Comprehensive security review</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    Up to 2,000 lines of code
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    Advanced security analysis
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    Gas optimization review
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    Architecture assessment
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    1-hour consultation call
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    7-10 day delivery
                  </li>
                </ul>
                <Button className="w-full bg-hawkly-primary hover:bg-hawkly-primary/90">
                  Choose Professional
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle>Enterprise Audit</CardTitle>
                <div className="text-3xl font-bold">Custom</div>
                <p className="text-muted-foreground">For complex protocols</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    Unlimited lines of code
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    Multi-auditor team
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    Economic model review
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    Formal verification
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    Ongoing support
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    Custom timeline
                  </li>
                </ul>
                <Button className="w-full" variant="outline">Contact Sales</Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Services */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Additional Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Penetration Testing</CardTitle>
                <div className="text-2xl font-bold">Starting at $5,999</div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Comprehensive security testing including smart contracts, dApp, and infrastructure.
                </p>
                <Button className="w-full" variant="outline">Learn More</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Consulting</CardTitle>
                <div className="text-2xl font-bold">$250/hour</div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Expert guidance on security architecture, best practices, and incident response.
                </p>
                <Button className="w-full" variant="outline">Learn More</Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ */}
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">What's included in the audit report?</h3>
                <p className="text-muted-foreground">Our audit reports include vulnerability findings, severity assessments, recommendations for fixes, gas optimization suggestions, and best practice recommendations.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">How long does an audit take?</h3>
                <p className="text-muted-foreground">Audit timelines depend on code complexity. Basic audits take 5-7 days, professional audits take 7-10 days, and enterprise audits have custom timelines.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Do you offer re-audits?</h3>
                <p className="text-muted-foreground">Yes, we offer re-audits at a discounted rate after you've implemented our recommended fixes. Professional and Enterprise packages include one free re-audit.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </StandardLayout>
  );
};

export default PricingPage;
