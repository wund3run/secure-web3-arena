
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
      
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <Shield className="mx-auto h-12 w-12 text-primary" />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Welcome to Hawkly
            </h2>
            <p className="mt-2 text-sm text-gray-600">
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
