
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
  created_at: string;
  updated_at: string;
}

export interface EscrowContract {
  id: string;
  title: string;
  description?: string;
  client_id: string;
  auditor_id: string;
  total_amount: number;
  currency: string;
  status: 'pending' | 'active' | 'completed' | 'disputed' | 'cancelled';
  smart_contract_address?: string;
  requires_multisig: boolean;
  created_at: string;
  updated_at: string;
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
