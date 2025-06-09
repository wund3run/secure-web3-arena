
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Shield } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <>
      <Helmet>
        <title>Authentication | Hawkly</title>
        <meta name="description" content="Sign in or create your Hawkly account" />
      </Helmet>
      
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-primary/5 to-secondary/5 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <img 
              src="/lovable-uploads/ba568bdc-629c-43ca-a343-58b3c786ecba.png" 
              alt="Hawkly Logo"
              className="mx-auto h-20 w-20 object-contain bg-transparent"
              style={{ backgroundColor: 'transparent' }}
            />
            <h2 className="mt-6 text-3xl font-extrabold bg-gradient-to-r from-brand-blue via-brand-purple to-brand-cyan bg-clip-text text-transparent">
              Welcome to Hawkly
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Your Web3 Security Marketplace
            </p>
          </div>

          {children}

          <Alert className="mt-4">
            <Shield className="h-4 w-4" />
            <AlertDescription>
              Your data is protected with enterprise-grade security and encryption.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </>
  );
};
