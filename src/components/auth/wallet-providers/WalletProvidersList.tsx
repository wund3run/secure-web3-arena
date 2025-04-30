
import React from "react";
import { WalletProvider } from "./WalletProvider";

// Define provider type for better type safety
export type WalletProviderType = 'MetaMask' | 'Phantom' | 'WalletConnect' | 'Coinbase Wallet';

interface WalletProvidersListProps {
  isMetaMaskDetected: boolean;
  isPhantomDetected: boolean;
  isCoinbaseDetected: boolean;
  onWalletConnect: (wallet: WalletProviderType) => void;
  isConnecting: boolean;
  error: string | null;
}

export function WalletProvidersList({
  isMetaMaskDetected,
  isPhantomDetected,
  isCoinbaseDetected,
  onWalletConnect,
  isConnecting,
  error
}: WalletProvidersListProps) {
  return (
    <div className="space-y-2">
      <WalletProvider 
        name="MetaMask" 
        icon={<img src="https://metamask.io/images/metamask-fox.svg" alt="MetaMask" className="h-8 w-8" />}
        chainType="Ethereum, Polygon, Optimism, Arbitrum"
        onClick={() => onWalletConnect("MetaMask")}
        isDetected={isMetaMaskDetected}
      />
      
      <WalletProvider 
        name="Phantom" 
        icon={<img src="https://phantom.app/img/logo.svg" alt="Phantom" className="h-8 w-8" />}
        chainType="Solana"
        onClick={() => onWalletConnect("Phantom")}
        isDetected={isPhantomDetected}
      />
      
      <WalletProvider 
        name="WalletConnect" 
        icon={<img src="https://walletconnect.com/images/walletconnect-logo.svg" alt="WalletConnect" className="h-8 w-8" />}
        chainType="Multi-chain compatibility"
        onClick={() => onWalletConnect("WalletConnect")}
      />
      
      <WalletProvider 
        name="Coinbase Wallet" 
        icon={<img src="https://www.coinbase.com/img/favicon/favicon-32x32.png" alt="Coinbase" className="h-8 w-8" />}
        chainType="Ethereum, Polygon, Solana"
        onClick={() => onWalletConnect("Coinbase Wallet")}
        isDetected={isCoinbaseDetected}
      />
      
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <div className="text-center text-sm text-muted-foreground">
        Connect your cryptocurrency wallet to sign messages and verify your identity on the blockchain
      </div>
    </div>
  );
}
