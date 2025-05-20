
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { PrivateRoute } from '@/components/auth/PrivateRoute';
import { useAuth } from '@/contexts/auth';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

export default function Dashboard() {
  const { user, getUserType } = useAuth();
  const navigate = useNavigate();
  const params = useParams();
  const dashboardType = params.type || '';
  
  useEffect(() => {
    if (user) {
      // Determine user role
      const userType = getUserType();
      const isAuditor = userType === 'auditor';
      const currentPath = window.location.pathname;
      
      // Redirect based on role and current URL
      if (currentPath === '/dashboard') {
        if (isAuditor) {
          toast.info("Redirecting to your Auditor Dashboard");
          navigate('/dashboard/auditor');
        } else {
          toast.info("Redirecting to your Project Dashboard");
          navigate('/dashboard/project');
        }
      }
      // Strict access control: prevent accessing dashboard they shouldn't
      else if (
        (currentPath === '/dashboard/auditor' && !isAuditor) ||
        (currentPath === '/dashboard/project' && isAuditor)
      ) {
        toast.error("Access denied: You don't have permission for this dashboard");
        
        // Redirect to the appropriate dashboard
        if (isAuditor) {
          navigate('/dashboard/auditor');
        } else {
          navigate('/dashboard/project');
        }
      }
    }
  }, [user, navigate, dashboardType, getUserType]);

  // Determine required user type based on dashboard type
  const requiredUserType = dashboardType === 'auditor' ? 'auditor' : 'project_owner';

  return (
    <PrivateRoute requiredUserType={requiredUserType as "auditor" | "project_owner"}>
      <Helmet>
        <title>{dashboardType === 'auditor' ? 'Auditor' : 'Project'} Dashboard | Hawkly</title>
        <meta name="description" content="View your personalized security dashboard on Hawkly" />
      </Helmet>
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-grow pt-6 pb-12">
          <DashboardLayout dashboardType={dashboardType} />
        </div>
        <Footer />
      </div>
    </PrivateRoute>
  );
}
