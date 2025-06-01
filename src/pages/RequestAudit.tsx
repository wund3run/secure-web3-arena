
import React from 'react';
import { Helmet } from 'react-helmet-async';
import AuditRequestForm from '@/components/audit-request/AuditRequestForm';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const RequestAudit = () => {
  const navigate = useNavigate();

  const handleSubmitSuccess = () => {
    toast.success('Audit request submitted successfully!', {
      description: 'You will be matched with suitable auditors within 24 hours.'
    });
    
    // Redirect to dashboard after successful submission
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  return (
    <>
      <Helmet>
        <title>Request Security Audit | Hawkly</title>
        <meta name="description" content="Submit your Web3 project for professional security audit" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <AuditRequestForm onSubmitSuccess={handleSubmitSuccess} />
      </div>
    </>
  );
};

export default RequestAudit;
