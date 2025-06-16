
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/auth';
import { toast } from 'sonner';

interface EscrowContract {
  id: string;
  title: string;
  client_id: string;
  auditor_id: string;
  total_amount: number;
  currency: string;
  status: 'pending' | 'active' | 'completed' | 'disputed' | 'cancelled';
  milestones: Milestone[];
  created_at: string;
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  amount: number;
  deadline?: string;
  is_completed: boolean;
  completed_at?: string;
}

export function useEscrowPayments() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createEscrowContract = async (
    auditorId: string,
    totalAmount: number,
    currency: string = 'ETH',
    milestones: Omit<Milestone, 'id' | 'is_completed' | 'completed_at'>[]
  ): Promise<EscrowContract> => {
    if (!user) throw new Error('User not authenticated');

    setLoading(true);
    setError(null);

    try {
      // Create escrow contract
      const { data: contract, error: contractError } = await supabase
        .from('escrow_contracts')
        .insert({
          title: `Audit Contract - ${new Date().toLocaleDateString()}`,
          client_id: user.id,
          auditor_id: auditorId,
          total_amount: totalAmount,
          currency,
          status: 'pending',
        })
        .select()
        .single();

      if (contractError) throw contractError;

      // Create milestones - convert dates to strings
      const milestonesToInsert = milestones.map((milestone) => ({
        ...milestone,
        escrow_contract_id: contract.id,
        is_completed: false,
        deadline: milestone.deadline ? new Date(milestone.deadline).toISOString() : null,
      }));

      const { data: createdMilestones, error: milestonesError } = await supabase
        .from('milestones')
        .insert(milestonesToInsert)
        .select();

      if (milestonesError) throw milestonesError;

      // Map database status to our type
      const mappedStatus = contract.status === 'in_progress' ? 'active' : contract.status;

      const result = {
        ...contract,
        status: mappedStatus as EscrowContract['status'],
        milestones: createdMilestones || [],
      };

      toast.success('Escrow contract created successfully');
      return result;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to create escrow contract';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fundEscrow = async (contractId: string, paymentMethod: string) => {
    setLoading(true);
    setError(null);

    try {
      // This would integrate with Stripe or other payment processor
      const { data, error } = await supabase.functions.invoke('create-payment-intent', {
        body: {
          contract_id: contractId,
          payment_method: paymentMethod,
        },
      });

      if (error) throw error;

      // Update contract status to active after successful payment
      const { error: updateError } = await supabase
        .from('escrow_contracts')
        .update({ status: 'pending' }) // Use pending instead of active for now
        .eq('id', contractId);

      if (updateError) throw updateError;

      toast.success('Escrow funded successfully');
      return data;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fund escrow';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const releaseMilestonePayment = async (milestoneId: string) => {
    if (!user) throw new Error('User not authenticated');

    setLoading(true);
    setError(null);

    try {
      // Mark milestone as completed
      const { error: milestoneError } = await supabase
        .from('milestones')
        .update({
          is_completed: true,
          completed_at: new Date().toISOString(),
        })
        .eq('id', milestoneId);

      if (milestoneError) throw milestoneError;

      // Create transaction record
      const { data: milestone } = await supabase
        .from('milestones')
        .select('*, escrow_contract_id')
        .eq('id', milestoneId)
        .single();

      if (milestone) {
        const { error: transactionError } = await supabase
          .from('transactions')
          .insert({
            escrow_contract_id: milestone.escrow_contract_id,
            milestone_id: milestoneId,
            sender_id: user.id,
            amount: milestone.amount,
            type: 'milestone_payment',
            status: 'completed',
          });

        if (transactionError) throw transactionError;
      }

      toast.success('Milestone payment released');
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to release milestone payment';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getEscrowContracts = async () => {
    if (!user) return [];

    try {
      const { data, error } = await supabase
        .from('escrow_contracts')
        .select(`
          *,
          milestones (*)
        `)
        .or(`client_id.eq.${user.id},auditor_id.eq.${user.id}`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (err: any) {
      console.error('Error fetching escrow contracts:', err);
      return [];
    }
  };

  return {
    loading,
    error,
    createEscrowContract,
    fundEscrow,
    releaseMilestonePayment,
    getEscrowContracts,
  };
}
