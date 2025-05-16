
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { PrivateRoute } from '@/components/auth/PrivateRoute';
import { useAuth } from '@/contexts/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// Function to determine user role - in a real app, this would come from your user data
const getUserRole = (user: any): 'auditor' | 'project_owner' => {
  // This is a placeholder. In a real implementation, you would:
  // 1. Check user metadata, claims, or a separate roles table
  // 2. Return the appropriate role

  // For demo purposes, let's use email domain to differentiate (you'd use proper role management)
  const email = user?.email || '';
  if (email.includes('auditor') || email.includes('security')) {
    return 'auditor';
  }
  return 'project_owner';
};

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user) {
      // Determine user role and redirect if needed
      const userRole = getUserRole(user);
      const currentPath = window.location.pathname;
      
      // If user is on generic dashboard, redirect to role-specific one
      if (currentPath === '/dashboard') {
        if (userRole === 'auditor') {
          // Redirect to auditor dashboard
          toast.info("Welcome to your Auditor Dashboard");
          // In a real app, you might have role-specific dashboard routes
          // navigate('/auditor-dashboard');
        } else {
          // Redirect to project owner dashboard
          toast.info("Welcome to your Project Dashboard");
          // In a real app, you might have role-specific dashboard routes
          // navigate('/project-dashboard');
        }
      }
    }
  }, [user, navigate]);

  return (
    <PrivateRoute>
      <Helmet>
        <title>Dashboard | Hawkly</title>
        <meta name="description" content="View your personalized security dashboard on Hawkly" />
      </Helmet>
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-grow pt-6 pb-12">
          <DashboardLayout />
        </div>
        <Footer />
      </div>
    </PrivateRoute>
  );
}
