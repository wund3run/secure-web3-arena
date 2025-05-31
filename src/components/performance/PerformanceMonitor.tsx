
import React, { useEffect, useState } from 'react';
import { usePerformanceMonitoring } from '@/hooks/usePerformanceMonitoring';

export const PerformanceMonitor: React.FC = () => {
  const { markPerformance } = usePerformanceMonitoring();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Mark performance milestones
    markPerformance('app-mounted');
    
    // Show performance info in development
    if (process.env.NODE_ENV === 'development') {
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [markPerformance]);

  if (!isVisible || process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-2 rounded text-xs z-50">
      <div>Performance Monitor Active</div>
      <div>Check console for metrics</div>
    </div>
  );
};
