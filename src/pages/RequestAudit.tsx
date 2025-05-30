
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { AuditRequestForm } from '@/components/audit/AuditRequestForm';

const RequestAudit = () => {
  return (
    <StandardLayout 
      title="Request Security Audit"
      description="Submit your Web3 project for comprehensive security audit by expert auditors"
    >
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Request Security Audit</h1>
            <p className="text-lg text-muted-foreground">
              Get your Web3 project audited by expert security professionals. Our AI will match you with the best auditors for your specific needs.
            </p>
          </div>
          
          <AuditRequestForm />
        </div>
      </div>
    </StandardLayout>
  );
};

export default RequestAudit;
