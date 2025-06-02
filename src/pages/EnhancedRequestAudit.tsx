
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ProductionLayout } from '@/components/layout/ProductionLayout';
import { EnhancedAuditForm } from '@/components/audit-request/enhanced/EnhancedAuditForm';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const EnhancedRequestAudit = () => {
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
        <title>Enhanced Audit Request | Hawkly</title>
        <meta name="description" content="Submit your Web3 project for professional security audit with enhanced features" />
      </Helmet>

      <ProductionLayout>
        <div className="container mx-auto px-4 py-8">
          <EnhancedAuditForm onSubmitSuccess={handleSubmitSuccess} />
        </div>
      </ProductionLayout>
    </>
  );
};

export default EnhancedRequestAudit;
