import { useState, useEffect } from "react";
import { useEscrow } from "@/contexts/EscrowContext";
import { toast } from "sonner";
import { withErrorHandling } from '@/utils/error-handling/index';

export function useEscrowManager() {
  const { profile, loading } = useEscrow();
  const [showConnect, setShowConnect] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("contracts");
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [chainId, setChainId] = useState<string>("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isWalletConnecting, setIsWalletConnecting] = useState(false);

  useEffect(() => {
    // Check if user has a wallet connected already
    if (profile?.wallet_address) {
      setWalletAddress(profile.wallet_address);
    }
    
    // Check if Ethereum is available and get chain ID
    const checkEthereum = async () => {
      if (window.ethereum) {
        try {
          setIsWalletConnecting(true);
          const chainIdResponse = await window.ethereum.request({ method: 'eth_chainId' });
          
          if (chainIdResponse && typeof chainIdResponse === 'string') {
            setChainId(chainIdResponse);
          }
        } catch (error) {
          console.error("Error checking ethereum:", error);
        } finally {
          setIsWalletConnecting(false);
        }
      }
    };
    
    checkEthereum();
  }, [profile]);

  const handleWalletConnect = async (address: string) => {
    try {
      setIsWalletConnecting(true);
      setWalletAddress(address);
      
      // Success feedback
      toast.success("Wallet connected", {
        description: `Connected to ${address.substring(0, 6)}...${address.substring(address.length - 4)}`
      });
      
      return true;
    } catch (error) {
      console.error("Wallet connection error:", error);
      toast.error("Connection failed", {
        description: "Could not connect to wallet. Please try again."
      });
      return false;
    } finally {
      setIsWalletConnecting(false);
    }
  };
  
  const handleConnect = async (provider: string, address: string) => {
    console.log(`Connected with ${provider}: ${address}`);
    const success = await handleWalletConnect(address);
    
    if (success) {
      setShowConnect(false);
      toast.success(`Connected with ${provider}`, {
        description: `You can now access the secure escrow system.`
      });
    }
  };

  return {
    loading,
    profile,
    showConnect,
    setShowConnect,
    activeTab,
    setActiveTab,
    walletAddress,
    chainId,
    showCreateForm,
    setShowCreateForm,
    handleWalletConnect,
    handleConnect,
    isWalletConnecting
  };
}
