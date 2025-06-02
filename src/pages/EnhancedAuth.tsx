
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { EnhancedAuthFlow } from '@/components/auth/enhanced/EnhancedAuthFlow';
import { useAuthPage } from '@/hooks/useAuthPage';

const EnhancedAuth = () => {
  const { isLoading, loading, error, handleSignIn, handleSignUp } = useAuthPage();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Enhanced Authentication | Hawkly</title>
        <meta name="description" content="Sign in or create your Hawkly account with enhanced onboarding" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <img 
              src="/lovable-uploads/fd4d9ea7-6cf1-4fe8-9327-9c7822369207.png" 
              alt="Hawkly"
              className="h-12 w-12 mx-auto mb-4"
            />
            <h1 className="text-2xl font-bold text-gray-900">Hawkly</h1>
            <p className="text-gray-600">Web3 Security Marketplace</p>
          </div>

          <EnhancedAuthFlow
            onSignIn={handleSignIn}
            onSignUp={handleSignUp}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </div>
    </>
  );
};

export default EnhancedAuth;
