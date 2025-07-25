
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Users, BarChart3, DollarSign, Bell, Lock, Eye, Zap } from 'lucide-react';

export function FeaturesOverview() {
  const features = [
    {
      icon: <Eye className="h-8 w-8" />,
      title: 'Vigilant Security Audits',
      description: 'Sharp-eyed experts conduct comprehensive smart contract reviews with military precision'
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Guardian Matching',
      description: 'AI-powered system connects you with the perfect security guardians for your project'
    },
    {
      icon: <DollarSign className="h-8 w-8" />,
      title: 'Secure Escrow Protection',
      description: 'Milestone-based payments with smart contract protection and dispute resolution'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Real-time Collaboration',
      description: 'Live document editing and team communication tools for seamless security workflows'
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: 'Advanced Security Analytics',
      description: 'Comprehensive insights and vulnerability tracking with predictive risk assessment'
    },
    {
      icon: <Bell className="h-8 w-8" />,
      title: 'Intelligent Alert System',
      description: 'AI-powered notifications and real-time security monitoring for your digital assets'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">
            <span className="text-white">Guardian </span>
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Platform Features</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Everything you need for professional Web3 security auditing with military-grade precision and reliability
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 border-gray-700/50 hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
              <CardHeader className="text-center">
                <div className="mx-auto p-4 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg w-fit mb-4 border border-blue-500/20">
                  <div className="text-blue-400">
                    {feature.icon}
                  </div>
                </div>
                <CardTitle className="text-xl text-white">{feature.title}</CardTitle>
                <CardDescription className="text-gray-300">{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
        
        {/* Enterprise Security Badge */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20">
            <Lock className="h-8 w-8 text-purple-400" />
            <div className="text-left">
              <h3 className="text-lg font-semibold text-white">Enterprise Security Grade</h3>
              <p className="text-gray-300">SOC 2 compliant with end-to-end encryption and multi-factor authentication</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
