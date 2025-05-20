
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { AuditFormData } from "@/types/audit-request.types";

// Define a type for the prefilledData parameter
interface PrefilledData {
  serviceType?: string;
  serviceName?: string;
  providerId?: string;
  providerName?: string;
}

export const useAuditFormAuth = (
  setFormData: (data: AuditFormData | ((prevData: AuditFormData) => AuditFormData)) => void,
  prefilledData?: PrefilledData
) => {
  const { user, loading, userProfile } = useAuth();
  const navigate = useNavigate();

  // Redirect unauthenticated users to the login page
  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth", { 
        state: { 
          returnUrl: "/request-audit",
          message: "Please sign in to submit an audit request" 
        } 
      });
    }
  }, [user, loading, navigate]);

  // Prefill form with user profile data if available
  useEffect(() => {
    if (userProfile) {
      // Prepare the initial form data with user profile information
      setFormData((prevData: AuditFormData) => ({
        ...prevData,
        contactName: userProfile.full_name || userProfile.display_name || prevData.contactName || '',
        contactEmail: user?.email || prevData.contactEmail || '',
      }));
    }
  }, [userProfile, user, setFormData]);

  // Prefill form with service provider data if available
  useEffect(() => {
    if (!userProfile) return;
    
    if (prefilledData) {
      setFormData((prevData: AuditFormData) => ({
        ...prevData,
        // Fill in audit-specific fields
        projectName: prefilledData.serviceName 
          ? `${prefilledData.serviceName} Audit Request` 
          : prevData.projectName,
        projectDescription: prefilledData.providerName 
          ? `Requesting an audit from ${prefilledData.providerName}` 
          : prevData.projectDescription,
        blockchain: prefilledData.serviceType || prevData.blockchain,
      }));
    }
  }, [prefilledData, userProfile, setFormData]);

  return { user, navigate };
};
