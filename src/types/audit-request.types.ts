
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
  preferredCommunication?: string;
  specificConcerns: string; // Changed from optional to required
  aiAssisted?: boolean;
  continuousMonitoring?: boolean;
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
}

export interface FormStepValidators {
  [key: number]: (formData: AuditFormData) => { isValid: boolean; errors: AuditFormErrors };
}
