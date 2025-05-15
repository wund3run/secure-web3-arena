
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { AlertTriangle, AlertCircle } from "lucide-react";
import { useEscrow, EscrowContract } from "@/contexts/EscrowContext";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface DisputeContractProps {
  contract: EscrowContract;
  onSuccess?: () => void;
}

export const DisputeContract: React.FC<DisputeContractProps> = ({ 
  contract, 
  onSuccess 
}) => {
  const { profile, createDispute } = useEscrow();
  const [isDisputing, setIsDisputing] = useState(false);
  const [showDisputeDialog, setShowDisputeDialog] = useState(false);
  const [disputeReason, setDisputeReason] = useState("");
  
  const handleDisputeOpen = () => {
    setShowDisputeDialog(true);
  };
  
  const handleDisputeSubmit = async () => {
    if (!profile) {
      toast.error("You must be logged in to dispute a contract");
      return;
    }
    
    if (!disputeReason.trim()) {
      toast.error("Please provide a reason for the dispute");
      return;
    }
    
    setIsDisputing(true);
    
    try {
      // Create a dispute
      const disputeId = await createDispute({
        escrow_contract_id: contract.id,
        raised_by: profile.id,
        reason: disputeReason,
        status: 'opened'
      });
      
      if (disputeId && onSuccess) {
        onSuccess();
      }
      
      toast.success("Dispute submitted successfully");
      setShowDisputeDialog(false);
    } catch (error) {
      console.error("Error disputing contract:", error);
      toast.error("Failed to submit dispute");
    } finally {
      setIsDisputing(false);
    }
  };

  // Only allow disputing contracts that are in progress
  const canDispute = ['active', 'in_progress'].includes(contract.status);

  return (
    <>
      <Button 
        onClick={handleDisputeOpen} 
        disabled={!canDispute || isDisputing}
        size="sm"
        variant="outline"
        className="flex items-center gap-1 text-amber-500 border-amber-500/20 hover:bg-amber-500/10"
      >
        <AlertTriangle className="h-4 w-4" />
        Raise Dispute
      </Button>
      
      <Dialog open={showDisputeDialog} onOpenChange={setShowDisputeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              Raise a Dispute
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <p className="text-sm text-muted-foreground mb-4">
              Please provide a detailed explanation of why you are disputing this contract. 
              Be specific and clear about the issues encountered.
            </p>
            
            <Textarea
              value={disputeReason}
              onChange={(e) => setDisputeReason(e.target.value)}
              placeholder="Explain the reason for your dispute..."
              className="min-h-[120px]"
            />
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowDisputeDialog(false)}
              disabled={isDisputing}
            >
              Cancel
            </Button>
            <Button 
              variant="default" 
              onClick={handleDisputeSubmit}
              disabled={isDisputing || !disputeReason.trim()}
              className="bg-amber-500 hover:bg-amber-600"
            >
              {isDisputing ? "Submitting..." : "Submit Dispute"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DisputeContract;
