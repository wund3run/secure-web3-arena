
import React, { useState, useEffect, useCallback, memo } from "react";

export const PerformanceMonitor = memo(function PerformanceMonitor() {
  const [metrics, setMetrics] = useState({
    fps: 0,
    memory: 0,
    cpu: 0,
    loadTime: 0,
    fcp: 0,    // First Contentful Paint
    lcp: 0,    // Largest Contentful Paint
    cls: 0,    // Cumulative Layout Shift
    ttfb: 0    // Time to First Byte
  });
  const [visible, setVisible] = useState(false);
  
  // Toggle visibility callback - memoized for performance
  const toggleVisibility = useCallback(() => {
    setVisible(prev => !prev);
  }, []);
  
  useEffect(() => {
    // Only initialize monitoring when visible to save resources
    if (!visible) return;
    
    // Monitor variables
    let frameCount = 0;
    let lastTime = performance.now();
    let rafId: number | null = null;
    let metricsInitialized = false;
    
    // More efficient FPS tracking
    const calculateMetrics = () => {
      frameCount++;
      const now = performance.now();
      
      // Update metrics less frequently (once per second) to reduce overhead
      if (now - lastTime > 1000) {
        const fps = Math.round((frameCount * 1000) / (now - lastTime));
        
        // Use function updater to avoid closure issues
        setMetrics(prev => {
          // Get memory info if available (Chrome only)
          let memoryUsage = 0;
          try {
            const perfMemory = (performance as any).memory;
            if (perfMemory?.usedJSHeapSize) {
              memoryUsage = Math.round(perfMemory.usedJSHeapSize / 1048576);
            }
          } catch (e) {
            // Memory API not available, continue silently
          }
          
          return {
            ...prev,
            fps,
            memory: memoryUsage
          };
        });
        
        frameCount = 0;
        lastTime = now;
      }
      
      // Continue monitoring if still visible
      if (visible) {
        rafId = requestAnimationFrame(calculateMetrics);
      }
    };
    
    // Collect web vitals data - once per session
    if (!metricsInitialized) {
      metricsInitialized = true;
      
      // Calculate page load time
      const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const loadTime = navigationEntry ? 
        Math.round(navigationEntry.domContentLoadedEventEnd - navigationEntry.startTime) : 
        performance.timing ? 
          Math.round(performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart) : 0;
      
      setMetrics(prev => ({...prev, loadTime}));
      
      // Use Performance Observer API for web vitals where available
      if ('PerformanceObserver' in window) {
        // Batch observe performance entries to reduce overhead
        try {
          // Observe paint metrics (FCP)
          const paintObserver = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            for (const entry of entries) {
              if (entry.name === 'first-contentful-paint') {
                const fcp = Math.round(entry.startTime);
                setMetrics(prev => ({...prev, fcp}));
              }
            }
            paintObserver.disconnect();
          });
          paintObserver.observe({ type: 'paint', buffered: true });
          
          // Observe LCP in one go
          const lcpObserver = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            if (entries.length > 0) {
              const lcp = Math.round(entries[entries.length - 1].startTime);
              setMetrics(prev => ({...prev, lcp}));
            }
            // LCP can update multiple times, so we don't disconnect
          });
          lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
          
          // More efficient CLS tracking - only report final value
          let clsValue = 0;
          let clsEntries = 0;
          const clsObserver = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            for (const entry of entries) {
              if (!(entry as any).hadRecentInput) {
                clsValue += (entry as any).value;
                clsEntries++;
                
                // Only update every 5 entries to reduce state updates
                if (clsEntries % 5 === 0) {
                  setMetrics(prev => ({...prev, cls: Number(clsValue.toFixed(3))}));
                }
              }
            }
          });
          clsObserver.observe({ type: 'layout-shift', buffered: true });
          
          // Observe TTFB
          const navigationObserver = new PerformanceObserver((entryList) => {
            const navEntry = entryList.getEntries()[0] as PerformanceNavigationTiming;
            if (navEntry) {
              const ttfb = Math.round(navEntry.responseStart);
              setMetrics(prev => ({...prev, ttfb}));
              navigationObserver.disconnect();
            }
          });
          navigationObserver.observe({ type: 'navigation', buffered: true });
        } catch (e) {
          console.debug('Performance monitoring error:', e);
        }
      }
    }
    
    // Start metrics loop
    rafId = requestAnimationFrame(calculateMetrics);
    
    // Clean up function - critical to prevent memory leaks
    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [visible]); // Only re-run when visibility changes
  
  // Keyboard shortcut handler - kept outside the main effect
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only process if all keys match
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        e.preventDefault();
        toggleVisibility();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleVisibility]);
  
  // Don't render anything if not visible
  if (!visible) return null;
  
  // Use classes directly for better performance than dynamic styles
  return (
    <div className="fixed bottom-20 right-4 bg-black/80 text-white p-3 rounded-lg text-xs z-50 min-w-[200px] shadow-lg">
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold">Performance Monitor</span>
        <button 
          onClick={toggleVisibility}
          className="text-white/60 hover:text-white"
          aria-label="Close performance monitor"
        >
          ×
        </button>
      </div>
      
      <div className="space-y-1">
        <div className="flex justify-between">
          <span>FPS:</span>
          <span className={metrics.fps < 30 ? "text-red-400" : "text-green-400"}>
            {metrics.fps}
          </span>
        </div>
        {metrics.memory > 0 && (
          <div className="flex justify-between">
            <span>Memory:</span>
            <span>{metrics.memory} MB</span>
          </div>
        )}
        <div className="flex justify-between">
          <span>Load Time:</span>
          <span className={metrics.loadTime > 2000 ? "text-red-400" : "text-green-400"}>
            {metrics.loadTime} ms
          </span>
        </div>
        {metrics.fcp > 0 && (
          <div className="flex justify-between">
            <span>FCP:</span>
            <span className={metrics.fcp > 2000 ? "text-red-400" : "text-green-400"}>
              {metrics.fcp} ms
            </span>
          </div>
        )}
        {metrics.lcp > 0 && (
          <div className="flex justify-between">
            <span>LCP:</span>
            <span className={metrics.lcp > 2500 ? "text-red-400" : "text-green-400"}>
              {metrics.lcp} ms
            </span>
          </div>
        )}
        {metrics.cls > 0 && (
          <div className="flex justify-between">
            <span>CLS:</span>
            <span className={metrics.cls > 0.1 ? "text-red-400" : "text-green-400"}>
              {metrics.cls}
            </span>
          </div>
        )}
        {metrics.ttfb > 0 && (
          <div className="flex justify-between">
            <span>TTFB:</span>
            <span className={metrics.ttfb > 600 ? "text-red-400" : "text-green-400"}>
              {metrics.ttfb} ms
            </span>
          </div>
        )}
      </div>
      
      <div className="mt-2 text-[10px] text-white/60">
        Press Ctrl+Shift+P to toggle
      </div>
    </div>
  );
});
