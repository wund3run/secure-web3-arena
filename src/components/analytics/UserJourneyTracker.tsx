import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { auditLogger } from '@/utils/security/AuditLogger';
import { useAuth } from '@/contexts/auth';

interface PageViewEvent {
  page: string;
  timestamp: string;
  userId?: string;
  sessionId: string;
  referrer?: string;
  userAgent: string;
  viewport: {
    width: number;
    height: number;
  };
  loadTime?: number;
  [key: string]: unknown;
}

interface ConversionEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  metadata?: Record<string, unknown>;
}

export function UserJourneyTracker() {
  const location = useLocation();
  const { user } = useAuth();
  const pageLoadTime = useRef<number>(Date.now());
  const sessionId = useRef<string>(
    sessionStorage.getItem('analytics_session') || 
    `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  );

  useEffect(() => {
    if (!sessionStorage.getItem('analytics_session')) {
      sessionStorage.setItem('analytics_session', sessionId.current);
    }
  }, [sessionId]);

  useEffect(() => {
    const startTime = Date.now();
    pageLoadTime.current = startTime;

    const trackPageView = () => {
      const event: PageViewEvent = {
        page: location.pathname + location.search,
        timestamp: new Date().toISOString(),
        userId: user?.id,
        sessionId: sessionId.current,
        referrer: document.referrer,
        userAgent: navigator.userAgent,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        },
        loadTime: Date.now() - startTime
      };

      // Log to audit system
      auditLogger.log(
        'data_access',
        'Page view tracked',
        event,
        'low'
      );

      // Store in local analytics
      const analytics = JSON.parse(localStorage.getItem('user_analytics') || '[]');
      analytics.push(event);
      
      // Keep only last 100 events
      if (analytics.length > 100) {
        analytics.splice(0, analytics.length - 100);
      }
      
      localStorage.setItem('user_analytics', JSON.stringify(analytics));
    };

    // Track page view after a short delay to capture load time
    const timer = setTimeout(trackPageView, 100);
    
    return () => clearTimeout(timer);
  }, [location, user]);

  // Expose global tracking functions
  useEffect(() => {
    const trackConversion = (event: ConversionEvent) => {
      const conversionData = {
        ...event,
        timestamp: new Date().toISOString(),
        userId: user?.id,
        sessionId: sessionId.current,
        page: location.pathname
      };

      auditLogger.log(
        'data_access',
        `Conversion: ${event.action}`,
        conversionData,
        'medium'
      );

      // Store conversion events
      const conversions = JSON.parse(localStorage.getItem('user_conversions') || '[]');
      conversions.push(conversionData);
      
      if (conversions.length > 50) {
        conversions.splice(0, conversions.length - 50);
      }
      
      localStorage.setItem('user_conversions', JSON.stringify(conversions));
    };

    const trackEngagement = (element: string, action: string, metadata?: Record<string, unknown>) => {
      trackConversion({
        action,
        category: 'engagement',
        label: element,
        metadata
      });
    };

    // Make functions globally available
    (window as unknown as { 
      trackConversion?: (event: ConversionEvent) => void;
      trackEngagement?: (element: string, action: string, metadata?: Record<string, unknown>) => void;
    }).trackConversion = trackConversion;
    (window as unknown as { 
      trackConversion?: (event: ConversionEvent) => void;
      trackEngagement?: (element: string, action: string, metadata?: Record<string, unknown>) => void;
    }).trackEngagement = trackEngagement;

    return () => {
      delete (window as unknown as { trackConversion?: (event: ConversionEvent) => void }).trackConversion;
      delete (window as unknown as { trackEngagement?: (element: string, action: string, metadata?: Record<string, unknown>) => void }).trackEngagement;
    };
  }, [user, location, auditLogger]);

  return null; // This is a tracking component, no UI
}
