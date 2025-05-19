
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

// Initialize performance monitoring with more efficient approach
if (process.env.NODE_ENV === 'production') {
  // Use dynamic import for web vitals to avoid impacting initial load time
  import('web-vitals').then((webVitals) => {
    const reportWebVitals = (metric: any) => {
      // Use a more efficient logging approach in production
      console.log(`${metric.name}: ${metric.value} (${metric.rating})`);
    };
    
    // Create a timing buffer to spread out metric calculations
    setTimeout(() => {
      webVitals.onCLS(reportWebVitals);
      webVitals.onLCP(reportWebVitals);
      webVitals.onFCP(reportWebVitals);
      webVitals.onTTFB(reportWebVitals);
      webVitals.onINP?.(reportWebVitals);
    }, 100); // Short delay to prioritize main content rendering
  });
}

const root = ReactDOM.createRoot(document.getElementById("root")!);

// Use deferred rendering for non-critical UI elements
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>
);
