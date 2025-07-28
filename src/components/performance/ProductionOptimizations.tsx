
import React, { useEffect } from 'react';
import { Environment } from '@/utils/environment';
import { SystemInitializer } from '@/utils/system/systemInitializer';
import { applySecurityHeaders } from '@/utils/security/securityHeaders';

export function ProductionOptimizations() {
  useEffect(() => {
    // Apply security headers
    applySecurityHeaders();
    
    // Initialize system monitoring in production
    if (Environment.isProduction) {
      SystemInitializer.initialize().catch(console.error);
    }
    
    // Preload critical resources
    const criticalAssets = [
      '/hawkly-uploads/fd4d9ea7-6cf1-4fe8-9327-9c7822369207.png',
      '/hawkly-uploads/6286d686-7daf-4eb4-8d7b-51a3de242644.png'
    ];
    
    criticalAssets.forEach(asset => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = asset;
      document.head.appendChild(link);
    });
    
    // Service worker registration (if available)
    if ('serviceWorker' in navigator && Environment.isProduction) {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        // Service worker not available, continue without it
      });
    }
  }, []);

  return null;
}
