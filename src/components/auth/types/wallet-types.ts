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
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
      on: (event: string, callback: unknown) => void;
      removeListener: (event: string, callback: unknown) => void;
    };
    phantom?: {
      solana?: {
        connect: () => Promise<{ publicKey: { toString: () => string } }>;
      };
    };
  }
}
