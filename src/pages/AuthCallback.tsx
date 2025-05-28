
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { toast } from 'sonner';

const AuthCallback = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Handle the OAuth redirect and extract any hash parameters
    const handleAuthCallback = async () => {
      try {
        // First check if we already have a session
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          throw sessionError;
        }
        
        if (sessionData.session) {
          toast.success("Successfully signed in");
          navigate('/');
          return;
        }
        
        // If there's no session, process the URL hash fragment
        // which might contain the access token
        const hashUrl = window.location.hash;
        if (hashUrl && hashUrl.includes('access_token')) {
          // The Auth API will process this automatically if we call getUser
          const { data: userData, error: userError } = await supabase.auth.getUser();
          
          if (userError) {
            throw userError;
          }
          
          if (userData.user) {
            toast.success("Successfully signed in");
            navigate('/');
            return;
          }
        }
        
        // If we reach here, authentication failed
        setError("Authentication failed. No valid session or token found.");
        toast.error("Authentication failed", {
          description: "No valid session or token found"
        });
        
        // Redirect to auth page after a short delay
        setTimeout(() => {
          navigate('/auth');
        }, 3000);
        
      } catch (err: any) {
        setError(err.message || "Authentication error");
        toast.error("Authentication error", { 
          description: err.message || "An unknown error occurred" 
        });
        
        // Redirect to auth page after a short delay
        setTimeout(() => {
          navigate('/auth');
        }, 3000);
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <AuthLayout>
      <div className="flex flex-col items-center justify-center p-8 bg-white/80 rounded-lg border border-border/40 shadow-sm backdrop-blur-sm">
        {error ? (
          <>
            <div className="text-destructive mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2 text-destructive">Authentication Failed</h2>
            <p className="text-muted-foreground text-center mb-4">
              {error}
            </p>
            <p className="text-sm">Redirecting to login page...</p>
          </>
        ) : (
          <>
            <Loader2 className="h-16 w-16 text-primary animate-spin mb-4" />
            <h2 className="text-xl font-semibold mb-2">Authenticating...</h2>
            <p className="text-muted-foreground text-center">
              Please wait while we complete your authentication
            </p>
          </>
        )}
      </div>
    </AuthLayout>
  );
};

export default AuthCallback;
