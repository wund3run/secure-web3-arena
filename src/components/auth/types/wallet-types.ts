
// TypeScript declarations for wallet providers
export interface WalletConnectionResponse {
  provider: string;
  address: string;
}

// Update the TypeScript declarations for wallet providers to match BlockchainConnector.tsx
declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      isCoinbaseWallet?: boolean;
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, callback: any) => void;
      removeListener: (event: string, callback: any) => void;
    };
    phantom?: {
      solana?: {
        connect: () => Promise<{ publicKey: { toString: () => string } }>;
      };
    };
  }
}
