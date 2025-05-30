
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Shield, DollarSign, Clock } from 'lucide-react';

export function MarketplaceStats() {
  const stats = [
    {
      icon: Users,
      label: 'Active Auditors',
      value: '500+',
      description: 'Verified security experts'
    },
    {
      icon: Shield,
      label: 'Audits Completed',
      value: '2,500+',
      description: 'Successful security reviews'
    },
    {
      icon: DollarSign,
      label: 'Value Protected',
      value: '$350M+',
      description: 'Total assets secured'
    },
    {
      icon: Clock,
      label: 'Avg. Response Time',
      value: '2 hours',
      description: 'Quick expert connections'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <stat.icon className="h-6 w-6 text-primary" />
            </div>
            <div className="text-2xl font-bold mb-1">{stat.value}</div>
            <div className="font-medium mb-1">{stat.label}</div>
            <div className="text-sm text-muted-foreground">{stat.description}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
