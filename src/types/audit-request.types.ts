
// Define form data type
export interface AuditFormData {
  projectName: string;
  projectDescription: string;
  contactName: string;
  contactEmail: string;
  blockchain: string;
  customBlockchain: string;
  repositoryUrl: string;
  contractCount: string;
  linesOfCode: string;
  deadline: string;
  budget: string;
  auditScope: string;
  specificConcerns: string;
  previousAudits: boolean;
  previousAuditLinks: string;
  collaborativeAudit: boolean;
  continuousAuditing: boolean;
  hybridModel: boolean;
  specializedAuditType: string;
  accountabilityPreference: string;
  preferredCommunication: string;
}

// Additional types can be added here
export interface AuditResponse {
  id: string;
  status: string;
  created_at: string;
}
