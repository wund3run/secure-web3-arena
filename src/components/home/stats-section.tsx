
import React from 'react';
import { TrendingUp, Shield, Users, DollarSign } from 'lucide-react';

export function StatsSection() {
  const stats = [
    {
      id: 1,
      name: 'Security Experts',
      value: '500+',
      icon: Users,
      description: 'Verified auditors worldwide'
    },
    {
      id: 2,
      name: 'Funds Protected',
      value: '$350M+',
      icon: Shield,
      description: 'Total value secured'
    },
    {
      id: 3,
      name: 'Audits Completed',
      value: '2,500+',
      icon: TrendingUp,
      description: 'Successful security reviews'
    },
    {
      id: 4,
      name: 'Average Savings',
      value: '40%',
      icon: DollarSign,
      description: 'Cost reduction vs traditional firms'
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
            Trusted by the Web3 Community
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Join thousands of projects that have secured their smart contracts through our platform.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.id} className="text-center">
              <div className="flex justify-center mb-4">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground">
                  <stat.icon className="h-8 w-8" aria-hidden="true" />
                </div>
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">
                {stat.value}
              </div>
              <div className="text-lg font-medium text-foreground mb-1">
                {stat.name}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
