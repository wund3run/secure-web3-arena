
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';

export function CTASection() {
  const { user } = useAuth();

  return (
    <section className="py-24">
      <div className="container">
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-3xl p-12 md:p-16 text-center text-primary-foreground">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold">
                Ready to Secure Your Web3 Project?
              </h2>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                Join thousands of projects that trust Hawkly for their security needs. Connect with expert auditors today.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              {!user ? (
                <>
                  <Button asChild size="lg" variant="secondary" className="text-lg px-8">
                    <Link to="/auth">
                      <Shield className="mr-2 h-5 w-5" />
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="text-lg px-8 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                    <Link to="/service-provider-onboarding">
                      <Users className="mr-2 h-5 w-5" />
                      Become an Auditor
                    </Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild size="lg" variant="secondary" className="text-lg px-8">
                    <Link to="/request-audit">
                      <Shield className="mr-2 h-5 w-5" />
                      Request Audit
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="text-lg px-8 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                    <Link to="/marketplace">
                      <Users className="mr-2 h-5 w-5" />
                      Browse Auditors
                    </Link>
                  </Button>
                </>
              )}
            </div>

            <div className="flex items-center justify-center gap-8 text-sm opacity-80">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>Enterprise Security</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Expert Network</span>
              </div>
              <div className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4" />
                <span>Fast Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
