
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, FileText, Video, Download, ExternalLink, Shield, Code, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Resources() {
  return (
    <>
      <Helmet>
        <title>Security Resources | Hawkly</title>
        <meta name="description" content="Comprehensive Web3 security resources, guides, and best practices for developers and auditors" />
      </Helmet>

      <StandardLayout 
        title="Security Resources" 
        description="Comprehensive guides, best practices, and tools for Web3 security professionals"
      >
        <div className="container py-12">
          {/* Security Guides Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Security Guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <Shield className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Smart Contract Security</CardTitle>
                  <CardDescription>
                    Essential security practices for smart contract development
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-2 mb-4">
                    <li>• Common vulnerabilities and prevention</li>
                    <li>• Secure coding patterns</li>
                    <li>• Testing methodologies</li>
                    <li>• Deployment best practices</li>
                  </ul>
                  <Button variant="outline" size="sm">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Read Guide
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Code className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>DeFi Protocol Security</CardTitle>
                  <CardDescription>
                    Security considerations for decentralized finance protocols
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-2 mb-4">
                    <li>• Liquidity pool security</li>
                    <li>• Oracle manipulation prevention</li>
                    <li>• Flash loan attack mitigation</li>
                    <li>• Governance token security</li>
                  </ul>
                  <Button variant="outline" size="sm">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Read Guide
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <AlertTriangle className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Audit Preparation</CardTitle>
                  <CardDescription>
                    How to prepare your project for a security audit
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-2 mb-4">
                    <li>• Pre-audit checklist</li>
                    <li>• Documentation requirements</li>
                    <li>• Test coverage standards</li>
                    <li>• Code organization tips</li>
                  </ul>
                  <Button variant="outline" size="sm">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Read Guide
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Video Tutorials Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Video Tutorials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <Video className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Security Audit Walkthrough</CardTitle>
                  <CardDescription>
                    Complete walkthrough of a professional security audit process
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Watch our experts conduct a live security audit, explaining each step of the process and highlighting common vulnerabilities.
                  </p>
                  <Button>
                    <Video className="h-4 w-4 mr-2" />
                    Watch Tutorial
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Video className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Setting Up Security Testing</CardTitle>
                  <CardDescription>
                    Learn to set up comprehensive security testing for your project
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Step-by-step guide to implementing automated security testing, static analysis, and continuous security monitoring.
                  </p>
                  <Button>
                    <Video className="h-4 w-4 mr-2" />
                    Watch Tutorial
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Templates Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Audit Templates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <FileText className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Smart Contract Audit Template</CardTitle>
                  <CardDescription>
                    Professional template for smart contract security audits
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" size="sm" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download Template
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <FileText className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>DeFi Protocol Checklist</CardTitle>
                  <CardDescription>
                    Comprehensive checklist for DeFi protocol security
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" size="sm" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download Template
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <FileText className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Security Report Template</CardTitle>
                  <CardDescription>
                    Standard format for security audit reports
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" size="sm" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download Template
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Quick Links */}
          <section>
            <h2 className="text-3xl font-bold mb-8">Quick Access</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link to="/security-insights">
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <Shield className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <h3 className="font-semibold">Security Insights</h3>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/audits">
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <FileText className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <h3 className="font-semibold">Audit Reports</h3>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/marketplace">
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <BookOpen className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <h3 className="font-semibold">Find Auditors</h3>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/contact">
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <ExternalLink className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <h3 className="font-semibold">Get Support</h3>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </section>
        </div>
      </StandardLayout>
    </>
  );
}
