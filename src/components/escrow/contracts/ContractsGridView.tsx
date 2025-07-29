
import React from "react";
import { EscrowContract, Profile } from "@/contexts/types/escrow-types";
import { ContractCard } from "./ContractCard";

interface ContractsGridViewProps {
  contracts: EscrowContract[];
  currentUser: Profile | null;
  onViewDetails: (contract: EscrowContract) => void;
}

export function ContractsGridView({ 
  contracts, 
  currentUser, 
  onViewDetails 
}: ContractsGridViewProps) {
  return (
    <div className="grid gap-4">
      {contracts.map((contract) => (
        <ContractCard 
          key={contract.id}
          contract={contract}
          currentUser={currentUser}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
}
