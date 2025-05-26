
import React from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Award, Clock, TrendingUp, CheckCircle, ArrowRight, Star, Shield } from "lucide-react";
import { Link } from "react-router-dom";

export default function ForAuditors() {
  return (
    <>
      <Helmet>
        <title>For Auditors | Hawkly - Join the Leading Security Network</title>
        <meta name="description" content="Join Hawkly's network of elite security auditors. Earn competitive rates, build your reputation, and work on cutting-edge Web3 projects." />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-16">
          {/* Hero Section */}
          <section className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              For Security Auditors
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight mb-6">
              Join the Elite Network of Web3 Security Experts
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Access high-paying audit opportunities, build your reputation, and work with innovative Web3 projects on the leading security platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/service-provider-onboarding">
                  <Shield className="mr-2 h-5 w-5" />
                  Join as Auditor
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/dashboard/auditor">
                  <Star className="mr-2 h-5 w-5" />
                  Auditor Dashboard
                </Link>
              </Button>
            </div>
          </section>

          {/* Earning Potential */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Maximize Your Earning Potential</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-primary/20">
                <CardHeader className="text-center">
                  <DollarSign className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle className="text-2xl">$150-500/hour</CardTitle>
                  <CardDescription>Average hourly rates for experienced auditors</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Smart contract audits</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">DeFi protocol reviews</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">NFT marketplace audits</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardHeader className="text-center">
                  <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle className="text-2xl">$50K-200K+</CardTitle>
                  <CardDescription>Annual earning potential for top auditors</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Performance bonuses</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Premium project access</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Referral commissions</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardHeader className="text-center">
                  <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle className="text-2xl">Flexible Schedule</CardTitle>
                  <CardDescription>Work on your own terms and timeline</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Choose your projects</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Set your availability</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Remote work options</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Skill Requirements */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">What We're Looking For</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <Award className="h-10 w-10 text-primary mb-4" />
                  <CardTitle>Technical Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Required Skills:</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Solidity/Vyper proficiency</li>
                        <li>• Smart contract security patterns</li>
                        <li>• Static analysis tools (Slither, MythX)</li>
                        <li>• Manual code review expertise</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Preferred Skills:</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Formal verification experience</li>
                        <li>• DeFi protocol knowledge</li>
                        <li>• Layer 2 scaling solutions</li>
                        <li>• Cross-chain security</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Shield className="h-10 w-10 text-primary mb-4" />
                  <CardTitle>Certifications & Experience</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Certifications:</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• CISSP, CEH, or equivalent</li>
                        <li>• Blockchain security certifications</li>
                        <li>• Academic credentials in CS/Security</li>
                        <li>• Professional audit experience</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Experience Levels:</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Junior: 1-2 years security experience</li>
                        <li>• Senior: 3-5 years audit experience</li>
                        <li>• Expert: 5+ years, lead auditor role</li>
                        <li>• Specialist: Deep domain expertise</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Success Stories */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Auditor Success Stories</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="font-bold">AS</span>
                    </div>
                    <div>
                      <CardTitle className="text-lg">Alex S.</CardTitle>
                      <CardDescription>Senior Security Auditor</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    "Joined Hawkly 8 months ago. Now earning $180K annually while working flexible hours on cutting-edge DeFi projects."
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">15 audits completed</Badge>
                    <Badge variant="outline">4.9★ rating</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="font-bold">MR</span>
                    </div>
                    <div>
                      <CardTitle className="text-lg">Maria R.</CardTitle>
                      <CardDescription>Blockchain Security Expert</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    "The platform's tools and client quality are exceptional. Doubled my income within 6 months of joining."
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">23 audits completed</Badge>
                    <Badge variant="outline">5.0★ rating</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="font-bold">DK</span>
                    </div>
                    <div>
                      <CardTitle className="text-lg">David K.</CardTitle>
                      <CardDescription>DeFi Security Specialist</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    "Found my niche in DeFi protocol security. The referral program helped me build a network of repeat clients."
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">31 audits completed</Badge>
                    <Badge variant="outline">4.8★ rating</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Application Process */}
          <section className="mb-16">
            <Card className="max-w-4xl mx-auto">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Simple Application Process</CardTitle>
                <CardDescription>
                  Get verified and start earning in as little as 48 hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-primary">1</span>
                    </div>
                    <h3 className="font-semibold mb-2">Apply</h3>
                    <p className="text-sm text-muted-foreground">
                      Submit your credentials and portfolio
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-primary">2</span>
                    </div>
                    <h3 className="font-semibold mb-2">Assessment</h3>
                    <p className="text-sm text-muted-foreground">
                      Complete technical evaluation
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-primary">3</span>
                    </div>
                    <h3 className="font-semibold mb-2">Verification</h3>
                    <p className="text-sm text-muted-foreground">
                      Background and reference checks
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-primary">4</span>
                    </div>
                    <h3 className="font-semibold mb-2">Start Earning</h3>
                    <p className="text-sm text-muted-foreground">
                      Access projects and begin auditing
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* CTA Section */}
          <section className="text-center bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Join Our Elite Network?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Start earning competitive rates while securing the future of Web3
            </p>
            <Button size="lg" asChild>
              <Link to="/service-provider-onboarding">
                Apply Now
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
