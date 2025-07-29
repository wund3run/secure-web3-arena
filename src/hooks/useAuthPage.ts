
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth';
import { useNavigate, useLocation } from 'react-router-dom';

export const useAuthPage = () => {
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!authLoading) {
      if (user) {
        // User is already authenticated, redirect to dashboard
        const from = location.state?.from?.pathname || '/dashboard';
        navigate(from, { replace: true });
      } else {
        setLoading(false);
      }
    }
  }, [user, authLoading, navigate, location.state]);

  return { loading, error };
};
