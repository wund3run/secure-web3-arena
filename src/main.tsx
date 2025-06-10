
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { FocusVisibleProvider } from "./components/ui/interactive-elements";

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
    <FocusVisibleProvider>
      <App />
    </FocusVisibleProvider>
  </React.StrictMode>
);
