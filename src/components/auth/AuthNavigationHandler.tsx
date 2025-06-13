
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';

export const AuthNavigationHandler = () => {
  const { user, session } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Handle navigation based on auth state changes
    if (user && session) {
      // User just signed in
      const userRole = user.user_metadata.userType || 'project_owner';
      
      // Don't redirect if already on a dashboard page
      if (!location.pathname.includes('/dashboard')) {
        if (userRole === 'auditor') {
          navigate('/dashboard/auditor');
        } else {
          navigate('/dashboard/project-owner');
        }
      }
    } else if (!user && location.pathname.includes('/dashboard')) {
      // User signed out and is on a protected page
      navigate('/auth');
    }
  }, [user, session, navigate, location.pathname]);

  return null; // This component doesn't render anything
};
