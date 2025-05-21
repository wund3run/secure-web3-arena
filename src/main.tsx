
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

// Initialize performance monitoring without blocking the main thread
if (process.env.NODE_ENV === 'production') {
  // Use requestIdleCallback to defer non-critical operations
  (window.requestIdleCallback || ((cb) => setTimeout(cb, 50)))(async () => {
    try {
      const webVitals = await import('web-vitals');
      const reportWebVitals = (metric) => {
        // Group similar metrics to reduce console noise
        const metricName = metric.name.toUpperCase();
        const value = Math.round(metric.value);
        console.debug(`[Perf] ${metricName}: ${value}ms`);
      };
      
      // Spread out metric calculations to avoid layout thrashing
      setTimeout(() => webVitals.onFCP(reportWebVitals), 0);
      setTimeout(() => webVitals.onLCP(reportWebVitals), 500);
      setTimeout(() => webVitals.onCLS(reportWebVitals), 1000);
      setTimeout(() => webVitals.onTTFB(reportWebVitals), 1500);
      setTimeout(() => webVitals.onINP?.(reportWebVitals), 2000);
    } catch (err) {
      console.warn('Web Vitals reporting failed:', err);
    }
  });
}

// Create root with concurrent mode for better performance
const root = ReactDOM.createRoot(document.getElementById("root")!);

// Use concurrent mode rendering without any providers (they're now in AppProviders)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
