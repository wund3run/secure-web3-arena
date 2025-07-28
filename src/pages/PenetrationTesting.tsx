import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Bug, Shield, AlertTriangle, Search, Lock } from 'lucide-react';
import { HawklyCard, SecurityBadge, ProgressIndicator } from '@/components/ui/hawkly-components';

export default function PenetrationTesting() {
  return (
    <div className="min-h-screen bg-[#0a0d16]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1e2332]/60 to-[#0a0d16] py-20">
        <div className="container mx-auto px-4 text-center">
          <SecurityBadge level="advanced" verified={true} size="lg" className="mb-6 inline-block" />
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">
            Penetration Testing Services
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Comprehensive security testing to identify and exploit vulnerabilities 
            before malicious actors do. Protect your Web3 applications with professional pentesting.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="group bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 border-none">
              <Link to="/request-audit">
                Request Pentest
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-red-400 text-red-400 hover:bg-red-400/10">
              <Link to="/marketplace">Find Pentesters</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testing Types */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-white">Penetration Testing Services</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Comprehensive security testing across all layers of your Web3 application
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <HawklyCard 
              variant="glass" 
              elevation="subtle" 
              glow={true} 
              interactive={true} 
              className="group"
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500/20 to-red-700/20 flex items-center justify-center mb-4 group-hover:from-red-500/30 group-hover:to-red-700/30 transition-all">
                  <Bug className="h-6 w-6 text-red-400" />
                </div>
                <CardTitle className="text-white">Smart Contract Pentesting</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Comprehensive testing of smart contracts to identify exploitable 
                  vulnerabilities and business logic flaws.
                </p>
                <ul className="text-sm space-y-2 text-gray-400">
                  <li>• Reentrancy exploitation</li>
                  <li>• Access control bypass</li>
                  <li>• Economic attack vectors</li>
                  <li>• Flash loan attacks</li>
                </ul>
              </CardContent>
            </HawklyCard>
            
            <HawklyCard 
              variant="glass" 
              elevation="subtle" 
              glow={true} 
              interactive={true} 
              className="group"
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500/20 to-orange-700/20 flex items-center justify-center mb-4 group-hover:from-orange-500/30 group-hover:to-orange-700/30 transition-all">
                  <Search className="h-6 w-6 text-orange-400" />
                </div>
                <CardTitle className="text-white">DApp Security Testing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Full-stack security assessment of decentralized applications 
                  including frontend and backend components.
                </p>
                <ul className="text-sm space-y-2 text-gray-400">
                  <li>• Frontend security flaws</li>
                  <li>• API vulnerabilities</li>
                  <li>• Authentication bypass</li>
                  <li>• Data exposure risks</li>
                </ul>
              </CardContent>
            </HawklyCard>
            
            <HawklyCard 
              variant="glass" 
              elevation="subtle" 
              glow={true} 
              interactive={true} 
              className="group"
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500/20 to-yellow-700/20 flex items-center justify-center mb-4 group-hover:from-yellow-500/30 group-hover:to-yellow-700/30 transition-all">
                  <Lock className="h-6 w-6 text-yellow-400" />
                </div>
                <CardTitle className="text-white">Infrastructure Testing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Assessment of supporting infrastructure including servers, 
                  databases, and cloud configurations.
                </p>
                <ul className="text-sm space-y-2 text-gray-400">
                  <li>• Server misconfigurations</li>
                  <li>• Network vulnerabilities</li>
                  <li>• Cloud security issues</li>
                  <li>• DevOps pipeline security</li>
                </ul>
              </CardContent>
            </HawklyCard>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-20 bg-[#0d1117]/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-white">Testing Methodology</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Our systematic approach follows industry standards and best practices
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              {[
                { step: 1, title: "Reconnaissance", desc: "Comprehensive information gathering and attack surface mapping to understand the target environment.", color: "from-red-500 to-red-600" },
                { step: 2, title: "Vulnerability Assessment", desc: "Systematic identification of potential security weaknesses using automated tools and manual techniques.", color: "from-orange-500 to-orange-600" },
                { step: 3, title: "Exploitation", desc: "Controlled exploitation of identified vulnerabilities to demonstrate real-world impact and risk.", color: "from-yellow-500 to-yellow-600" }
              ].map((item, index) => (
                <HawklyCard key={index} variant="glass" elevation="subtle" className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`w-8 h-8 bg-gradient-to-br ${item.color} text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-[0_0_15px_rgba(239,68,68,0.3)]`}>
                      {item.step}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
                      <p className="text-gray-300">{item.desc}</p>
                    </div>
                  </div>
                </HawklyCard>
              ))}
            </div>
            
            <div className="space-y-8">
              {[
                { step: 4, title: "Post-Exploitation", desc: "Assessment of potential damage and lateral movement possibilities following successful exploitation.", color: "from-green-500 to-green-600" },
                { step: 5, title: "Reporting", desc: "Comprehensive documentation of findings with executive summaries and technical details for remediation.", color: "from-blue-500 to-blue-600" },
                { step: 6, title: "Remediation Support", desc: "Ongoing support to help fix identified issues and verify the effectiveness of implemented solutions.", color: "from-purple-500 to-purple-600" }
              ].map((item, index) => (
                <HawklyCard key={index} variant="glass" elevation="subtle" className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`w-8 h-8 bg-gradient-to-br ${item.color} text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-[0_0_15px_rgba(74,222,128,0.3)]`}>
                      {item.step}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
                      <p className="text-gray-300">{item.desc}</p>
                    </div>
                  </div>
                </HawklyCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Warning Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <HawklyCard 
            variant="glass"
            elevation="subtle"
            className="p-8 text-center border-amber-500/30"
          >
            <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-700/20 flex items-center justify-center mb-6">
              <AlertTriangle className="h-8 w-8 text-amber-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-amber-400">
              Ethical Testing Only
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              All penetration testing is conducted with explicit permission and follows 
              strict ethical guidelines. We operate under comprehensive legal agreements 
              to ensure responsible disclosure and protection of your assets.
            </p>
          </HawklyCard>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 to-orange-900/40"></div>
        <div className="absolute inset-0 bg-[url('/src/assets/images/grid-pattern.svg')] opacity-10"></div>
        
        <HawklyCard variant="highlighted" elevation="strong" glow={true} className="container mx-auto px-4 text-center max-w-4xl py-12 relative z-10 border-red-500/30">
          <SecurityBadge level="advanced" verified={true} size="lg" className="inline-block mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Secure Your Application Today</h2>
          <p className="text-xl mb-8 text-gray-300">
            Identify vulnerabilities before attackers do
          </p>
          <Button size="lg" asChild className="bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 border-none px-8 py-6 text-lg">
            <Link to="/request-audit">Schedule Penetration Test</Link>
          </Button>
        </HawklyCard>
      </section>
    </div>
  );
}
