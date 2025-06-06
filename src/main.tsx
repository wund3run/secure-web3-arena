
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import "./styles/design-tokens.css";
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
    <BrowserRouter>
      <AccessibilityProvider>
        <FocusVisibleProvider>
          <App />
        </FocusVisibleProvider>
      </AccessibilityProvider>
    </BrowserRouter>
  </React.StrictMode>
);
