
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Upload, Search, Shield, CheckCircle, ArrowRight } from 'lucide-react';

export function ProcessVisualization() {
  const steps = [
    {
      icon: <Upload className="h-8 w-8" />,
      title: "Submit Project",
      description: "Upload your smart contract code and requirements",
      time: "5 minutes",
      color: "blue"
    },
    {
      icon: <Search className="h-8 w-8" />,
      title: "AI Matching",
      description: "Our AI finds the perfect security expert for your project",
      time: "1 hour",
      color: "purple"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Security Audit",
      description: "Expert conducts comprehensive vulnerability assessment",
      time: "2-5 days",
      color: "green"
    },
    {
      icon: <CheckCircle className="h-8 w-8" />,
      title: "Report Delivery",
      description: "Receive detailed security report with recommendations",
      time: "Same day",
      color: "orange"
    }
  ];

  const colorClasses = {
    blue: "from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-400",
    purple: "from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-400",
    green: "from-green-500/20 to-emerald-500/20 border-green-500/30 text-green-400",
    orange: "from-orange-500/20 to-red-500/20 border-orange-500/30 text-orange-400"
  };

  return (
    <section className="py-20 bg-gray-900">
      <div className="container">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 bg-blue-900/30 border-blue-600 text-blue-300">
            Simple 4-Step Process
          </Badge>
          <h2 className="text-4xl font-bold text-white mb-6">How Hawkly Works</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From submission to security report in days, not weeks. Our streamlined process gets you results fast.
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connecting arrow - hidden on mobile, shown on desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="h-6 w-6 text-gray-500" />
                  </div>
                )}
                
                <div className="text-center">
                  {/* Step number */}
                  <div className="mb-4">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-sm">
                      {index + 1}
                    </span>
                  </div>
                  
                  {/* Icon */}
                  <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${colorClasses[step.color as keyof typeof colorClasses]} rounded-xl flex items-center justify-center border`}>
                    <div className={colorClasses[step.color as keyof typeof colorClasses].split(' ').slice(-1)[0]}>
                      {step.icon}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-gray-300 mb-4 text-sm leading-relaxed">{step.description}</p>
                  
                  {/* Time estimate */}
                  <Badge variant="secondary" className="bg-gray-800 text-gray-300 border-gray-700">
                    ⏱️ {step.time}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
          
          {/* Total time callout */}
          <div className="text-center mt-12 p-6 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl border border-blue-500/30">
            <h3 className="text-2xl font-bold text-white mb-2">Total Time: 3-6 Days</h3>
            <p className="text-gray-300">From submission to comprehensive security report</p>
          </div>
        </div>
      </div>
    </section>
  );
}
