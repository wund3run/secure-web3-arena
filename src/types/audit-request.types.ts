
export interface AuditFormData {
  projectName: string;
  contactName: string;
  contactEmail: string;
  blockchain: string;
  customBlockchain?: string;
  projectDescription: string;
  repositoryUrl?: string;
  contractCount: string;
  linesOfCode: string;
  auditScope: string;
  deadline: string;
  budget: string;
  previousAudits: boolean; // Changed from optional to required
  previousAuditLinks?: string;
  preferredCommunication: string; // Changed from optional to required
  specificConcerns: string; // Changed from optional to required
  aiAssisted?: boolean;
  continuousMonitoring?: boolean;
  // New fields for enhanced audit features
  collaborativeAudit?: boolean;
  continuousAuditing?: boolean;
  hybridModel?: boolean;
  specializedAuditType?: string;
  accountabilityPreference?: string;
}

export interface AuditFormErrors {
  projectName?: string;
  contactName?: string;
  contactEmail?: string;
  blockchain?: string;
  customBlockchain?: string;
  projectDescription?: string;
  repositoryUrl?: string;
  contractCount?: string;
  linesOfCode?: string;
  auditScope?: string;
  deadline?: string;
  budget?: string;
  specificConcerns?: string;
  previousAuditLinks?: string;
  preferredCommunication?: string;
  // New error fields
  collaborativeAudit?: string;
  continuousAuditing?: string;
  hybridModel?: string;
  specializedAuditType?: string;
  accountabilityPreference?: string;
}

export interface FormStepValidators {
  [key: number]: (formData: AuditFormData) => { isValid: boolean; errors: AuditFormErrors };
}
