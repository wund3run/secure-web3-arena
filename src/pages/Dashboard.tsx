
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { PrivateRoute } from '@/components/auth/PrivateRoute';
import { useAuth } from '@/contexts/auth';
import { useNavigate, useParams } from 'react-router-dom';
import { DashboardService } from '@/services/dashboard-service';
import { SkipToContent } from '@/components/layout/SkipToContent';

export default function Dashboard() {
  const { user, userProfile } = useAuth();
  const navigate = useNavigate();
  const params = useParams();
  const dashboardType = params.type || '';
  
  useEffect(() => {
    if (user) {
      DashboardService.handleDashboardRedirect(
        dashboardType, 
        user, 
        userProfile, 
        navigate
      );
    }
  }, [user, userProfile, navigate, dashboardType]);

  const dashboardTitle = 
    dashboardType === 'auditor' ? 'Auditor Dashboard' : 
    dashboardType === 'project' ? 'Project Dashboard' : 
    'Dashboard';

  return (
    <PrivateRoute>
      <Helmet>
        <title>{dashboardTitle} | Hawkly</title>
        <meta name="description" content="View your personalized security dashboard on Hawkly" />
      </Helmet>
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-grow pt-6 pb-12">
          <main id="main-content" tabIndex={-1}>
            <DashboardLayout dashboardType={dashboardType} />
          </main>
        </div>
        <Footer />
      </div>
    </PrivateRoute>
  );
}
