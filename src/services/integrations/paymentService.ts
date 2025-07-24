
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface EnhancedPaymentConfig {
  stripePublishableKey: string;
  enableMarketplaceFees: boolean;
  platformFeePercentage: number;
  escrowEnabled: boolean;
  cryptoPaymentsEnabled: boolean;
}

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: string;
  clientSecret: string;
  auditRequestId?: string;
  escrowContractId?: string;
  platformFee: number;
  auditorAmount: number;
}

export interface EscrowContract {
  id: string;
  auditRequestId: string;
  clientId: string;
  auditorId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'active' | 'completed' | 'disputed' | 'cancelled';
  milestones: Array<{
    id: string;
    description: string;
    amount: number;
    completed: boolean;
    approvedBy: string[];
  }>;
  createdAt: string;
  expiresAt: string;
}

export class EnhancedPaymentService {
  private static config: EnhancedPaymentConfig;

  static init(config: EnhancedPaymentConfig): void {
    this.config = config;
    console.log('Enhanced Payment Service initialized');
  }

  static async createMarketplacePayment(
    auditRequestId: string,
    amount: number,
    currency: string = 'usd'
  ): Promise<PaymentIntent | null> {
    try {
      const platformFee = Math.round(amount * (this.config.platformFeePercentage / 100));
      const auditorAmount = amount - platformFee;

      const { data, error } = await supabase.functions.invoke('create-marketplace-payment', {
        body: {
          audit_request_id: auditRequestId,
          amount,
          currency,
          platform_fee: platformFee,
          auditor_amount: auditorAmount,
          enable_escrow: this.config.escrowEnabled
        }
      });

      if (error) throw error;

      toast.success('Payment intent created successfully');
      return data as PaymentIntent;
    } catch (error: unknown) {
      console.error('Error creating marketplace payment:', error);
      toast.error('Failed to create payment');
      return null;
    }
  }

  static async createEscrowContract(
    auditRequestId: string,
    clientId: string,
    auditorId: string,
    amount: number,
    milestones: Array<{ description: string; amount: number }>
  ): Promise<EscrowContract | null> {
    try {
      const { data, error } = await supabase.functions.invoke('create-escrow-contract', {
        body: {
          audit_request_id: auditRequestId,
          client_id: clientId,
          auditor_id: auditorId,
          amount,
          milestones,
          expires_in_days: 30
        }
      });

      if (error) throw error;

      toast.success('Escrow contract created successfully');
      return data as EscrowContract;
    } catch (error: unknown) {
      console.error('Error creating escrow contract:', error);
      toast.error('Failed to create escrow contract');
      return null;
    }
  }

  static async releaseMilestonePayment(
    escrowContractId: string,
    milestoneId: string
  ): Promise<boolean> {
    try {
      const { error } = await supabase.functions.invoke('release-milestone-payment', {
        body: {
          escrow_contract_id: escrowContractId,
          milestone_id: milestoneId
        }
      });

      if (error) throw error;

      toast.success('Milestone payment released successfully');
      return true;
    } catch (error: unknown) {
      console.error('Error releasing milestone payment:', error);
      toast.error('Failed to release milestone payment');
      return false;
    }
  }

  static async processRefund(paymentIntentId: string, reason: string): Promise<boolean> {
    try {
      const { error } = await supabase.functions.invoke('process-refund', {
        body: {
          payment_intent_id: paymentIntentId,
          reason
        }
      });

      if (error) throw error;

      toast.success('Refund processed successfully');
      return true;
    } catch (error: unknown) {
      console.error('Error processing refund:', error);
      toast.error('Failed to process refund');
      return false;
    }
  }

  static async getPaymentHistory(userId: string): Promise<unknown[]> {
    try {
      const { data, error } = await supabase
        .from('payment_transactions')
        .select('*')
        .or(`client_id.eq.${userId},auditor_id.eq.${userId}`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error: unknown) {
      console.error('Error fetching payment history:', error);
      return [];
    }
  }

  static async enableCryptoPayments(): Promise<boolean> {
    try {
      // Mock implementation for crypto payment setup
      console.log('Enabling crypto payments...');
      
      // Would integrate with Circle API, USDC, or other crypto payment providers
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Crypto payments enabled successfully');
      return true;
    } catch (error: unknown) {
      console.error('Error enabling crypto payments:', error);
      toast.error('Failed to enable crypto payments');
      return false;
    }
  }
}
