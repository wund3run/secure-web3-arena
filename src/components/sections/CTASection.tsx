
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, CheckCircle } from 'lucide-react';

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 relative overflow-hidden interactive-section">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
      
      {/* Interactive elements */}
      <div className="absolute inset-0 cursor-glow opacity-30"></div>
      <div className="absolute inset-0 animated-grid opacity-20"></div>
      
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <Shield className="h-20 w-20 mx-auto mb-6 text-white/90 hover:scale-110 transition-transform duration-300" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Ready to Secure Your Web3 Project?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Join thousands of developers who trust our vigilant security guardians. 
            Get started with a comprehensive protection audit today and safeguard your digital assets.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold shadow-lg hover:scale-105 transition-all duration-300" asChild>
              <Link to="/request-audit">
                Request Security Audit
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold hover:scale-105 transition-all duration-300" asChild>
              <Link to="/marketplace">
                Browse Guardian Marketplace
              </Link>
            </Button>
          </div>
          
          {/* Trust Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2 text-blue-100 interactive-card p-4 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-300" />
              <span className="font-medium">No setup fees</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-blue-100 interactive-card p-4 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-300" />
              <span className="font-medium">Transparent pricing</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-blue-100 interactive-card p-4 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-300" />
              <span className="font-medium">24/7 guardian support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
