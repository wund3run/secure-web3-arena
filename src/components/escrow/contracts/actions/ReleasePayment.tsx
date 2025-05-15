
import React from 'react';
import { Button } from "@/components/ui/button";
import { Wallet, CreditCard } from "lucide-react";
import { useEscrow, EscrowContract } from "@/contexts/EscrowContext";
import { toast } from "sonner";

interface ReleasePaymentProps {
  contract: EscrowContract;
  milestoneId?: string; // Optional: to release payment for a specific milestone
  onSuccess?: () => void;
}

export const ReleasePayment: React.FC<ReleasePaymentProps> = ({ 
  contract, 
  milestoneId,
  onSuccess 
}) => {
  const { profile, createTransaction } = useEscrow();
  const [isReleasing, setIsReleasing] = React.useState(false);
  
  const handleReleasePayment = async () => {
    if (!profile) {
      toast.error("You must be logged in to release payment");
      return;
    }
    
    // Only client should be able to release payment
    if (profile.id !== contract.client_id) {
      toast.error("Only the client can release payment");
      return;
    }
    
    setIsReleasing(true);
    
    try {
      // Create a payment release transaction
      const transactionId = await createTransaction({
        escrow_contract_id: contract.id,
        type: 'milestone_payment', // Using valid TransactionType from the enum
        amount: milestoneId ? undefined : contract.total_amount, // If milestone specified, amount is handled by backend
        sender_id: profile.id,
        recipient_id: contract.auditor?.id,
        description: `Payment release by ${profile.full_name || profile.id}`,
        milestone_id: milestoneId
      });
      
      if (transactionId && onSuccess) {
        onSuccess();
      }
      
      toast.success("Payment released successfully");
    } catch (error) {
      console.error("Error releasing payment:", error);
      toast.error("Failed to release payment");
    } finally {
      setIsReleasing(false);
    }
  };

  // Only allow releasing payment for active contracts (using the correct type)
  const canReleasePayment = contract.status === 'in_progress' && profile?.id === contract.client_id;

  return (
    <Button 
      onClick={handleReleasePayment} 
      disabled={isReleasing || !canReleasePayment}
      size="sm"
      variant="default"
      className="flex items-center gap-1"
    >
      {isReleasing ? <CreditCard className="h-4 w-4 animate-pulse" /> : <Wallet className="h-4 w-4" />}
      {isReleasing ? "Processing..." : milestoneId ? "Release Milestone Payment" : "Release Payment"}
    </Button>
  );
};

export default ReleasePayment;
