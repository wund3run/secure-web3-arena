
import { useEffect, useState } from 'react';
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
  const [userProfile, setUserProfile] = useState<{fullName?: string, email?: string}>({});

  useEffect(() => {
    // Check if user is authenticated
    if (!user) {
      toast.error("Authentication required", {
        description: "You need to sign in to request an audit.",
      });
      navigate('/auth');
    } else {
      // Store user email immediately
      setUserProfile(prev => ({ ...prev, email: user.email || '' }));
      
      // Fetch additional profile data
      supabase
        .from('extended_profiles')
        .select('full_name')
        .eq('id', user.id)
        .single()
        .then(({ data, error }) => {
          if (!error && data && data.full_name) {
            setUserProfile(prev => ({ ...prev, fullName: data.full_name }));
          }
        });
    }
  }, [user, navigate]);
  
  // Update form data when user profile changes
  useEffect(() => {
    if (userProfile.email || userProfile.fullName) {
      // Update form with user contact info
      setFormData({
        projectName: "",
        projectDescription: "",
        contactEmail: userProfile.email || "",
        contactName: userProfile.fullName || "",
        blockchain: "Ethereum",
        customBlockchain: "",
        repositoryUrl: "",
        contractCount: "",
        linesOfCode: "",
        deadline: "",
        budget: "",
        auditScope: "",
        previousAudits: false,
        specificConcerns: "",
        previousAuditLinks: ""
      });
    }
  }, [userProfile, setFormData]);

  return { user, navigate };
};
