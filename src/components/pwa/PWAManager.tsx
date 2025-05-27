
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Wifi, WifiOff, RefreshCw } from 'lucide-react';

interface PWAManagerProps {
  showInstallPrompt?: boolean;
}

export function PWAManager({ showInstallPrompt = true }: PWAManagerProps) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [cacheStatus, setCacheStatus] = useState<'loading' | 'cached' | 'error'>('loading');

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      
      // Only show banner if user hasn't dismissed it before
      const dismissed = localStorage.getItem('pwa-install-dismissed');
      if (!dismissed && showInstallPrompt) {
        setShowInstallBanner(true);
      }
    };

    // Listen for app installed
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowInstallBanner(false);
      toast.success('App installed successfully!');
    };

    // Listen for online/offline changes
    const handleOnlineChange = () => {
      const online = navigator.onLine;
      setIsOnline(online);
      
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
          setCacheStatus('cached');
        }
      }
    } catch (error) {
      console.warn('Cache check failed:', error);
      setCacheStatus('error');
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

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      toast.success('Installing app...');
    } else {
      toast.info('Installation cancelled');
    }
    
    setDeferredPrompt(null);
    setShowInstallBanner(false);
  };

  const dismissInstallBanner = () => {
    setShowInstallBanner(false);
    localStorage.setItem('pwa-install-dismissed', 'true');
  };

  const forceRefresh = () => {
    window.location.reload();
  };

  return (
    <>
      {/* Install Banner */}
      {showInstallBanner && !isInstalled && (
        <Card className="fixed bottom-4 left-4 right-4 z-50 border-primary/20 bg-primary/5">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Download className="h-4 w-4" />
              Install Hawkly App
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Install our app for faster access and offline features
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={dismissInstallBanner}>
                Not now
              </Button>
              <Button size="sm" onClick={handleInstallClick}>
                Install
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Offline Status */}
      {!isOnline && (
        <div className="fixed top-0 left-0 right-0 bg-yellow-500 text-yellow-900 px-4 py-2 text-center text-sm z-50">
          <div className="flex items-center justify-center gap-2">
            <WifiOff className="h-4 w-4" />
            You're offline. Some features may be limited.
            <Button variant="ghost" size="sm" onClick={forceRefresh} className="ml-2">
              <RefreshCw className="h-3 w-3 mr-1" />
              Retry
            </Button>
          </div>
        </div>
      )}

      {/* PWA Status Indicator (Development only) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-16 right-4 z-40">
          <Card className="w-48">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs">PWA Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span>Online:</span>
                {isOnline ? (
                  <Wifi className="h-3 w-3 text-green-500" />
                ) : (
                  <WifiOff className="h-3 w-3 text-red-500" />
                )}
              </div>
              <div className="flex items-center justify-between text-xs">
                <span>Installed:</span>
                <span className={isInstalled ? 'text-green-500' : 'text-gray-500'}>
                  {isInstalled ? 'Yes' : 'No'}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span>Cache:</span>
                <span className={cacheStatus === 'cached' ? 'text-green-500' : 'text-gray-500'}>
                  {cacheStatus}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
