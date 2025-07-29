
import React, { useEffect } from 'react';
import { useAuth } from '@/contexts/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';

interface SessionManagerProps {
  children: React.ReactNode;
}

export const SessionManager: React.FC<SessionManagerProps> = ({ children }) => {
  const { user, session, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Handle session expiration
    if (!loading && !session && user) {
      toast.error('Your session has expired. Please sign in again.');
      navigate('/auth', { 
        state: { 
          from: location,
          message: 'Session expired - please sign in again' 
        } 
      });
    }
  }, [session, user, loading, navigate, location]);

  useEffect(() => {
    // Handle new user onboarding
    if (user && session && !loading) {
      // Check if user needs onboarding (simplified check)
      const needsOnboarding = !user.user_metadata?.onboarding_completed;
      
      if (needsOnboarding && !location.pathname.includes('/onboarding')) {
        navigate('/onboarding', { replace: true });
      }
    }
  }, [user, session, loading, navigate, location]);

  return <>{children}</>;
};
