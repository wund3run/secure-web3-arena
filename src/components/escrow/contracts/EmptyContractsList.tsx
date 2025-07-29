
import React from "react";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

export function EmptyContractsList() {
  return (
    <div className="text-center py-12">
      <Shield className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium">No Escrow Contracts</h3>
      <p className="text-muted-foreground mb-6">
        You haven't created or participated in any escrow contracts yet.
      </p>
      <Button>Create New Escrow</Button>
    </div>
  );
}

export function NoMatchingContracts() {
  return (
    <div className="text-center py-8 text-muted-foreground">
      <p>No contracts match your filters</p>
    </div>
  );
}
