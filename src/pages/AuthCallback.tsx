
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { toast } from 'sonner';

const AuthCallback = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [message, setMessage] = useState('Authenticating...');

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        console.log('Processing authentication callback...');
        setMessage('Verifying authentication...');

        // Check for existing session first
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Session error:', sessionError);
          throw new Error(`Session verification failed: ${sessionError.message}`);
        }
        
        if (sessionData.session) {
          console.log('Valid session found:', sessionData.session.user.email);
          setStatus('success');
          setMessage('Authentication successful! Redirecting...');
          toast.success('Successfully signed in');
          
          setTimeout(() => {
            navigate('/', { replace: true });
          }, 1500);
          return;
        }

        // Process URL hash fragment for OAuth redirects
        const hashFragment = window.location.hash;
        if (hashFragment && (hashFragment.includes('access_token') || hashFragment.includes('code'))) {
          console.log('Processing OAuth callback from URL hash');
          setMessage('Processing authentication response...');
          
          // Give Supabase a moment to process the hash
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Check session again after processing
          const { data: newSessionData, error: newSessionError } = await supabase.auth.getSession();
          
          if (newSessionError) {
            console.error('Post-hash session error:', newSessionError);
            throw new Error(`Authentication processing failed: ${newSessionError.message}`);
          }
          
          if (newSessionData.session) {
            console.log('Authentication successful after hash processing');
            setStatus('success');
            setMessage('Authentication successful! Redirecting...');
            toast.success('Successfully signed in');
            
            setTimeout(() => {
              navigate('/', { replace: true });
            }, 1500);
            return;
          }
        }

        // If we reach here, authentication failed
        console.warn('No valid session or authentication data found');
        setStatus('error');
        setMessage('Authentication failed. No valid session found.');
        toast.error('Authentication failed', {
          description: 'Unable to verify your login. Please try again.'
        });
        
        setTimeout(() => {
          navigate('/auth', { replace: true });
        }, 3000);
        
      } catch (error: any) {
        console.error('Authentication callback error:', error);
        setStatus('error');
        setMessage(error.message || 'An unexpected error occurred');
        toast.error('Authentication error', { 
          description: error.message || 'Please try signing in again'
        });
        
        setTimeout(() => {
          navigate('/auth', { replace: true });
        }, 3000);
      }
    };

    handleAuthCallback();
  }, [navigate]);

  const getIcon = () => {
    switch (status) {
      case 'processing':
        return <Loader2 className="h-16 w-16 text-primary animate-spin mb-4" />;
      case 'success':
        return <CheckCircle className="h-16 w-16 text-green-500 mb-4" />;
      case 'error':
        return <AlertCircle className="h-16 w-16 text-red-500 mb-4" />;
    }
  };

  const getTitle = () => {
    switch (status) {
      case 'processing':
        return 'Authenticating...';
      case 'success':
        return 'Success!';
      case 'error':
        return 'Authentication Failed';
    }
  };

  return (
    <AuthLayout title="Authenticating | Hawkly" description="Completing your authentication">
      <div className="flex flex-col items-center justify-center p-8 bg-white/80 rounded-lg border border-border/40 shadow-sm backdrop-blur-sm">
        {getIcon()}
        <h2 className={`text-xl font-semibold mb-2 ${
          status === 'error' ? 'text-red-600' : 
          status === 'success' ? 'text-green-600' : 
          'text-primary'
        }`}>
          {getTitle()}
        </h2>
        <p className="text-muted-foreground text-center mb-4">
          {message}
        </p>
        {status === 'error' && (
          <p className="text-sm text-muted-foreground">
            Redirecting to login page...
          </p>
        )}
        {status === 'success' && (
          <p className="text-sm text-green-600">
            Taking you to the dashboard...
          </p>
        )}
      </div>
    </AuthLayout>
  );
};

export default AuthCallback;
