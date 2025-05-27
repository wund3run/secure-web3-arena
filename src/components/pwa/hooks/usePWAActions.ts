
import { toast } from 'sonner';
import { PWAState } from '../types';

export function usePWAActions(state: PWAState, updateState: (updates: Partial<PWAState>) => void) {
  const handleInstallClick = async () => {
    if (!state.deferredPrompt) return;

    state.deferredPrompt.prompt();
    const { outcome } = await state.deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      toast.success('Installing app...');
    } else {
      toast.info('Installation cancelled');
    }
    
    updateState({ deferredPrompt: null, showInstallBanner: false });
  };

  const dismissInstallBanner = () => {
    updateState({ showInstallBanner: false });
    localStorage.setItem('pwa-install-dismissed', 'true');
  };

  const forceRefresh = () => {
    window.location.reload();
  };

  return {
    handleInstallClick,
    dismissInstallBanner,
    forceRefresh
  };
}
