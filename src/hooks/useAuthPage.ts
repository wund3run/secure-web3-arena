
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth/AuthContext';
import { toast } from 'sonner';

export const useAuthPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await signIn(email, password);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Sign in failed');
      toast.error('Sign in failed', { description: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (email: string, password: string, fullName: string, userType: 'auditor' | 'project_owner') => {
    setIsLoading(true);
    setError(null);
    
    try {
      await signUp(email, password, fullName, userType);
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Sign up failed');
      toast.error('Sign up failed', { description: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    loading: isLoading, // Alias for compatibility
    error,
    handleSignIn,
    handleSignUp
  };
};
