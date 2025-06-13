
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';

export const AuthNavigationHandler = () => {
  const { user, session, getUserType } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Handle navigation based on auth state changes
    if (user && session) {
      // User just signed in
      const userRole = getUserType();
      
      // Don't redirect if already on a dashboard page
      if (!location.pathname.includes('/dashboard')) {
        if (userRole === 'auditor') {
          navigate('/dashboard/auditor');
        } else if (userRole === 'project_owner') {
          navigate('/dashboard/project-owner');
        } else {
          navigate('/dashboard');
        }
      }
    } else if (!user && location.pathname.includes('/dashboard')) {
      // User signed out and is on a protected page
      navigate('/auth');
    }
  }, [user, session, navigate, location.pathname, getUserType]);

  return null; // This component doesn't render anything
};
