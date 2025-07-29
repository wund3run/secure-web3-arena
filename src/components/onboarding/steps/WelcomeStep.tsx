
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Users, Zap, Award } from 'lucide-react';

interface WelcomeStepProps {
  onNext: () => void;
}

export const WelcomeStep: React.FC<WelcomeStepProps> = ({ onNext }) => {
  const features = [
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Secure Auditing",
      description: "Industry-leading security standards and protocols"
    },
    {
      icon: <Users className="h-8 w-8 text-secondary" />,
      title: "Expert Network",
      description: "Connect with verified Web3 security professionals"
    },
    {
      icon: <Zap className="h-8 w-8 text-web3-orange" />,
      title: "Fast Matching",
      description: "AI-powered auditor matching for your specific needs"
    },
    {
      icon: <Award className="h-8 w-8 text-green-500" />,
      title: "Quality Assured",
      description: "All auditors are vetted and certified professionals"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="relative">
            <Shield className="h-16 w-16 text-primary" />
            <div className="absolute -top-1 -right-1 h-6 w-6 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">✓</span>
            </div>
          </div>
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Welcome to Hawkly
        </h2>
        <p className="text-lg text-muted-foreground max-w-md mx-auto">
          The premier Web3 security marketplace connecting projects with expert auditors
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {features.map((feature, index) => (
          <Card key={index} className="p-4 hover:shadow-md transition-shadow">
            <CardContent className="p-0 text-center space-y-2">
              <div className="flex justify-center">{feature.icon}</div>
              <h3 className="font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-muted/50 p-4 rounded-lg text-center">
        <p className="text-sm text-muted-foreground">
          <strong>Trusted by 500+ Web3 projects</strong> • <strong>200+ verified auditors</strong> • <strong>$50M+ secured</strong>
        </p>
      </div>
    </div>
  );
};
