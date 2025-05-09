
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { toast } from 'sonner';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Handle the OAuth redirect and extract any hash parameters
    const handleAuthCallback = async () => {
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        toast.error("Authentication error", { 
          description: error.message
        });
        navigate('/auth');
        return;
      }
      
      if (data.session) {
        toast.success("Successfully signed in");
        navigate('/');
        return;
      }
      
      // If there's no session, check for hash fragment
      const hashParams = window.location.hash;
      if (hashParams) {
        // Handle the hash params
        const { error } = await supabase.auth.getUser();
        if (error) {
          toast.error("Authentication error", {
            description: error.message
          });
        } else {
          toast.success("Successfully signed in");
        }
      } else {
        toast.error("Authentication failed", {
          description: "No session or authentication data found"
        });
      }
      
      // Redirect to auth page in case of any issues
      navigate('/auth');
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <AuthLayout title="Authenticating | Hawkly" description="Completing your authentication">
      <div className="flex flex-col items-center justify-center p-8 bg-white/80 rounded-lg border border-border/40 shadow-sm backdrop-blur-sm">
        <Loader2 className="h-16 w-16 text-primary animate-spin mb-4" />
        <h2 className="text-xl font-semibold mb-2">Authenticating...</h2>
        <p className="text-muted-foreground text-center">
          Please wait while we complete your authentication
        </p>
      </div>
    </AuthLayout>
  );
};

export default AuthCallback;
