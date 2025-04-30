
import React from "react";
import { useEscrow } from "@/contexts/EscrowContext";
import { FileCheck, AlertTriangle } from "lucide-react";

export function ArbitrationPanel() {
  const { profile } = useEscrow();

  if (profile?.is_arbitrator) {
    return (
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
    );
  }

  return (
    <div className="text-center py-8">
      <AlertTriangle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium">Not an Arbitrator</h3>
      <p className="text-sm text-muted-foreground max-w-sm mx-auto">
        You need to be approved as an arbitrator to access this section. Contact platform administrators to apply.
      </p>
    </div>
  );
}
