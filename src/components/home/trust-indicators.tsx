
import React from 'react';
import { Shield, Users, Award, CheckCircle, Star, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function TrustIndicators() {
  const stats = [
    {
      icon: Shield,
      value: "500+",
      label: "Verified Security Experts",
      description: "Rigorously vetted professionals",
      color: "text-brand-primary"
    },
    {
      icon: Users,
      value: "$350M+",
      label: "Assets Protected",
      description: "Total value secured",
      color: "text-brand-secondary"
    },
    {
      icon: Award,
      value: "2,500+",
      label: "Audits Completed",
      description: "Successfully delivered projects",
      color: "text-brand-accent"
    },
    {
      icon: CheckCircle,
      value: "12,800+",
      label: "Vulnerabilities Found",
      description: "Critical issues identified",
      color: "text-brand-primary"
    }
  ];

  const badges = [
    { icon: Shield, text: "SOC 2 Compliant", color: "bg-brand-primary/10 text-brand-primary border-brand-primary/30" },
    { icon: Star, text: "ISO 27001 Certified", color: "bg-brand-secondary/10 text-brand-secondary border-brand-secondary/30" },
    { icon: Zap, text: "24/7 Support", color: "bg-brand-accent/10 text-brand-accent border-brand-accent/30" }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-brand-primary/5 via-background to-brand-secondary/5">
      <div className="container-modern">
        <div className="text-center mb-12 stagger-animation">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
            Trusted by Leading Web3 Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of projects that rely on our security expertise to protect their blockchain applications
          </p>
        </div>

        {/* Enhanced stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 stagger-animation">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div 
                key={index}
                className="card-enhanced p-6 text-center group brand-hover-lift"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 group-hover:from-brand-primary/20 group-hover:to-brand-secondary/20 transition-all duration-300">
                    <IconComponent className={`h-8 w-8 ${stat.color} group-hover:scale-110 transition-transform duration-300`} />
                  </div>
                </div>
                <div className="text-3xl font-bold mb-2 gradient-text">
                  {stat.value}
                </div>
                <div className="font-semibold text-foreground mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.description}
                </div>
              </div>
            );
          })}
        </div>

        {/* Enhanced trust badges */}
        <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up">
          {badges.map((badge, index) => {
            const IconComponent = badge.icon;
            return (
              <Badge 
                key={index}
                className={`px-6 py-3 text-sm font-medium border transition-all duration-300 hover:scale-105 ${badge.color}`}
              >
                <IconComponent className="h-4 w-4 mr-2" />
                {badge.text}
              </Badge>
            );
          })}
        </div>
      </div>
    </section>
  );
}
