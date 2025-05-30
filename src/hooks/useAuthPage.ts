
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/auth/AuthContext';
import { toast } from 'sonner';
import { authRateLimiter } from '@/components/security/SecurityHeaders';
import { securityLogger } from '@/components/security/SecurityAuditLogger';

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
      
      // Check rate limiting
      const identifier = email;
      if (authRateLimiter.isRateLimited(`signin-${identifier}`)) {
        const errorMsg = 'Too many login attempts. Please try again in 15 minutes.';
        await securityLogger.logFailedLogin(email, 'rate_limited');
        throw new Error(errorMsg);
      }

      await signIn(email, password);
      
      // Log successful login
      await securityLogger.logSuccessfulLogin(email);
      
      toast.success('Successfully signed in!');
      navigate(from, { replace: true });
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to sign in';
      setError(errorMessage);
      
      // Log failed login attempt
      await securityLogger.logFailedLogin(email, errorMessage);
      
      toast.error('Sign in failed', { description: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (email: string, password: string, fullName?: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Check rate limiting
      const identifier = email;
      if (authRateLimiter.isRateLimited(`signup-${identifier}`)) {
        const errorMsg = 'Too many signup attempts. Please try again in 15 minutes.';
        throw new Error(errorMsg);
      }

      // Enhanced password validation
      if (password.length < 8) {
        throw new Error('Password must be at least 8 characters long');
      }
      if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
        throw new Error('Password must contain at least one uppercase letter, one lowercase letter, and one number');
      }

      await signUp(email, password, fullName || '', 'project_owner');
      
      // Log signup attempt
      await securityLogger.logSecurityEvent({
        event_type: 'user_signup',
        details: { email, has_full_name: !!fullName },
        severity: 'low',
      });
      
      toast.success('Account created successfully! Please check your email to verify your account.');
      navigate('/auth');
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to create account';
      setError(errorMessage);
      
      // Log failed signup
      await securityLogger.logSecurityEvent({
        event_type: 'signup_failed',
        details: { email, error: errorMessage },
        severity: 'medium',
      });
      
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
