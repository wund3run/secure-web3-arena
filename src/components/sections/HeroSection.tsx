
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Eye, CheckCircle } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative py-32 lg:py-40 bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      
      <div className="container relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8">
            <Eye className="h-4 w-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-300">
              Sharp-eyed AI-powered auditor matching
            </span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
            <span className="block text-white mb-4">
              Vigilant Web3
            </span>
            <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Security Guardians
            </span>
            <span className="block text-purple-400 text-4xl md:text-5xl lg:text-6xl mt-4">
              at Your Service
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Where <span className="text-blue-400 font-semibold">sharp-eyed security experts</span> meet <span className="text-cyan-400 font-semibold">blockchain innovation</span>. Our AI-powered platform connects your project with the perfect guardians of your digital assets.
          </p>
          
          {/* Trust Indicator */}
          <div className="flex items-center justify-center gap-2 mb-12">
            <CheckCircle className="h-5 w-5 text-green-400" />
            <span className="text-green-400 font-semibold">2,500+ Audits Completed</span>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white border-0 px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
              asChild
            >
              <Link to="/marketplace">
                Find Your Guardian
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-600 hover:to-cyan-500 text-white border-0 px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
              asChild
            >
              <Link to="/request-audit">
                Request Protection Quote
              </Link>
            </Button>
          </div>
          
          {/* Security Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6 rounded-xl bg-gradient-to-b from-blue-500/10 to-transparent border border-blue-500/20">
              <Shield className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">AI-Powered Matching</h3>
              <p className="text-gray-400">Smart algorithms connect you with the perfect security experts for your project needs</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20">
              <Eye className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Sharp-Eyed Experts</h3>
              <p className="text-gray-400">Vigilant security professionals with proven track records in Web3 protection</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gradient-to-b from-purple-500/10 to-transparent border border-purple-500/20">
              <CheckCircle className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Proven Results</h3>
              <p className="text-gray-400">Over 2,500 successful audits protecting millions in digital assets</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
