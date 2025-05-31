
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Shield, Users, ArrowRight, Zap, DollarSign, Search, CheckCircle } from 'lucide-react';

export function UserJourneySection() {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Choose Your Path
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you're securing your project or offering expertise, we've got you covered
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Project Owner Card */}
          <Card className="relative overflow-hidden border-2 hover:border-primary/30 transition-all duration-300 group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-primary/5"></div>
            <CardContent className="relative p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-primary/10 rounded-xl border border-primary/20">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Project Owner</h3>
                  <p className="text-muted-foreground">Need Security Help?</p>
                </div>
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                Whether you're a startup founder or technical lead, protect your Web3 project from vulnerabilities
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  <Zap className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="text-sm">AI-powered auditor matching in under 2 hours</span>
                </div>
                <div className="flex items-center gap-3">
                  <DollarSign className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="text-sm">Smart contract escrow - pay only when satisfied</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="text-sm">Continuous monitoring after launch</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="text-sm">Support for 15+ blockchain ecosystems</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button asChild className="w-full bg-gradient-to-r from-primary to-blue-600 hover:opacity-90 group-hover:shadow-lg transition-all">
                  <Link to="/request-audit">
                    Get Security Audit
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full hover:bg-muted/50">
                  <Link to="/marketplace">
                    Browse Auditors
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Security Expert Card */}
          <Card className="relative overflow-hidden border-2 hover:border-green-500/30 transition-all duration-300 group">
            <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-green-500/5"></div>
            <CardContent className="relative p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-green-500/10 rounded-xl border border-green-500/20">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Security Expert</h3>
                  <p className="text-muted-foreground">Ready to Audit?</p>
                </div>
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                Join our verified network of top security professionals and earn competitive rates
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  <Search className="h-4 w-4 text-green-600 flex-shrink-0" />
                  <span className="text-sm">Get matched with quality projects instantly</span>
                </div>
                <div className="flex items-center gap-3">
                  <DollarSign className="h-4 w-4 text-green-600 flex-shrink-0" />
                  <span className="text-sm">Earn competitive rates with secure payments</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="h-4 w-4 text-green-600 flex-shrink-0" />
                  <span className="text-sm">Build reputation with verified credentials</span>
                </div>
                <div className="flex items-center gap-3">
                  <Zap className="h-4 w-4 text-green-600 flex-shrink-0" />
                  <span className="text-sm">Access cutting-edge security tools</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button asChild className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:opacity-90 group-hover:shadow-lg transition-all">
                  <Link to="/service-provider-onboarding">
                    Join as Expert
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full hover:bg-muted/50">
                  <Link to="/marketplace">
                    View Opportunities
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">500+</div>
            <div className="text-sm text-muted-foreground">Security Experts</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">$350M+</div>
            <div className="text-sm text-muted-foreground">Assets Protected</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">12,800+</div>
            <div className="text-sm text-muted-foreground">Vulnerabilities Found</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">4.9/5</div>
            <div className="text-sm text-muted-foreground">Client Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  );
}
