
import React, { memo } from "react";
import { useVisibility } from "./hooks/useVisibility";
import { usePerformanceMetrics } from "./hooks/usePerformanceMetrics";
import { MetricsDashboard } from "./components/MetricsDashboard";

export const PerformanceMonitor = memo(function PerformanceMonitor() {
  const { visible, toggleVisibility } = useVisibility();
  const metrics = usePerformanceMetrics(visible);
  
  // Don't render anything if not visible
  if (!visible) return null;
  
  return (
    <MetricsDashboard 
      metrics={metrics} 
      onClose={toggleVisibility} 
    />
  );
});

