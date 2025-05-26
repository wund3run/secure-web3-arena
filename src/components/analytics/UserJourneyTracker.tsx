import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/auth/AuthContext";

interface JourneyEvent {
  user_id?: string;
  page: string;
  action: string;
  timestamp: Date;
  metadata?: any;
}

export function UserJourneyTracker() {
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    // Track page views
    trackEvent({
      page: location.pathname,
      action: "page_view",
      timestamp: new Date(),
      user_id: user?.id,
      metadata: {
        referrer: document.referrer,
        userAgent: navigator.userAgent
      }
    });
  }, [location.pathname, user?.id]);

  const trackEvent = async (event: JourneyEvent) => {
    try {
      // Store in localStorage for analytics aggregation
      const events = JSON.parse(localStorage.getItem("hawkly_journey_events") || "[]");
      events.push(event);
      
      // Keep only last 100 events to prevent storage bloat
      if (events.length > 100) {
        events.splice(0, events.length - 100);
      }
      
      localStorage.setItem("hawkly_journey_events", JSON.stringify(events));

      // Send to analytics service (placeholder for future implementation)
      console.log("Journey Event:", event);
    } catch (error) {
      console.error("Failed to track journey event:", error);
    }
  };

  // Expose tracking function globally for other components
  useEffect(() => {
    (window as any).trackJourneyEvent = trackEvent;
  }, []);

  return null; // This is a tracking component, no UI
}
