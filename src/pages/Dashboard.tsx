
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
  const { user, getUserType, loading } = useAuth();
  const navigate = useNavigate();
  const params = useParams();
  const dashboardType = params.type || '';
  
  useEffect(() => {
    if (loading) return; // Wait for auth to load
    
    if (user) {
      try {
        // Determine user role
        const userType = getUserType();
        const isAuditor = userType === 'auditor';
        const currentPath = window.location.pathname;
        
        // Redirect based on role and current URL
        if (currentPath === '/dashboard') {
          if (isAuditor) {
            toast.info("Redirecting to your Auditor Dashboard");
            navigate('/dashboard/auditor', { replace: true });
          } else {
            toast.info("Redirecting to your Project Dashboard");
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
      } catch (error) {
        console.error('Dashboard navigation error:', error);
        toast.error("Navigation error occurred. Redirecting to home.");
        navigate('/', { replace: true });
      }
    }
  }, [user, loading, navigate, dashboardType, getUserType]);

  // Show loading while auth is initializing
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

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
