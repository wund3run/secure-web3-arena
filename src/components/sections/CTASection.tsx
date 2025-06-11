
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield } from 'lucide-react';

export function CTASection() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <Shield className="h-16 w-16 mx-auto mb-4 opacity-90" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Secure Your Web3 Project?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of developers who trust Hawkly for their security needs. 
            Get started with a comprehensive audit today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/request-audit">
                Request Security Audit
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
              <Link to="/marketplace">
                Browse Marketplace
              </Link>
            </Button>
          </div>
          <div className="mt-12 text-sm opacity-75">
            <p>✓ No setup fees • ✓ Transparent pricing • ✓ 24/7 support</p>
          </div>
        </div>
      </div>
    </section>
  );
}
