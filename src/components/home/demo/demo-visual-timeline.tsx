
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Clock, FileText, Search, Shield, CheckCircle } from 'lucide-react';

const DEMO_STEPS = [
  {
    id: 1,
    title: "Submit Your Project",
    description: "Upload your smart contract or provide repository access",
    icon: FileText,
    color: "from-blue-500 to-cyan-500",
    details: {
      timeframe: "< 5 minutes",
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
    }
  }
];

interface DemoVisualTimelineProps {
  activeStep: number;
  onStepClick: (step: number) => void;
}

export function DemoVisualTimeline({ activeStep, onStepClick }: DemoVisualTimelineProps) {
  return (
    <div className="space-y-4">
      {DEMO_STEPS.map((step, index) => (
        <div 
          key={step.id}
          className={`flex items-start p-4 rounded-lg border transition-all cursor-pointer ${
            activeStep === step.id 
              ? 'bg-primary/10 border-primary/30 shadow-sm' 
              : 'bg-card hover:bg-muted/20'
          }`}
          onClick={() => onStepClick(step.id)}
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
  );
}
