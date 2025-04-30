
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
