import type { Json } from '../core'

export interface Subscriptions {
  Row: {
    created_at: string
    expires_at: string | null
    features: Json | null
    id: string
    monthly_cost: number | null
    started_at: string
    status: string
    tier: string
    updated_at: string
    user_id: string
  }
  Insert: {
    created_at?: string
    expires_at?: string | null
    features?: Json | null
    id?: string
    monthly_cost?: number | null
    started_at: string
    status?: string
    tier?: string
    updated_at?: string
    user_id: string
  }
  Update: {
    created_at?: string
    expires_at?: string | null
    features?: Json | null
    id?: string
    monthly_cost?: number | null
    started_at?: string
    status?: string
    tier?: string
    updated_at?: string
    user_id?: string
  }
  Relationships: []
} 