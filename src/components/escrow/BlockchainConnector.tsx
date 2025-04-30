import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Check, ExternalLink, Wallet } from "lucide-react";
import { toast } from "sonner";
import { useEscrow } from "@/contexts/EscrowContext";
import { supabase } from "@/integrations/supabase/client";

interface BlockchainConnectorProps {
  onConnect: (address: string) => void;
  connected?: boolean;
  address?: string;
  chainId?: string;
}

export function BlockchainConnector({ onConnect, connected = false, address, chainId }: BlockchainConnectorProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [networkName, setNetworkName] = useState("Unknown Network");
  const { profile } = useEscrow();
  
  const networks: Record<string, string> = {
    "0x1": "Ethereum Mainnet",
    "0x5": "Goerli Testnet",
    "0x89": "Polygon Mainnet",
    "0x13881": "Mumbai Testnet",
    "0xa86a": "Avalanche Mainnet",
    "0xa869": "Avalanche Fuji Testnet"
  };
  
  useEffect(() => {
    if (chainId) {
      setNetworkName(networks[chainId] || `Chain ID: ${chainId}`);
    }
  }, [chainId]);
  
  const connectToWallet = async () => {
    setIsConnecting(true);
    try {
      if (!window.ethereum) {
        toast.error("No Ethereum wallet detected", {
          description: "Please install MetaMask or another Ethereum wallet"
        });
        return;
      }
      
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      
      if (accounts.length > 0) {
        onConnect(accounts[0]);
        
        // Update wallet address in profile if different
        if (profile && accounts[0].toLowerCase() !== profile.wallet_address?.toLowerCase()) {
          try {
            const { error } = await supabase
              .from('profiles')
              .update({ wallet_address: accounts[0] })
              .eq('id', profile.id);
              
            if (error) throw error;
          } catch (error) {
            console.error('Error updating wallet address:', error);
          }
        }
        
        toast.success("Wallet connected successfully", { 
          description: `Connected to ${accounts[0].substring(0, 6)}...${accounts[0].substring(38)}`
        });
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      toast.error("Failed to connect wallet", {
        description: error instanceof Error ? error.message : "Please try again"
      });
    } finally {
      setIsConnecting(false);
    }
  };
  
  // Listen for account changes
  useEffect(() => {
    if (!window.ethereum) return;
    
    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        // User disconnected
        onConnect("");
        toast.info("Wallet disconnected");
      } else if (accounts[0] !== address) {
        // Account changed
        onConnect(accounts[0]);
        toast.info("Wallet account changed", {
          description: `Connected to ${accounts[0].substring(0, 6)}...${accounts[0].substring(38)}`
        });
      }
    };
    
    const handleChainChanged = () => {
      window.location.reload();
    };
    
    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);
    
    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      window.ethereum.removeListener('chainChanged', handleChainChanged);
    };
  }, [address, onConnect]);
  
  return (
    <Card>
      <CardContent className="p-4">
        {!connected ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                <span className="font-medium">Connect Wallet</span>
              </div>
              <Button 
                size="sm" 
                onClick={connectToWallet} 
                disabled={isConnecting}
              >
                {isConnecting ? "Connecting..." : "Connect"}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Connect your Ethereum wallet to create and interact with smart contracts
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-primary">
                <Check className="h-5 w-5" />
                <span className="font-medium">Wallet Connected</span>
              </div>
              <Button variant="outline" size="sm" asChild>
                <a 
                  href={`https://etherscan.io/address/${address}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1"
                >
                  <span>View</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </Button>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Address:</span>
                <code className="bg-muted px-1 rounded text-xs">
                  {address?.substring(0, 6)}...{address?.substring(38)}
                </code>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Network:</span>
                <span className="text-xs font-medium">{networkName}</span>
              </div>
            </div>
            {networkName.includes("Mainnet") && (
              <div className="flex items-center gap-2 text-amber-600 bg-amber-50 p-2 rounded text-xs">
                <AlertCircle className="h-4 w-4" />
                <span>You're connected to a main network. Consider using a testnet for development.</span>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Define ethereum interface properly at line 181
declare global {
  interface Window {
    ethereum: {
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
