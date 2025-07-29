import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { PWAState } from '../types';

// Import the BeforeInstallPromptEvent type from types file
type BeforeInstallPromptEvent = PWAState['deferredPrompt'] extends (infer T | null) ? T : never;

export function usePWAState(showInstallPrompt: boolean) {
  const [state, setState] = useState<PWAState>({
    isOnline: navigator.onLine,
    deferredPrompt: null,
    showInstallBanner: false,
    isInstalled: false,
    cacheStatus: 'loading'
  });

  const updateState = (updates: Partial<PWAState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      updateState({ isInstalled: true });
    }

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      updateState({ deferredPrompt: e });
      
      // Only show banner if user hasn't dismissed it before
      const dismissed = localStorage.getItem('pwa-install-dismissed');
      if (!dismissed && showInstallPrompt) {
        updateState({ showInstallBanner: true });
      }
    };

    // Listen for app installed
    const handleAppInstalled = () => {
      updateState({ isInstalled: true, showInstallBanner: false });
      toast.success('App installed successfully!');
    };

    // Listen for online/offline changes
    const handleOnlineChange = () => {
      const online = navigator.onLine;
      updateState({ isOnline: online });
      
      if (online) {
        toast.success('Back online! Syncing data...');
        syncOfflineData();
      } else {
        toast.warning('You\'re offline. Some features may be limited.');
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('online', handleOnlineChange);
    window.addEventListener('offline', handleOnlineChange);

    // Initialize cache status
    checkCacheStatus();

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('online', handleOnlineChange);
      window.removeEventListener('offline', handleOnlineChange);
    };
  }, [showInstallPrompt]);

  const checkCacheStatus = async () => {
    try {
      if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.ready;
        if (registration) {
          updateState({ cacheStatus: 'cached' });
        }
      }
    } catch (error) {
      console.warn('Cache check failed:', error);
      updateState({ cacheStatus: 'error' });
    }
  };

  const syncOfflineData = async () => {
    try {
      // Sync any offline data stored in localStorage
      const offlineData = localStorage.getItem('hawkly_offline_data');
      if (offlineData) {
        const data = JSON.parse(offlineData);
        // Process offline data here
        console.log('Syncing offline data:', data);
        localStorage.removeItem('hawkly_offline_data');
      }
    } catch (error) {
      console.error('Failed to sync offline data:', error);
    }
  };

  return { state, updateState };
}
