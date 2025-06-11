
import { useAuth } from '@/contexts/auth';
import { LoadingStateManager } from '@/utils/performance/loadingStates';
import { useEffect } from 'react';
import { toast } from 'sonner';

/**
 * Enhanced auth hook with better error handling and loading states
 */
export function useStabilizedAuth() {
  const auth = useAuth();

  useEffect(() => {
    if (auth.loading) {
      LoadingStateManager.setLoading('auth', 'Checking authentication...');
    } else {
      LoadingStateManager.setComplete('auth');
    }
  }, [auth.loading]);

  const signInWithFeedback = async (email: string, password: string) => {
    try {
      LoadingStateManager.setLoading('auth', 'Signing in...');
      const result = await auth.signIn(email, password);
      
      if (result.error) {
        LoadingStateManager.setError('auth', result.error.message);
        toast.error('Sign in failed', {
          description: result.error.message
        });
        return result;
      }

      LoadingStateManager.setComplete('auth');
      toast.success('Welcome back!', {
        description: 'You have been signed in successfully.'
      });
      
      return result;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unexpected error occurred';
      LoadingStateManager.setError('auth', message);
      toast.error('Sign in failed', { description: message });
      throw error;
    }
  };

  const signUpWithFeedback = async (email: string, password: string, metadata?: any) => {
    try {
      LoadingStateManager.setLoading('auth', 'Creating account...');
      // Use correct signUp signature - check if it expects metadata as 3rd param or options object
      const result = await auth.signUp(email, password, { metadata });
      
      if (result.error) {
        LoadingStateManager.setError('auth', result.error.message);
        toast.error('Sign up failed', {
          description: result.error.message
        });
        return result;
      }

      LoadingStateManager.setComplete('auth');
      toast.success('Account created!', {
        description: 'Please check your email to verify your account.'
      });
      
      return result;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unexpected error occurred';
      LoadingStateManager.setError('auth', message);
      toast.error('Sign up failed', { description: message });
      throw error;
    }
  };

  const signOutWithFeedback = async () => {
    try {
      LoadingStateManager.setLoading('auth', 'Signing out...');
      await auth.signOut();
      LoadingStateManager.setComplete('auth');
      toast.success('Signed out successfully');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unexpected error occurred';
      LoadingStateManager.setError('auth', message);
      toast.error('Sign out failed', { description: message });
      throw error;
    }
  };

  return {
    ...auth,
    signIn: signInWithFeedback,
    signUp: signUpWithFeedback,
    signOut: signOutWithFeedback,
  };
}
