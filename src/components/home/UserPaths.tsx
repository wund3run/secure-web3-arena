
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HawklyButton } from '@/components/ui/HawklyButton';
import { Building, Shield, ArrowRight, DollarSign, Clock, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export function UserPaths() {
  return (
    <section className="py-20 bg-gray-800">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">Choose Your Path</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Whether you're building the next Web3 innovation or securing it, we have the perfect solution for you.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Project Owner Path - Purple gradient */}
          <Card className="relative overflow-hidden bg-gradient-to-br from-purple-900/50 to-blue-900/50 border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500"></div>
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg flex items-center justify-center border border-purple-500/30">
                <Building className="h-8 w-8 text-purple-400" />
              </div>
              <CardTitle className="text-2xl text-white">Project Owner</CardTitle>
              <CardDescription className="text-purple-200">
                Building something amazing? Get it secured by experts.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center mt-0.5">
                    <Clock className="h-3 w-3 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Fast Turnaround</h4>
                    <p className="text-sm text-gray-300">Get audit results in 2-5 days</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center mt-0.5">
                    <DollarSign className="h-3 w-3 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Transparent Pricing</h4>
                    <p className="text-sm text-gray-300">Fixed rates, no hidden fees</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center mt-0.5">
                    <Shield className="h-3 w-3 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Comprehensive Reports</h4>
                    <p className="text-sm text-gray-300">Detailed vulnerability analysis</p>
                  </div>
                </div>
              </div>
              
              <HawklyButton asChild variant="default" size="lg" className="w-full">
                <Link to="/request-audit">
                  Request Security Audit
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </HawklyButton>
            </CardContent>
          </Card>

          {/* Security Expert Path - Green gradient */}
          <Card className="relative overflow-hidden bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-500/30 hover:border-green-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500"></div>
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center border border-green-500/30">
                <Shield className="h-8 w-8 text-green-400" />
              </div>
              <CardTitle className="text-2xl text-white">Security Expert</CardTitle>
              <CardDescription className="text-green-200">
                Share your expertise and earn from security audits.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5">
                    <DollarSign className="h-3 w-3 text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Premium Rates</h4>
                    <p className="text-sm text-gray-300">Earn $150-500+ per audit</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5">
                    <Users className="h-3 w-3 text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">AI Matching</h4>
                    <p className="text-sm text-gray-300">Get matched with perfect projects</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5">
                    <Clock className="h-3 w-3 text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Flexible Schedule</h4>
                    <p className="text-sm text-gray-300">Work on your own terms</p>
                  </div>
                </div>
              </div>
              
              <HawklyButton asChild variant="secondary" size="lg" className="w-full">
                <Link to="/auth">
                  Join as Expert
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </HawklyButton>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
