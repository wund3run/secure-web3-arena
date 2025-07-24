/**
 * Ethereum Conflict Resolver
 * Handles conflicts between multiple scripts trying to define window.ethereum
 * Preserves the original ethereum provider (MetaMask, etc.) while allowing other scripts to load
 */

interface EthereumProvider {
  isMetaMask?: boolean;
  isCoinbaseWallet?: boolean;
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  on: (event: string, handler: (...args: unknown[]) => void) => void;
  removeListener: (event: string, handler: (...args: unknown[]) => void) => void;
  [key: string]: unknown;
}

declare global {
  interface Window {
    __originalEthereum?: EthereumProvider;
    __ethereumProviders?: EthereumProvider[];
  }
}

class EthereumConflictResolver {
  private static instance: EthereumConflictResolver;
  private originalEthereum: EthereumProvider | undefined;
  private isResolved = false;

  private constructor() {
    this.init();
  }

  public static getInstance(): EthereumConflictResolver {
    if (!EthereumConflictResolver.instance) {
      EthereumConflictResolver.instance = new EthereumConflictResolver();
    }
    return EthereumConflictResolver.instance;
  }

  private init() {
    // Store the original ethereum provider if it exists
    if ((window as unknown as { ethereum?: unknown }).ethereum) {
      this.originalEthereum = (window as unknown as { ethereum?: unknown }).ethereum;
      window.__originalEthereum = (window as unknown as { ethereum?: unknown }).ethereum;
      console.log('🔒 Preserved original ethereum provider:', {
        isMetaMask: (window as unknown as { ethereum?: { isMetaMask?: boolean } }).ethereum?.isMetaMask,
        isCoinbaseWallet: (window as unknown as { ethereum?: { isCoinbaseWallet?: boolean } }).ethereum?.isCoinbaseWallet
      });
    }

    // Prevent redefinition errors by intercepting Object.defineProperty calls
    this.interceptDefineProperty();
    
    // Set up a restoration mechanism
    this.setupRestorationMechanism();
  }

  private interceptDefineProperty() {
    const originalDefineProperty = Object.defineProperty;
    
    Object.defineProperty = function(obj: unknown, prop: string, descriptor: PropertyDescriptor) {
      // If someone tries to redefine ethereum on window, handle it gracefully
      if (obj === window && prop === 'ethereum') {
        console.warn('⚠️ Attempted redefinition of window.ethereum intercepted');
        
        // If we have an original ethereum provider, preserve it
        if (window.__originalEthereum) {
          console.log('✅ Preserving original ethereum provider');
          return originalDefineProperty.call(this, obj, prop, {
            ...descriptor,
            value: window.__originalEthereum,
            configurable: true,
            writable: true
          });
        }
      }
      
      // For all other cases, use the original defineProperty
      try {
        return originalDefineProperty.call(this, obj, prop, descriptor);
      } catch (error) {
        // If defineProperty fails (e.g., property already exists), log and continue
        if (obj === window && prop === 'ethereum') {
          console.warn('🔄 Ethereum property already exists, skipping redefinition');
          return obj;
        }
        throw error;
      }
    };
  }

  private setupRestorationMechanism() {
    // Restore ethereum provider after a short delay to ensure all scripts have loaded
    setTimeout(() => {
      this.restoreEthereumProvider();
    }, 1000);

    // Also restore on DOMContentLoaded if not already done
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => this.restoreEthereumProvider(), 500);
      });
    }
  }

  private restoreEthereumProvider() {
    if (this.isResolved) return;

    if (window.__originalEthereum && (!(window as unknown as { ethereum?: unknown }).ethereum || (window as unknown as { ethereum?: unknown }).ethereum !== window.__originalEthereum)) {
      console.log('🔄 Restoring original ethereum provider');
      (window as unknown as { ethereum?: unknown }).ethereum = window.__originalEthereum;
      this.isResolved = true;
    }
  }

  public getEthereumProvider(): EthereumProvider | undefined {
    return window.__originalEthereum || (window as unknown as { ethereum?: unknown }).ethereum;
  }

  public isWalletConnected(): boolean {
    const provider = this.getEthereumProvider();
    return !!provider && (!!provider.isMetaMask || !!provider.isCoinbaseWallet);
  }

  public async requestAccounts(): Promise<string[]> {
    const provider = this.getEthereumProvider();
    if (!provider) {
      throw new Error('No Ethereum provider found');
    }
    return provider.request({ method: 'eth_requestAccounts' });
  }

  public async getChainId(): Promise<string> {
    const provider = this.getEthereumProvider();
    if (!provider) {
      throw new Error('No Ethereum provider found');
    }
    return provider.request({ method: 'eth_chainId' });
  }
}

// Initialize the resolver immediately
const ethereumResolver = EthereumConflictResolver.getInstance();

// Export for use in components
export { EthereumConflictResolver, ethereumResolver };

// Export utility functions
export const getEthereumProvider = () => ethereumResolver.getEthereumProvider();
export const isWalletConnected = () => ethereumResolver.isWalletConnected();
export const requestAccounts = () => ethereumResolver.requestAccounts();
export const getChainId = () => ethereumResolver.getChainId(); 