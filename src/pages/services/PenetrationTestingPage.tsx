import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Zap, Target, AlertTriangle, Users, CheckCircle } from 'lucide-react';
import { Footer } from '@/components/layout/footer';

const PenetrationTestingPage = () => {
  return (
    <StandardLayout
      title="Penetration Testing | Hawkly"
      description="Advanced security vulnerability testing for Web3 applications"
    >
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Badge variant="outline" className="px-4 py-2">
              <Zap className="h-4 w-4 mr-2" />
              Advanced Security Testing
            </Badge>
          </div>
          <h1 className="text-4xl font-bold text-hawkly-gradient mb-4">
            Penetration Testing Services
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive security testing to identify vulnerabilities before attackers do
          </p>
        </div>

        {/* Testing Types */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-red-500" />
                Smart Contract Testing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Deep analysis of smart contract logic, including reentrancy, overflow, and access control vulnerabilities
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-500" />
                dApp Security Testing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Frontend and backend security assessment including wallet integration and API vulnerabilities
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                Infrastructure Testing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Network security, server configuration, and deployment environment vulnerability assessment
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Methodology */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Our Testing Methodology</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-hawkly-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-hawkly-primary font-bold">1</span>
                </div>
                <h3 className="font-medium">Reconnaissance</h3>
                <p className="text-sm text-muted-foreground">Information gathering and attack surface mapping</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-hawkly-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-hawkly-primary font-bold">2</span>
                </div>
                <h3 className="font-medium">Vulnerability Assessment</h3>
                <p className="text-sm text-muted-foreground">Automated and manual vulnerability discovery</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-hawkly-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-hawkly-primary font-bold">3</span>
                </div>
                <h3 className="font-medium">Exploitation</h3>
                <p className="text-sm text-muted-foreground">Controlled exploitation to verify vulnerabilities</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-hawkly-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-hawkly-primary font-bold">4</span>
                </div>
                <h3 className="font-medium">Reporting</h3>
                <p className="text-sm text-muted-foreground">Detailed report with remediation guidance</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Service Packages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Basic Pen Test</CardTitle>
              <div className="text-2xl font-bold">$2,499</div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Smart contract testing
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Up to 5 contracts
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Basic vulnerability report
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  7-day delivery
                </li>
              </ul>
              <Button className="w-full">Get Started</Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-hawkly-primary">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Comprehensive Testing</CardTitle>
                <Badge className="bg-hawkly-primary">Recommended</Badge>
              </div>
              <div className="text-2xl font-bold">$5,999</div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Full application testing
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Unlimited contracts
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Detailed exploitation report
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Re-testing after fixes
                </li>
              </ul>
              <Button className="w-full bg-hawkly-primary hover:bg-hawkly-primary/90">
                Start Testing
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <CardTitle>Enterprise Testing</CardTitle>
              <div className="text-2xl font-bold">Custom</div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Multi-team engagement
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Continuous testing
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Executive reporting
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Compliance support
                </li>
              </ul>
              <Button className="w-full" variant="outline">Contact Sales</Button>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <Card className="bg-hawkly-primary/5 border-hawkly-primary/20">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Secure Your Web3 Project?</h2>
            <p className="text-muted-foreground mb-6">
              Don't wait for attackers to find vulnerabilities. Get comprehensive penetration testing today.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="bg-hawkly-primary hover:bg-hawkly-primary/90">
                Schedule Consultation
              </Button>
              <Button size="lg" variant="outline">
                View Sample Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </StandardLayout>
  );
};

export default PenetrationTestingPage;
