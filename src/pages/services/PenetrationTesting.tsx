
import React from 'react';
import { ProductionLayout } from '@/components/layout/ProductionLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Target, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PenetrationTesting() {
  return (
    <ProductionLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Target className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold">Penetration Testing</h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Advanced security testing to identify vulnerabilities before attackers do. 
              Comprehensive penetration testing for Web3 applications and smart contracts.
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
            <h2 className="text-2xl font-bold text-center mb-8">Testing Packages</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Penetration Test</CardTitle>
                  <div className="text-3xl font-bold">$5,000</div>
                  <Badge variant="secondary">Small Applications</Badge>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• 40-hour testing engagement</li>
                    <li>• Basic vulnerability assessment</li>
                    <li>• Standard reporting</li>
                    <li>• 2-week turnaround</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-primary">
                <CardHeader>
                  <CardTitle>Comprehensive Test</CardTitle>
                  <div className="text-3xl font-bold">$12,000</div>
                  <Badge>Medium Applications</Badge>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• 80-hour testing engagement</li>
                    <li>• Advanced exploitation</li>
                    <li>• Detailed reporting</li>
                    <li>• Remediation support</li>
                    <li>• 3-week turnaround</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Enterprise Test</CardTitle>
                  <div className="text-3xl font-bold">$25,000+</div>
                  <Badge variant="secondary">Large Applications</Badge>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• 160+ hour engagement</li>
                    <li>• Multi-vector testing</li>
                    <li>• Executive briefing</li>
                    <li>• Ongoing consultation</li>
                    <li>• 4-week turnaround</li>
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
  );
}
