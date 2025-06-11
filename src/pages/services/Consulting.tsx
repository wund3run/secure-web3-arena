
import React from 'react';
import { ProductionLayout } from '@/components/layout/ProductionLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, BookOpen, Lightbulb, Zap, ArrowRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Consulting() {
  return (
    <ProductionLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Users className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold">Security Consulting</h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Strategic security guidance from industry experts. Build secure Web3 applications 
              with best practices, architecture reviews, and ongoing security support.
            </p>
          </div>

          {/* Consulting Services */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <BookOpen className="h-8 w-8 text-blue-500 mb-2" />
                <CardTitle>Security Architecture Review</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Comprehensive review of your project's security architecture and design patterns.
                </p>
                <ul className="space-y-2 text-sm">
                  <li>• Architecture assessment</li>
                  <li>• Design pattern review</li>
                  <li>• Security recommendations</li>
                  <li>• Implementation roadmap</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Lightbulb className="h-8 w-8 text-yellow-500 mb-2" />
                <CardTitle>Security Strategy Planning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Strategic planning for your project's security needs and compliance requirements.
                </p>
                <ul className="space-y-2 text-sm">
                  <li>• Security strategy development</li>
                  <li>• Risk assessment</li>
                  <li>• Compliance planning</li>
                  <li>• Team training programs</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Zap className="h-8 w-8 text-green-500 mb-2" />
                <CardTitle>Incident Response</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Rapid response and remediation support for security incidents and vulnerabilities.
                </p>
                <ul className="space-y-2 text-sm">
                  <li>• 24/7 incident response</li>
                  <li>• Vulnerability remediation</li>
                  <li>• Post-incident analysis</li>
                  <li>• Recovery planning</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Calendar className="h-8 w-8 text-purple-500 mb-2" />
                <CardTitle>Ongoing Security Advisory</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Continuous security guidance and support throughout your project's lifecycle.
                </p>
                <ul className="space-y-2 text-sm">
                  <li>• Monthly security reviews</li>
                  <li>• Continuous monitoring</li>
                  <li>• Security updates</li>
                  <li>• Advisory board participation</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Process Section */}
          <div className="bg-muted/50 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-center mb-8">Consulting Process</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold">1</span>
                </div>
                <h3 className="font-semibold mb-2">Discovery</h3>
                <p className="text-sm text-muted-foreground">Understand your project goals and security requirements</p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold">2</span>
                </div>
                <h3 className="font-semibold mb-2">Assessment</h3>
                <p className="text-sm text-muted-foreground">Analyze current security posture and identify gaps</p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold">3</span>
                </div>
                <h3 className="font-semibold mb-2">Strategy</h3>
                <p className="text-sm text-muted-foreground">Develop comprehensive security strategy and roadmap</p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold">4</span>
                </div>
                <h3 className="font-semibold mb-2">Implementation</h3>
                <p className="text-sm text-muted-foreground">Guide implementation and provide ongoing support</p>
              </div>
            </div>
          </div>

          {/* Expertise Areas */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-center mb-8">Areas of Expertise</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <h3 className="font-semibold mb-2">DeFi Protocols</h3>
                <p className="text-sm text-muted-foreground">
                  Security consulting for decentralized finance applications and protocols
                </p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold mb-2">NFT Platforms</h3>
                <p className="text-sm text-muted-foreground">
                  Security guidance for NFT marketplaces and digital asset platforms
                </p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold mb-2">DAOs & Governance</h3>
                <p className="text-sm text-muted-foreground">
                  Security architecture for decentralized autonomous organizations
                </p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold mb-2">Layer 2 Solutions</h3>
                <p className="text-sm text-muted-foreground">
                  Security consulting for scaling solutions and sidechains
                </p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold mb-2">Cross-Chain Bridges</h3>
                <p className="text-sm text-muted-foreground">
                  Security guidance for interoperability and bridge protocols
                </p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold mb-2">Gaming & Metaverse</h3>
                <p className="text-sm text-muted-foreground">
                  Security architecture for blockchain gaming and virtual worlds
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Enhance Your Security Strategy?</h2>
            <p className="text-muted-foreground mb-6">
              Get expert guidance from industry-leading security consultants
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/request-audit">
                  Start Consultation <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/marketplace">Find Consultants</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ProductionLayout>
  );
}
