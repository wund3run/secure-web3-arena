
import React from 'react';
import { HawklyLogo } from "@/components/layout/hawkly-logo";

const AuditRequestHeader: React.FC = () => {
  return (
    <div className="text-center mb-10">
      <div className="flex justify-center mb-6">
        <HawklyLogo variant="large" />
      </div>
      <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#8A73E2] to-[#33C3F0]">
        Request a Security Audit
      </h1>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        Complete the form below to request a comprehensive security audit for your Web3 project. 
        Our AI will match you with the perfect auditors based on your requirements.
      </p>
    </div>
  );
};

export default AuditRequestHeader;
