
import React from 'react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { AuthForms } from '@/components/auth/AuthForms';
import { useAuthPage } from '@/hooks/useAuthPage';

const Auth = () => {
  const { isLoading, loading, error, handleSignIn, handleSignUp } = useAuthPage();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-primary/5 to-secondary/5">
        <div className="flex flex-col items-center space-y-4">
          <img 
            src="/lovable-uploads/ba568bdc-629c-43ca-a343-58b3c786ecba.png" 
            alt="Hawkly Logo"
            className="h-16 w-16 object-contain bg-transparent animate-pulse"
            style={{ backgroundColor: 'transparent' }}
          />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthLayout>
      <AuthForms
        onSignIn={handleSignIn}
        onSignUp={handleSignUp}
        isLoading={isLoading}
        error={error}
      />
    </AuthLayout>
  );
};

export default Auth;
