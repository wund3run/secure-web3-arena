
import React from "react";
import { StandardizedLayout } from "@/components/layout/StandardizedLayout";
import { SkipLink } from "@/components/ui/skip-link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Shield, Users, CheckCircle, Clock, DollarSign, Upload, Search } from "lucide-react";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <StandardizedLayout
      title="Hawkly | Leading Web3 Security Marketplace"
      description="Connect with verified Web3 security experts for smart contract audits. Fast, secure, affordable blockchain security solutions."
      keywords="web3 security, smart contract audit, blockchain security"
      showBreadcrumbs={false}
    >
      <SkipLink targetId="main-content" />
      
      <main id="main-content">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
          
          <div className="container relative z-10 text-center px-4">
            <div className="max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-8">
                <Shield className="h-4 w-4 text-blue-300" />
                <span className="text-sm font-medium text-white">Trusted by 500+ Web3 Projects</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight">
                Secure Your Web3 Project
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  in Days, Not Months
                </span>
              </h1>
              
              <p className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                Connect with verified security experts for fast, comprehensive smart contract audits. 
                AI-powered matching, transparent pricing, guaranteed results.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white h-14 px-8 text-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                  <Link to="/request-audit">
                    Get Security Audit
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 h-14 px-8 text-lg font-semibold">
                  <Link to="/auth">
                    Join as Expert
                    <Users className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>

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

        {/* Trust Section */}
        <section className="py-16 bg-gray-900 border-y border-gray-800">
          <div className="container">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4 bg-blue-900/30 border-blue-600 text-blue-300">
                Trusted by Leading Web3 Projects
              </Badge>
              <h2 className="text-3xl font-bold text-white mb-4">Industry-Leading Security Standards</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center border border-blue-500/30">
                  <Shield className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">SOC 2 Compliant</h3>
                <p className="text-gray-400 text-sm">Enterprise-grade security standards</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center border border-green-500/30">
                  <CheckCircle className="h-8 w-8 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Certified Auditors</h3>
                <p className="text-gray-400 text-sm">Rigorously vetted security professionals</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center border border-purple-500/30">
                  <Users className="h-8 w-8 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">24/7 Support</h3>
                <p className="text-gray-400 text-sm">Round-the-clock expert assistance</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-lg flex items-center justify-center border border-orange-500/30">
                  <Clock className="h-8 w-8 text-orange-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">48hr Turnaround</h3>
                <p className="text-gray-400 text-sm">Fast-track audit options available</p>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 md:py-20 bg-gray-900">
          <div className="container px-4">
            <div className="text-center mb-12 md:mb-16">
              <Badge variant="outline" className="mb-4 bg-blue-900/30 border-blue-600 text-blue-300">
                Simple 4-Step Process
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6">How Hawkly Works</h2>
              <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
                From submission to security report in days, not weeks. Our streamlined process gets you results fast.
              </p>
            </div>
            
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="mb-4">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-sm">
                      1
                    </span>
                  </div>
                  <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center border border-blue-500/30">
                    <Upload className="h-8 w-8 text-blue-400" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-3">Submit Project</h3>
                  <p className="text-gray-300 mb-4 text-sm leading-relaxed px-2">Upload your smart contract code and requirements</p>
                  <Badge variant="secondary" className="bg-gray-800 text-gray-300 border-gray-700 text-xs">
                    ⏱️ 5 minutes
                  </Badge>
                </div>

                <div className="text-center">
                  <div className="mb-4">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-sm">
                      2
                    </span>
                  </div>
                  <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center border border-purple-500/30">
                    <Search className="h-8 w-8 text-purple-400" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-3">AI Matching</h3>
                  <p className="text-gray-300 mb-4 text-sm leading-relaxed px-2">Our AI finds the perfect security expert for your project</p>
                  <Badge variant="secondary" className="bg-gray-800 text-gray-300 border-gray-700 text-xs">
                    ⏱️ 1 hour
                  </Badge>
                </div>

                <div className="text-center">
                  <div className="mb-4">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-sm">
                      3
                    </span>
                  </div>
                  <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center border border-green-500/30">
                    <Shield className="h-8 w-8 text-green-400" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-3">Security Audit</h3>
                  <p className="text-gray-300 mb-4 text-sm leading-relaxed px-2">Expert conducts comprehensive vulnerability assessment</p>
                  <Badge variant="secondary" className="bg-gray-800 text-gray-300 border-gray-700 text-xs">
                    ⏱️ 2-5 days
                  </Badge>
                </div>

                <div className="text-center">
                  <div className="mb-4">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-sm">
                      4
                    </span>
                  </div>
                  <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl flex items-center justify-center border border-orange-500/30">
                    <CheckCircle className="h-8 w-8 text-orange-400" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-3">Report Delivery</h3>
                  <p className="text-gray-300 mb-4 text-sm leading-relaxed px-2">Receive detailed security report with recommendations</p>
                  <Badge variant="secondary" className="bg-gray-800 text-gray-300 border-gray-700 text-xs">
                    ⏱️ Same day
                  </Badge>
                </div>
              </div>
              
              <div className="text-center mt-8 md:mt-12 p-4 md:p-6 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl border border-blue-500/30">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Total Time: 3-6 Days</h3>
                <p className="text-gray-300 text-sm md:text-base">From submission to comprehensive security report</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </StandardizedLayout>
  );
}
