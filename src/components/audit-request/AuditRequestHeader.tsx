
import React from 'react';
import { useAuth } from '@/contexts/auth';
import { HawklyLogo } from "@/components/layout/hawkly-logo";
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

const AuditRequestHeader: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="text-center mb-10">
      <div className="flex justify-center mb-6 animate-in fade-in slide-in-from-top-5">
        <img 
          src="/lovable-uploads/457a4f30-ef00-4983-ad81-9841ef293c46.png" 
          alt="Hawkly Logo"
          className="w-24 h-24 object-contain bg-transparent hover-lift cursor-pointer transition-all"
          style={{ backgroundColor: 'transparent' }}
        />
      </div>
      <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#8A73E2] to-[#33C3F0] animate-in fade-in slide-in-from-bottom-5">
        Request a Security Audit
      </h1>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4 animate-in fade-in slide-in-from-bottom-5 delay-150">
        Complete the form below to request a comprehensive security audit for your Web3 project. 
        Our AI will match you with the perfect auditors based on your requirements.
      </p>
      
      {!user && (
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mt-6 max-w-xl mx-auto animate-in fade-in slide-in-from-bottom-5 delay-300 hover:bg-primary/15 hover:border-primary/30 transition-colors interactive-card">
          <h3 className="text-sm font-medium text-primary mb-2">Already have an account?</h3>
          <Button variant="outline" asChild className="flex items-center gap-2 group transition-all hover:bg-primary/10">
            <Link to="/auth">
              <Shield className="h-4 w-4 group-hover:rotate-12 transition-transform" />
              <span className="relative">
                Sign In to Track Your Audit Requests
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </span>
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default AuditRequestHeader;
