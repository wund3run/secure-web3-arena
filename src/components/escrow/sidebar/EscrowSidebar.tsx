import { useEscrow } from "@/contexts/EscrowContext";
import { BlockchainConnector } from "../BlockchainConnector";
import { QuickActions } from "./QuickActions";
import { Card, CardFooter } from "@/components/ui/card";

interface EscrowSidebarProps {
  walletAddress: string;
  chainId: string;
  onWalletConnect: (address: string) => void;
  onCreateNew: () => void;
  setActiveTab: (tab: string) => void;
}

export function EscrowSidebar({ 
  walletAddress, 
  chainId, 
  onWalletConnect, 
  onCreateNew, 
  setActiveTab 
}: EscrowSidebarProps) {
  const { profile } = useEscrow();

  return (
    <div>
      <BlockchainConnector 
        onConnectionChange={(connected, address, chainId) => {
          if (connected && address) {
            onWalletConnect(address);
          }
        }}
      />
      
      <QuickActions 
        onCreateNew={onCreateNew} 
        setActiveTab={setActiveTab}
        isArbitrator={!!profile?.is_arbitrator}
      />
      
      <Card className="mt-0">
        <CardFooter className="flex flex-col items-start text-xs text-muted-foreground">
          <p className="mb-1">
            <span className="font-semibold">Wallet Status:</span> {walletAddress ? 'Connected' : 'Not Connected'}
          </p>
          <p>
            <span className="font-semibold">User Role:</span> {profile?.is_arbitrator ? 'Arbitrator' : 'Standard User'}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
