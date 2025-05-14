
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import './index.css';

// Preload critical fonts for better performance
const preloadFonts = () => {
  const links = [
    { rel: 'preload', href: '/fonts/inter-var.woff2', as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' }
  ];
  
  links.forEach(attributes => {
    const link = document.createElement('link');
    Object.entries(attributes).forEach(([key, value]) => {
      link.setAttribute(key, value as string);
    });
    document.head.appendChild(link);
  });
};

// Initialize performance monitoring
if (process.env.NODE_ENV === 'production') {
  // Add web vitals reporting in production using the correct import method for v5.0.1
  import('web-vitals').then(({ onCLS, onFCP, onLCP, onTTFB }) => {
    const reportWebVitals = (metric: any) => {
      // Log the metric to console (in production, you might send to an analytics service)
      console.log(metric);
    };
    
    // Use available metrics from web-vitals 5.0.1
    onCLS(reportWebVitals);
    onFCP(reportWebVitals);
    onLCP(reportWebVitals);
    onTTFB(reportWebVitals);
  });
}

// Preload fonts before rendering
preloadFonts();

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>
);
