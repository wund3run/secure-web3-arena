
import { useState, useEffect } from "react";
import { useEscrow, EscrowContract } from "@/contexts/EscrowContext";
import { ContractDetails } from "../ContractDetails";
import { ContractFilters } from "./ContractFilters";
import { EmptyContractsList, NoMatchingContracts } from "./EmptyContractsList";
import { ContractsGridView } from "./ContractsGridView";
import ErrorBoundary from "@/components/ui/error-boundary";
import { ContractsLoadingState } from "./ContractsLoadingState";
import { memo } from "react";
import { useContractsFiltering } from "../hooks/useContractsFiltering";

// Memoize the component for better performance
export const ContractsList = memo(function ContractsList() {
  const { contracts, fetchContracts, loading, profile } = useEscrow();
  const [showDetails, setShowDetails] = useState(false);
  const [selectedContract, setSelectedContract] = useState<EscrowContract | null>(null);
  
  // Use a custom hook for filtering logic
  const { 
    statusFilter,
    setStatusFilter,
    viewType, 
    setViewType,
    filteredContracts
  } = useContractsFiltering(contracts, profile?.id);

  useEffect(() => {
    fetchContracts();
  }, [fetchContracts]);

  const handleViewContract = (contract: EscrowContract) => {
    setSelectedContract(contract);
    setShowDetails(true);
  };

  if (loading) {
    return <ContractsLoadingState />;
  }

  if (!contracts || contracts.length === 0) {
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
});
