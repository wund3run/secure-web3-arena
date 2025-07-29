
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Wallet, ShieldCheck } from "lucide-react";
import { WalletConnect } from "@/components/auth/wallet-connect";

interface WelcomeScreenProps {
  showConnect: boolean;
  setShowConnect: (show: boolean) => void;
  onConnect: (provider: string, address: string) => void;
}

export function WelcomeScreen({ showConnect, setShowConnect, onConnect }: WelcomeScreenProps) {
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
          <WalletConnect onConnect={onConnect} onClose={() => setShowConnect(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
