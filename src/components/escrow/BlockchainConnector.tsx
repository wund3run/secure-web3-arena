import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Check, ExternalLink, Wallet } from "lucide-react";
import { toast } from "sonner";
import { useEscrow } from "@/contexts/EscrowContext";
import { supabase } from "@/integrations/supabase/client";

interface BlockchainConnectorProps {
  onConnectionChange?: (connected: boolean, account?: string, chainId?: string) => void;
}

const CHAIN_NAMES: Record<string, string> = {
  "0x1": "Ethereum Mainnet",
  "0x89": "Polygon",
  "0x38": "BSC",
  "0xa86a": "Avalanche",
  "0xa4b1": "Arbitrum One",
  "0x2105": "Base",
};

export function BlockchainConnector({ onConnectionChange }: BlockchainConnectorProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState<string>('');
  const [chainId, setChainId] = useState<string>('');
  const [isConnecting, setIsConnecting] = useState(false);

  const connectWallet = async () => {
    setIsConnecting(true);
    try {
      const provider = getEthereumProvider();
      if (!provider) {
        toast.error("No Ethereum wallet detected", {
          description: "Please install MetaMask or another Ethereum wallet"
        });
        return;
      }

      const accounts = await requestAccounts();
      const currentChainId = await getChainId();
      
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        setChainId(currentChainId);
        setIsConnected(true);
        onConnectionChange?.(true, accounts[0], currentChainId);
        
        toast.success("Wallet connected successfully", {
          description: `Connected to ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`
        });
      }
    } catch (error: unknown) {
      console.error('Failed to connect wallet:', error);
      toast.error("Failed to connect wallet", {
        description: (error instanceof Error ? error.message : String(error)) || "Please try again"
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setAccount('');
    setChainId('');
    onConnectionChange?.(false);
    toast.info("Wallet disconnected");
  };

  const handleAccountsChanged = (...args: unknown[]) => {
    const accounts = args[0];
    if (Array.isArray(accounts) && accounts.every(acc => typeof acc === 'string')) {
      if (accounts.length === 0) {
        disconnectWallet();
      } else {
        setAccount(accounts[0]);
        onConnectionChange?.(true, accounts[0], chainId);
      }
    }
  };

  const handleChainChanged = (...args: unknown[]) => {
    const newChainId = args[0];
    if (typeof newChainId === 'string') {
      setChainId(newChainId);
      onConnectionChange?.(isConnected, account, newChainId);
    }
  };

  useEffect(() => {
    const provider = getEthereumProvider();
    if (!provider) return;

    // Set up event listeners
    provider.on('accountsChanged', handleAccountsChanged);
    provider.on('chainChanged', handleChainChanged);

    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      window.ethereum.removeListener('chainChanged', handleChainChanged);
    };
  }, [isConnected, account, chainId]);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getChainName = (chainId: string) => {
    return CHAIN_NAMES[chainId] || `Chain ${chainId}`;
  };

  const provider = getEthereumProvider();
  const hasWallet = !!provider;

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="h-5 w-5" />
          Blockchain Connection
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!hasWallet && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              No Ethereum wallet detected. Please install MetaMask or another Web3 wallet.
            </AlertDescription>
          </Alert>
        )}

        {hasWallet && !isConnected && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Connect your Ethereum wallet to create and interact with smart contracts
            </p>
            <Button 
              onClick={connectWallet} 
              disabled={isConnecting}
              className="w-full"
            >
              {isConnecting ? 'Connecting...' : 'Connect Wallet'}
            </Button>
          </div>
        )}

        {isConnected && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">Connected</span>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Account:</span>
                <Badge variant="outline" className="font-mono">
                  {formatAddress(account)}
                </Badge>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Network:</span>
                <Badge variant="secondary">
                  {getChainName(chainId)}
                </Badge>
              </div>
            </div>

            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={disconnectWallet}
                className="flex-1"
              >
                Disconnect
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => window.open(`https://etherscan.io/address/${account}`, '_blank')}
                className="flex-1"
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                View
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
