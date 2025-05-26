
import React from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Shield, Users, Clock, CheckCircle, ArrowRight, Phone, Globe } from "lucide-react";
import { Link } from "react-router-dom";

export default function ForEnterprises() {
  return (
    <>
      <Helmet>
        <title>For Enterprises | Hawkly - Enterprise-Grade Web3 Security</title>
        <meta name="description" content="Enterprise-grade Web3 security solutions. Comprehensive audit programs, dedicated support, and custom security frameworks for large organizations." />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-16">
          {/* Hero Section */}
          <section className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              Enterprise Solutions
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight mb-6">
              Enterprise-Grade Web3 Security Solutions
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Comprehensive security programs designed for large organizations, with dedicated support, custom frameworks, and enterprise-level SLAs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/contact">
                  <Phone className="mr-2 h-5 w-5" />
                  Schedule Consultation
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/request-audit">
                  <Shield className="mr-2 h-5 w-5" />
                  Request Enterprise Audit
                </Link>
              </Button>
            </div>
          </section>

          {/* Enterprise Features */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Enterprise-First Security Approach</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <Building2 className="h-10 w-10 text-primary mb-4" />
                  <CardTitle>Dedicated Account Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Assigned security expert</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Priority support 24/7</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Custom SLA agreements</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Shield className="h-10 w-10 text-primary mb-4" />
                  <CardTitle>Custom Security Frameworks</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Tailored audit processes</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Industry-specific standards</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Compliance integration</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Users className="h-10 w-10 text-primary mb-4" />
                  <CardTitle>Expert Team Assembly</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Multi-expert teams</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Specialized domain knowledge</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Senior auditor oversight</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Clock className="h-10 w-10 text-primary mb-4" />
                  <CardTitle>Accelerated Timelines</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Parallel audit streams</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Express delivery options</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Guaranteed turnaround</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Globe className="h-10 w-10 text-primary mb-4" />
                  <CardTitle>Global Compliance</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Multi-jurisdiction support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Regulatory alignment</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Audit trail documentation</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Shield className="h-10 w-10 text-primary mb-4" />
                  <CardTitle>Continuous Monitoring</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Real-time threat detection</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Automated security scanning</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Monthly security reports</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Service Tiers */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Enterprise Service Tiers</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-2">
                <CardHeader className="text-center">
                  <Badge variant="outline" className="mb-4">Essential</Badge>
                  <CardTitle className="text-2xl">Startup Enterprise</CardTitle>
                  <CardDescription>For growing Web3 companies</CardDescription>
                  <div className="text-3xl font-bold mt-4">Custom Pricing</div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Up to 5 projects/year</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Standard turnaround times</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Email support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Basic reporting</span>
                    </li>
                  </ul>
                  <Button className="w-full" variant="outline" asChild>
                    <Link to="/contact">Get Quote</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-primary">
                <CardHeader className="text-center">
                  <Badge variant="default" className="mb-4">Professional</Badge>
                  <CardTitle className="text-2xl">Growth Enterprise</CardTitle>
                  <CardDescription>For scaling Web3 organizations</CardDescription>
                  <div className="text-3xl font-bold mt-4">Custom Pricing</div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Up to 15 projects/year</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Accelerated delivery</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Priority support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Advanced reporting</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Dedicated account manager</span>
                    </li>
                  </ul>
                  <Button className="w-full" asChild>
                    <Link to="/contact">Get Quote</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader className="text-center">
                  <Badge variant="secondary" className="mb-4">Ultimate</Badge>
                  <CardTitle className="text-2xl">Global Enterprise</CardTitle>
                  <CardDescription>For large-scale Web3 operations</CardDescription>
                  <div className="text-3xl font-bold mt-4">Custom Pricing</div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Unlimited projects</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Express delivery</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">24/7 dedicated support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Custom integrations</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Executive reporting</span>
                    </li>
                  </ul>
                  <Button className="w-full" variant="outline" asChild>
                    <Link to="/contact">Get Quote</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Trust Indicators */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Trusted by Leading Web3 Organizations</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-primary mb-2">500+</div>
                  <div className="text-sm text-muted-foreground">Enterprise Clients</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-primary mb-2">$50B+</div>
                  <div className="text-sm text-muted-foreground">Assets Secured</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
                  <div className="text-sm text-muted-foreground">Uptime SLA</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-primary mb-2">15min</div>
                  <div className="text-sm text-muted-foreground">Response Time</div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Secure Your Enterprise?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join the world's leading organizations in securing their Web3 infrastructure
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/contact">
                  Schedule Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/request-audit">
                  Request Enterprise Demo
                </Link>
              </Button>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
