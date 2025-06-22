
import React from 'react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { CompleteAuthFlow } from '@/components/auth/CompleteAuthFlow';
import { useAuthPage } from '@/hooks/useAuthPage';
import { Loader2 } from 'lucide-react';

const Auth: React.FC = () => {
  const { loading, error } = useAuthPage();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-primary/5 to-secondary/5">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground" aria-live="polite">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="flex flex-col items-center space-y-4 max-w-md mx-auto p-6">
          <div className="text-red-600 text-center">
            <h2 className="text-xl font-semibold mb-2">Authentication Error</h2>
            <p className="text-sm">{error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <AuthLayout>
      <div className="max-w-md mx-auto">
        <CompleteAuthFlow />
      </div>
    </AuthLayout>
  );
};

export default Auth;
