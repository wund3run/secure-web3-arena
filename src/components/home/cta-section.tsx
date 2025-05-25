
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Users } from 'lucide-react';

export function CTASection() {
  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Ready to Secure Your Smart Contracts?
          </h2>
          <p className="text-lg text-primary-foreground/80 max-w-3xl mx-auto mb-8">
            Join thousands of Web3 projects that trust Hawkly for their security needs. 
            Get started today and connect with expert auditors.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Button asChild size="lg" variant="secondary" className="text-lg h-12 px-8">
              <Link to="/request-audit">
                <Shield className="mr-2 h-5 w-5" />
                Request Security Audit
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            
            <Button asChild size="lg" variant="outline" className="text-lg h-12 px-8 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
              <Link to="/service-provider-onboarding">
                <Users className="mr-2 h-5 w-5" />
                Become an Auditor
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold mb-1">24/7</div>
              <div className="text-primary-foreground/80 text-sm">Expert Support</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold mb-1">48h</div>
              <div className="text-primary-foreground/80 text-sm">Average Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold mb-1">99.9%</div>
              <div className="text-primary-foreground/80 text-sm">Platform Uptime</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
