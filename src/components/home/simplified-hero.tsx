
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export function SimplifiedHero() {
  return (
    <section className="relative pt-24 pb-20 overflow-hidden bg-gradient-to-br from-background via-primary-50 to-secondary-50">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-primary-100/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
      
      <div className="modern-container relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Welcome notice */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 border border-primary-200 mb-8">
            <Sparkles className="h-4 w-4 text-primary-600" />
            <span className="text-sm font-medium text-primary-700">
              Welcome to Hawkly! Sign up today to access expert Web3 security services
            </span>
          </div>
          
          <h1 className="text-display-lg md:text-display-xl font-bold mb-6 text-neutral-900">
            Next-Generation
            <br />
            <span className="gradient-text">Web3 Security</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-neutral-600 mb-10 max-w-4xl mx-auto leading-relaxed">
            The intelligent marketplace matching blockchain projects with verified
            security experts. Secure your Web3 project with confidence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button asChild size="lg" className="modern-button modern-button-primary h-12 px-8 text-lg">
              <Link to="/auth">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-8 text-lg border-primary-300 text-primary-700 hover:bg-primary-50">
              <Link to="/marketplace">
                Browse Services
              </Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">500+</div>
              <div className="text-neutral-600">Verified Experts</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary-600 mb-2">$350M+</div>
              <div className="text-neutral-600">Assets Protected</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-success-600 mb-2">2,500+</div>
              <div className="text-neutral-600">Audits Completed</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
