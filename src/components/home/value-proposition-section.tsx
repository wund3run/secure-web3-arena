
import React from 'react';
import { Shield, Zap, Users, Award, CheckCircle, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function ValuePropositionSection() {
  const propositions = [
    {
      icon: Shield,
      title: "Expert-Vetted Security",
      description: "Every auditor undergoes rigorous verification and continuous performance monitoring",
      color: "text-brand-primary",
      bgColor: "bg-brand-primary/10"
    },
    {
      icon: Zap,
      title: "Rapid Response",
      description: "Get matched with qualified auditors within 24 hours and start securing your project",
      color: "text-brand-secondary",
      bgColor: "bg-brand-secondary/10"
    },
    {
      icon: Users,
      title: "Collaborative Process",
      description: "Work directly with auditors through our platform for transparent, efficient audits",
      color: "text-brand-accent",
      bgColor: "bg-brand-accent/10"
    },
    {
      icon: Award,
      title: "Proven Track Record",
      description: "Join 2,500+ successfully completed audits with $350M+ in protected assets",
      color: "text-brand-primary",
      bgColor: "bg-brand-primary/10"
    },
    {
      icon: CheckCircle,
      title: "Comprehensive Coverage",
      description: "From smart contracts to DeFi protocols - we cover all blockchain security needs",
      color: "text-brand-secondary",
      bgColor: "bg-brand-secondary/10"
    },
    {
      icon: Globe,
      title: "Global Network",
      description: "Access security experts worldwide, available across all time zones",
      color: "text-brand-accent",
      bgColor: "bg-brand-accent/10"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-background via-brand-primary/5 to-brand-secondary/5">
      <div className="container-modern">
        <div className="text-center mb-16 stagger-animation">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Why Choose Hawkly?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The most trusted platform connecting blockchain projects with world-class security experts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 stagger-animation">
          {propositions.map((prop, index) => {
            const IconComponent = prop.icon;
            return (
              <div
                key={index}
                className="card-enhanced p-8 group brand-hover-lift"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg ${prop.bgColor} group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                    <IconComponent className={`h-6 w-6 ${prop.color}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-brand-primary transition-colors duration-300">
                      {prop.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {prop.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center animate-fade-in-up">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" variant="brand" className="shadow-brand-lg">
              <Link to="/marketplace">
                <Shield className="mr-2 h-5 w-5" />
                Explore Security Services
              </Link>
            </Button>
            <Button asChild size="lg" variant="brandSecondary">
              <Link to="/request-audit">
                Request Free Consultation
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
