
import React, { useEffect } from 'react';
import { useUserProfiling } from '@/hooks/useUserProfiling';
import { useAuth } from '@/contexts/auth';
import { useLocation } from 'react-router-dom';

export function UserProfileDetector() {
  const { trackBehavior } = useUserProfiling();
  const { user, userProfile } = useAuth();
  const location = useLocation();

  // Track page visits
  useEffect(() => {
    trackBehavior('page_visit', { 
      page: location.pathname,
      timestamp: new Date().toISOString(),
      userType: userProfile?.user_type,
      authenticated: !!user
    });
  }, [location.pathname, trackBehavior, user, userProfile]);

  // Track session start
  useEffect(() => {
    trackBehavior('session_start', {
      referrer: document.referrer,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString()
    });

    // Track session end on beforeunload
    const handleBeforeUnload = () => {
      trackBehavior('session_end', {
        timestamp: new Date().toISOString(),
        duration: Date.now() - parseInt(sessionStorage.getItem('session_start') || '0')
      });
    };

    sessionStorage.setItem('session_start', Date.now().toString());
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [trackBehavior]);

  // Track user interactions
  useEffect(() => {
    const trackClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      // Track CTA clicks
      if (target.matches('button, a[href]')) {
        const text = target.textContent?.trim();
        const href = target.getAttribute('href');
        
        trackBehavior('cta_click', {
          text,
          href,
          element: target.tagName.toLowerCase(),
          timestamp: new Date().toISOString()
        });
      }

      // Track specific actions
      if (target.matches('[data-track]')) {
        const action = target.getAttribute('data-track');
        trackBehavior(action || 'unknown_action', {
          element: target.tagName.toLowerCase(),
          timestamp: new Date().toISOString()
        });
      }
    };

    document.addEventListener('click', trackClick);
    return () => document.removeEventListener('click', trackClick);
  }, [trackBehavior]);

  // Track form interactions
  useEffect(() => {
    const trackFormStart = (event: Event) => {
      const form = event.target as HTMLFormElement;
      const formName = form.getAttribute('name') || form.className;
      
      trackBehavior('form_start', {
        form: formName,
        timestamp: new Date().toISOString()
      });
    };

    const trackFormSubmit = (event: Event) => {
      const form = event.target as HTMLFormElement;
      const formName = form.getAttribute('name') || form.className;
      
      trackBehavior('form_submit', {
        form: formName,
        timestamp: new Date().toISOString()
      });
    };

    document.addEventListener('focusin', (event) => {
      if ((event.target as HTMLElement).matches('form input, form textarea, form select')) {
        const form = (event.target as HTMLElement).closest('form');
        if (form) trackFormStart({ target: form } as Event);
      }
    });

    document.addEventListener('submit', trackFormSubmit);

    return () => {
      document.removeEventListener('submit', trackFormSubmit);
    };
  }, [trackBehavior]);

  return null; // This component doesn't render anything
}
