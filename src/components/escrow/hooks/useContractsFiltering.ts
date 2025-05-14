
import { useState, useEffect } from "react";
import { EscrowContract } from "@/contexts/EscrowContext";

export function useContractsFiltering(
  contracts: EscrowContract[],
  userId?: string
) {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [viewType, setViewType] = useState<string>("all");
  const [filteredContracts, setFilteredContracts] = useState<EscrowContract[]>([]);
  
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
      if (viewType === "client" && contract.client_id !== userId) {
        return false;
      }
      if (viewType === "auditor" && contract.auditor_id !== userId) {
        return false;
      }
      
      return true;
    });
    
    setFilteredContracts(filtered);
  }, [contracts, statusFilter, viewType, userId]);

  return {
    statusFilter,
    setStatusFilter,
    viewType,
    setViewType,
    filteredContracts
  };
}
