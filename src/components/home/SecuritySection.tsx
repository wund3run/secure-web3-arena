
import React from 'react';
import { Shield, Lock, Eye, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function SecuritySection() {
  const securityFeatures = [
    {
      icon: Shield,
      title: 'Enterprise-Grade Security',
      description: 'Bank-level encryption and security protocols protect your sensitive project data.'
    },
    {
      icon: Lock,
      title: 'Secure Escrow System',
      description: 'Blockchain-based escrow ensures safe transactions and milestone-based payments.'
    },
    {
      icon: Eye,
      title: 'Transparent Process',
      description: 'Full audit trail and real-time progress tracking for complete transparency.'
    },
    {
      icon: Zap,
      title: 'Rapid Response',
      description: '24/7 monitoring and instant notifications for critical security findings.'
    }
  ];

  return (
    <section className="py-24">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="inline-flex items-center gap-2">
                <Shield className="h-3 w-3" />
                Security First
              </Badge>
              
              <h2 className="text-3xl md:text-4xl font-bold">
                Built for Security, 
                <span className="text-primary"> Designed for Trust</span>
              </h2>
              
              <p className="text-xl text-muted-foreground">
                Our platform prioritizes security at every level, ensuring your projects and data remain protected throughout the audit process.
              </p>
            </div>

            <div className="space-y-6">
              {securityFeatures.map((feature, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-card border rounded-lg p-6 shadow-lg">
                  <div className="text-2xl font-bold text-green-600">99.9%</div>
                  <div className="text-sm text-muted-foreground">Uptime</div>
                </div>
                <div className="bg-card border rounded-lg p-6 shadow-lg">
                  <div className="text-2xl font-bold text-blue-600">256-bit</div>
                  <div className="text-sm text-muted-foreground">Encryption</div>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="bg-card border rounded-lg p-6 shadow-lg">
                  <div className="text-2xl font-bold text-purple-600">24/7</div>
                  <div className="text-sm text-muted-foreground">Monitoring</div>
                </div>
                <div className="bg-card border rounded-lg p-6 shadow-lg">
                  <div className="text-2xl font-bold text-orange-600">SOC 2</div>
                  <div className="text-sm text-muted-foreground">Compliant</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
