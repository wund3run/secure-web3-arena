
import React from 'react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { CompleteAuthFlow } from '@/components/auth/CompleteAuthFlow';
import { useAuthPage } from '@/hooks/useAuthPage';

const Auth = () => {
  const { loading } = useAuthPage();

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
      <div className="max-w-2xl mx-auto">
        <CompleteAuthFlow />
      </div>
    </AuthLayout>
  );
};

export default Auth;
