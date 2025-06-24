
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth';
import { AuthSecurity } from '@/utils/security/authSecurity';
import { SecurityService } from '@/utils/security/securityService';

export function useSecureAuth() {
  const auth = useAuth();
  const [isValidating, setIsValidating] = useState(true);
  const [securityError, setSecurityError] = useState<string | null>(null);

  useEffect(() => {
    const validateSession = async () => {
      try {
        if (auth.user) {
          const isValid = await AuthSecurity.validateSession();
          if (!isValid) {
            await SecurityService.logSecurityEvent(
              'INVALID_SESSION_DETECTED',
              'Invalid session detected, signing out user',
              { userId: auth.user.id }
            );
            await auth.signOut();
            setSecurityError('Session expired. Please sign in again.');
          }
        }
      } catch (error) {
        console.error('Session validation error:', error);
      } finally {
        setIsValidating(false);
      }
    };

    validateSession();
  }, [auth.user]);

  const secureSignIn = async (email: string, password: string) => {
    try {
      setSecurityError(null);
      const result = await AuthSecurity.secureSignIn(email, password);
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Sign in failed';
      setSecurityError(errorMessage);
      throw error;
    }
  };

  const secureSignUp = async (email: string, password: string, fullName: string, userType: 'auditor' | 'project_owner') => {
    try {
      setSecurityError(null);
      const result = await AuthSecurity.secureSignUp(email, password, fullName, userType);
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Sign up failed';
      setSecurityError(errorMessage);
      throw error;
    }
  };

  const securePasswordReset = async (email: string) => {
    try {
      setSecurityError(null);
      await AuthSecurity.securePasswordReset(email);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Password reset failed';
      setSecurityError(errorMessage);
      throw error;
    }
  };

  return {
    ...auth,
    secureSignIn,
    secureSignUp,
    securePasswordReset,
    isValidating,
    securityError,
    clearSecurityError: () => setSecurityError(null)
  };
}
