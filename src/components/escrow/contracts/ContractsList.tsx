
import { useState, useEffect } from "react";
import { useEscrow, EscrowContract } from "@/contexts/EscrowContext";
import { ContractDetails } from "../ContractDetails";
import { ContractFilters } from "./ContractFilters";
import { EmptyContractsList, NoMatchingContracts } from "./EmptyContractsList";
import { ContractsGridView } from "./ContractsGridView";
import { ErrorBoundary } from "@/utils/error-handling";
import { ContractsLoadingState } from "./ContractsLoadingState";
import { memo } from "react";

// Memoize the component for better performance
export const ContractsList = memo(function ContractsList() {
  const { contracts, fetchContracts, loading, profile } = useEscrow();
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [viewType, setViewType] = useState<string>("all");
  const [showDetails, setShowDetails] = useState(false);
  const [selectedContract, setSelectedContract] = useState<EscrowContract | null>(null);
  const [filteredContracts, setFilteredContracts] = useState<EscrowContract[]>([]);

  useEffect(() => {
    fetchContracts();
  }, [fetchContracts]);

  // Move filtering to a separate effect for optimization
  useEffect(() => {
    if (!contracts?.length) {
      setFilteredContracts([]);
      return;
    }
    
    const filtered = contracts.filter(contract => {
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
    
    setFilteredContracts(filtered);
  }, [contracts, statusFilter, viewType, profile?.id]);

  const handleViewContract = (contract: EscrowContract) => {
    setSelectedContract(contract);
    setShowDetails(true);
  };

  if (loading) {
    return <ContractsLoadingState />;
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
});
