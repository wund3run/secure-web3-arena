
import { useState, useEffect } from 'react';

export type PerformanceMetrics = {
  fps: number;
  memory: number;
  cpu: number;
  loadTime: number;
  fcp: number;    // First Contentful Paint
  lcp: number;    // Largest Contentful Paint
  cls: number;    // Cumulative Layout Shift
  ttfb: number;   // Time to First Byte
};

export const usePerformanceMetrics = (visible: boolean) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 0,
    memory: 0,
    cpu: 0,
    loadTime: 0,
    fcp: 0,
    lcp: 0,
    cls: 0,
    ttfb: 0
  });

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
  
  return metrics;
};
