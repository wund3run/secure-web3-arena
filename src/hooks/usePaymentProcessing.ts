
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface PaymentDetails {
  amount: number;
  currency: string;
  description: string;
  auditRequestId?: string;
  escrowContractId?: string;
}

export interface PaymentResult {
  paymentIntentId: string;
  clientSecret: string;
  status: string;
}

export const usePaymentProcessing = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPaymentIntent = async (paymentDetails: PaymentDetails): Promise<PaymentResult> => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase.functions.invoke('create-payment-intent', {
        body: {
          amount: paymentDetails.amount * 100, // Convert to cents
          currency: paymentDetails.currency,
          description: paymentDetails.description,
          audit_request_id: paymentDetails.auditRequestId,
          escrow_contract_id: paymentDetails.escrowContractId,
        },
      });

      if (error) throw error;

      return data as PaymentResult;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to create payment intent';
      setError(errorMessage);
      toast.error('Payment setup failed', { description: errorMessage });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const confirmPayment = async (paymentIntentId: string) => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase.functions.invoke('confirm-payment', {
        body: { payment_intent_id: paymentIntentId },
      });

      if (error) throw error;

      toast.success('Payment processed successfully');
      return data;
    } catch (err: any) {
      const errorMessage = err.message || 'Payment confirmation failed';
      setError(errorMessage);
      toast.error('Payment failed', { description: errorMessage });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createEscrowPayment = async (
    clientId: string,
    auditorId: string,
    totalAmount: number,
    milestones: { title: string; amount: number; description?: string }[]
  ) => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase.functions.invoke('create-escrow', {
        body: {
          client_id: clientId,
          auditor_id: auditorId,
          total_amount: totalAmount,
          milestones,
        },
      });

      if (error) throw error;

      toast.success('Escrow contract created successfully');
      return data;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to create escrow contract';
      setError(errorMessage);
      toast.error('Escrow creation failed', { description: errorMessage });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const releaseMilestonePayment = async (milestoneId: string) => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase.functions.invoke('release-milestone', {
        body: { milestone_id: milestoneId },
      });

      if (error) throw error;

      toast.success('Milestone payment released');
      return data;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to release milestone payment';
      setError(errorMessage);
      toast.error('Payment release failed', { description: errorMessage });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    createPaymentIntent,
    confirmPayment,
    createEscrowPayment,
    releaseMilestonePayment,
  };
};
