
import React, { useState, useEffect } from 'react';
import { EnhancedSkeleton } from '@/components/ui/enhanced-skeleton';
import { Progress } from '@/components/ui/progress';

interface LoadingStage {
  name: string;
  component: React.ComponentType<any>;
  props?: any;
  loadTime?: number;
}

interface ProgressiveLoaderProps {
  stages: LoadingStage[];
  onComplete?: () => void;
  showProgress?: boolean;
  className?: string;
}

export function ProgressiveLoader({ 
  stages, 
  onComplete, 
  showProgress = false,
  className = ""
}: ProgressiveLoaderProps) {
  const [loadedStages, setLoadedStages] = useState<Set<number>>(new Set());
  const [currentStage, setCurrentStage] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (currentStage >= stages.length) {
      onComplete?.();
      return;
    }

    const stage = stages[currentStage];
    const loadTime = stage.loadTime || 200;

    const timer = setTimeout(() => {
      setLoadedStages(prev => new Set([...prev, currentStage]));
      setProgress(((currentStage + 1) / stages.length) * 100);
      setCurrentStage(prev => prev + 1);
    }, loadTime);

    return () => clearTimeout(timer);
  }, [currentStage, stages, onComplete]);

  return (
    <div className={className}>
      {showProgress && currentStage < stages.length && (
        <div className="mb-4 space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Loading {stages[currentStage]?.name || 'content'}...</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-1" />
        </div>
      )}
      
      <div className="space-y-0">
        {stages.map((stage, index) => {
          if (loadedStages.has(index)) {
            const StageComponent = stage.component;
            const stageProps = stage.props || {};
            return (
              <div key={stage.name} className="animate-fade-in-up">
                <StageComponent {...stageProps} />
              </div>
            );
          }
          
          if (index <= currentStage) {
            return (
              <EnhancedSkeleton 
                key={stage.name}
                variant="shimmer" 
                className="h-64 w-full rounded mb-8" 
              />
            );
          }
          
          return null;
        })}
      </div>
    </div>
  );
}
