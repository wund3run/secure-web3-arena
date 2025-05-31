
import React, { useEffect } from 'react';
import { useAuth } from '@/contexts/auth';
import { useUserProfiling } from '@/hooks/useUserProfiling';

export function UserProfileDetector() {
  const { user, userProfile } = useAuth();
  const { trackBehavior } = useUserProfiling();

  useEffect(() => {
    // Track page visit
    trackBehavior('page_visit', {
      page: window.location.pathname,
      timestamp: new Date().toISOString(),
      userType: userProfile?.user_type || 'visitor',
      authenticated: !!user
    });

    // Track session start
    const sessionStart = Date.now();
    
    trackBehavior('session_start', {
      referrer: document.referrer,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString()
    });

    // Track session end on page unload
    const handleBeforeUnload = () => {
      trackBehavior('session_end', {
        timestamp: new Date().toISOString(),
        duration: Date.now() - sessionStart
      });
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Track clicks on important elements
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const isButton = target.tagName === 'BUTTON' || target.closest('button');
      const isLink = target.tagName === 'A' || target.closest('a');
      
      if (isButton || isLink) {
        const element = (isButton ? target.closest('button') : target.closest('a')) as HTMLElement;
        const text = element?.textContent?.trim() || '';
        const href = element?.getAttribute('href') || '';
        
        if (text) {
          trackBehavior('element_click', {
            text,
            href,
            element: element.tagName.toLowerCase(),
            timestamp: new Date().toISOString()
          });
        }
      }

      // Track specific UI interactions
      if (target.closest('[data-track]')) {
        trackBehavior('ui_interaction', {
          element: target.closest('[data-track]')?.getAttribute('data-track') || '',
          timestamp: new Date().toISOString()
        });
      }
    };

    document.addEventListener('click', handleClick);

    // Track form interactions
    const handleFormSubmit = (event: SubmitEvent) => {
      const form = event.target as HTMLFormElement;
      const formName = form.getAttribute('name') || form.id || 'unnamed-form';
      
      trackBehavior('form_submit', {
        form: formName,
        timestamp: new Date().toISOString()
      });
    };

    const handleFormInput = (event: Event) => {
      const form = (event.target as HTMLElement).closest('form');
      if (form) {
        const formName = form.getAttribute('name') || form.id || 'unnamed-form';
        trackBehavior('form_interaction', {
          form: formName,
          timestamp: new Date().toISOString()
        });
      }
    };

    document.addEventListener('submit', handleFormSubmit);
    document.addEventListener('input', handleFormInput);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('click', handleClick);
      document.removeEventListener('submit', handleFormSubmit);
      document.removeEventListener('input', handleFormInput);
    };
  }, [user, userProfile, trackBehavior]);

  return null;
}
