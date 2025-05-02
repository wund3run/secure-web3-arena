
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wallet, Mail, Shield } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useWalletDetection } from "./hooks/useWalletDetection";
import { WalletProvidersList, WalletProviderType } from "./wallet-providers/WalletProvidersList";
import { SocialLoginList, SocialProviderType } from "./social-providers/SocialLoginList";

interface WalletConnectProps {
  onConnect: (provider: string, address: string) => void;
  onClose?: () => void;
}

export function WalletConnect({ onConnect, onClose }: WalletConnectProps) {
  const [activeTab, setActiveTab] = useState("wallet");
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { isMetaMaskDetected, isPhantomDetected, isCoinbaseDetected } = useWalletDetection();

  const handleWalletConnect = async (walletName: WalletProviderType) => {
    setIsConnecting(true);
    setError(null);
    
    try {
      let address = '';
      
      switch(walletName) {
        case 'MetaMask':
          if (window.ethereum?.isMetaMask) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            address = accounts[0];
          } else {
            throw new Error("MetaMask not installed");
          }
          break;
          
        case 'Phantom':
          if (window.phantom?.solana) {
            const { publicKey } = await window.phantom.solana.connect();
            address = publicKey.toString();
          } else {
            throw new Error("Phantom wallet not installed");
          }
          break;
          
        case 'WalletConnect':
          // For demo purposes, simulate a connection
          // In a real implementation, you would use the WalletConnect SDK
          setTimeout(() => {
            const simulatedAddress = `0x${Math.random().toString(16).slice(2, 12)}...${Math.random().toString(16).slice(2, 6)}`;
            onConnect(walletName, simulatedAddress);
            setIsConnecting(false);
          }, 1000);
          return;
          
        case 'Coinbase Wallet':
          if (window.ethereum?.isCoinbaseWallet) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            address = accounts[0];
          } else {
            throw new Error("Coinbase Wallet not installed");
          }
          break;
          
        default:
          throw new Error("Unsupported wallet");
      }
      
      toast.success(`Connected to ${walletName}`, {
        description: `Address: ${address}`
      });
      onConnect(walletName, address);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to connect wallet");
      toast.error("Connection failed", {
        description: err.message || "Could not connect to wallet"
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const handleSocialConnect = (provider: SocialProviderType) => {
    setIsConnecting(true);
    setError(null);
    
    toast.info(`Connecting to ${provider}...`);
    
    // In a real implementation, this would redirect to the OAuth flow
    // For now, we simulate a successful connection with a delay
    setTimeout(() => {
      onConnect(provider, `${provider.toLowerCase()}@example.com`);
      setIsConnecting(false);
    }, 1500);
  };

  const handleEmailConnect = (email: string) => {
    if (!email.trim() || !email.includes('@')) {
      setError("Please enter a valid email address");
      toast.error("Invalid email", {
        description: "Please enter a valid email address"
      });
      return;
    }
    
    setIsConnecting(true);
    setError(null);
    
    toast.info("Connecting with email...");
    
    // Simulate email authentication
    setTimeout(() => {
      onConnect("Email", email);
      setIsConnecting(false);
    }, 1500);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-center">Join the Hawkly Circle</CardTitle>
        <CardDescription className="text-center">
          Connect your wallet or use a social login to join our security community
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="wallet" className="flex items-center">
              <Wallet className="h-4 w-4 mr-2" />
              Web3 Wallet
            </TabsTrigger>
            <TabsTrigger value="social" className="flex items-center">
              <Mail className="h-4 w-4 mr-2" />
              Social / Email
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="wallet" className="mt-0 space-y-4">
            <WalletProvidersList
              isMetaMaskDetected={isMetaMaskDetected}
              isPhantomDetected={isPhantomDetected}
              isCoinbaseDetected={isCoinbaseDetected}
              onWalletConnect={handleWalletConnect}
              isConnecting={isConnecting}
              error={error}
            />
          </TabsContent>
          
          <TabsContent value="social" className="mt-0 space-y-3">
            <SocialLoginList
              onSocialConnect={handleSocialConnect}
              onEmailConnect={handleEmailConnect}
              isConnecting={isConnecting}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="flex flex-col space-y-4 pt-0">
        <div className="text-xs text-center text-muted-foreground w-full">
          By connecting, you agree to our <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>
        </div>
        
        {onClose && (
          <Button variant="ghost" size="sm" onClick={onClose} disabled={isConnecting}>
            I'll join later
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
