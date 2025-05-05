
export interface AuditFormData {
  projectName: string;
  projectDescription: string;
  contactEmail: string;
  contactName: string;
  blockchain: string;
  customBlockchain?: string;
  repositoryUrl: string;
  contractCount: string;
  linesOfCode: string;
  deadline: string;
  budget: string;
  auditScope: string;
  previousAudits: boolean;
  specificConcerns: string;
}

export interface AuditFormErrors {
  [key: string]: string;
}

export interface FormStepValidators {
  [key: number]: (formData: AuditFormData) => { isValid: boolean; errors: AuditFormErrors };
}
