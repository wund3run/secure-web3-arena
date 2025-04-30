
import { useEscrowManager } from "./hooks/useEscrowManager";
import { CreateContractForm } from "./CreateContractForm";
import { EscrowOverview } from "./EscrowOverview";
import { EscrowSidebar } from "./sidebar/EscrowSidebar";
import { WelcomeScreen } from "./auth/WelcomeScreen";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function EscrowManager() {
  const {
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
  } = useEscrowManager();
  
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <WelcomeScreen 
        showConnect={showConnect} 
        setShowConnect={setShowConnect}
        onConnect={handleConnect}
      />
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
            <EscrowOverview 
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
              onCreateNew={() => setShowCreateForm(true)}
            />
          </div>
          
          <div>
            <EscrowSidebar 
              walletAddress={walletAddress}
              chainId={chainId}
              onWalletConnect={handleWalletConnect}
              onCreateNew={() => setShowCreateForm(true)}
              setActiveTab={setActiveTab}
            />
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
