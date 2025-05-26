
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Search, FileText, CheckCircle, ArrowRight } from 'lucide-react';

const DEMO_STEPS = [
  {
    id: 1,
    title: "Submit Your Project",
    description: "Upload your smart contract or provide repository access",
    icon: FileText,
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 2,
    title: "AI Matching",
    description: "Our AI matches you with the perfect security expert",
    icon: Search,
    color: "from-purple-500 to-pink-500"
  },
  {
    id: 3,
    title: "Security Audit",
    description: "Expert auditor performs comprehensive security review",
    icon: Shield,
    color: "from-green-500 to-teal-500"
  },
  {
    id: 4,
    title: "Get Report",
    description: "Receive detailed findings and remediation steps",
    icon: CheckCircle,
    color: "from-orange-500 to-red-500"
  }
];

export function InteractiveDemo() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <section className="py-16 border-t">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How Hawkly Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get your Web3 project secured in 4 simple steps
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Step Navigation */}
          <div className="flex justify-center mb-8">
            <div className="flex gap-2 p-1 bg-muted/30 rounded-lg">
              {DEMO_STEPS.map((step) => (
                <Button
                  key={step.id}
                  variant={activeStep === step.id ? "default" : "ghost"}
                  onClick={() => setActiveStep(step.id)}
                  className="flex items-center gap-2"
                >
                  <step.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">Step {step.id}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Active Step Content */}
          <Card className="bg-card border shadow-sm">
            <CardContent className="p-8">
              {DEMO_STEPS.map((step) => (
                <div
                  key={step.id}
                  className={`${activeStep === step.id ? 'block' : 'hidden'} text-center`}
                >
                  <div className={`inline-flex p-4 rounded-full bg-gradient-to-r ${step.color} mb-6`}>
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                  <p className="text-lg text-muted-foreground mb-6 max-w-lg mx-auto">
                    {step.description}
                  </p>
                  
                  {activeStep === DEMO_STEPS.length ? (
                    <Button asChild size="lg">
                      <a href="/request-audit" className="flex items-center">
                        Start Your Audit <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => setActiveStep(activeStep + 1)}
                      variant="outline" 
                      size="lg"
                    >
                      Next Step <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Progress Indicator */}
          <div className="flex justify-center mt-6">
            <div className="flex gap-2">
              {DEMO_STEPS.map((step) => (
                <div
                  key={step.id}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    activeStep >= step.id ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
