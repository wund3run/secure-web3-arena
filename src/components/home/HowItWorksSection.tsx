
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Upload, Search, Handshake, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export function HowItWorksSection() {
  const steps = [
    {
      icon: Upload,
      title: 'Submit Your Project',
      description: 'Upload your smart contracts and provide project details including scope, timeline, and budget.',
      action: 'Get started in minutes'
    },
    {
      icon: Search,
      title: 'AI-Powered Matching',
      description: 'Our intelligent system matches you with the most qualified auditors based on your specific requirements.',
      action: 'Find perfect matches'
    },
    {
      icon: Handshake,
      title: 'Connect & Collaborate',
      description: 'Review proposals, communicate directly with auditors, and establish secure escrow agreements.',
      action: 'Build partnerships'
    },
    {
      icon: Shield,
      title: 'Secure Your Project',
      description: 'Receive comprehensive audit reports, track progress in real-time, and ensure your project\'s security.',
      action: 'Deploy with confidence'
    }
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How Hawkly Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our streamlined process makes it easy to connect with expert auditors and secure your Web3 projects in just a few simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-background rounded-2xl p-8 h-full shadow-lg border">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <step.icon className="h-8 w-8 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-primary">Step {index + 1}</div>
                      <h3 className="text-xl font-semibold">{step.title}</h3>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground">{step.description}</p>
                  
                  <div className="text-sm font-medium text-primary">{step.action}</div>
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <ArrowRight className="h-6 w-6 text-primary" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg" className="text-lg px-8">
            <Link to="/auth">Start Your Security Journey</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
