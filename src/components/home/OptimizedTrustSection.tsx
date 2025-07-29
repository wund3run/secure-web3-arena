
import React, { memo } from 'react';
import { Badge } from '@/components/ui/badge';
import { Shield, Award, Users, Zap } from 'lucide-react';

const OptimizedTrustSection = memo(() => {
  const features = [
    {
      icon: Shield,
      title: "SOC 2 Compliant",
      description: "Enterprise-grade security standards",
      gradient: "from-blue-500/20 to-purple-500/20",
      border: "border-blue-500/30",
      iconColor: "text-blue-400"
    },
    {
      icon: Award,
      title: "Certified Auditors",
      description: "Rigorously vetted security professionals",
      gradient: "from-green-500/20 to-emerald-500/20",
      border: "border-green-500/30",
      iconColor: "text-green-400"
    },
    {
      icon: Users,
      title: "24/7 Support",
      description: "Round-the-clock expert assistance",
      gradient: "from-purple-500/20 to-pink-500/20",
      border: "border-purple-500/30",
      iconColor: "text-purple-400"
    },
    {
      icon: Zap,
      title: "48hr Turnaround",
      description: "Fast-track audit options available",
      gradient: "from-orange-500/20 to-red-500/20",
      border: "border-orange-500/30",
      iconColor: "text-orange-400"
    }
  ];

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
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${feature.gradient} rounded-lg flex items-center justify-center border ${feature.border}`}>
                  <IconComponent className={`h-8 w-8 ${feature.iconColor}`} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

OptimizedTrustSection.displayName = 'OptimizedTrustSection';

export { OptimizedTrustSection };
