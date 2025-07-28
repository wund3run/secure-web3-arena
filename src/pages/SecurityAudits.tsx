
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, CheckCircle, ArrowRight, Star, Clock, Users } from 'lucide-react';
import { HawklyCard, SecurityBadge, ProgressIndicator } from '@/components/ui/hawkly-components';

export default function SecurityAudits() {
  return (
    <div className="min-h-screen bg-[#0a0d16]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1e2332]/60 to-[#0a0d16] py-20">
        <div className="container mx-auto px-4 text-center">
          <SecurityBadge level="enterprise" verified={true} size="lg" className="mb-6 inline-block" />
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-600 bg-clip-text text-transparent">
            Smart Contract Security Audits
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Comprehensive security reviews by certified experts to identify vulnerabilities 
            and ensure your smart contracts are production-ready.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="group bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 border-none">
              <Link to="/request-audit">
                Request Security Audit
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-purple-400 text-purple-400 hover:bg-purple-400/10">
              <Link to="/marketplace">Browse Auditors</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-white">Comprehensive Security Analysis</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Our security audits cover all critical aspects of smart contract security
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <HawklyCard variant="glass" elevation="subtle" glow={true} interactive={true} className="group">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/20 to-purple-700/20 flex items-center justify-center mb-4 group-hover:from-purple-500/30 group-hover:to-purple-700/30 transition-all">
                  <Shield className="h-8 w-8 text-purple-400" />
                </div>
                <CardTitle className="text-white">Vulnerability Detection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Comprehensive analysis to identify reentrancy attacks, overflow/underflow, 
                  access control issues, and other critical vulnerabilities.
                </p>
              </CardContent>
            </HawklyCard>
            <HawklyCard variant="glass" elevation="subtle" glow={true} interactive={true} className="group">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-700/20 flex items-center justify-center mb-4 group-hover:from-blue-500/30 group-hover:to-blue-700/30 transition-all">
                  <CheckCircle className="h-8 w-8 text-blue-400" />
                </div>
                <CardTitle className="text-white">Code Quality Review</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Analysis of code structure, gas optimization opportunities, 
                  best practices adherence, and maintainability assessment.
                </p>
              </CardContent>
            </HawklyCard>
            <HawklyCard variant="glass" elevation="subtle" glow={true} interactive={true} className="group">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500/20 to-cyan-700/20 flex items-center justify-center mb-4 group-hover:from-cyan-500/30 group-hover:to-cyan-700/30 transition-all">
                  <Star className="h-8 w-8 text-cyan-400" />
                </div>
                <CardTitle className="text-white">Detailed Reporting</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Comprehensive reports with severity classifications, remediation 
                  recommendations, and post-fix verification.
                </p>
              </CardContent>
            </HawklyCard>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-[#0d1117]/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-white">Our Audit Process</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              A systematic approach to ensure comprehensive security coverage
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Initial Review", desc: "Code analysis and scope definition", color: "from-purple-500 to-blue-600" },
              { step: "2", title: "Deep Audit", desc: "Comprehensive security testing", color: "from-blue-500 to-cyan-600" },
              { step: "3", title: "Report Generation", desc: "Detailed findings documentation", color: "from-cyan-500 to-teal-600" },
              { step: "4", title: "Remediation Support", desc: "Fix verification and guidance", color: "from-teal-500 to-green-600" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 bg-gradient-to-br ${item.color} text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 shadow-[0_0_15px_rgba(124,58,237,0.3)]`}>
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
                <p className="text-gray-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <HawklyCard variant="glass" elevation="subtle" className="py-8">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/20 to-purple-700/20 flex items-center justify-center mb-4">
                  <Clock className="h-8 w-8 text-purple-400" />
                </div>
                <ProgressIndicator value={85} max={100} variant="circular" animated={true} className="mb-4" />
                <span className="text-3xl font-bold text-white mb-1">3-5 Days</span>
                <p className="text-gray-400">Average Audit Completion</p>
              </div>
            </HawklyCard>
            <HawklyCard variant="glass" elevation="subtle" className="py-8">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-700/20 flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-blue-400" />
                </div>
                <ProgressIndicator value={100} max={100} variant="circular" animated={true} className="mb-4" />
                <span className="text-3xl font-bold text-white mb-1">500+</span>
                <p className="text-gray-400">Projects Audited</p>
              </div>
            </HawklyCard>
            <HawklyCard variant="glass" elevation="subtle" className="py-8">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500/20 to-cyan-700/20 flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-cyan-400" />
                </div>
                <ProgressIndicator value={99.9} max={100} variant="circular" animated={true} className="mb-4" />
                <span className="text-3xl font-bold text-white mb-1">99.9%</span>
                <p className="text-gray-400">Critical Issues Found</p>
              </div>
            </HawklyCard>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/40"></div>
        <div className="absolute inset-0 bg-[url('/src/assets/images/grid-pattern.svg')] opacity-10"></div>
        <HawklyCard variant="highlighted" elevation="strong" glow={true} className="container mx-auto px-4 text-center max-w-4xl py-12 relative z-10 border-purple-500/30">
          <SecurityBadge level="enterprise" verified={true} size="lg" className="inline-block mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready to Secure Your Smart Contract?</h2>
          <p className="text-xl mb-8 text-gray-300">
            Get started with a professional security audit today
          </p>
          <Button size="lg" asChild className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 border-none px-8 py-6 text-lg">
            <Link to="/request-audit">Request Audit Now</Link>
          </Button>
        </HawklyCard>
      </section>
    </div>
  );
}
