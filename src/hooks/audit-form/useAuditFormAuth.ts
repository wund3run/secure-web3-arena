
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { AuditFormData } from "@/types/audit-request.types";

export const useAuditFormAuth = (
  setFormData: (data: AuditFormData) => void
) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    if (!user) {
      toast.error("Authentication required", {
        description: "You need to sign in to request an audit.",
      });
      navigate('/auth');
    } else {
      // Pre-fill user information if available
      supabase
        .from('extended_profiles')
        .select('full_name')
        .eq('id', user.id)
        .single()
        .then(({ data, error }) => {
          if (!error && data && data.full_name) {
            setFormData(prev => ({
              ...prev,
              contactName: data.full_name || '',
              contactEmail: user.email || ''
            }));
          }
        });
    }
  }, [user, navigate, setFormData]);

  return { user, navigate };
};
