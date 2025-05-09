
import { WalletConnect } from "@/components/auth/wallet-connect";
import { toast } from "sonner";

interface WalletConnectionHandlerProps {
  onConnect: (provider: string, address: string) => void;
  onClose: () => void;
}

export function WalletConnectionHandler({ onConnect, onClose }: WalletConnectionHandlerProps) {
  const handleConnect = (provider: string, address: string) => {
    console.log(`Connected with ${provider}: ${address}`);
    
    // Show success message
    toast.success(`Connected successfully with ${provider}`, {
      description: provider === "Email" ? address : `Address: ${address.substring(0, 10)}...`
    });
    
    onConnect(provider, address);
  };
  
  return (
    <WalletConnect 
      onConnect={handleConnect} 
      onClose={onClose}
    />
  );
}
