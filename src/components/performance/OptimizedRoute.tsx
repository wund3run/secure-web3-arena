
import React, { ReactNode, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

interface OptimizedRouteProps {
  children: ReactNode;
  title?: string;
  description?: string;
  preloadRoutes?: string[];
  className?: string;
}

export function OptimizedRoute({ 
  children, 
  title, 
  description, 
  preloadRoutes = [],
  className = ''
}: OptimizedRouteProps) {
  useEffect(() => {
    // Preload critical routes
    preloadRoutes.forEach(route => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = route;
      document.head.appendChild(link);
    });

    // Cleanup on unmount
    return () => {
      preloadRoutes.forEach(route => {
        const existingLink = document.querySelector(`link[href="${route}"]`);
        if (existingLink) {
          document.head.removeChild(existingLink);
        }
      });
    };
  }, [preloadRoutes]);

  return (
    <>
      {title && (
        <Helmet>
          <title>{title}</title>
          {description && <meta name="description" content={description} />}
        </Helmet>
      )}
      <div className={className}>
        {children}
      </div>
    </>
  );
}
