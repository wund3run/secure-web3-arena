
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Shield, Zap, Users, ArrowRight, CheckCircle, Star } from 'lucide-react';

export function EnhancedHeroSection() {
  const trustMetrics = [
    { value: '500+', label: 'Security Experts' },
    { value: '$350M+', label: 'Assets Protected' },
    { value: '2,500+', label: 'Audits Completed' },
    { value: '99.9%', label: 'Success Rate' }
  ];

  const keyFeatures = [
    'Verified Security Experts',
    '24/7 Platform Support',
    'Comprehensive Audit Reports',
    'Fast Turnaround Times'
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      ></div>
      
      {/* Hero Content */}
      <div className="relative ui-container ui-section">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Headline */}
          <div className="ui-animate-fadeInUp">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="ui-badge ui-badge-success">
                <Shield className="w-3 h-3 mr-1" />
                Trusted Platform
              </div>
              <div className="ui-badge" style={{ background: '#fef3c7', color: '#f59e0b' }}>
                <Star className="w-3 h-3 mr-1" />
                #1 Security Marketplace
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Secure Your Web3
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Project Today
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Connect with verified security experts for comprehensive smart contract audits. 
              Protect your project and users with professional blockchain security solutions.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="ui-animate-fadeInUp flex flex-col sm:flex-row gap-4 justify-center mb-12" style={{ animationDelay: '0.2s' }}>
            <Link to="/marketplace">
              <button className="ui-button-primary text-lg px-8 py-4 min-w-[200px]">
                <Shield className="w-5 h-5" />
                Find Security Experts
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            
            <Link to="/request-audit">
              <button className="ui-button-secondary text-lg px-8 py-4 min-w-[200px]">
                <Zap className="w-5 h-5" />
                Request Audit
              </button>
            </Link>
          </div>

          {/* Key Features */}
          <div className="ui-animate-fadeInUp grid grid-cols-2 md:grid-cols-4 gap-4 mb-12" style={{ animationDelay: '0.4s' }}>
            {keyFeatures.map((feature, index) => (
              <div key={index} className="flex items-center justify-center gap-2 text-gray-300">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span className="text-sm font-medium">{feature}</span>
              </div>
            ))}
          </div>

          {/* Trust Metrics */}
          <div className="ui-animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
            <p className="text-gray-400 text-sm mb-6 uppercase tracking-wide font-semibold">
              Trusted by Leading Web3 Projects
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {trustMetrics.map((metric, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                    {metric.value}
                  </div>
                  <div className="text-sm text-gray-400 font-medium">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
    </div>
  );
}
