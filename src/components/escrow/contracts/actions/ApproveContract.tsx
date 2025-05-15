
import React from 'react';
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import { useEscrow, EscrowContract } from "@/contexts/EscrowContext";
import { toast } from "sonner";

interface ApproveContractProps {
  contract: EscrowContract;
  onSuccess?: () => void;
}

export const ApproveContract: React.FC<ApproveContractProps> = ({ 
  contract, 
  onSuccess 
}) => {
  const { profile, createTransaction } = useEscrow();
  const [isApproving, setIsApproving] = React.useState(false);
  
  const handleApprove = async () => {
    if (!profile) {
      toast.error("You must be logged in to approve a contract");
      return;
    }
    
    setIsApproving(true);
    
    try {
      // Create an approval transaction
      const transactionId = await createTransaction({
        escrow_contract_id: contract.id,
        type: 'deposit', // Using valid TransactionType from the enum
        amount: 0,
        sender_id: profile.id,
        recipient_id: contract.auditor?.id
      });
      
      if (transactionId && onSuccess) {
        onSuccess();
      }
      
      toast.success("Contract approved successfully");
    } catch (error) {
      console.error("Error approving contract:", error);
      toast.error("Failed to approve contract");
    } finally {
      setIsApproving(false);
    }
  };

  return (
    <Button 
      onClick={handleApprove} 
      disabled={isApproving || contract.status !== 'pending'}
      size="sm"
      variant="outline"
      className="flex items-center gap-1"
    >
      <Shield className="h-4 w-4" />
      {isApproving ? "Approving..." : "Approve Contract"}
    </Button>
  );
};

export default ApproveContract;
