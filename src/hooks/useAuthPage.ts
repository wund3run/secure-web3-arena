
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/auth/AuthContext';
import { toast } from 'sonner';

export const useAuthPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signIn, signUp, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSignIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      await signIn(email, password);
      toast.success('Successfully signed in!');
      navigate(from, { replace: true });
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to sign in';
      setError(errorMessage);
      toast.error('Sign in failed', { description: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (email: string, password: string, fullName?: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Fix the signUp call to match the expected signature with role parameter
      await signUp(email, password, fullName || '', 'project_owner');
      toast.success('Account created successfully! Please check your email to verify your account.');
      navigate('/auth');
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to create account';
      setError(errorMessage);
      toast.error('Sign up failed', { description: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    loading,
    error,
    handleSignIn,
    handleSignUp,
  };
};
