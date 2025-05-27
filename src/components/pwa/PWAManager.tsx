
import React from 'react';
import { PWAManagerProps } from './types';
import { usePWAState } from './hooks/usePWAState';
import { usePWAActions } from './hooks/usePWAActions';
import { InstallBanner } from './components/InstallBanner';
import { OfflineStatus } from './components/OfflineStatus';
import { PWAStatusIndicator } from './components/PWAStatusIndicator';

export function PWAManager({ showInstallPrompt = true }: PWAManagerProps) {
  const { state, updateState } = usePWAState(showInstallPrompt);
  const { handleInstallClick, dismissInstallBanner, forceRefresh } = usePWAActions(state, updateState);

  return (
    <>
      {/* Install Banner */}
      {state.showInstallBanner && !state.isInstalled && (
        <InstallBanner
          onInstall={handleInstallClick}
          onDismiss={dismissInstallBanner}
        />
      )}

      {/* Offline Status */}
      {!state.isOnline && (
        <OfflineStatus onRetry={forceRefresh} />
      )}

      {/* PWA Status Indicator (Development only) */}
      <PWAStatusIndicator state={state} />
    </>
  );
}
