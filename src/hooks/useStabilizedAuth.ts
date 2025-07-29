
import { useState, useCallback } from 'react';
import { useAuth } from '@/contexts/auth'; // Fix the import path

// This hook stabilizes the auth functions so they can be used in effects
// without causing infinite loops. It also centralizes loading and error states.
export const useStabilizedAuth = () => {
  const { signIn: contextSignIn, signUp: contextSignUp } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signIn = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      await contextSignIn(email, password);
    } catch (err: unknown) {
      const errorMsg = typeof err === 'object' && err !== null && 'message' in err ? (err as { message?: string }).message : undefined;
      setError(errorMsg || 'Failed to sign in.');
      // Re-throw the error so the component can also catch it if needed
      throw err;
    } finally {
      setLoading(false);
    }
  }, [contextSignIn]);

  const signUp = useCallback(async (email: string, password: string, fullName: string, userType: 'auditor' | 'project_owner') => {
    setLoading(true);
    setError(null);
    try {
      await contextSignUp(email, password, fullName, userType);
    } catch (err: unknown) {
      const errorMsg = typeof err === 'object' && err !== null && 'message' in err ? (err as { message?: string }).message : undefined;
      setError(errorMsg || 'Failed to sign up.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [contextSignUp]);

  return { signIn, signUp, loading, error };
};
