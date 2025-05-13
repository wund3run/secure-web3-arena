
import React from 'react';
import { useAuth } from '@/contexts/auth';
import { HawklyLogo } from "@/components/layout/hawkly-logo";
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AuditRequestHeader: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="text-center mb-10">
      <div className="flex justify-center mb-6">
        <HawklyLogo variant="large" />
      </div>
      <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#8A73E2] to-[#33C3F0]">
        Request a Security Audit
      </h1>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
        Complete the form below to request a comprehensive security audit for your Web3 project. 
        Our AI will match you with the perfect auditors based on your requirements.
      </p>
      
      {!user && (
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mt-6 max-w-xl mx-auto">
          <h3 className="text-sm font-medium text-primary">Already have an account?</h3>
          <p className="text-sm text-muted-foreground mt-1 mb-3">
            Sign in to pre-fill your information and track your audit requests.
          </p>
          <Button variant="outline" asChild>
            <Link to="/auth">Sign In</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default AuditRequestHeader;
