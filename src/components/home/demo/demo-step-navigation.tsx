
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Search, Shield, CheckCircle } from 'lucide-react';

const DEMO_STEPS = [
  {
    id: 1,
    title: "Submit Your Project",
    icon: FileText,
  },
  {
    id: 2,
    title: "AI Matching",
    icon: Search,
  },
  {
    id: 3,
    title: "Security Audit",
    icon: Shield,
  },
  {
    id: 4,
    title: "Get Report & Support",
    icon: CheckCircle,
  }
];

interface DemoStepNavigationProps {
  activeStep: number;
  onStepChange: (step: number) => void;
}

export function DemoStepNavigation({ activeStep, onStepChange }: DemoStepNavigationProps) {
  return (
    <div className="flex justify-center mb-8">
      <div className="flex gap-2 p-1 bg-muted/30 rounded-lg">
        {DEMO_STEPS.map((step) => (
          <Button
            key={step.id}
            variant={activeStep === step.id ? "default" : "ghost"}
            onClick={() => onStepChange(step.id)}
            className="flex items-center gap-2"
            size="sm"
          >
            <step.icon className="h-4 w-4" />
            <span className="hidden sm:inline">Step {step.id}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
