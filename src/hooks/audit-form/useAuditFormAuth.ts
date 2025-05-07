
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { AuditFormData } from "@/types/audit-request.types";

// Define a type for the prefilledData parameter
interface PrefilledData {
  serviceType?: string;
  serviceName?: string;
  providerId?: string;
  providerName?: string;
}

export const useAuditFormAuth = (
  setFormData: (data: AuditFormData) => void,
  prefilledData?: PrefilledData
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
            // Get the current form data first, then update it
            // Instead of using a callback which creates TypeScript issues,
            // we'll directly create and pass a new object
            const fullName = data.full_name || '';
            const userEmail = user.email || '';
            
            // Pre-fill only the contact fields while preserving all other fields
            // and respecting any prefilled service data that may exist
            setFormData(prevData => ({
              ...prevData,
              contactEmail: userEmail,
              contactName: fullName
            }));
          }
        });
    }
  }, [user, navigate, setFormData]);

  return { user, navigate };
};
