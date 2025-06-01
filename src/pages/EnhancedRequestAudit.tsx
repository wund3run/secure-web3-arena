
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { EnhancedRequestForm } from '@/components/request-management/EnhancedRequestForm';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuditRequests } from '@/hooks/useAuditRequests';

const EnhancedRequestAudit = () => {
  const navigate = useNavigate();
  const { createAuditRequest } = useAuditRequests();

  const handleSubmitSuccess = async (data: any) => {
    try {
      await createAuditRequest({
        project_name: data.projectName,
        project_description: data.projectDescription,
        blockchain: data.blockchain,
        repository_url: data.repositoryUrl,
        contract_count: data.contractCount,
        lines_of_code: data.linesOfCode,
        deadline: data.deadline,
        budget: data.budget,
        audit_scope: data.auditScope.join(', '),
        previous_audits: data.previousAudits,
        specific_concerns: data.specificConcerns,
        urgency_level: data.urgencyLevel
      });

      toast.success('Audit request submitted successfully!', {
        description: 'You will be matched with suitable auditors within 24 hours.'
      });
      
      // Redirect to enhanced dashboard after successful submission
      setTimeout(() => {
        navigate('/enhanced-dashboard');
      }, 2000);
    } catch (error) {
      toast.error('Failed to submit audit request');
    }
  };

  return (
    <>
      <Helmet>
        <title>Enhanced Audit Request | Hawkly</title>
        <meta name="description" content="Submit your Web3 project for professional security audit with enhanced features" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
        <div className="container">
          <EnhancedRequestForm onSubmit={handleSubmitSuccess} />
        </div>
      </div>
    </>
  );
};

export default EnhancedRequestAudit;
