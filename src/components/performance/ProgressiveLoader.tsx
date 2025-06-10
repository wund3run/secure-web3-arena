
import React, { useState, useEffect, ReactNode } from 'react';
import { EnhancedSkeleton } from '@/components/ui/enhanced-skeleton';

interface ProgressiveStage {
  name: string;
  component: React.ComponentType<any>;
  loadTime: number;
  props?: any;
}

interface ProgressiveLoaderProps {
  stages: ProgressiveStage[];
  className?: string;
  fallback?: ReactNode;
}

export function ProgressiveLoader({ 
  stages, 
  className = '',
  fallback 
}: ProgressiveLoaderProps) {
  const [loadedStages, setLoadedStages] = useState<number>(0);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (loadedStages < stages.length) {
      const currentStage = stages[loadedStages];
      timeoutId = setTimeout(() => {
        setLoadedStages(prev => prev + 1);
      }, currentStage.loadTime);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [loadedStages, stages]);

  const defaultFallback = (
    <div className="space-y-6">
      <EnhancedSkeleton variant="card" className="h-64 w-full" />
    </div>
  );

  return (
    <div className={className}>
      {stages.slice(0, loadedStages).map((stage, index) => {
        const Component = stage.component;
        return (
          <div key={index} className="animate-fade-in">
            <Component {...(stage.props || {})} />
          </div>
        );
      })}
      
      {loadedStages < stages.length && (fallback || defaultFallback)}
    </div>
  );
}
