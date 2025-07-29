import type { Json } from '../core'

export interface AdminActions {
  Row: {
    action_type: string
    admin_id: string
    created_at: string | null
    details: Json | null
    id: string
    target_id: string
    target_type: string
  }
  Insert: {
    action_type: string
    admin_id: string
    created_at?: string | null
    details?: Json | null
    id?: string
    target_id: string
    target_type: string
  }
  Update: {
    action_type?: string
    admin_id?: string
    created_at?: string | null
    details?: Json | null
    id?: string
    target_id?: string
    target_type?: string
  }
  Relationships: []
} 