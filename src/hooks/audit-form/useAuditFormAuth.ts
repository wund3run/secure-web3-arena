import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
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
  const { user, loading, userProfile } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      navigate('/login', { 
        state: { 
          fromPath: '/request-audit',
          message: 'Please log in or create an account to request an audit.' 
        } 
      });
    }
  }, [user, loading, navigate]);

  // Prefill form with user data if available
  useEffect(() => {
    if (userProfile) {
      // Prepare the initial form data with user profile information
      setFormData(prevData => ({
        ...prevData,
        contactName: userProfile.full_name || prevData.contactName || '',
        contactEmail: user?.email || prevData.contactEmail || '',
      }));
    }

    // If the user has a project and this is a new audit request,
    // we could prefill project data here if available
  }, [userProfile, user, setFormData]);

  // Prefill form with service provider data if available
  useEffect(() => {
    if (!userProfile) return;
    
    if (prefilledData) {
      setFormData(prevData => ({
        ...prevData,
        // Fill in audit-specific fields
        projectName: prefilledData.serviceName 
          ? `${prefilledData.serviceName} Audit Request` 
          : prevData.projectName,
        projectDescription: prefilledData.providerName 
          ? `Requesting an audit from ${prefilledData.providerName}` 
          : prevData.projectDescription,
        blockchain: prefilledData.serviceType || prevData.blockchain,
        // Keep all other form fields as is
        contactName: prevData.contactName || userProfile.full_name || '',
        contactEmail: prevData.contactEmail || user?.email || '',
        customBlockchain: prevData.customBlockchain || '',
        repositoryUrl: prevData.repositoryUrl || '',
        contractCount: prevData.contractCount || '1-5',
        linesOfCode: prevData.linesOfCode || '< 1,000',
        deadline: prevData.deadline || '1-2 weeks',
        budget: prevData.budget || '$5,000 - $10,000',
        auditScope: prevData.auditScope || '',
        previousAudits: prevData.previousAudits || false,
        specificConcerns: prevData.specificConcerns || '',
        previousAuditLinks: prevData.previousAuditLinks || '',
        preferredCommunication: prevData.preferredCommunication || 'email',
        collaborativeAudit: prevData.collaborativeAudit || false,
        continuousAuditing: prevData.continuousAuditing || false,
        hybridModel: prevData.hybridModel || false,
        specializedAuditType: prevData.specializedAuditType || 'Standard',
        accountabilityPreference: prevData.accountabilityPreference || 'standard'
      }));
    }
  }, [userProfile, prefilledData, setFormData, user]);

  return { user, navigate };
};
