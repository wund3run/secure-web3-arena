
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, CheckCircle, ArrowRight, Star, Clock, Users } from 'lucide-react';

export default function SecurityAudits() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center bg-primary/10 px-4 py-2 rounded-full text-primary mb-6">
            <Shield className="h-5 w-5 mr-2" />
            <span className="font-medium">Professional Security Audits</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Smart Contract Security Audits
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Comprehensive security reviews by certified experts to identify vulnerabilities 
            and ensure your smart contracts are production-ready.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="group">
              <Link to="/request-audit">
                Request Security Audit
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/marketplace">Browse Auditors</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Comprehensive Security Analysis</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our security audits cover all critical aspects of smart contract security
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Vulnerability Detection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Comprehensive analysis to identify reentrancy attacks, overflow/underflow, 
                  access control issues, and other critical vulnerabilities.
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CheckCircle className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Code Quality Review</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Analysis of code structure, gas optimization opportunities, 
                  best practices adherence, and maintainability assessment.
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Star className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Detailed Reporting</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Comprehensive reports with severity classifications, remediation 
                  recommendations, and post-fix verification.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Audit Process</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A systematic approach to ensure comprehensive security coverage
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Initial Review", desc: "Code analysis and scope definition" },
              { step: "2", title: "Deep Audit", desc: "Comprehensive security testing" },
              { step: "3", title: "Report Generation", desc: "Detailed findings documentation" },
              { step: "4", title: "Remediation Support", desc: "Fix verification and guidance" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="flex items-center justify-center mb-4">
                <Clock className="h-8 w-8 text-primary mr-2" />
                <span className="text-3xl font-bold">3-5 Days</span>
              </div>
              <p className="text-muted-foreground">Average Audit Completion</p>
            </div>
            <div>
              <div className="flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-primary mr-2" />
                <span className="text-3xl font-bold">500+</span>
              </div>
              <p className="text-muted-foreground">Projects Audited</p>
            </div>
            <div>
              <div className="flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-primary mr-2" />
                <span className="text-3xl font-bold">99.9%</span>
              </div>
              <p className="text-muted-foreground">Critical Issues Found</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Secure Your Smart Contract?</h2>
          <p className="text-xl mb-8 opacity-90">
            Get started with a professional security audit today
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/request-audit">Request Audit Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
