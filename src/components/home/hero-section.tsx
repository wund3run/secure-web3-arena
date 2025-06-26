
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Shield } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      
      <div className="container relative z-10 text-center px-4">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-8">
            <Shield className="h-4 w-4 text-blue-300" />
            <span className="text-sm font-medium">Hawkly: Secure Web3 Arena</span>
          </div>
          
          {/* Main headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Secure Your Web3 Project.
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Elevate Your Audits.
            </span>
          </h1>
          
          {/* Subheading */}
          <p className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-6 max-w-4xl mx-auto leading-relaxed">
            Hawkly connects top-tier security auditors with blockchain innovators—fast, transparent, and reliable.
          </p>
          
          <p className="text-lg md:text-xl text-blue-200 mb-10 max-w-3xl mx-auto">
            Bulletproof your smart contracts. Grow your reputation. Get paid. All in one powerful platform.
          </p>

          {/* Primary CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white h-14 px-8 text-lg font-semibold shadow-lg hover:shadow-xl transition-all">
              <Link to="/request-audit">
                Get Your Project Audited
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 h-14 px-8 text-lg font-semibold">
              <Link to="/service-provider-onboarding">
                Become an Auditor
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
