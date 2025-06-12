
import { useState, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext'; // Assuming you have an Auth context

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
    } catch (err: any) {
      setError(err.message || 'Failed to sign in.');
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
    } catch (err: any) {
      setError(err.message || 'Failed to sign up.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [contextSignUp]);

  return { signIn, signUp, loading, error };
};
