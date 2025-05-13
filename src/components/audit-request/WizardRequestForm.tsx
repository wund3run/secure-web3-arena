
import React from 'react';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import AuditRequestForm from './AuditRequestForm';
import { AuditFormData } from '@/types/audit-request.types';

// Define a type for the prefilledData prop
interface PrefilledData {
  serviceType?: string;
  serviceName?: string;
  providerId?: string;
  providerName?: string;
}

interface WizardRequestFormProps {
  onSubmitSuccess: () => void;
  prefilledData?: PrefilledData;
}

const WizardRequestForm = ({ onSubmitSuccess, prefilledData }: WizardRequestFormProps) => {
  // Create a form for context wrapping with comprehensive default values
  const methods = useForm<AuditFormData>({
    defaultValues: {
      // Add comprehensive default values for all required form fields
      projectName: prefilledData?.serviceName ? `${prefilledData.serviceName} Audit Request` : "",
      projectDescription: prefilledData?.providerName ? `Requesting an audit from ${prefilledData.providerName}` : "",
      blockchain: prefilledData?.serviceType || "Ethereum",
      contractCount: "1-5",
      linesOfCode: "< 1,000",
      deadline: "1-2 weeks",
      budget: "$5,000 - $10,000",
      specializedAuditType: "Standard",
      accountabilityPreference: "standard",
      preferredCommunication: "email",
      // Adding these prevents undefined values
      contactName: "",
      contactEmail: "",
      auditScope: "",
      specificConcerns: "",
      previousAudits: false,
      previousAuditLinks: "",
      customBlockchain: "",
      repositoryUrl: "",
      collaborativeAudit: false,
      continuousAuditing: false,
      hybridModel: false
    }
  });
  
  return (
    <Form {...methods}>
      <AuditRequestForm onSubmitSuccess={onSubmitSuccess} prefilledData={prefilledData} />
    </Form>
  );
};

export default WizardRequestForm;
