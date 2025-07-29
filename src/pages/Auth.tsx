
import React from 'react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { CompleteAuthFlow } from '@/components/auth/CompleteAuthFlow';
import { useAuthPage } from '@/hooks/useAuthPage';
import { Loader2 } from 'lucide-react';
import { HawklyCard } from '@/components/ui/hawkly-components';

const Auth: React.FC = () => {
  const { loading, error } = useAuthPage();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#131822] to-[#1a1f2e]">
        <HawklyCard variant="glass" className="p-8 flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-[#a879ef]" />
          <p className="text-sm text-gray-300" aria-live="polite">Checking authentication...</p>
        </HawklyCard>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#131822] to-[#1a1f2e]">
        <HawklyCard variant="highlighted" className="max-w-md mx-auto">
          <div className="flex flex-col items-center space-y-4 p-6">
            <div className="text-red-400 text-center">
              <h2 className="text-xl font-semibold mb-2">Authentication Error</h2>
              <p className="text-sm">{error.message}</p>
            </div>
          </div>
        </HawklyCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#131822] to-[#1a1f2e]">
      <AuthLayout>
        <HawklyCard variant="glass" className="backdrop-blur-md bg-white/5 border border-white/10 max-w-md mx-auto p-6">
          <CompleteAuthFlow />
        </HawklyCard>
      </AuthLayout>
    </div>
  );
};

export default Auth;
