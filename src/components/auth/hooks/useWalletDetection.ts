
import { useState, useEffect } from "react";
import detectEthereumProvider from "@metamask/detect-provider";

export function useWalletDetection() {
  const [isMetaMaskDetected, setIsMetaMaskDetected] = useState(false);
  const [isPhantomDetected, setIsPhantomDetected] = useState(false);
  const [isCoinbaseDetected, setIsCoinbaseDetected] = useState(false);
  
  useEffect(() => {
    const detectWallets = async () => {
      // Check for MetaMask
      try {
        const provider = await detectEthereumProvider({ silent: true });
        setIsMetaMaskDetected(!!provider && !!(window.ethereum as any)?.isMetaMask);
      } catch (e) {
        console.log("MetaMask not detected");
      }
      
      // Check for Phantom
      setIsPhantomDetected(!!window.phantom?.solana);
      
      // Check for Coinbase Wallet
      setIsCoinbaseDetected(!!window.ethereum?.isCoinbaseWallet);
    };
    
    detectWallets();
  }, []);

  return {
    isMetaMaskDetected,
    isPhantomDetected,
    isCoinbaseDetected
  };
}
