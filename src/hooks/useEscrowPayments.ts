
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface EscrowMilestone {
  id: string;
  title: string;
  description: string;
  amount: number;
  deadline: Date;
  status: 'pending' | 'approved' | 'completed' | 'disputed';
  completedAt?: Date;
}

export interface EscrowContract {
  id: string;
  clientId: string;
  auditorId: string;
  totalAmount: number;
  currency: string;
  status: 'pending' | 'active' | 'completed' | 'disputed' | 'cancelled';
  milestones: EscrowMilestone[];
  platformFeePercentage: number;
  createdAt: Date;
  stripePaymentIntentId?: string;
}

export const useEscrowPayments = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createEscrowContract = async (
    auditorId: string,
    totalAmount: number,
    currency: string,
    milestones: Omit<EscrowMilestone, 'id' | 'status'>[]
  ): Promise<EscrowContract> => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase.functions.invoke('create-escrow-contract', {
        body: {
          auditor_id: auditorId,
          total_amount: totalAmount,
          currency,
          milestones,
          platform_fee_percentage: 5, // 5% platform fee
        },
      });

      if (error) throw error;

      toast.success('Escrow contract created successfully');
      return data as EscrowContract;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to create escrow contract';
      setError(errorMessage);
      toast.error('Escrow creation failed', { description: errorMessage });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fundEscrow = async (contractId: string, paymentMethodId: string) => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase.functions.invoke('fund-escrow', {
        body: {
          contract_id: contractId,
          payment_method_id: paymentMethodId,
        },
      });

      if (error) throw error;

      toast.success('Escrow funded successfully');
      return data;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fund escrow';
      setError(errorMessage);
      toast.error('Escrow funding failed', { description: errorMessage });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const releaseMilestone = async (contractId: string, milestoneId: string) => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase.functions.invoke('release-milestone', {
        body: {
          contract_id: contractId,
          milestone_id: milestoneId,
        },
      });

      if (error) throw error;

      toast.success('Milestone payment released');
      return data;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to release milestone payment';
      setError(errorMessage);
      toast.error('Milestone release failed', { description: errorMessage });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const initiateDispute = async (contractId: string, milestoneId: string, reason: string, evidence?: string) => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase.functions.invoke('initiate-dispute', {
        body: {
          contract_id: contractId,
          milestone_id: milestoneId,
          reason,
          evidence,
        },
      });

      if (error) throw error;

      toast.success('Dispute initiated successfully');
      return data;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to initiate dispute';
      setError(errorMessage);
      toast.error('Dispute initiation failed', { description: errorMessage });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const processRefund = async (contractId: string, refundAmount: number, reason: string) => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase.functions.invoke('process-refund', {
        body: {
          contract_id: contractId,
          refund_amount: refundAmount,
          reason,
        },
      });

      if (error) throw error;

      toast.success('Refund processed successfully');
      return data;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to process refund';
      setError(errorMessage);
      toast.error('Refund processing failed', { description: errorMessage });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    createEscrowContract,
    fundEscrow,
    releaseMilestone,
    initiateDispute,
    processRefund,
  };
};
