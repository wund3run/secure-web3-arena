
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { EscrowContract, Profile, Milestone, EscrowStatus } from "../types/escrow-types";

export const useEscrowContracts = (profile: Profile | null) => {
  const [contracts, setContracts] = useState<EscrowContract[]>([]);
  
  const fetchContracts = async () => {
    if (!profile) return;
    
    try {
      const { data, error } = await supabase
        .from('escrow_contracts')
        .select(`
          *,
          client:client_id(*),
          auditor:auditor_id(*)
        `)
        .or(`client_id.eq.${profile.id},auditor_id.eq.${profile.id}`);
        
      if (error) {
        throw error;
      }
      
      // Type assertion to make TypeScript happy
      const typedData = data?.map(contract => {
        // Handle null or invalid client/auditor
        const client = typeof contract.client === 'object' && contract.client !== null ? 
          contract.client as Profile : 
          undefined;
        
        const auditor = typeof contract.auditor === 'object' && contract.auditor !== null ? 
          contract.auditor as Profile : 
          undefined;
        
        return {
          ...contract,
          client,
          auditor,
          status: contract.status as EscrowStatus
        };
      }) as EscrowContract[];
      
      setContracts(typedData || []);
      return typedData || [];
    } catch (error) {
      console.error('Error fetching contracts:', error);
      toast.error('Failed to load escrow contracts');
      return [];
    }
  };

  const createContract = async (
    contract: Partial<EscrowContract>, 
    initialMilestones: Partial<Milestone>[]
  ) => {
    if (!profile) {
      toast.error('You must be logged in to create a contract');
      return null;
    }
    
    try {
      // Make sure auditor_id is provided (it's required by the database)
      const contractData = {
        ...contract,
        auditor_id: contract.auditor_id || '', // Empty string as fallback
        client_id: contract.client_id || profile.id,
        title: contract.title || '', // Ensure required fields have values
        total_amount: contract.total_amount || 0
      };
      
      // Insert the contract
      const { data: insertedContract, error: contractError } = await supabase
        .from('escrow_contracts')
        .insert(contractData)
        .select()
        .single();
        
      if (contractError) throw contractError;
      
      // Insert the milestones
      if (initialMilestones.length > 0) {
        const milestonesWithContractId = initialMilestones.map(milestone => ({
          ...milestone,
          escrow_contract_id: insertedContract.id,
          title: milestone.title || 'Untitled Milestone', // Ensure required field
          amount: milestone.amount || 0 // Ensure required field
        }));
        
        const { error: milestonesError } = await supabase
          .from('milestones')
          .insert(milestonesWithContractId);
          
        if (milestonesError) throw milestonesError;
      }
      
      // Refresh contracts list
      await fetchContracts();
      
      toast.success('Escrow contract created successfully');
      return insertedContract.id;
    } catch (error) {
      console.error('Error creating contract:', error);
      toast.error('Failed to create escrow contract');
      return null;
    }
  };

  const cancelContract = async (contractId: string) => {
    try {
      const { error } = await supabase
        .from('escrow_contracts')
        .update({ status: 'cancelled' })
        .eq('id', contractId);
        
      if (error) throw error;
      
      await fetchContracts();
      
      toast.success('Contract cancelled successfully');
      return true;
    } catch (error) {
      console.error('Error cancelling contract:', error);
      toast.error('Failed to cancel contract');
      return false;
    }
  };

  const completeContract = async (contractId: string) => {
    try {
      const { error } = await supabase
        .from('escrow_contracts')
        .update({ status: 'completed' })
        .eq('id', contractId);
        
      if (error) throw error;
      
      await fetchContracts();
      
      toast.success('Contract marked as completed');
      return true;
    } catch (error) {
      console.error('Error completing contract:', error);
      toast.error('Failed to complete contract');
      return false;
    }
  };

  return {
    contracts,
    fetchContracts,
    createContract,
    cancelContract,
    completeContract
  };
};
