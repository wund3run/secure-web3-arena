
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Shield, Award, Users, Zap } from 'lucide-react';

export function TrustSection() {
  return (
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
              <Award className="h-8 w-8 text-green-400" />
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
              <Zap className="h-8 w-8 text-orange-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">48hr Turnaround</h3>
            <p className="text-gray-400 text-sm">Fast-track audit options available</p>
          </div>
        </div>
      </div>
    </section>
  );
}
