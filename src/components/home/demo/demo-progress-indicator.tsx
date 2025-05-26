
import React from 'react';

interface DemoProgressIndicatorProps {
  activeStep: number;
  totalSteps: number;
}

export function DemoProgressIndicator({ activeStep, totalSteps }: DemoProgressIndicatorProps) {
  return (
    <div className="flex justify-center mt-8">
      <div className="flex gap-2">
        {Array.from({ length: totalSteps }, (_, index) => (
          <div
            key={index + 1}
            className={`w-2 h-2 rounded-full transition-colors ${
              activeStep >= index + 1 ? 'bg-primary' : 'bg-muted'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
