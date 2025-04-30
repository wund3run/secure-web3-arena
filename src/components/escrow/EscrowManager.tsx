
import { useState, useEffect } from "react";
import { useEscrow } from "@/contexts/EscrowContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { BlockchainConnector } from "./BlockchainConnector";
import { ContractsList } from "./ContractsList";
import { CreateContractForm } from "./CreateContractForm";
import { WalletConnect } from "@/components/auth/wallet-connect";
import { Wallet, ShieldCheck, AlertTriangle, FileCheck } from "lucide-react";

export function EscrowManager() {
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
  
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-md mx-auto my-12 p-6 bg-background border rounded-lg shadow-sm">
        <div className="text-center space-y-4">
          <ShieldCheck className="mx-auto h-12 w-12 text-primary" />
          <h2 className="text-2xl font-bold">Secure Escrow System</h2>
          <p className="text-muted-foreground">
            Connect your account to access the escrow system with smart contracts and multi-signature approvals.
          </p>
          <Button 
            className="w-full" 
            onClick={() => setShowConnect(true)}
          >
            <Wallet className="mr-2 h-4 w-4" /> Connect to Continue
          </Button>
        </div>
        
        <Dialog open={showConnect} onOpenChange={setShowConnect}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Connect to Hawkly Escrow</DialogTitle>
              <DialogDescription>
                Connect your account to access secure escrow services
              </DialogDescription>
            </DialogHeader>
            <WalletConnect onConnect={handleConnect} onClose={() => setShowConnect(false)} />
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="container py-8 max-w-6xl">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Escrow System</h1>
            <p className="text-muted-foreground">
              Manage secure transactions between security auditors and clients
            </p>
          </div>
          <Button onClick={() => setShowCreateForm(true)}>Create New Escrow</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Escrow Dashboard</CardTitle>
                <CardDescription>
                  View and manage your security audit escrow contracts
                </CardDescription>
                <Tabs defaultValue="contracts" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-3 w-full">
                    <TabsTrigger value="contracts">Contracts</TabsTrigger>
                    <TabsTrigger value="arbitration">Arbitration</TabsTrigger>
                    <TabsTrigger value="transactions">Transactions</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent>
                <TabsContent value="contracts" className="mt-0">
                  <ContractsList />
                </TabsContent>
                <TabsContent value="arbitration" className="mt-0">
                  {profile?.is_arbitrator ? (
                    <div>
                      <h3 className="text-lg font-medium">Active Disputes</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Review and resolve disputes between auditors and clients
                      </p>
                      
                      {/* Arbitration content would go here */}
                      <div className="text-center py-8 text-muted-foreground">
                        <FileCheck className="mx-auto h-12 w-12 mb-2" />
                        <p>No active disputes require your attention</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <AlertTriangle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">Not an Arbitrator</h3>
                      <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                        You need to be approved as an arbitrator to access this section. Contact platform administrators to apply.
                      </p>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="transactions" className="mt-0">
                  <h3 className="text-lg font-medium">Recent Transactions</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Track deposits, payments, and refunds across all contracts
                  </p>
                  
                  {/* Transactions content would go here */}
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No transactions to display</p>
                    <p className="text-sm">Transactions will appear here once contracts are created and funded</p>
                  </div>
                </TabsContent>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <BlockchainConnector 
              onConnect={handleWalletConnect}
              connected={!!walletAddress}
              address={walletAddress}
              chainId={chainId}
            />
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common tasks for escrow management
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => setShowCreateForm(true)}
                >
                  <FileCheck className="mr-2 h-4 w-4" />
                  Create New Escrow
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => setActiveTab("contracts")}
                >
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  View My Contracts
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  disabled={!profile.is_arbitrator}
                  onClick={() => setActiveTab("arbitration")}
                >
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Dispute Resolution
                </Button>
              </CardContent>
              <CardFooter className="flex flex-col items-start text-xs text-muted-foreground">
                <p className="mb-1">
                  <span className="font-semibold">Wallet Status:</span> {walletAddress ? 'Connected' : 'Not Connected'}
                </p>
                <p>
                  <span className="font-semibold">User Role:</span> {profile.is_arbitrator ? 'Arbitrator' : 'Standard User'}
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
      
      <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Escrow Contract</DialogTitle>
            <DialogDescription>
              Set up a secure escrow for audit services with milestone payments
            </DialogDescription>
          </DialogHeader>
          <CreateContractForm onSuccess={() => setShowCreateForm(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
