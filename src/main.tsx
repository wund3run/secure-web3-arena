
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// Optimized lightweight loading fallback
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
  </div>
);

// Initialize performance monitoring only in production and defer it
if (process.env.NODE_ENV === 'production') {
  // Use requestIdleCallback to defer non-critical operations
  const idleCallback = window.requestIdleCallback || ((cb) => setTimeout(cb, 100));
  
  idleCallback(async () => {
    try {
      const webVitals = await import('web-vitals');
      
      // Throttled reporting to reduce overhead
      let reportTimeout: number;
      const throttledReport = (metric: any) => {
        clearTimeout(reportTimeout);
        reportTimeout = window.setTimeout(() => {
          const metricName = metric.name.toUpperCase();
          const value = Math.round(metric.value);
          console.debug(`[Perf] ${metricName}: ${value}ms`);
        }, 1000); // Batch reports every second
      };
      
      // Staggered metric collection to avoid blocking
      setTimeout(() => webVitals.onFCP(throttledReport), 0);
      setTimeout(() => webVitals.onLCP(throttledReport), 1000);
      setTimeout(() => webVitals.onCLS(throttledReport), 2000);
      setTimeout(() => webVitals.onTTFB(throttledReport), 3000);
      setTimeout(() => webVitals.onINP?.(throttledReport), 4000);
    } catch (err) {
      // Silently fail to avoid blocking the app
    }
  });
}

// Create root with concurrent mode for better performance
const root = ReactDOM.createRoot(document.getElementById("root")!);

// Use startTransition for non-urgent updates
React.startTransition(() => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
