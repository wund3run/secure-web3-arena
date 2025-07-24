interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export interface PWAManagerProps {
  showInstallPrompt?: boolean;
}

export type CacheStatus = 'loading' | 'cached' | 'error';

export interface PWAState {
  isOnline: boolean;
  deferredPrompt: BeforeInstallPromptEvent | null;
  showInstallBanner: boolean;
  isInstalled: boolean;
  cacheStatus: CacheStatus;
}
