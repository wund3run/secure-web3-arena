
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Users, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export function UnifiedHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      
      <div className="container relative z-10 text-center px-4">
        <div className="max-w-4xl mx-auto">
          {/* Trust badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-8">
            <Shield className="h-4 w-4 text-blue-300" />
            <span className="text-sm font-medium text-white">Trusted by 500+ Web3 Projects</span>
          </div>
          
          {/* Main headline - Single, clear message */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight">
            Secure Your Web3 Project
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              in Days, Not Months
            </span>
          </h1>
          
          {/* Clear value proposition */}
          <p className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Connect with verified security experts for fast, comprehensive smart contract audits. 
            AI-powered matching, transparent pricing, guaranteed results.
          </p>

          {/* Dual CTAs - Prominent and branded */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white h-14 px-8 text-lg font-semibold shadow-lg hover:shadow-xl transition-all">
              <Link to="/request-audit">
                Get Security Audit
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 h-14 px-8 text-lg font-semibold">
              <Link to="/marketplace">
                Join as Expert
                <Users className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* Single stats row - No repetition */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-gray-300 text-sm md:text-base">Verified Security Experts</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">$350M+</div>
              <div className="text-gray-300 text-sm md:text-base">Assets Protected</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">2,500+</div>
              <div className="text-gray-300 text-sm md:text-base">Audits Completed</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
