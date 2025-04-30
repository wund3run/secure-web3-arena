import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Shield, Wallet, Github, Mail, Twitter, LinkIcon, Users, Key } from "lucide-react";
import { toast } from "sonner";
import detectEthereumProvider from "@metamask/detect-provider";

// Define provider types for better type safety
type WalletProvider = 'MetaMask' | 'Phantom' | 'WalletConnect' | 'Coinbase Wallet';
type SocialProvider = 'GitHub' | 'Google' | 'Twitter' | 'Email';

interface WalletProviderProps {
  name: string;
  icon: React.ReactNode;
  chainType: string;
  onClick: () => void;
  isDetected?: boolean;
}

const WalletProvider = ({ name, icon, chainType, onClick, isDetected }: WalletProviderProps) => {
  return (
    <Button 
      variant="outline" 
      className={`w-full flex items-center justify-start h-auto py-4 px-4 mb-3 ${
        isDetected ? "border-primary/30 bg-primary/5" : "hover:border-primary/50 hover:bg-primary/5"
      }`}
      onClick={onClick}
    >
      <div className="mr-3">{icon}</div>
      <div className="text-left flex-1">
        <p className="font-medium">{name}</p>
        <p className="text-xs text-muted-foreground">{chainType}</p>
      </div>
      {isDetected && (
        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
          Detected
        </span>
      )}
    </Button>
  );
};

interface WalletConnectProps {
  onConnect: (provider: string, address: string) => void;
  onClose?: () => void;
}

export function WalletConnect({ onConnect, onClose }: WalletConnectProps) {
  const [activeTab, setActiveTab] = useState("wallet");
  const [isMetaMaskDetected, setIsMetaMaskDetected] = useState(false);
  const [isPhantomDetected, setIsPhantomDetected] = useState(false);
  const [isCoinbaseDetected, setIsCoinbaseDetected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Detect available wallet providers when component mounts
  useEffect(() => {
    const detectWallets = async () => {
      // Check for MetaMask
      try {
        const provider = await detectEthereumProvider({ silent: true });
        setIsMetaMaskDetected(!!provider && window.ethereum?.isMetaMask);
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

  const handleWalletConnect = async (walletName: WalletProvider) => {
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

  const handleSocialConnect = (provider: SocialProvider) => {
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

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-center">Connect to Hawkly</CardTitle>
        <CardDescription className="text-center">
          Connect your wallet or use a social login to access the platform
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="wallet">
              <Wallet className="h-4 w-4 mr-2" />
              Web3 Wallet
            </TabsTrigger>
            <TabsTrigger value="social">
              <Mail className="h-4 w-4 mr-2" />
              Social / Email
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="wallet" className="mt-4">
            <div className="space-y-2">
              <WalletProvider 
                name="MetaMask" 
                icon={<img src="https://metamask.io/images/metamask-fox.svg" alt="MetaMask" className="h-8 w-8" />}
                chainType="Ethereum, Polygon, Optimism, Arbitrum"
                onClick={() => handleWalletConnect("MetaMask")}
                isDetected={isMetaMaskDetected}
              />
              
              <WalletProvider 
                name="Phantom" 
                icon={<img src="https://phantom.app/img/logo.svg" alt="Phantom" className="h-8 w-8" />}
                chainType="Solana"
                onClick={() => handleWalletConnect("Phantom")}
                isDetected={isPhantomDetected}
              />
              
              <WalletProvider 
                name="WalletConnect" 
                icon={<img src="https://1000logos.net/wp-content/uploads/2022/05/WalletConnect-Logo.jpg" alt="WalletConnect" className="h-8 w-8" />}
                chainType="Multi-chain compatibility"
                onClick={() => handleWalletConnect("WalletConnect")}
              />
              
              <WalletProvider 
                name="Coinbase Wallet" 
                icon={<img src="https://www.coinbase.com/img/favicon/favicon-32x32.png" alt="Coinbase" className="h-8 w-8" />}
                chainType="Ethereum, Polygon, Solana"
                onClick={() => handleWalletConnect("Coinbase Wallet")}
                isDetected={isCoinbaseDetected}
              />
            </div>
            
            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}
            
            <div className="mt-6 text-center text-sm text-muted-foreground">
              Connect your cryptocurrency wallet to sign messages and verify your identity on the blockchain
            </div>
          </TabsContent>
          
          <TabsContent value="social" className="mt-4">
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center py-5 hover:bg-background/50" 
                onClick={() => handleSocialConnect("GitHub")}
                disabled={isConnecting}
              >
                <Github className="mr-2 h-5 w-5" />
                Continue with GitHub
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center py-5 hover:bg-background/50" 
                onClick={() => handleSocialConnect("Google")}
                disabled={isConnecting}
              >
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" className="mr-2 h-5 w-5">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  <path d="M1 1h22v22H1z" fill="none"/>
                </svg>
                Continue with Google
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center py-5 hover:bg-background/50" 
                onClick={() => handleSocialConnect("Twitter")}
                disabled={isConnecting}
              >
                <Twitter className="mr-2 h-5 w-5" />
                Continue with Twitter
              </Button>

              <div className="relative my-4">
                <Separator />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
                  OR
                </div>
              </div>
              
              <Button 
                variant="default" 
                className="w-full" 
                onClick={() => handleSocialConnect("Email")}
                disabled={isConnecting}
              >
                <Mail className="mr-2 h-5 w-5" />
                Continue with Email
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="flex flex-col space-y-4 pt-0">
        <div className="text-xs text-center text-muted-foreground w-full">
          By connecting, you agree to our <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>
        </div>
        
        {onClose && (
          <Button variant="ghost" size="sm" onClick={onClose} disabled={isConnecting}>
            I'll connect later
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

// Add TypeScript declarations for wallet providers
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
