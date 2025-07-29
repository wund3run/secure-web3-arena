
import React from 'react';
import { Clock, Users, Star, DollarSign } from 'lucide-react';

const DEMO_METRICS = [
  { icon: Clock, value: "2 hours", label: "Average response time" },
  { icon: Users, value: "50+", label: "Verified auditors" },
  { icon: Star, value: "4.9/5", label: "Client satisfaction" },
  { icon: DollarSign, value: "$2.5k", label: "Starting price" }
];

export function DemoMetricsBar() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-3xl mx-auto">
      {DEMO_METRICS.map((metric, index) => (
        <div key={index} className="text-center">
          <div className="flex justify-center mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <metric.icon className="h-5 w-5 text-primary" />
            </div>
          </div>
          <div className="font-bold text-lg text-primary">{metric.value}</div>
          <div className="text-sm text-muted-foreground">{metric.label}</div>
        </div>
      ))}
    </div>
  );
}
