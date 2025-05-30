
import React from 'react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { AuthForms } from '@/components/auth/AuthForms';
import { useAuthPage } from '@/hooks/useAuthPage';

const AuthPage = () => {
  const { isLoading, loading, error, handleSignIn, handleSignUp } = useAuthPage();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
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

export default AuthPage;
