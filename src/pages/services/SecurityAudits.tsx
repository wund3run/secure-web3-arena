
import React from 'react';
import { ProductionLayout } from '@/components/layout/ProductionLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, CheckCircle, Clock, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SecurityAudits() {
  return (
    <ProductionLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Shield className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold">Security Audits</h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive smart contract security audits by certified professionals. 
              Protect your project with thorough vulnerability assessments and detailed reports.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader>
                <CheckCircle className="h-8 w-8 text-green-500 mb-2" />
                <CardTitle>Comprehensive Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Deep code review covering all security vulnerabilities, gas optimization, and best practices.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Clock className="h-8 w-8 text-blue-500 mb-2" />
                <CardTitle>Fast Turnaround</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Professional audits completed within 7-14 days with detailed remediation guidance.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-8 w-8 text-purple-500 mb-2" />
                <CardTitle>Expert Auditors</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Certified security professionals with proven track records in blockchain security.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Pricing Section */}
          <div className="bg-muted/50 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-center mb-8">Audit Packages</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Audit</CardTitle>
                  <div className="text-3xl font-bold">$2,500</div>
                  <Badge variant="secondary">Up to 500 lines</Badge>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Manual code review</li>
                    <li>• Automated testing</li>
                    <li>• Basic report</li>
                    <li>• 7-day turnaround</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-primary">
                <CardHeader>
                  <CardTitle>Professional Audit</CardTitle>
                  <div className="text-3xl font-bold">$5,000</div>
                  <Badge>Up to 1,500 lines</Badge>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Comprehensive review</li>
                    <li>• Advanced testing</li>
                    <li>• Detailed report</li>
                    <li>• Gas optimization</li>
                    <li>• 10-day turnaround</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Enterprise Audit</CardTitle>
                  <div className="text-3xl font-bold">$10,000+</div>
                  <Badge variant="secondary">Custom scope</Badge>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Complete audit suite</li>
                    <li>• Multiple auditors</li>
                    <li>• Executive summary</li>
                    <li>• Ongoing support</li>
                    <li>• 14-day turnaround</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Secure Your Smart Contract?</h2>
            <p className="text-muted-foreground mb-6">
              Get started with a professional security audit today
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/request-audit">
                  Request Audit <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/marketplace">Browse Auditors</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ProductionLayout>
  );
}
