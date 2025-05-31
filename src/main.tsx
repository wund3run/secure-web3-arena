
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

// Lazy load the main App component to reduce initial bundle size
const App = React.lazy(() => import("./App"));

// Create root with minimal overhead
const root = ReactDOM.createRoot(document.getElementById("root")!);

// Minimal loading fallback
const AppFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="flex flex-col items-center">
      <img 
        src="/lovable-uploads/fd4d9ea7-6cf1-4fe8-9327-9c7822369207.png" 
        alt="Hawkly"
        className="h-16 w-16 mb-4"
        loading="eager"
      />
      <div className="w-8 h-8 border-2 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
  </div>
);

// Render with minimal overhead
root.render(
  <React.StrictMode>
    <React.Suspense fallback={<AppFallback />}>
      <App />
    </React.Suspense>
  </React.StrictMode>
);

// Remove the complex preloading logic that was causing delays
if (document.querySelector('.initial-loader')) {
  document.body.classList.add('app-loaded');
}
