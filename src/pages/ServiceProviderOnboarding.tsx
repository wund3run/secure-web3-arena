
import React from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, CheckCircle, Users, TrendingUp, Star, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServiceProviderOnboarding = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gradient mb-4">Join as Security Auditor</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Become part of the world's most trusted Web3 security marketplace
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-6 w-6 text-primary" />
                  Why Join Hawkly?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">Premium Projects</h3>
                    <p className="text-sm text-muted-foreground">Access to high-quality DeFi, NFT, and enterprise projects</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">Secure Payments</h3>
                    <p className="text-sm text-muted-foreground">Escrow-protected payments with milestone releases</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">Professional Growth</h3>
                    <p className="text-sm text-muted-foreground">Build your reputation and increase your rates</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">Global Network</h3>
                    <p className="text-sm text-muted-foreground">Connect with projects and auditors worldwide</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-6 w-6 text-primary" />
                  Platform Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">500+</div>
                    <div className="text-sm text-muted-foreground">Active Auditors</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">$2M+</div>
                    <div className="text-sm text-muted-foreground">Paid to Auditors</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">1,200+</div>
                    <div className="text-sm text-muted-foreground">Completed Audits</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">4.9/5</div>
                    <div className="text-sm text-muted-foreground">Avg Rating</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Application Requirements</CardTitle>
              <CardDescription>
                To ensure quality, we have specific requirements for new auditors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Experience Requirements
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Badge variant="outline" className="mt-0.5">Required</Badge>
                      <span>3+ years in security or blockchain development</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Badge variant="outline" className="mt-0.5">Required</Badge>
                      <span>Previous audit experience or security research</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Badge variant="secondary" className="mt-0.5">Preferred</Badge>
                      <span>Published security findings or CVEs</span>
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Technical Skills
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Badge variant="outline" className="mt-0.5">Required</Badge>
                      <span>Solidity, Rust, or other smart contract languages</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Badge variant="outline" className="mt-0.5">Required</Badge>
                      <span>Security analysis tools (Slither, MythX, etc.)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Badge variant="secondary" className="mt-0.5">Preferred</Badge>
                      <span>Formal verification experience</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="text-center">
            <Button asChild size="lg" className="mb-4">
              <Link to="/auth">
                <Star className="mr-2 h-4 w-4" />
                Apply Now
              </Link>
            </Button>
            <p className="text-sm text-muted-foreground">
              Applications are reviewed within 2-3 business days
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceProviderOnboarding;
