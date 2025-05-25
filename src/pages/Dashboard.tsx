
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { PrivateRoute } from '@/components/auth/PrivateRoute';
import { useAuth } from '@/contexts/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';

export default function Dashboard() {
  const { user, getUserType } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract dashboard type from pathname
  const pathSegments = location.pathname.split('/');
  const dashboardType = pathSegments[2] || ''; // Gets 'project' or 'auditor' from /dashboard/project or /dashboard/auditor
  
  useEffect(() => {
    if (user) {
      // Determine user role
      const userType = getUserType();
      const isAuditor = userType === 'auditor';
      const currentPath = location.pathname;
      
      console.log('Dashboard routing:', { currentPath, userType, isAuditor });
      
      // Redirect based on role and current URL
      if (currentPath === '/dashboard') {
        if (isAuditor) {
          console.log('Redirecting auditor to /dashboard/auditor');
          navigate('/dashboard/auditor', { replace: true });
        } else {
          console.log('Redirecting project owner to /dashboard/project');
          navigate('/dashboard/project', { replace: true });
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
          navigate('/dashboard/auditor', { replace: true });
        } else {
          navigate('/dashboard/project', { replace: true });
        }
      }
    }
  }, [user, navigate, location.pathname, getUserType]);

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
