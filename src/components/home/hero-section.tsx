
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Code, Cpu } from "lucide-react";

export function HeroSection() {
  return (
    <div className="px-4 py-16 sm:px-6 sm:py-24 md:py-32 lg:px-8 bg-gradient-to-br from-black to-primary/90 text-white">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
          <span className="block">Smart Contract Security</span>
          <span className="block mt-2">for Web3 Builders</span>
        </h1>
        <p className="mt-6 max-w-lg mx-auto text-xl text-white/80 sm:max-w-3xl">
          Connect with top security experts, protect your project with comprehensive audits, and build with confidence in the evolving blockchain ecosystem.
        </p>
        
        <div className="mt-10 max-w-xl mx-auto flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild className="bg-white text-primary hover:bg-white/90 text-lg h-12 px-8">
            <Link to="/marketplace">
              Find Security Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-white text-white hover:bg-white/10 text-lg h-12 px-8">
            <Link to="/request-audit">
              Request an Audit
            </Link>
          </Button>
        </div>
        
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-left">
            <div className="bg-primary/20 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Advanced Security</h3>
            <p className="text-white/70">
              Industry-leading audits and continuous security monitoring for your Web3 projects.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-left">
            <div className="bg-primary/20 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Code className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Verified Experts</h3>
            <p className="text-white/70">
              Thoroughly vetted security professionals with proven blockchain experience.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-left">
            <div className="bg-primary/20 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Cpu className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">
              <Link to="/security-insights" className="hover:underline inline-flex items-center">
                AI Security Insights
                <span className="ml-2 bg-white/20 text-xs px-2 py-0.5 rounded-full">New</span>
              </Link>
            </h3>
            <p className="text-white/70">
              Cutting-edge AI analysis to detect vulnerabilities in real-time.
            </p>
            <Link to="/security-insights" className="text-primary-foreground hover:underline inline-flex items-center mt-2 text-sm font-medium">
              Try it now
              <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
