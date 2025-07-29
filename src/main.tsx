// Import ethereum conflict resolver FIRST to handle wallet conflicts
import './utils/ethereum-conflict-resolver';

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Register the service worker only in production
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('ServiceWorker registration successful');
      })
      .catch(error => {
        console.warn('ServiceWorker registration failed:', error);
        // App continues to work without service worker
      });
  });
}

// Global error handler for uncaught errors
window.addEventListener('error', (event) => {
  // Only log non-network errors to avoid spam from content blockers
  if (!event.message.includes('net::ERR_BLOCKED_BY_CONTENT_BLOCKER')) {
    console.error('Global error caught:', event.error);
  }
});

window.addEventListener('unhandledrejection', (event) => {
  // Only log non-network promise rejections
  if (!event.reason?.message?.includes('net::ERR_BLOCKED_BY_CONTENT_BLOCKER')) {
    console.error('Unhandled promise rejection:', event.reason);
  }
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
