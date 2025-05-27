
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// Create root with concurrent mode for better performance
const root = ReactDOM.createRoot(document.getElementById("root")!);

// Use createRoot for React 18+ features
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Hide initial loader when app is ready
if (document.querySelector('.initial-loader')) {
  document.body.classList.add('app-loaded');
}
