
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/auth/AuthContext';
import { toast } from 'sonner';

export const useAuthPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user, loading, signIn, signUp, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect authenticated users
  useEffect(() => {
    if (user && !loading) {
      const from = (location.state as any)?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }, [user, loading, navigate, location]);

  const handleSignIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      await signIn(email, password);
      toast.success('Welcome back!');
    } catch (err: any) {
      toast.error('Sign in failed', { description: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (
    email: string, 
    password: string, 
    fullName: string, 
    userType: 'auditor' | 'project_owner'
  ) => {
    try {
      setIsLoading(true);
      await signUp(email, password, fullName, userType);
      toast.success('Account created successfully!');
    } catch (err: any) {
      toast.error('Sign up failed', { description: err.message });
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
