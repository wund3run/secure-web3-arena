
import React from 'react';
import { Shield, DollarSign, Clock, Award } from 'lucide-react';

export function StatsSection() {
  const stats = [
    {
      icon: Shield,
      value: '$350M+',
      label: 'Value Protected',
      description: 'Total value secured through our audits'
    },
    {
      icon: Award,
      value: '2,500+',
      label: 'Audits Completed',
      description: 'Successful security assessments delivered'
    },
    {
      icon: Clock,
      value: '7 Days',
      label: 'Average Turnaround',
      description: 'Fast and efficient audit delivery'
    },
    {
      icon: DollarSign,
      value: '99.8%',
      label: 'Client Satisfaction',
      description: 'Clients who would recommend us'
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Trusted by the Web3 Community</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our platform has facilitated thousands of successful audits, protecting billions in value across the blockchain ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full">
                <stat.icon className="h-8 w-8 text-primary" />
              </div>
              <div>
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-lg font-semibold text-muted-foreground">{stat.label}</div>
                <p className="text-sm text-muted-foreground mt-2">{stat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
