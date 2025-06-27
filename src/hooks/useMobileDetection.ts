
import { useState, useEffect } from 'react';

interface MobileDetectionHook {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  screenSize: 'mobile' | 'tablet' | 'desktop';
  orientation: 'portrait' | 'landscape';
  touchSupported: boolean;
}

export function useMobileDetection(): MobileDetectionHook {
  const [detection, setDetection] = useState<MobileDetectionHook>(() => {
    if (typeof window === 'undefined') {
      return {
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        screenSize: 'desktop' as const,
        orientation: 'landscape' as const,
        touchSupported: false
      };
    }

    const width = window.innerWidth;
    const height = window.innerHeight;
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;
    const isDesktop = width >= 1024;
    
    return {
      isMobile,
      isTablet,
      isDesktop,
      screenSize: isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop',
      orientation: height > width ? 'portrait' : 'landscape',
      touchSupported: 'ontouchstart' in window || navigator.maxTouchPoints > 0
    };
  });

  useEffect(() => {
    const updateDetection = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;
      const isDesktop = width >= 1024;

      setDetection({
        isMobile,
        isTablet,
        isDesktop,
        screenSize: isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop',
        orientation: height > width ? 'portrait' : 'landscape',
        touchSupported: 'ontouchstart' in window || navigator.maxTouchPoints > 0
      });
    };

    window.addEventListener('resize', updateDetection);
    window.addEventListener('orientationchange', updateDetection);

    return () => {
      window.removeEventListener('resize', updateDetection);
      window.removeEventListener('orientationchange', updateDetection);
    };
  }, []);

  return detection;
}

// Hook for responsive values
export function useResponsiveValue<T>(values: {
  mobile: T;
  tablet?: T;
  desktop: T;
}): T {
  const { isMobile, isTablet } = useMobileDetection();
  
  if (isMobile) return values.mobile;
  if (isTablet && values.tablet) return values.tablet;
  return values.desktop;
}

// Hook for viewport dimensions
export function useViewport() {
  const [viewport, setViewport] = useState(() => {
    if (typeof window === 'undefined') {
      return { width: 1024, height: 768 };
    }
    return {
      width: window.innerWidth,
      height: window.innerHeight
    };
  });

  useEffect(() => {
    const handleResize = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return viewport;
}
