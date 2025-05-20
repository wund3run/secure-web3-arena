
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { PrivateRoute } from '@/components/auth/PrivateRoute';
import { useAuth } from '@/contexts/auth';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

// Function to determine user role - in a real app, this would come from your user data
const getUserRole = (user: any): 'auditor' | 'project_owner' => {
  // Check user_type from profile if it exists
  if (user?.user_metadata?.user_type) {
    return user.user_metadata.user_type === 'auditor' ? 'auditor' : 'project_owner';
  }

  // For users with a profile, check the user_type field
  if (user?.userProfile?.user_type) {
    return user.userProfile.user_type === 'auditor' ? 'auditor' : 'project_owner';
  }
  
  // Fallback to email domain check (for demo purposes)
  const email = user?.email || '';
  if (email.includes('auditor') || email.includes('security')) {
    return 'auditor';
  }
  return 'project_owner';
};

export default function Dashboard() {
  const { user, userProfile } = useAuth();
  const navigate = useNavigate();
  const params = useParams();
  const dashboardType = params.type || '';
  
  useEffect(() => {
    if (user) {
      // Determine user role
      const userRole = getUserRole(user);
      
      // Redirect based on role and current URL
      const currentPath = window.location.pathname;
      
      // If user is on generic dashboard, redirect to role-specific one
      if (currentPath === '/dashboard') {
        if (userRole === 'auditor') {
          toast.info("Redirecting to your Auditor Dashboard");
          navigate('/dashboard/auditor');
        } else {
          toast.info("Redirecting to your Project Dashboard");
          navigate('/dashboard/project');
        }
      }
      // If user is trying to access a dashboard they shouldn't
      else if (
        (currentPath === '/dashboard/auditor' && userRole !== 'auditor') ||
        (currentPath === '/dashboard/project' && userRole !== 'project_owner')
      ) {
        toast.error("You don't have access to this dashboard");
        
        // Redirect to the appropriate dashboard
        if (userRole === 'auditor') {
          navigate('/dashboard/auditor');
        } else {
          navigate('/dashboard/project');
        }
      }
    }
  }, [user, navigate, dashboardType]);

  return (
    <PrivateRoute>
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
