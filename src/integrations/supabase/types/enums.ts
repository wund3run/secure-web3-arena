export type CertificationType = 
  | "basic_auditor"
  | "advanced_auditor"
  | "security_specialist"
  | "compliance_expert"

export type ComplianceFramework = 
  | "gdpr" | "soc2" | "iso27001" | "hipaa" | "pci_dss"

export type DisputeStatus = 
  | "opened" | "in_review" | "resolved" | "closed"

export type EscrowStatus = 
  | "pending"
  | "in_progress"
  | "completed"
  | "disputed"
  | "refunded"
  | "cancelled"

export type InsuranceStatus = 
  | "pending" | "active" | "claimed" | "expired"

export type MonitoringType = 
  | "continuous" | "scheduled" | "on_demand"

export type SubscriptionStatus = 
  | "active" | "cancelled" | "suspended" | "trial"

export type SubscriptionTier = 
  | "basic" | "professional" | "enterprise" | "custom"

export type ThreatLevel = 
  | "low" | "medium" | "high" | "critical"

export type TransactionType = 
  | "deposit"
  | "milestone_payment"
  | "refund"
  | "fee"
  | "dispute_resolution"

export type UserRole = 
  | "admin" | "auditor" | "project_owner" | "general" 