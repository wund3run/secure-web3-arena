
import React from 'react';
import { Shield, Users, Zap, Award, CheckCircle, Star } from 'lucide-react';

export function EnhancedFeaturesSection() {
  const features = [
    {
      icon: Shield,
      title: "Advanced Security Audits",
      description: "Comprehensive smart contract analysis using cutting-edge tools and manual review processes.",
      gradient: "from-brand-primary to-brand-primary-light",
      shadowColor: "rgba(138, 115, 226, 0.3)"
    },
    {
      icon: Users,
      title: "Verified Expert Network",
      description: "Access to 500+ pre-vetted security professionals with proven blockchain expertise.",
      gradient: "from-brand-secondary to-brand-secondary-light", 
      shadowColor: "rgba(51, 195, 240, 0.3)"
    },
    {
      icon: Zap,
      title: "Rapid Response",
      description: "Get matched with the perfect auditor within 24 hours and start securing your project.",
      gradient: "from-brand-accent to-brand-accent-light",
      shadowColor: "rgba(255, 87, 34, 0.3)"
    },
    {
      icon: Award,
      title: "Quality Guarantee",
      description: "Every audit comes with comprehensive reporting and ongoing support for remediation.",
      gradient: "from-green-500 to-green-400",
      shadowColor: "rgba(34, 197, 94, 0.3)"
    },
    {
      icon: CheckCircle,
      title: "Compliance Ready",
      description: "SOC 2 and ISO 27001 certified processes ensuring enterprise-grade security standards.",
      gradient: "from-purple-500 to-purple-400",
      shadowColor: "rgba(147, 51, 234, 0.3)"
    },
    {
      icon: Star,
      title: "Premium Support",
      description: "24/7 dedicated support team to guide you through every step of the security process.",
      gradient: "from-yellow-500 to-yellow-400",
      shadowColor: "rgba(234, 179, 8, 0.3)"
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background with brand gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-brand-primary/5" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-brand-primary/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-gradient-to-r from-brand-secondary/10 to-transparent rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gray-900">Comprehensive Security</span>
            <br />
            <span className="gradient-text bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
              Solutions
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to secure your Web3 project, from initial review to ongoing protection
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="group relative p-8 rounded-2xl bg-white border border-gray-200 hover:border-transparent transition-all duration-300 hover:-translate-y-2"
                style={{
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 20px 40px ${feature.shadowColor}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
                }}
              >
                {/* Gradient background overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />
                
                {/* Icon with gradient background */}
                <div className={`relative w-16 h-16 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                
                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-brand-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                
                {/* Hover effect border */}
                <div className={`absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gradient-to-br group-hover:${feature.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
