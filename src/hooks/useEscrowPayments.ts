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
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create escrow contract';
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
      await handlePaymentReceipt({
        paymentEventId: data.payment_event_id,
        auditRequestId: data.audit_request_id,
        payerId: data.payer_id,
        payeeId: data.payee_id,
        payerName: data.payer_name,
        payeeName: data.payee_name,
        amount: data.amount,
        date: data.date,
        type: data.type,
        projectName: data.project_name,
        details: data.details
      });
      return data;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fund escrow';
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
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to release milestone payment';
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

      toast.success('Dispute initiated successfully');
      return data;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to initiate dispute';
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
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to process refund';
      setError(errorMessage);
      toast.error('Refund processing failed', { description: errorMessage });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Helper to send payment notification and email
  async function sendPaymentNotification({ userId, title, message, auditRequestId, amount, email }) {
    await supabase.from('notifications').insert({
      user_id: userId,
      title,
      message,
      type: 'payment',
      metadata: { audit_request_id: auditRequestId, amount }
    });
    // Email trigger (assume /api/send-payment-email exists)
    await fetch('/api/send-payment-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to: email, subject: title, message })
    });
  }

  // After escrow funding
  async function onEscrowFunded({ auditorId, auditorEmail, projectOwnerId, ownerEmail, projectName, auditRequestId, amount }) {
    await sendPaymentNotification({
      userId: auditorId,
      title: 'Escrow Funded',
      message: `Escrow funded for project "${projectName}".`,
      auditRequestId,
      amount,
      email: auditorEmail
    });
    await sendPaymentNotification({
      userId: projectOwnerId,
      title: 'Escrow Funded',
      message: `You funded the escrow for "${projectName}".`,
      auditRequestId,
      amount,
      email: ownerEmail
    });
  }

  // After milestone release
  async function onMilestoneReleased({ auditorId, auditorEmail, projectOwnerId, ownerEmail, projectName, auditRequestId, amount, milestoneName }) {
    await sendPaymentNotification({
      userId: auditorId,
      title: 'Milestone Released',
      message: `Milestone "${milestoneName}" released for project "${projectName}".`,
      auditRequestId,
      amount,
      email: auditorEmail
    });
    await sendPaymentNotification({
      userId: projectOwnerId,
      title: 'Milestone Released',
      message: `You released milestone "${milestoneName}" for "${projectName}".`,
      auditRequestId,
      amount,
      email: ownerEmail
    });
  }

  async function handlePaymentReceipt({
    paymentEventId,
    auditRequestId,
    payerId,
    payeeId,
    payerName,
    payeeName,
    amount,
    date,
    type,
    projectName,
    details
  }) {
    // 1. Generate PDF
    // If PDF generation is needed, add a TODO comment for future implementation.
    // 2. Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('receipts')
      .upload(`receipt-${paymentEventId}.pdf`, null, { contentType: 'application/pdf' }); // No PDF bytes for now
    const receiptUrl = data?.Key ? supabase.storage.from('receipts').getPublicUrl(data.Key).publicURL : null;
    // 3. Insert into payment_receipts
    await supabase.from('payment_receipts').insert({
      payment_event_id: paymentEventId,
      audit_request_id: auditRequestId,
      payer_id: payerId,
      payee_id: payeeId,
      amount,
      date,
      type,
      receipt_url: receiptUrl,
      details
    });
  }

  return {
    loading,
    error,
    createEscrowContract,
    fundEscrow,
    releaseMilestonePayment,
    getEscrowContracts,
  };
}
