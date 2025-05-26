
import React, { useState } from 'react';
import { DemoMetricsBar } from './demo/demo-metrics-bar';
import { DemoStepNavigation } from './demo/demo-step-navigation';
import { DemoStepDetails } from './demo/demo-step-details';
import { DemoVisualTimeline } from './demo/demo-visual-timeline';
import { DemoProgressIndicator } from './demo/demo-progress-indicator';

export function InteractiveDemo() {
  const [activeStep, setActiveStep] = useState(1);

  const handleNextStep = () => {
    setActiveStep(prev => Math.min(prev + 1, 4));
  };

  return (
    <section className="py-16 border-t bg-muted/10">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How Hawkly Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get your Web3 project secured in 4 simple steps with full transparency
          </p>
        </div>

        <DemoMetricsBar />

        <div className="max-w-6xl mx-auto">
          <DemoStepNavigation 
            activeStep={activeStep} 
            onStepChange={setActiveStep} 
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <DemoStepDetails 
              activeStep={activeStep} 
              onNextStep={handleNextStep} 
            />
            <DemoVisualTimeline 
              activeStep={activeStep} 
              onStepClick={setActiveStep} 
            />
          </div>

          <DemoProgressIndicator activeStep={activeStep} totalSteps={4} />
        </div>
      </div>
    </section>
  );
}
