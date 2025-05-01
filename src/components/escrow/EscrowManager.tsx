
import { useEscrowManager } from "./hooks/useEscrowManager";
import { CreateContractForm } from "./CreateContractForm";
import { EscrowOverview } from "./EscrowOverview";
import { EscrowSidebar } from "./sidebar/EscrowSidebar";
import { WelcomeScreen } from "./auth/WelcomeScreen";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BetaWarning } from "@/components/ui/beta-warning";

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
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Escrow System</h1>
            <p className="text-muted-foreground">
              Manage secure transactions between security auditors and clients
            </p>
          </div>
          <Button onClick={() => setShowCreateForm(true)}>Create New Escrow</Button>
        </div>
        
        <BetaWarning 
          variant="subtle" 
          size="sm" 
          dismissable={true}
          storageKey="hawkly_escrow_beta_notice"
        >
          <div className="text-xs">
            <span className="font-semibold">Beta Feature:</span> The escrow system is currently in testing. 
            Please use with caution and verify all transactions before proceeding. 
            For feedback or issues, please contact our support team.
          </div>
        </BetaWarning>
        
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
          <BetaWarning variant="minimal" size="sm" className="mb-4">
            This feature is in beta. Use with caution and verify all transaction details.
          </BetaWarning>
          <CreateContractForm onSuccess={() => setShowCreateForm(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
