
import React, { useEffect } from "react";
import { AppProviders } from "./components/app/AppProviders";
import { GlobalComponents } from "./components/app/GlobalComponents";
import { AppRoutes } from "./components/app/AppRoutes";
import { AppInitializer } from "./components/app/AppInitializer";
import { toast } from "./hooks/use-toast";

/**
 * Main Application component
 * Provides application initialization, routing, and global state management
 */
function App() {
  // Monitor and report performance metrics
  useEffect(() => {
    // Add a marker for application start timing
    if (performance && performance.mark) {
      performance.mark('app-init-start');
    }

    // Report performance issues to the user if needed
    if ('performance' in window) {
      const navigationTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigationTiming && navigationTiming.duration > 5000) {
        console.warn('Page load time exceeded 5 seconds:', navigationTiming.duration);
        toast.info("Slow page load detected", { 
          description: "We're working to improve performance."
        });
      }
    }

    // Clean up function
    return () => {
      if (performance && performance.mark && performance.measure) {
        performance.mark('app-init-end');
        try {
          performance.measure('app-init-duration', 'app-init-start', 'app-init-end');
          const measures = performance.getEntriesByName('app-init-duration');
          if (measures.length > 0) {
            console.log('App initialization time:', measures[0].duration);
          }
        } catch (e) {
          console.error('Error measuring performance:', e);
        }
      }
    };
  }, []);

  return (
    <AppInitializer>
      <AppProviders>
        <div className="app">
          <GlobalComponents />
          <AppRoutes />
        </div>
      </AppProviders>
    </AppInitializer>
  );
}

export default App;
