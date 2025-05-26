
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, ArrowRight, FileText, Search, Shield } from 'lucide-react';

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

interface DemoStepDetailsProps {
  activeStep: number;
  onNextStep: () => void;
}

export function DemoStepDetails({ activeStep, onNextStep }: DemoStepDetailsProps) {
  return (
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
                onClick={onNextStep}
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
  );
}
