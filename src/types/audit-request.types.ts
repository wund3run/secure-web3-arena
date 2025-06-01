
export interface AuditFormData {
  projectName: string;
  projectDescription: string;
  blockchain: string;
  customBlockchain?: string;
  repositoryUrl?: string;
  contractCount: string;
  linesOfCode: string;
  deadline: string;
  budget: string;
  customBudget?: string;
  auditScope: string;
  specificConcerns: string;
  previousAudits: boolean;
  previousAuditLinks?: string;
  specializedAuditType: string;
  accountabilityPreference: string;
  preferredCommunication: string;
  contactName: string;
  contactEmail: string;
  collaborativeAudit?: boolean;
  continuousAuditing?: boolean;
  hybridModel?: boolean;
}

export interface AuditFormErrors {
  [key: string]: string;
}

export interface FormStepValidators {
  [step: number]: (formData: AuditFormData) => { isValid: boolean; errors: AuditFormErrors };
}

export interface AuditRequest {
  id: string;
  client_id: string;
  project_name: string;
  project_description?: string;
  blockchain: string;
  repository_url?: string;
  contract_count?: number;
  lines_of_code?: number;
  deadline?: string;
  budget?: number;
  audit_scope?: string;
  specific_concerns?: string;
  previous_audits?: boolean;
  status: string;
  created_at: string;
  updated_at: string;
  assigned_auditor_id?: string;
  ai_matching_completed?: boolean;
  escrow_contract_id?: string;
  priority_score?: number;
}
