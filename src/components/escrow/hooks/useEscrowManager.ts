
import { useState, useEffect } from "react";
import { useEscrow } from "@/contexts/EscrowContext";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export function useEscrowManager() {
  const { profile, loading } = useEscrow();
  const [showConnect, setShowConnect] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("contracts");
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [chainId, setChainId] = useState<string>("");
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    // Check if user has a wallet connected already
    if (profile?.wallet_address) {
      setWalletAddress(profile.wallet_address);
    }
    
    // Check if Ethereum is available and get chain ID
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_chainId' })
        .then(setChainId)
        .catch(console.error);
    }
  }, [profile]);

  const handleWalletConnect = (address: string) => {
    setWalletAddress(address);
  };
  
  const handleConnect = (provider: string, address: string) => {
    console.log(`Connected with ${provider}: ${address}`);
    setShowConnect(false);
    toast.success(`Connected with ${provider}`, {
      description: `You can now access the secure escrow system.`
    });
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
    handleConnect
  };
}
