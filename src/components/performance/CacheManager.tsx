
import React, { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

interface CacheManagerProps {
  children: React.ReactNode;
}

export function CacheManager({ children }: CacheManagerProps) {
  const queryClient = useQueryClient();

  useEffect(() => {
    // Cleanup expired cache entries every 5 minutes
    const cleanupInterval = setInterval(() => {
      const now = Date.now();
      const queryCache = queryClient.getQueryCache();
      
      queryCache.getAll().forEach(query => {
        const { dataUpdatedAt } = query.state;
        const staleTime = 5 * 60 * 1000; // Default 5 minutes for cleanup
        
        if (now - dataUpdatedAt > staleTime) {
          queryClient.removeQueries({ queryKey: query.queryKey });
        }
      });
    }, 5 * 60 * 1000);

    // Prefetch common data when app loads
    const prefetchCommonData = () => {
      // Prefetch marketplace data
      queryClient.prefetchQuery({
        queryKey: ['auditors'],
        queryFn: () => fetch('/api/auditors').then(res => res.json()),
        staleTime: 10 * 60 * 1000 // 10 minutes
      });

      // Prefetch user profile if authenticated
      const user = localStorage.getItem('user');
      if (user) {
        queryClient.prefetchQuery({
          queryKey: ['user-profile'],
          queryFn: () => fetch('/api/profile').then(res => res.json()),
          staleTime: 5 * 60 * 1000 // 5 minutes
        });
      }
    };

    // Small delay to not block initial render
    setTimeout(prefetchCommonData, 1000);

    return () => clearInterval(cleanupInterval);
  }, [queryClient]);

  return <>{children}</>;
}
