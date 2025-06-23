
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { FocusVisibleProvider } from "./components/ui/interactive-elements";

// Enhanced service worker registration with better error handling
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('ServiceWorker registration successful');
        
        // Handle updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New content is available, refresh the page
                if (confirm('New version available! Refresh to update?')) {
                  window.location.reload();
                }
              }
            });
          }
        });
      })
      .catch(error => {
        console.warn('ServiceWorker registration failed, continuing without offline support:', error);
        // App continues to work without service worker
      });
  });
}

// Remove any blocked external scripts gracefully
const originalCreateElement = document.createElement;
document.createElement = function(tagName, options) {
  const element = originalCreateElement.call(this, tagName, options);
  
  // Prevent loading of potentially blocked scripts
  if (tagName === 'script' && element.src) {
    const blockedDomains = ['cloudflareinsights.com', 'google-analytics.com'];
    if (blockedDomains.some(domain => element.src.includes(domain))) {
      console.log('Blocked potentially problematic script:', element.src);
      return document.createElement('div'); // Return harmless element
    }
  }
  
  return element;
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <FocusVisibleProvider>
      <App />
    </FocusVisibleProvider>
  </React.StrictMode>
);
