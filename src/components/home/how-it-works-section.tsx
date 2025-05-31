
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Search, Shield, Clock, Users, Star, DollarSign, CheckCircle } from 'lucide-react';

const METRICS = [
  { icon: Clock, value: "2 hours", label: "Average response time" },
  { icon: Users, value: "50+", label: "Verified auditors" },
  { icon: Star, value: "4.9/5", label: "Client satisfaction" },
  { icon: DollarSign, value: "$2.5k", label: "Starting price" }
];

const STEPS = [
  {
    id: 1,
    title: "Submit Your Project",
    icon: FileText,
    description: "Upload your smart contract or provide repository access",
    timeframe: "< 5 minutes",
    details: [
      "Upload smart contract files or provide GitHub access",
      "Specify audit requirements and scope",
      "Set timeline and budget preferences",
      "Add any special instructions or concerns"
    ]
  },
  {
    id: 2,
    title: "AI Matching",
    icon: Search,
    description: "Our AI matches you with the perfect auditor",
    timeframe: "< 2 hours",
    details: [
      "AI analyzes your project complexity and requirements",
      "Matches with auditors based on expertise and availability",
      "Considers past performance and specializations",
      "Provides multiple auditor options with recommendations"
    ]
  },
  {
    id: 3,
    title: "Security Audit",
    icon: Shield,
    description: "Expert auditors review your code thoroughly",
    timeframe: "2-14 days",
    details: [
      "Comprehensive code review and vulnerability assessment",
      "Manual testing combined with automated tools",
      "Real-time progress updates and communication",
      "Preliminary findings shared throughout the process"
    ]
  },
  {
    id: 4,
    title: "Get Report & Support",
    icon: CheckCircle,
    description: "Receive detailed report with ongoing support",
    timeframe: "Same day",
    details: [
      "Detailed audit report with severity classifications",
      "Step-by-step remediation guidance",
      "Post-audit consultation and Q&A session",
      "Verification of fixes and final security clearance"
    ]
  }
];

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <section className="py-16 bg-muted/20">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How Hawkly Works</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get your Web3 project secured in 4 simple steps with full transparency
          </p>
        </div>

        {/* Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
          {METRICS.map((metric, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-3">
                <div className="p-3 bg-primary/10 rounded-full border border-primary/20">
                  <metric.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="font-bold text-xl text-primary mb-1">{metric.value}</div>
              <div className="text-sm text-muted-foreground">{metric.label}</div>
            </div>
          ))}
        </div>

        {/* Step Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex gap-2 p-1 bg-background/80 backdrop-blur-sm rounded-xl border border-border/50 shadow-sm">
            {STEPS.map((step) => (
              <Button
                key={step.id}
                variant={activeStep === step.id ? "default" : "ghost"}
                onClick={() => setActiveStep(step.id)}
                className="flex items-center gap-2 rounded-lg px-4 py-2"
                size="sm"
              >
                <step.icon className="h-4 w-4" />
                <span className="hidden sm:inline">Step {step.id}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Active Step Details */}
        <div className="max-w-4xl mx-auto">
          {STEPS.map((step) => (
            <div
              key={step.id}
              className={`transition-all duration-500 ${
                activeStep === step.id ? 'opacity-100 block' : 'opacity-0 hidden'
              }`}
            >
              <Card className="border-2 border-primary/20 bg-background/60 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20">
                        <step.icon className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <h3 className="text-2xl font-bold">{step.title}</h3>
                        <div className="bg-primary/10 px-3 py-1 rounded-full">
                          <Clock className="h-3 w-3 text-primary inline mr-1" />
                          <span className="text-xs font-medium text-primary">{step.timeframe}</span>
                        </div>
                      </div>
                      
                      <p className="text-lg text-muted-foreground mb-6">{step.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {step.details.map((detail, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mt-8">
          <div className="flex gap-2">
            {STEPS.map((_, index) => (
              <div
                key={index + 1}
                className={`w-2 h-2 rounded-full transition-colors ${
                  activeStep >= index + 1 ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
