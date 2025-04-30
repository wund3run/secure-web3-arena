
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

// Define types for our escrow system
export type EscrowStatus = 'pending' | 'in_progress' | 'completed' | 'disputed' | 'refunded' | 'cancelled';
export type TransactionType = 'deposit' | 'milestone_payment' | 'refund' | 'fee' | 'dispute_resolution';
export type DisputeStatus = 'opened' | 'in_review' | 'resolved' | 'closed';

export interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  wallet_address: string | null;
  is_arbitrator: boolean;
}

export interface EscrowContract {
  id: string;
  client_id: string;
  auditor_id: string;
  title: string;
  description: string | null;
  total_amount: number;
  currency: string;
  smart_contract_address: string | null;
  status: EscrowStatus;
  requires_multisig: boolean;
  created_at: string;
  updated_at: string;
  client?: Profile;
  auditor?: Profile;
}

export interface Milestone {
  id: string;
  escrow_contract_id: string;
  title: string;
  description: string | null;
  amount: number;
  deadline: string | null;
  is_completed: boolean;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Transaction {
  id: string;
  escrow_contract_id: string;
  milestone_id: string | null;
  sender_id: string;
  recipient_id: string | null;
  type: TransactionType;
  amount: number;
  transaction_hash: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  sender?: Profile;
  recipient?: Profile;
  approvals?: MultisigApproval[];
}

export interface MultisigApproval {
  id: string;
  transaction_id: string;
  approver_id: string;
  approved_at: string;
  signature: string;
  approver?: Profile;
}

export interface Dispute {
  id: string;
  escrow_contract_id: string;
  milestone_id: string | null;
  raised_by: string;
  arbitrator_id: string | null;
  reason: string;
  evidence: string | null;
  status: DisputeStatus;
  resolution: string | null;
  created_at: string;
  updated_at: string;
  raiser?: Profile;
  arbitrator?: Profile;
  comments?: DisputeComment[];
}

export interface DisputeComment {
  id: string;
  dispute_id: string;
  user_id: string;
  comment: string;
  created_at: string;
  user?: Profile;
}

interface EscrowContextType {
  contracts: EscrowContract[];
  milestones: Record<string, Milestone[]>;
  transactions: Record<string, Transaction[]>;
  disputes: Record<string, Dispute[]>;
  loading: boolean;
  profile: Profile | null;
  fetchContracts: () => Promise<void>;
  fetchMilestones: (contractId: string) => Promise<Milestone[]>;
  fetchTransactions: (contractId: string) => Promise<Transaction[]>;
  fetchDisputes: (contractId: string) => Promise<Dispute[]>;
  createContract: (contract: Partial<EscrowContract>, initialMilestones: Partial<Milestone>[]) => Promise<string | null>;
  updateMilestone: (milestone: Partial<Milestone>) => Promise<boolean>;
  createTransaction: (transaction: Partial<Transaction>) => Promise<string | null>;
  approveTransaction: (transactionId: string, signature: string) => Promise<boolean>;
  createDispute: (dispute: Partial<Dispute>) => Promise<string | null>;
  addDisputeComment: (disputeId: string, comment: string) => Promise<boolean>;
  resolveDispute: (disputeId: string, resolution: string) => Promise<boolean>;
  cancelContract: (contractId: string) => Promise<boolean>;
  completeContract: (contractId: string) => Promise<boolean>;
}

const EscrowContext = createContext<EscrowContextType | undefined>(undefined);

export const useEscrow = () => {
  const context = useContext(EscrowContext);
  if (!context) {
    throw new Error('useEscrow must be used within an EscrowProvider');
  }
  return context;
};

export const EscrowProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [contracts, setContracts] = useState<EscrowContract[]>([]);
  const [milestones, setMilestones] = useState<Record<string, Milestone[]>>({});
  const [transactions, setTransactions] = useState<Record<string, Transaction[]>>({});
  const [disputes, setDisputes] = useState<Record<string, Dispute[]>>({});
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        setLoading(false);
        return;
      }
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
        
      if (error) {
        console.error('Error fetching profile:', error);
        toast.error('Failed to load user profile');
      } else {
        setProfile(data);
      }
      
      setLoading(false);
    };
    
    fetchProfile();
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        setProfile(null);
        setContracts([]);
        setMilestones({});
        setTransactions({});
        setDisputes({});
        navigate('/');
      } else if (session && event === 'SIGNED_IN') {
        fetchProfile();
      }
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  // Fetch contracts for the current user
  const fetchContracts = async () => {
    if (!profile) return;
    
    setLoading(true);
    
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
    } catch (error) {
      console.error('Error fetching contracts:', error);
      toast.error('Failed to load escrow contracts');
    } finally {
      setLoading(false);
    }
  };

  // Fetch milestones for a specific contract
  const fetchMilestones = async (contractId: string) => {
    try {
      const { data, error } = await supabase
        .from('milestones')
        .select('*')
        .eq('escrow_contract_id', contractId)
        .order('created_at');
        
      if (error) {
        throw error;
      }
      
      setMilestones(prev => ({
        ...prev,
        [contractId]: data || []
      }));
      
      return data || [];
    } catch (error) {
      console.error('Error fetching milestones:', error);
      toast.error('Failed to load milestones');
      return [];
    }
  };

  // Fetch transactions for a specific contract
  const fetchTransactions = async (contractId: string) => {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select(`
          *,
          sender:sender_id(*),
          recipient:recipient_id(*),
          approvals:multisig_approvals(*, approver:approver_id(*))
        `)
        .eq('escrow_contract_id', contractId)
        .order('created_at', { ascending: false });
        
      if (error) {
        throw error;
      }
      
      // Type assertion and transformation
      const typedTransactions = (data || []).map(tx => {
        // Handle null or invalid sender/recipient
        const sender = typeof tx.sender === 'object' && tx.sender !== null ? 
          tx.sender as Profile : 
          undefined;
        
        const recipient = typeof tx.recipient === 'object' && tx.recipient !== null ? 
          tx.recipient as Profile : 
          undefined;
          
        // Handle approvals
        const approvals = Array.isArray(tx.approvals) ? 
          tx.approvals.map(approval => {
            const approver = typeof approval.approver === 'object' && approval.approver !== null ?
              approval.approver as Profile :
              undefined;
            
            return {
              ...approval,
              approver
            } as MultisigApproval;
          }) : 
          undefined;
          
        return {
          ...tx,
          sender,
          recipient,
          approvals,
          type: tx.type as TransactionType
        } as Transaction;
      });
      
      setTransactions(prev => ({
        ...prev,
        [contractId]: typedTransactions
      }));
      
      return typedTransactions;
    } catch (error) {
      console.error('Error fetching transactions:', error);
      toast.error('Failed to load transactions');
      return [];
    }
  };

  // Fetch disputes for a specific contract
  const fetchDisputes = async (contractId: string) => {
    try {
      const { data, error } = await supabase
        .from('disputes')
        .select(`
          *,
          raiser:raised_by(*),
          arbitrator:arbitrator_id(*),
          comments:dispute_comments(*, user:user_id(*))
        `)
        .eq('escrow_contract_id', contractId)
        .order('created_at', { ascending: false });
        
      if (error) {
        throw error;
      }
      
      // Type assertion and transformation
      const typedDisputes = (data || []).map(dispute => {
        // Handle raiser
        const raiser = typeof dispute.raiser === 'object' && dispute.raiser !== null ? 
          dispute.raiser as Profile : 
          undefined;
        
        // Handle arbitrator
        const arbitrator = typeof dispute.arbitrator === 'object' && dispute.arbitrator !== null ? 
          dispute.arbitrator as Profile : 
          undefined;
        
        // Handle comments
        const comments = Array.isArray(dispute.comments) ?
          dispute.comments.map(comment => {
            const user = typeof comment.user === 'object' && comment.user !== null ?
              comment.user as Profile :
              undefined;
            
            return {
              ...comment,
              user
            } as DisputeComment;
          }) :
          undefined;
          
        return {
          ...dispute,
          raiser,
          arbitrator,
          comments,
          status: dispute.status as DisputeStatus
        } as Dispute;
      });
      
      setDisputes(prev => ({
        ...prev,
        [contractId]: typedDisputes
      }));
      
      return typedDisputes;
    } catch (error) {
      console.error('Error fetching disputes:', error);
      toast.error('Failed to load disputes');
      return [];
    }
  };

  // Create a new escrow contract with initial milestones
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

  // Update a milestone
  const updateMilestone = async (milestone: Partial<Milestone>) => {
    if (!milestone.id) {
      toast.error('Milestone ID is required');
      return false;
    }
    
    try {
      const { error } = await supabase
        .from('milestones')
        .update(milestone)
        .eq('id', milestone.id);
        
      if (error) throw error;
      
      if (milestone.escrow_contract_id) {
        await fetchMilestones(milestone.escrow_contract_id);
      }
      
      toast.success('Milestone updated successfully');
      return true;
    } catch (error) {
      console.error('Error updating milestone:', error);
      toast.error('Failed to update milestone');
      return false;
    }
  };

  // Create a new transaction
  const createTransaction = async (transaction: Partial<Transaction>) => {
    if (!profile) {
      toast.error('You must be logged in to create a transaction');
      return null;
    }
    
    if (!transaction.escrow_contract_id) {
      toast.error('Contract ID is required');
      return null;
    }
    
    try {
      const transactionData = {
        ...transaction,
        sender_id: transaction.sender_id || profile.id,
        amount: transaction.amount || 0, // Ensure required field
        type: transaction.type || 'deposit' as TransactionType // Ensure required field
      };
      
      const { data, error } = await supabase
        .from('transactions')
        .insert(transactionData)
        .select()
        .single();
        
      if (error) throw error;
      
      if (transaction.escrow_contract_id) {
        await fetchTransactions(transaction.escrow_contract_id);
      }
      
      toast.success('Transaction created successfully');
      return data.id;
    } catch (error) {
      console.error('Error creating transaction:', error);
      toast.error('Failed to create transaction');
      return null;
    }
  };

  // Approve a multi-signature transaction
  const approveTransaction = async (transactionId: string, signature: string) => {
    if (!profile) {
      toast.error('You must be logged in to approve a transaction');
      return false;
    }
    
    try {
      const { error } = await supabase
        .from('multisig_approvals')
        .insert({
          transaction_id: transactionId,
          approver_id: profile.id,
          signature
        });
        
      if (error) throw error;
      
      // Refresh the transactions for the related contract
      const { data } = await supabase
        .from('transactions')
        .select('escrow_contract_id')
        .eq('id', transactionId)
        .single();
        
      if (data?.escrow_contract_id) {
        await fetchTransactions(data.escrow_contract_id);
      }
      
      toast.success('Transaction approved successfully');
      return true;
    } catch (error) {
      console.error('Error approving transaction:', error);
      toast.error('Failed to approve transaction');
      return false;
    }
  };

  // Create a new dispute
  const createDispute = async (dispute: Partial<Dispute>) => {
    if (!profile) {
      toast.error('You must be logged in to create a dispute');
      return null;
    }
    
    if (!dispute.escrow_contract_id) {
      toast.error('Contract ID is required');
      return null;
    }
    
    if (!dispute.reason) {
      toast.error('Reason is required for disputes');
      return null;
    }
    
    try {
      const disputeData = {
        ...dispute,
        raised_by: dispute.raised_by || profile.id,
        reason: dispute.reason,
        escrow_contract_id: dispute.escrow_contract_id,
        status: dispute.status || 'opened' as DisputeStatus
      };
      
      const { data, error } = await supabase
        .from('disputes')
        .insert(disputeData)
        .select()
        .single();
        
      if (error) throw error;
      
      // Update contract status to disputed
      if (dispute.escrow_contract_id) {
        await supabase
          .from('escrow_contracts')
          .update({ status: 'disputed' })
          .eq('id', dispute.escrow_contract_id);
          
        await fetchDisputes(dispute.escrow_contract_id);
        await fetchContracts();
      }
      
      toast.success('Dispute created successfully');
      return data.id;
    } catch (error) {
      console.error('Error creating dispute:', error);
      toast.error('Failed to create dispute');
      return null;
    }
  };

  // Add a comment to a dispute
  const addDisputeComment = async (disputeId: string, comment: string) => {
    if (!profile) {
      toast.error('You must be logged in to comment on a dispute');
      return false;
    }
    
    try {
      const { error } = await supabase
        .from('dispute_comments')
        .insert({
          dispute_id: disputeId,
          user_id: profile.id,
          comment
        });
        
      if (error) throw error;
      
      // Refresh the disputes for the related contract
      const { data } = await supabase
        .from('disputes')
        .select('escrow_contract_id')
        .eq('id', disputeId)
        .single();
        
      if (data?.escrow_contract_id) {
        await fetchDisputes(data.escrow_contract_id);
      }
      
      toast.success('Comment added successfully');
      return true;
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('Failed to add comment');
      return false;
    }
  };

  // Resolve a dispute (for arbitrators)
  const resolveDispute = async (disputeId: string, resolution: string) => {
    if (!profile) {
      toast.error('You must be logged in to resolve a dispute');
      return false;
    }
    
    try {
      const { data, error } = await supabase
        .from('disputes')
        .update({
          status: 'resolved',
          resolution,
          arbitrator_id: profile.id
        })
        .eq('id', disputeId)
        .select('escrow_contract_id')
        .single();
        
      if (error) throw error;
      
      if (data?.escrow_contract_id) {
        await fetchDisputes(data.escrow_contract_id);
      }
      
      toast.success('Dispute resolved successfully');
      return true;
    } catch (error) {
      console.error('Error resolving dispute:', error);
      toast.error('Failed to resolve dispute');
      return false;
    }
  };

  // Cancel a contract
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

  // Complete a contract
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

  const value = {
    contracts,
    milestones,
    transactions,
    disputes,
    loading,
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
