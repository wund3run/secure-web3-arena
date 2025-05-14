
import { useState, useEffect } from "react";
import { useEscrow, EscrowContract } from "@/contexts/EscrowContext";
import { ContractDetails } from "../ContractDetails";
import { ContractFilters } from "./ContractFilters";
import { EmptyContractsList, NoMatchingContracts } from "./EmptyContractsList";
import { ContractCard } from "./ContractCard";
import { ErrorBoundary } from "@/utils/error-handling";
import LoadingState from "@/components/ui/loading-state";
import { ContractsGridView } from "./ContractsGridView";

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
    return <LoadingState message="Loading contracts..." fullPage={false} size="md" />;
  }

  if (contracts.length === 0) {
    return <EmptyContractsList />;
  }

  return (
    <ErrorBoundary>
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
          <ContractsGridView 
            contracts={filteredContracts}
            currentUser={profile}
            onViewDetails={handleViewContract}
          />
        )}
        
        {selectedContract && (
          <ContractDetails 
            contract={selectedContract}
            open={showDetails}
            onOpenChange={setShowDetails}
          />
        )}
      </div>
    </ErrorBoundary>
  );
}
