import type { Json } from '../core'

export interface SecurityEvents {
  Row: {
    contract_address: string | null
    created_at: string
    description: string
    id: string
    metadata: Json | null
    network: string
    severity: string
    title: string
    type: string
  }
  Insert: {
    contract_address?: string | null
    created_at?: string
    description: string
    id?: string
    metadata?: Json | null
    network: string
    severity: string
    title: string
    type: string
  }
  Update: {
    contract_address?: string | null
    created_at?: string
    description?: string
    id?: string
    metadata?: Json | null
    network?: string
    severity?: string
    title?: string
    type?: string
  }
  Relationships: []
}

export interface ThreatIntelligence {
  Row: {
    description: string
    detected_at: string
    id: string
    is_resolved: boolean
    metadata: Json | null
    monitoring_service_id: string
    recommendation: string | null
    resolved_at: string | null
    threat_level: string
    threat_type: string
  }
  Insert: {
    description: string
    detected_at?: string
    id?: string
    is_resolved?: boolean
    metadata?: Json | null
    monitoring_service_id: string
    recommendation?: string | null
    resolved_at?: string | null
    threat_level: string
    threat_type: string
  }
  Update: {
    description?: string
    detected_at?: string
    id?: string
    is_resolved?: boolean
    metadata?: Json | null
    monitoring_service_id?: string
    recommendation?: string | null
    resolved_at?: string | null
    threat_level?: string
    threat_type?: string
  }
  Relationships: [
    {
      foreignKeyName: "threat_intelligence_monitoring_service_id_fkey"
      columns: ["monitoring_service_id"]
      isOneToOne: false
      referencedRelation: "monitoring_services"
      referencedColumns: ["id"]
    }
  ]
} 