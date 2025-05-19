
import React, { useState, useEffect } from "react";

export function PerformanceMonitor() {
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
  
  useEffect(() => {
    // Only initialize monitoring when visible to save resources
    if (!visible) return;
    
    let frameCount = 0;
    let lastTime = performance.now();
    let frameId: number;
    let metricsCollected = false;
    
    // Function to calculate FPS
    const calculateFps = () => {
      frameCount++;
      const now = performance.now();
      
      // Update every second
      if (now - lastTime > 1000) {
        const fps = Math.round((frameCount * 1000) / (now - lastTime));
        
        setMetrics(prev => {
          // Access memory if available (Chrome only feature)
          let memoryUsage = 0;
          try {
            // Use a type assertion for memory access
            const performanceMemory = (performance as any).memory;
            if (performanceMemory && performanceMemory.usedJSHeapSize) {
              memoryUsage = Math.round(performanceMemory.usedJSHeapSize / 1048576);
            }
          } catch (e) {
            // Memory API not available (non-Chrome browsers)
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
      
      frameId = requestAnimationFrame(calculateFps);
    };
    
    // Collect web vitals data - runs only once per session
    if (!metricsCollected) {
      metricsCollected = true;
      
      // Calculate page load time using Navigation Timing API
      const loadTime = window.performance.timing ? 
        window.performance.timing.domContentLoadedEventEnd - 
        window.performance.timing.navigationStart : 0;
      
      setMetrics(prev => ({...prev, loadTime}));
      
      // Use Performance Observer API for web vitals
      if ('PerformanceObserver' in window) {
        // Observe First Contentful Paint
        try {
          const fcpObserver = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            if (entries.length > 0) {
              const fcp = Math.round(entries[0].startTime);
              setMetrics(prev => ({...prev, fcp}));
              fcpObserver.disconnect();
            }
          });
          fcpObserver.observe({ type: 'paint', buffered: true });
          
          // Observe Largest Contentful Paint
          const lcpObserver = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            if (entries.length > 0) {
              const lcp = Math.round(entries[entries.length - 1].startTime);
              setMetrics(prev => ({...prev, lcp}));
            }
          });
          lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
          
          // Observe Layout Shifts
          const clsObserver = new PerformanceObserver((entryList) => {
            let clsValue = 0;
            entryList.getEntries().forEach(entry => {
              if (!(entry as any).hadRecentInput) {
                clsValue += (entry as any).value;
              }
            });
            setMetrics(prev => ({...prev, cls: Number(clsValue.toFixed(3))}));
          });
          clsObserver.observe({ type: 'layout-shift', buffered: true });
          
          // Observe Time to First Byte
          const navigationObserver = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            if (entries.length > 0) {
              const navEntry = entries[0] as PerformanceNavigationTiming;
              const ttfb = Math.round(navEntry.responseStart - navEntry.requestStart);
              setMetrics(prev => ({...prev, ttfb}));
              navigationObserver.disconnect();
            }
          });
          navigationObserver.observe({ type: 'navigation', buffered: true });
        } catch (e) {
          console.error('Performance monitoring error:', e);
        }
      }
    }
    
    // Start monitoring if visible
    if (visible) {
      frameId = requestAnimationFrame(calculateFps);
    }
    
    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [visible]);
  
  // Toggle visibility with keyboard shortcut (Ctrl+Shift+P)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        e.preventDefault();
        setVisible(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  if (!visible) return null;
  
  return (
    <div className="fixed bottom-20 right-4 bg-black/80 text-white p-3 rounded-lg text-xs z-50 min-w-[200px] shadow-lg">
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold">Performance Monitor</span>
        <button 
          onClick={() => setVisible(false)}
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
}
