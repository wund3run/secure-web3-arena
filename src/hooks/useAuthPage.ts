
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
import { toast } from 'sonner';

export const useAuthPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signUp, user, loading, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  useEffect(() => {
    if (user && !loading) {
      console.log('User authenticated, redirecting to:', from);
      navigate(from, { replace: true });
    }
  }, [user, loading, navigate, from]);

  const handleSignIn = async (email: string, password: string) => {
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      console.log('Attempting sign in for:', email);
      await signIn(email, password);
    } catch (error: any) {
      console.error('Sign in failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (email: string, password: string, fullName: string, userType: 'auditor' | 'project_owner') => {
    if (!email || !password || !fullName) {
      toast.error('Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);
    try {
      console.log('Attempting sign up for:', email, 'as', userType);
      await signUp(email, password, fullName, userType);
    } catch (error: any) {
      console.error('Sign up failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    loading,
    error,
    handleSignIn,
    handleSignUp
  };
};
