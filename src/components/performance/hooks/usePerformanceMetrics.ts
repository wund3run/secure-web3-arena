
import { useState, useEffect, useRef } from 'react';

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

  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const rafIdRef = useRef<number | null>(null);
  const metricsInitializedRef = useRef(false);

  useEffect(() => {
    // Only initialize monitoring when visible to save resources
    if (!visible) {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      return;
    }
    
    // More efficient FPS tracking with throttling
    const calculateMetrics = () => {
      frameCountRef.current++;
      const now = performance.now();
      
      // Update metrics less frequently (once per second) to reduce overhead
      if (now - lastTimeRef.current > 1000) {
        const fps = Math.round((frameCountRef.current * 1000) / (now - lastTimeRef.current));
        
        // Get memory info if available (Chrome only) - with error handling
        let memoryUsage = 0;
        try {
          const perfMemory = (performance as any).memory;
          if (perfMemory?.usedJSHeapSize) {
            memoryUsage = Math.round(perfMemory.usedJSHeapSize / 1048576);
          }
        } catch (e) {
          // Memory API not available, continue silently
        }
        
        setMetrics(prev => ({
          ...prev,
          fps,
          memory: memoryUsage
        }));
        
        frameCountRef.current = 0;
        lastTimeRef.current = now;
      }
      
      // Continue monitoring if still visible
      if (visible) {
        rafIdRef.current = requestAnimationFrame(calculateMetrics);
      }
    };
    
    // Collect web vitals data - once per session with improved error handling
    if (!metricsInitializedRef.current) {
      metricsInitializedRef.current = true;
      
      // Calculate page load time with fallback
      try {
        const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const loadTime = navigationEntry ? 
          Math.round(navigationEntry.domContentLoadedEventEnd - navigationEntry.startTime) : 
          performance.timing ? 
            Math.round(performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart) : 0;
        
        setMetrics(prev => ({...prev, loadTime}));
      } catch (e) {
        console.debug('Performance timing API error:', e);
      }
      
      // Use Performance Observer API for web vitals where available
      if (typeof PerformanceObserver !== 'undefined') {
        try {
          // Observe paint metrics (FCP) with disconnect after first paint
          const paintObserver = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            for (const entry of entries) {
              if (entry.name === 'first-contentful-paint') {
                const fcp = Math.round(entry.startTime);
                setMetrics(prev => ({...prev, fcp}));
                paintObserver.disconnect();
                break;
              }
            }
          });
          paintObserver.observe({ type: 'paint', buffered: true });
          
          // Observe LCP with debounced updates
          let lcpTimeout: number;
          const lcpObserver = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            if (entries.length > 0) {
              const lcp = Math.round(entries[entries.length - 1].startTime);
              
              // Debounce LCP updates to reduce state changes
              clearTimeout(lcpTimeout);
              lcpTimeout = window.setTimeout(() => {
                setMetrics(prev => ({...prev, lcp}));
              }, 100);
            }
          });
          lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
          
          // More efficient CLS tracking with throttled updates
          let clsValue = 0;
          let clsUpdateTimeout: number;
          const clsObserver = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            for (const entry of entries) {
              if (!(entry as any).hadRecentInput) {
                clsValue += (entry as any).value;
                
                // Throttle CLS updates to every 500ms
                clearTimeout(clsUpdateTimeout);
                clsUpdateTimeout = window.setTimeout(() => {
                  setMetrics(prev => ({...prev, cls: Number(clsValue.toFixed(3))}));
                }, 500);
              }
            }
          });
          clsObserver.observe({ type: 'layout-shift', buffered: true });
          
          // Observe TTFB with single update
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
          console.debug('Performance Observer API error:', e);
        }
      }
    }
    
    // Start metrics loop
    rafIdRef.current = requestAnimationFrame(calculateMetrics);
    
    // Clean up function - critical to prevent memory leaks
    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [visible]); // Only re-run when visibility changes
  
  return metrics;
};
