
import React, { createContext, useContext, ReactNode } from "react";
import { useProfile } from "./hooks/useProfile";
import { useEscrowContracts } from "./hooks/useEscrowContracts";
import { useEscrowMilestones } from "./hooks/useEscrowMilestones";
import { useEscrowTransactions } from "./hooks/useEscrowTransactions";
import { useEscrowDisputes } from "./hooks/useEscrowDisputes";
import { EscrowContextType } from "./types/escrow-types";

// Re-export types for convenience
export * from "./types/escrow-types";

const EscrowContext = createContext<EscrowContextType | undefined>(undefined);

export const useEscrow = () => {
  const context = useContext(EscrowContext);
  if (!context) {
    throw new Error('useEscrow must be used within an EscrowProvider');
  }
  return context;
};

export const EscrowProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load profile first
  const { profile, loading: profileLoading } = useProfile();
  
  // Initialize our hooks with the profile
  const { 
    contracts, 
    fetchContracts,
    createContract,
    cancelContract,
    completeContract
  } = useEscrowContracts(profile);
  
  const {
    milestones,
    fetchMilestones,
    updateMilestone
  } = useEscrowMilestones();
  
  const {
    transactions,
    fetchTransactions,
    createTransaction,
    approveTransaction
  } = useEscrowTransactions(profile);
  
  const {
    disputes,
    fetchDisputes,
    createDispute,
    addDisputeComment,
    resolveDispute
  } = useEscrowDisputes(profile);

  const value: EscrowContextType = {
    contracts,
    milestones,
    transactions,
    disputes,
    loading: profileLoading,
    profile,
    fetchContracts,
    fetchMilestones,
    fetchTransactions,
    fetchDisputes,
    createContract,
    updateMilestone,
    createTransaction,
    approveTransaction,
    createDispute,
    addDisputeComment,
    resolveDispute,
    cancelContract,
    completeContract
  };

  return (
    <EscrowContext.Provider value={value}>
      {children}
    </EscrowContext.Provider>
  );
};

export default EscrowProvider;
