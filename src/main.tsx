
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AccessibilityProvider } from "./contexts/AccessibilityContext";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root")!);

// Initialize performance monitoring
if (process.env.NODE_ENV === 'production') {
  // Add web vitals reporting in production with the correct imports and usage
  import('web-vitals').then((webVitals) => {
    const reportWebVitals = (metric: any) => {
      // In production, you might send to an analytics service
      console.log(metric.name, metric.value, metric.rating);
    };
    
    // Use the direct named imports from web-vitals v5
    webVitals.onCLS(reportWebVitals);
    webVitals.onLCP(reportWebVitals);
    webVitals.onFCP(reportWebVitals);
    webVitals.onTTFB(reportWebVitals);
    // Note: FID was removed in web-vitals v5 and replaced with INP
    webVitals.onINP?.(reportWebVitals); // Optional chaining in case INP isn't available
  });
}

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <AccessibilityProvider>
            <App />
          </AccessibilityProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>
);
