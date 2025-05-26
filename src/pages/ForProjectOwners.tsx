
import React from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, TrendingUp, Clock, Users, CheckCircle, ArrowRight, Calculator, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

export default function ForProjectOwners() {
  return (
    <>
      <Helmet>
        <title>For Project Owners | Hawkly - Secure Your Web3 Project</title>
        <meta name="description" content="Protect your Web3 project with expert security audits. Get matched with top auditors, track progress, and ensure your code is production-ready." />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-16">
          {/* Hero Section */}
          <section className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              For Project Owners
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight mb-6">
              Secure Your Web3 Project with Expert Audits
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Connect with top security auditors, track your project's security posture, and ensure your code is production-ready before launch.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/request-audit">
                  <Shield className="mr-2 h-5 w-5" />
                  Request Security Audit
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/dashboard/project">
                  <BarChart3 className="mr-2 h-5 w-5" />
                  View Dashboard
                </Link>
              </Button>
            </div>
          </section>

          {/* Key Benefits */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Hawkly for Your Security Needs</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <TrendingUp className="h-10 w-10 text-primary mb-4" />
                  <CardTitle>Faster Time to Market</CardTitle>
                  <CardDescription>
                    Get your security audit completed 3x faster than traditional firms
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">AI-powered auditor matching</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Parallel review processes</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Real-time progress tracking</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Calculator className="h-10 w-10 text-primary mb-4" />
                  <CardTitle>Cost Effective</CardTitle>
                  <CardDescription>
                    Save up to 60% compared to traditional audit firms
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Transparent pricing</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">No hidden fees</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Escrow protection</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Users className="h-10 w-10 text-primary mb-4" />
                  <CardTitle>Expert Network</CardTitle>
                  <CardDescription>
                    Access to 500+ verified security experts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Certified professionals</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Specialized expertise</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">24/7 support</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* ROI Calculator Section */}
          <section className="mb-16">
            <Card className="max-w-4xl mx-auto">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Calculate Your Security ROI</CardTitle>
                <CardDescription>
                  See how much time and money you can save with Hawkly
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Traditional Audit Firms</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Average Cost:</span>
                        <span className="font-mono">$25,000 - $50,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Timeline:</span>
                        <span className="font-mono">6-12 weeks</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Revision Cycles:</span>
                        <span className="font-mono">3-5 rounds</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-semibold text-primary">Hawkly Platform</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Average Cost:</span>
                        <span className="font-mono text-green-600">$8,000 - $20,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Timeline:</span>
                        <span className="font-mono text-green-600">2-4 weeks</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Revision Cycles:</span>
                        <span className="font-mono text-green-600">1-2 rounds</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center pt-6 border-t">
                  <p className="text-2xl font-bold text-green-600">
                    Save up to $30,000 and 8 weeks with Hawkly
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Case Studies */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Success Stories</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>DeFi Protocol Launch</CardTitle>
                  <Badge variant="outline">Ethereum</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    A DeFi lending protocol needed comprehensive security review before their $10M TVL launch.
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Timeline:</span>
                      <span className="font-semibold">3 weeks</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Issues Found:</span>
                      <span className="font-semibold">12 critical, 8 medium</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cost Savings:</span>
                      <span className="font-semibold text-green-600">65%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>NFT Marketplace</CardTitle>
                  <Badge variant="outline">Polygon</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    An NFT marketplace needed urgent security audit before their public launch.
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Timeline:</span>
                      <span className="font-semibold">2 weeks</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Issues Found:</span>
                      <span className="font-semibold">5 critical, 15 medium</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time Savings:</span>
                      <span className="font-semibold text-green-600">70%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Secure Your Project?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join 500+ projects that trust Hawkly for their security needs
            </p>
            <Button size="lg" asChild>
              <Link to="/request-audit">
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
