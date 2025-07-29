import type { Json } from '../core'

export interface PaymentTransactions {
  Row: {
    amount: number
    audit_id: string | null
    auditor_id: string | null
    client_id: string | null
    created_at: string
    currency: string
    id: string
    payment_intent_id: string | null
    payment_method: string | null
    platform_fee: number | null
    status: string
    updated_at: string
  }
  Insert: {
    amount: number
    audit_id?: string | null
    auditor_id?: string | null
    client_id?: string | null
    created_at?: string
    currency?: string
    id?: string
    payment_intent_id?: string | null
    payment_method?: string | null
    platform_fee?: number | null
    status?: string
    updated_at?: string
  }
  Update: {
    amount?: number
    audit_id?: string | null
    auditor_id?: string | null
    client_id?: string | null
    created_at?: string
    currency?: string
    id?: string
    payment_intent_id?: string | null
    payment_method?: string | null
    platform_fee?: number | null
    status?: string
    updated_at?: string
  }
  Relationships: [
    {
      foreignKeyName: "payment_transactions_audit_id_fkey"
      columns: ["audit_id"]
      isOneToOne: false
      referencedRelation: "audit_requests"
      referencedColumns: ["id"]
    }
  ]
}

export interface Transactions {
  Row: {
    amount: number
    created_at: string
    escrow_contract_id: string
    id: string
    milestone_id: string | null
    recipient_id: string | null
    sender_id: string
    status: string
    transaction_hash: string | null
    type: string
    updated_at: string
  }
  Insert: {
    amount: number
    created_at?: string
    escrow_contract_id: string
    id?: string
    milestone_id?: string | null
    recipient_id?: string | null
    sender_id: string
    status?: string
    transaction_hash?: string | null
    type: string
    updated_at?: string
  }
  Update: {
    amount?: number
    created_at?: string
    escrow_contract_id?: string
    id?: string
    milestone_id?: string | null
    recipient_id?: string | null
    sender_id?: string
    status?: string
    transaction_hash?: string | null
    type?: string
    updated_at?: string
  }
  Relationships: [
    {
      foreignKeyName: "transactions_escrow_contract_id_fkey"
      columns: ["escrow_contract_id"]
      isOneToOne: false
      referencedRelation: "escrow_contracts"
      referencedColumns: ["id"]
    },
    {
      foreignKeyName: "transactions_milestone_id_fkey"
      columns: ["milestone_id"]
      isOneToOne: false
      referencedRelation: "milestones"
      referencedColumns: ["id"]
    },
    {
      foreignKeyName: "transactions_recipient_id_fkey"
      columns: ["recipient_id"]
      isOneToOne: false
      referencedRelation: "profiles"
      referencedColumns: ["id"]
    },
    {
      foreignKeyName: "transactions_sender_id_fkey"
      columns: ["sender_id"]
      isOneToOne: false
      referencedRelation: "profiles"
      referencedColumns: ["id"]
    }
  ]
} 