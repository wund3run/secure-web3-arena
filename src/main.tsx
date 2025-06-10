
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { FocusVisibleProvider } from "./components/ui/interactive-elements";
import { AccessibilityProvider } from "./components/accessibility/AccessibilityEnhancements";

// Register the service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('ServiceWorker registration successful with scope:', registration.scope);
      })
      .catch(error => {
        console.error('ServiceWorker registration failed:', error);
      });
  });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AccessibilityProvider>
      <FocusVisibleProvider>
        <App />
      </FocusVisibleProvider>
    </AccessibilityProvider>
  </React.StrictMode>
);
