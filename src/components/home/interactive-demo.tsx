
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Search, FileText, CheckCircle, ArrowRight, Clock, Users, Star, DollarSign } from 'lucide-react';

const DEMO_STEPS = [
  {
    id: 1,
    title: "Submit Your Project",
    description: "Upload your smart contract or provide repository access",
    icon: FileText,
    color: "from-blue-500 to-cyan-500",
    details: {
      timeframe: "< 5 minutes",
      requirements: ["Contract source code", "Project description", "Timeline preferences"],
      outcome: "Instant project analysis and quote"
    }
  },
  {
    id: 2,
    title: "AI Matching",
    description: "Our AI matches you with the perfect security expert",
    icon: Search,
    color: "from-purple-500 to-pink-500",
    details: {
      timeframe: "< 2 hours",
      requirements: ["Project complexity analysis", "Auditor availability", "Expertise matching"],
      outcome: "3-5 pre-qualified auditor profiles"
    }
  },
  {
    id: 3,
    title: "Security Audit",
    description: "Expert auditor performs comprehensive security review",
    icon: Shield,
    color: "from-green-500 to-teal-500",
    details: {
      timeframe: "5-10 days",
      requirements: ["Manual code review", "Automated scanning", "Vulnerability testing"],
      outcome: "Detailed security report with findings"
    }
  },
  {
    id: 4,
    title: "Get Report & Support",
    description: "Receive detailed findings and ongoing remediation support",
    icon: CheckCircle,
    color: "from-orange-500 to-red-500",
    details: {
      timeframe: "Immediate + 30 days support",
      requirements: ["Report delivery", "Issue explanations", "Fix verification"],
      outcome: "Production-ready secure smart contract"
    }
  }
];

const DEMO_METRICS = [
  { icon: Clock, value: "2 hours", label: "Average response time" },
  { icon: Users, value: "50+", label: "Verified auditors" },
  { icon: Star, value: "4.9/5", label: "Client satisfaction" },
  { icon: DollarSign, value: "$2.5k", label: "Starting price" }
];

export function InteractiveDemo() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <section className="py-16 border-t bg-muted/10">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How Hawkly Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get your Web3 project secured in 4 simple steps with full transparency
          </p>
        </div>

        {/* Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-3xl mx-auto">
          {DEMO_METRICS.map((metric, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <metric.icon className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="font-bold text-lg text-primary">{metric.value}</div>
              <div className="text-sm text-muted-foreground">{metric.label}</div>
            </div>
          ))}
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Step Navigation */}
          <div className="flex justify-center mb-8">
            <div className="flex gap-2 p-1 bg-muted/30 rounded-lg">
              {DEMO_STEPS.map((step) => (
                <Button
                  key={step.id}
                  variant={activeStep === step.id ? "default" : "ghost"}
                  onClick={() => setActiveStep(step.id)}
                  className="flex items-center gap-2"
                  size="sm"
                >
                  <step.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">Step {step.id}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Active Step Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Step Details */}
            <Card className="bg-card border shadow-sm">
              <CardContent className="p-8">
                {DEMO_STEPS.map((step) => (
                  <div
                    key={step.id}
                    className={`${activeStep === step.id ? 'block' : 'hidden'}`}
                  >
                    <div className={`inline-flex p-4 rounded-full bg-gradient-to-r ${step.color} mb-6`}>
                      <step.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                    <p className="text-lg text-muted-foreground mb-6">
                      {step.description}
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <Badge variant="outline" className="mb-2">
                          <Clock className="h-3 w-3 mr-1" />
                          {step.details.timeframe}
                        </Badge>
                        <h4 className="font-semibold mb-2">What's Included:</h4>
                        <ul className="space-y-1">
                          {step.details.requirements.map((req, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-center">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="bg-primary/5 p-4 rounded-lg">
                        <h4 className="font-semibold text-primary mb-1">Outcome:</h4>
                        <p className="text-sm">{step.details.outcome}</p>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex gap-3 mt-8">
                  {activeStep === DEMO_STEPS.length ? (
                    <Button asChild size="lg" className="flex-1">
                      <Link to="/request-audit" className="flex items-center justify-center">
                        Start Your Audit <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  ) : (
                    <>
                      <Button 
                        onClick={() => setActiveStep(activeStep + 1)}
                        size="lg"
                        className="flex-1"
                      >
                        Next Step <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                      <Button asChild variant="outline" size="lg">
                        <Link to="/request-audit">Skip Demo</Link>
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Visual Timeline */}
            <div className="space-y-4">
              {DEMO_STEPS.map((step, index) => (
                <div 
                  key={step.id}
                  className={`flex items-start p-4 rounded-lg border transition-all cursor-pointer ${
                    activeStep === step.id 
                      ? 'bg-primary/10 border-primary/30 shadow-sm' 
                      : 'bg-card hover:bg-muted/20'
                  }`}
                  onClick={() => setActiveStep(step.id)}
                >
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${step.color} mr-4 flex-shrink-0`}>
                    <step.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{step.title}</h4>
                      <Badge variant="secondary" className="text-xs">
                        Step {step.id}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                    {activeStep === step.id && (
                      <Badge variant="outline" className="mt-2">
                        <Clock className="h-3 w-3 mr-1" />
                        {step.details.timeframe}
                      </Badge>
                    )}
                  </div>
                  {index < DEMO_STEPS.length - 1 && (
                    <div className="absolute left-6 mt-12 w-0.5 h-8 bg-muted"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center mt-8">
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
