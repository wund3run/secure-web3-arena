
export interface PWAManagerProps {
  showInstallPrompt?: boolean;
}

export type CacheStatus = 'loading' | 'cached' | 'error';

export interface PWAState {
  isOnline: boolean;
  deferredPrompt: any;
  showInstallBanner: boolean;
  isInstalled: boolean;
  cacheStatus: CacheStatus;
}
