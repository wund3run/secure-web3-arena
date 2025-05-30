
import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

// Get the root element
const container = document.getElementById("root");
if (!container) {
  throw new Error("Root element not found");
}

// Create root with React 18
const root = createRoot(container);

// Render the app
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Hide initial loader when app is ready
if (document.querySelector('.initial-loader')) {
  document.body.classList.add('app-loaded');
}
