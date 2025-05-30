
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Shield, Clock, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-blue-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <Badge className="bg-white/20 text-white border-white/30 mb-6">
            <Shield className="w-4 h-4 mr-2" />
            Join 2,500+ Secure Projects
          </Badge>

          {/* Main Headline */}
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Secure Your Web3 Project?
          </h2>
          
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Don't let security vulnerabilities put your project at risk. 
            Get matched with expert auditors and launch with confidence.
          </p>

          {/* Value Props */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="flex items-center justify-center gap-3">
              <Clock className="w-5 h-5" />
              <span>24-hour matching</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Users className="w-5 h-5" />
              <span>Verified experts</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Shield className="w-5 h-5" />
              <span>Comprehensive audits</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8">
              <Link to="/request-audit">
                Request Security Audit
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 border-white text-white hover:bg-white hover:text-primary">
              <Link to="/marketplace">
                Browse Auditors
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 text-center">
            <p className="text-white/70 mb-4">Trusted by teams at</p>
            <div className="flex justify-center items-center gap-8 opacity-70">
              {/* Logo placeholders - replace with actual company logos */}
              <div className="text-lg font-semibold">DeFiCorp</div>
              <div className="text-lg font-semibold">BlockchainCo</div>
              <div className="text-lg font-semibold">CryptoDAO</div>
              <div className="text-lg font-semibold">Web3Labs</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
