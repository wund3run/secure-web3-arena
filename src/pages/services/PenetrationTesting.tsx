
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ProductionLayout } from '@/components/layout/ProductionLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Target, AlertTriangle, CheckCircle, ArrowRight, Brain, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PenetrationTesting() {
  return (
    <>
      <Helmet>
        <title>Advanced Penetration Testing - Hawkly</title>
        <meta name="description" content="AI-enhanced penetration testing for Web3 applications. Advanced security testing to identify vulnerabilities before attackers do. Comprehensive testing for smart contracts and DApps." />
        <meta name="keywords" content="penetration testing, Web3 security testing, smart contract pentesting, blockchain security, ethical hacking" />
      </Helmet>
      
      <ProductionLayout>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">AI-Enhanced Testing • June 2025</Badge>
              <div className="flex items-center justify-center gap-2 mb-4">
                <Target className="h-8 w-8 text-primary" />
                <h1 className="text-4xl font-bold">Advanced Penetration Testing</h1>
              </div>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                AI-enhanced security testing to identify vulnerabilities before attackers do. 
                Comprehensive penetration testing for Web3 applications, smart contracts, and DeFi protocols.
              </p>
            </div>

          {/* Testing Types */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader>
                <Shield className="h-8 w-8 text-blue-500 mb-2" />
                <CardTitle>Smart Contract Penetration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Simulate real-world attacks on smart contracts to identify exploitable vulnerabilities.
                </p>
                <ul className="space-y-2 text-sm">
                  <li>• Reentrancy attacks</li>
                  <li>• Front-running simulation</li>
                  <li>• Access control bypass</li>
                  <li>• Economic attack vectors</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <AlertTriangle className="h-8 w-8 text-orange-500 mb-2" />
                <CardTitle>Web Application Testing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Comprehensive testing of Web3 applications and decentralized platforms.
                </p>
                <ul className="space-y-2 text-sm">
                  <li>• Authentication bypass</li>
                  <li>• API security testing</li>
                  <li>• Frontend vulnerabilities</li>
                  <li>• Infrastructure assessment</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CheckCircle className="h-8 w-8 text-green-500 mb-2" />
                <CardTitle>Infrastructure Testing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Security assessment of blockchain infrastructure and deployment environments.
                </p>
                <ul className="space-y-2 text-sm">
                  <li>• Network security</li>
                  <li>• Node configuration</li>
                  <li>• Deployment security</li>
                  <li>• Key management</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Methodology */}
          <div className="bg-muted/50 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-center mb-8">Testing Methodology</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Phase 1: Reconnaissance</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Information gathering</li>
                  <li>• Attack surface mapping</li>
                  <li>• Technology stack analysis</li>
                  <li>• Threat modeling</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Phase 2: Vulnerability Assessment</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Automated scanning</li>
                  <li>• Manual testing</li>
                  <li>• Code analysis</li>
                  <li>• Configuration review</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Phase 3: Exploitation</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Proof of concept development</li>
                  <li>• Impact assessment</li>
                  <li>• Privilege escalation</li>
                  <li>• Data extraction simulation</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Phase 4: Reporting</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Executive summary</li>
                  <li>• Technical findings</li>
                  <li>• Remediation roadmap</li>
                  <li>• Risk prioritization</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-center mb-8">Testing Packages - June 2025</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>AI-Assisted Pentest</CardTitle>
                  <div className="text-3xl font-bold">$6,500</div>
                  <Badge variant="secondary">Small-Medium Apps</Badge>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• 50-hour AI-enhanced testing</li>
                    <li>• Automated vulnerability discovery</li>
                    <li>• Smart contract focus</li>
                    <li>• Standard reporting</li>
                    <li>• 10-day turnaround</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-primary relative">
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                  Most Popular
                </Badge>
                <CardHeader>
                  <CardTitle>Comprehensive AI Test</CardTitle>
                  <div className="text-3xl font-bold">$15,000</div>
                  <Badge>Medium-Large Apps</Badge>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• 100-hour AI + Expert testing</li>
                    <li>• Advanced exploitation scenarios</li>
                    <li>• Cross-chain analysis</li>
                    <li>• MEV attack simulation</li>
                    <li>• Detailed remediation guide</li>
                    <li>• 2-week turnaround</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Enterprise Security Suite</CardTitle>
                  <div className="text-3xl font-bold">$35,000+</div>
                  <Badge variant="secondary">Enterprise</Badge>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• 200+ hour comprehensive testing</li>
                    <li>• Multi-protocol analysis</li>
                    <li>• Red team exercises</li>
                    <li>• Executive briefings</li>
                    <li>• 24/7 incident response</li>
                    <li>• Ongoing security monitoring</li>
                    <li>• 3-4 week engagement</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Secure Your Application Today</h2>
            <p className="text-muted-foreground mb-6">
              Don't wait for attackers to find your vulnerabilities first
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/request-audit">
                  Request Testing <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/marketplace">Find Pentesters</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ProductionLayout>
    </>
  );
}
