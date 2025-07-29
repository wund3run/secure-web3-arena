
import React from "react";
import { MetricItem } from "./MetricItem";
import type { PerformanceMetrics } from "../hooks/usePerformanceMetrics";

interface MetricsDashboardProps {
  metrics: PerformanceMetrics;
  onClose: () => void;
}

export const MetricsDashboard: React.FC<MetricsDashboardProps> = ({ metrics, onClose }) => {
  return (
    <div className="fixed bottom-20 right-4 bg-black/80 text-white p-3 rounded-lg text-xs z-50 min-w-[200px] shadow-lg">
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold">Performance Monitor</span>
        <button 
          onClick={onClose}
          className="text-white/60 hover:text-white"
          aria-label="Close performance monitor"
        >
          ×
        </button>
      </div>
      
      <div className="space-y-1">
        <MetricItem 
          label="FPS" 
          value={metrics.fps} 
          threshold={30} 
          isGood={metrics.fps >= 30} 
        />
        
        {metrics.memory > 0 && (
          <MetricItem 
            label="Memory" 
            value={metrics.memory} 
            unit=" MB" 
            showColor={false} 
          />
        )}
        
        <MetricItem 
          label="Load Time" 
          value={metrics.loadTime} 
          unit=" ms" 
          threshold={2000} 
          isGood={metrics.loadTime <= 2000} 
        />
        
        {metrics.fcp > 0 && (
          <MetricItem 
            label="FCP" 
            value={metrics.fcp} 
            unit=" ms" 
            threshold={2000} 
            isGood={metrics.fcp <= 2000} 
          />
        )}
        
        {metrics.lcp > 0 && (
          <MetricItem 
            label="LCP" 
            value={metrics.lcp} 
            unit=" ms" 
            threshold={2500} 
            isGood={metrics.lcp <= 2500} 
          />
        )}
        
        {metrics.cls > 0 && (
          <MetricItem 
            label="CLS" 
            value={metrics.cls} 
            threshold={0.1} 
            isGood={metrics.cls <= 0.1} 
          />
        )}
        
        {metrics.ttfb > 0 && (
          <MetricItem 
            label="TTFB" 
            value={metrics.ttfb} 
            unit=" ms" 
            threshold={600} 
            isGood={metrics.ttfb <= 600} 
          />
        )}
      </div>
      
      <div className="mt-2 text-[10px] text-white/60">
        Press Ctrl+Shift+P to toggle
      </div>
    </div>
  );
};
