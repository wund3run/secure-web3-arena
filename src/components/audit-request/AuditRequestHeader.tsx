
import React from 'react';
import { Shield } from "lucide-react";

const AuditRequestHeader: React.FC = () => {
  return (
    <div className="text-center mb-10">
      <div className="inline-flex items-center justify-center mb-4">
        <div className="p-3 bg-primary/20 rounded-full">
          <Shield className="h-8 w-8 text-primary" />
        </div>
      </div>
      <h1 className="text-4xl font-bold mb-4">Request a Security Audit</h1>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        Complete the form below to request a comprehensive security audit for your Web3 project. 
        Our AI will match you with the perfect auditors based on your requirements.
      </p>
    </div>
  );
};

export default AuditRequestHeader;
