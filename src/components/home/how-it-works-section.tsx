
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Search, Users, Shield, Award } from 'lucide-react';

const steps = [
  {
    icon: FileText,
    number: 1,
    title: "Post Your Project or Create Auditor Profile",
    description: "Fill in your details and requirements—takes less than 3 minutes."
  },
  {
    icon: Search,
    number: 2,
    title: "Get Matched Instantly",
    description: "Our platform recommends the most qualified auditors or projects."
  },
  {
    icon: Users,
    number: 3,
    title: "Collaborate & Track Progress",
    description: "Use your personalized dashboard to manage every step."
  },
  {
    icon: Shield,
    number: 4,
    title: "Receive Detailed Reports",
    description: "Clear, actionable insights for bulletproof security."
  },
  {
    icon: Award,
    number: 5,
    title: "Launch with Confidence",
    description: "Public audit reports, ratings, and badges to boost your project's credibility."
  }
];

export function HowItWorksSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How Hawkly Works</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get started with Web3 security in five simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((step, index) => (
            <Card key={index} className="relative text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                  {step.number}
                </div>
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
