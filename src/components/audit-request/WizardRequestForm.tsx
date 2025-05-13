
import React from 'react';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import AuditRequestForm from './AuditRequestForm';

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
  // Create a form for context wrapping with default values
  const methods = useForm({
    defaultValues: {
      // Add some default values to prevent empty string issues
      blockchain: "Ethereum",
      contractCount: "1-5",
      linesOfCode: "< 1,000",
      deadline: "1-2 weeks",
      budget: "$5,000 - $10,000",
      specializedAuditType: "Standard"
    }
  });
  
  return (
    <Form {...methods}>
      <AuditRequestForm onSubmitSuccess={onSubmitSuccess} prefilledData={prefilledData} />
    </Form>
  );
};

export default WizardRequestForm;
