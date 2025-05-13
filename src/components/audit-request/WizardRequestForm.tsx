
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
  // Create a dummy form for context wrapping
  const methods = useForm();
  
  return (
    <Form {...methods}>
      <AuditRequestForm onSubmitSuccess={onSubmitSuccess} prefilledData={prefilledData} />
    </Form>
  );
};

export default WizardRequestForm;
