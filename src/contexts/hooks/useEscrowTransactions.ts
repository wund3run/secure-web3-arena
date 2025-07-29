
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Transaction, Profile, MultisigApproval, TransactionType } from "../types/escrow-types";

export const useEscrowTransactions = (profile: Profile | null) => {
  const [transactions, setTransactions] = useState<Record<string, Transaction[]>>({});

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

        // Map database type to our TransactionType
        const mappedType = mapDatabaseTransactionType(tx.type);
          
        return {
          ...tx,
          sender,
          recipient,
          approvals,
          type: mappedType
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

  const mapDatabaseTransactionType = (dbType: string): TransactionType => {
    // Map database type values to our TypeScript enum
    switch (dbType) {
      case 'release':
        return 'milestone_payment';
      case 'dispute_payout':
        return 'dispute_resolution';
      default:
        return dbType as TransactionType;
    }
  };

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
      // Map our TransactionType to database enum values
      let dbTransactionType = transaction.type || 'deposit';
      if (transaction.type === 'milestone_payment') {
        dbTransactionType = 'milestone_payment'; // This matches database enum
      }
      
      const transactionData = {
        sender_id: transaction.sender_id || profile.id,
        escrow_contract_id: transaction.escrow_contract_id,
        amount: transaction.amount || 0,
        type: dbTransactionType,
        recipient_id: transaction.recipient_id || null,
        status: transaction.status || 'pending',
        transaction_hash: transaction.transaction_hash || null,
        milestone_id: transaction.milestone_id || null
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

  return {
    transactions,
    fetchTransactions,
    createTransaction,
    approveTransaction
  };
};
