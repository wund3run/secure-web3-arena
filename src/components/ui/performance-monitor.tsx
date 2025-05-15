
import React, { useState, useEffect } from "react";

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState({
    fps: 0,
    memory: 0,
    cpu: 0,
    loadTime: 0
  });
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let frameId: number;
    
    // Calculate page load time
    const loadTime = window.performance.timing.domContentLoadedEventEnd - 
                     window.performance.timing.navigationStart;
    
    setMetrics(prev => ({...prev, loadTime}));
    
    // Function to calculate FPS
    const calculateFps = () => {
      frameCount++;
      const now = performance.now();
      
      // Update every second
      if (now - lastTime > 1000) {
        const fps = Math.round((frameCount * 1000) / (now - lastTime));
        
        setMetrics(prev => ({
          ...prev,
          fps,
          // Only works in Chrome
          memory: Math.round(performance?.memory?.usedJSHeapSize / 1048576) || 0
        }));
        
        frameCount = 0;
        lastTime = now;
      }
      
      frameId = requestAnimationFrame(calculateFps);
    };
    
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
    <div className="fixed bottom-20 right-4 bg-black/80 text-white p-3 rounded-lg text-xs z-50 min-w-[180px] shadow-lg">
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold">Performance</span>
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
          <span>{metrics.loadTime} ms</span>
        </div>
      </div>
      
      <div className="mt-2 text-[10px] text-white/60">
        Press Ctrl+Shift+P to toggle
      </div>
    </div>
  );
}
