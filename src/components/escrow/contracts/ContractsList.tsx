
import { useState, useEffect } from "react";
import { useEscrow, EscrowContract } from "@/contexts/EscrowContext";
import { ContractDetails } from "../ContractDetails";
import { ContractFilters } from "./ContractFilters";
import { EmptyContractsList, NoMatchingContracts } from "./EmptyContractsList";
import { ContractCard } from "./ContractCard";

export function ContractsList() {
  const { contracts, fetchContracts, loading, profile } = useEscrow();
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [viewType, setViewType] = useState<string>("all");
  const [showDetails, setShowDetails] = useState(false);
  const [selectedContract, setSelectedContract] = useState<EscrowContract | null>(null);

  useEffect(() => {
    fetchContracts();
  }, [fetchContracts]);

  const filteredContracts = contracts.filter(contract => {
    // Filter by status
    if (statusFilter !== "all" && contract.status !== statusFilter) {
      return false;
    }
    
    // Filter by role
    if (viewType === "client" && contract.client_id !== profile?.id) {
      return false;
    }
    if (viewType === "auditor" && contract.auditor_id !== profile?.id) {
      return false;
    }
    
    return true;
  });

  const handleViewContract = (contract: EscrowContract) => {
    setSelectedContract(contract);
    setShowDetails(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (contracts.length === 0) {
    return <EmptyContractsList />;
  }

  return (
    <div className="space-y-4">
      <ContractFilters 
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        viewType={viewType}
        setViewType={setViewType}
        onRefresh={() => fetchContracts()}
      />
      
      {filteredContracts.length === 0 ? (
        <NoMatchingContracts />
      ) : (
        <div className="grid gap-4">
          {filteredContracts.map((contract) => (
            <ContractCard 
              key={contract.id}
              contract={contract}
              currentUser={profile}
              onViewDetails={handleViewContract}
            />
          ))}
        </div>
      )}
      
      {selectedContract && (
        <ContractDetails 
          contract={selectedContract}
          open={showDetails}
          onOpenChange={setShowDetails}
        />
      )}
    </div>
  );
}
