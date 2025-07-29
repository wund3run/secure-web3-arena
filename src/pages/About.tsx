import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StandardizedPageLayout } from '@/components/layout/StandardizedPageLayout';
import { Shield, Users, Award, Target, ArrowRight } from 'lucide-react';
import { createOrganizationStructuredData } from '@/utils/seo/structured-data-templates';

export default function About() {
  const structuredData = createOrganizationStructuredData();

  return (
    <StandardizedPageLayout
      title="About Hawkly - Leading Web3 Security Platform"
      description="Learn about Hawkly's mission to secure the Web3 ecosystem through expert security audits, verified professionals, and cutting-edge technology."
      keywords={['about hawkly', 'web3 security company', 'blockchain security experts', 'smart contract audit company']}
      structuredData={structuredData}
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Securing the Future of Web3
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Hawkly is the leading Web3 security marketplace, connecting blockchain projects 
            with verified security experts to ensure safe, reliable decentralized applications.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="group">
              <Link to="/marketplace">
                Explore Platform
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              To make Web3 safer and more secure by connecting projects with world-class security experts
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Security First</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Every audit follows rigorous security standards to protect billions in digital assets.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Expert Network</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  500+ verified security professionals with proven track records in Web3.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Quality Assured</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Comprehensive quality checks ensure every audit meets the highest standards.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Target className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Results Focused</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Over $350M+ in digital assets secured through our platform audits.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Leadership Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our experienced team combines deep Web3 knowledge with enterprise security expertise
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-24 h-24 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">SC</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Sarah Chen</h3>
                <p className="text-muted-foreground mb-2">Co-Founder & CEO</p>
                <p className="text-sm text-muted-foreground">
                  Former security lead at major DeFi protocols with 8+ years in blockchain security
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-24 h-24 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">AR</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Alex Rodriguez</h3>
                <p className="text-muted-foreground mb-2">Co-Founder & CTO</p>
                <p className="text-sm text-muted-foreground">
                  Smart contract auditor and researcher with expertise in formal verification
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-24 h-24 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">MJ</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Maya Johnson</h3>
                <p className="text-muted-foreground mb-2">Head of Security</p>
                <p className="text-sm text-muted-foreground">
                  Former pentester with extensive experience in Web3 security assessments
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <p className="text-muted-foreground">Verified Security Experts</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">$350M+</div>
              <p className="text-muted-foreground">Digital Assets Protected</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">2,500+</div>
              <p className="text-muted-foreground">Successful Audits Completed</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join the Future of Web3 Security</h2>
          <p className="text-xl mb-8 opacity-90">
            Whether you're a project seeking security or an expert wanting to help secure Web3
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/request-audit">Request Security Audit</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white/10">
              <Link to="/service-provider-onboarding">Become an Expert</Link>
            </Button>
          </div>
        </div>
      </section>
    </StandardizedPageLayout>
  );
}