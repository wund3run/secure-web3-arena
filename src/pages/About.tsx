
import React from 'react';
import { ProductionLayout } from '@/components/layout/ProductionLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Users, Target, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <ProductionLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-6">About Hawkly</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're revolutionizing Web3 security by connecting blockchain projects with the world's top security experts through our comprehensive marketplace platform.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-6 w-6 mr-2 text-primary" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To make Web3 security accessible, reliable, and comprehensive for every blockchain project, 
                  regardless of size or complexity. We believe that robust security should never be a barrier to innovation.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-6 w-6 mr-2 text-secondary" />
                  Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To become the global standard for Web3 security services, fostering a safer blockchain ecosystem 
                  where developers can build with confidence and users can interact without fear of vulnerabilities.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Platform Stats */}
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-8 mb-16">
            <h2 className="text-2xl font-bold text-center mb-8">Platform Impact</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Verified Security Experts</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary">$350M+</div>
                <div className="text-sm text-muted-foreground">Assets Protected</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-web3-orange">2,500+</div>
                <div className="text-sm text-muted-foreground">Projects Secured</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-web3-teal">12,800+</div>
                <div className="text-sm text-muted-foreground">Vulnerabilities Found</div>
              </div>
            </div>
          </div>

          {/* Our Story */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground mb-4">
                Founded in 2024, Hawkly emerged from a simple observation: the Web3 ecosystem was growing 
                rapidly, but security practices weren't keeping pace. Too many promising projects were 
                falling victim to preventable vulnerabilities, while top security talent remained scattered 
                and difficult to access.
              </p>
              <p className="text-muted-foreground mb-4">
                Our founding team, comprising former security researchers, blockchain developers, and 
                marketplace experts, recognized the need for a centralized platform that could bridge 
                this gap. We built Hawkly to democratize access to world-class security expertise.
              </p>
              <p className="text-muted-foreground">
                Today, we're proud to be the leading Web3 security marketplace, trusted by projects 
                ranging from early-stage startups to established DeFi protocols. Our platform has 
                prevented millions in potential losses and continues to strengthen the entire blockchain ecosystem.
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Core Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Security First</h3>
                <p className="text-muted-foreground">
                  We prioritize security in every aspect of our platform and the services we facilitate.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Community Driven</h3>
                <p className="text-muted-foreground">
                  Our platform thrives on the collective expertise and collaboration of our community.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-web3-orange/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-web3-orange" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Excellence</h3>
                <p className="text-muted-foreground">
                  We maintain the highest standards in everything we do, from our platform to our partnerships.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4">Ready to Join Our Mission?</h2>
            <p className="text-muted-foreground mb-6">
              Whether you're a project looking for security expertise or a security professional ready to make an impact, 
              we'd love to have you as part of the Hawkly community.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/request-audit">
                <Button size="lg">
                  Get Security Audit
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/service-provider-onboarding">
                <Button size="lg" variant="outline">
                  Become an Expert
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ProductionLayout>
  );
}
