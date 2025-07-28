
export interface Profile {
  id: string;
  full_name?: string;
  display_name?: string;
  avatar_url?: string;
  bio?: string;
  website?: string;
  wallet_address?: string;
  verification_status?: 'pending' | 'verified' | 'rejected';
  skills?: string[];
  specializations?: string[];
  social_links?: Record<string, string>;
  years_of_experience?: number;
  projects_completed?: number;
  user_type?: string;
  is_arbitrator?: boolean;
  created_at: string;
  updated_at: string;
}

// Update types to match database enum values
export type EscrowStatus = 'pending' | 'active' | 'completed' | 'disputed' | 'cancelled';

export interface EscrowContract {
  id: string;
  title: string;
  description?: string;
  client_id: string;
  auditor_id: string;
  total_amount: number;
  currency: string;
  status: EscrowStatus;
  smart_contract_address?: string;
  requires_multisig: boolean;
  created_at: string;
  updated_at: string;
  // Added missing properties for joined data
  client?: Profile;
  auditor?: Profile;
}

export interface Milestone {
  id: string;
  escrow_contract_id: string;
  title: string;
  description?: string;
  amount: number;
  deadline?: string;
  is_completed: boolean;
  completed_at?: string;
  created_at: string;
  updated_at: string;
}

// Update to match database enum values
export type TransactionType = 'deposit' | 'milestone_payment' | 'refund' | 'fee' | 'dispute_resolution';

export interface Transaction {
  id: string;
  escrow_contract_id: string;
  sender_id: string;
  recipient_id?: string;
  amount: number;
  type: TransactionType;
  status: string;
  transaction_hash?: string;
  milestone_id?: string;
  created_at: string;
  updated_at: string;
  // Added for joined data
  sender?: Profile;
  recipient?: Profile;
  approvals?: MultisigApproval[];
}

export interface MultisigApproval {
  id: string;
  transaction_id: string;
  approver_id: string;
  signature: string;
  approved_at: string;
  // Added for joined data
  approver?: Profile;
}

// Update to match database enum values
export type DisputeStatus = 'opened' | 'in_review' | 'resolved' | 'closed';

export interface Dispute {
  id: string;
  project_id: string; // Supabase schema field
  raised_by: string;
  against: string;
  status: DisputeStatus;
  resolution_notes?: string;
  created_at: string;
  updated_at: string;
  // Optional legacy fields for compatibility
  escrow_contract_id?: string;
  arbitrator_id?: string;
  milestone_id?: string;
  reason?: string;
  evidence?: string;
  resolution?: string;
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
  // Added for joined data
  user?: Profile;
}

// Context type definition
export interface EscrowContextType {
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
  createContract: (contract: Partial<EscrowContract>, milestones: Partial<Milestone>[]) => Promise<string | null>;
  updateMilestone: (milestoneId: string, completed: boolean) => Promise<boolean>;
  createTransaction: (transaction: Partial<Transaction>) => Promise<string | null>;
  approveTransaction: (transactionId: string, signature: string) => Promise<boolean>;
  createDispute: (dispute: Partial<Dispute>) => Promise<string | null>;
  addDisputeComment: (disputeId: string, comment: string) => Promise<boolean>;
  resolveDispute: (disputeId: string, resolution: string) => Promise<boolean>;
  cancelContract: (contractId: string) => Promise<boolean>;
  completeContract: (contractId: string) => Promise<boolean>;
}
