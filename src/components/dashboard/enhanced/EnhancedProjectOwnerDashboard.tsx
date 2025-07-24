import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth';
import { supabase } from '@/integrations/supabase/client';
import { EnhancedWelcomeMessage } from '../EnhancedWelcomeMessage';
import { DashboardStats } from '../widgets/DashboardStats';
import { QuickActions } from '../widgets/QuickActions';
import { RecentActivity } from '../widgets/RecentActivity';
import { ProjectsOverview } from '../widgets/ProjectsOverview';
import { SecurityInsights } from '../widgets/SecurityInsights';
import { UpcomingDeadlines } from '../widgets/UpcomingDeadlines';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { RefreshCw, TrendingUp, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EnhancedProgressBar } from '@/components/ui/enhanced-progress-bar';
import { useNavigate } from 'react-router-dom';

interface AuditRequest {
  id: string;
  status: string | null;
  budget?: number | null;
  security_score?: number | null;
  deadline?: string | null;
  [key: string]: unknown;
}

interface DashboardData {
  auditRequests: AuditRequest[];
  completedAudits: number;
  totalSpent: number;
  securityScore: number;
  recentActivity: unknown[];
  upcomingDeadlines: AuditRequest[];
}

export const EnhancedProjectOwnerDashboard = () => {
  const { user, userProfile } = useAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);

  const fetchDashboardData = async () => {
    if (!user) return;

    try {
      setRefreshing(true);
      setError(null);

      // Fetch audit requests
      const { data: auditRequests, error: auditError } = await supabase
        .from('audit_requests')
        .select('*')
        .eq('client_id', user.id)
        .order('created_at', { ascending: false });

      if (auditError) throw auditError;

      // Fetch completed audits count
      const { count: completedCount, error: completedError } = await supabase
        .from('audit_requests')
        .select('*', { count: 'exact', head: true })
        .eq('client_id', user.id)
        .eq('status', 'completed');

      if (completedError) throw completedError;

      // Fetch recent activity (audit status updates)
      const { data: recentActivity, error: activityError } = await supabase
        .from('audit_status_updates')
        .select('*, audit_requests(project_name)')
        .in('audit_request_id', auditRequests?.map(req => req.id) || [])
        .order('created_at', { ascending: false })
        .limit(5);

      if (activityError) throw activityError;

      // Calculate metrics
      const totalSpent = auditRequests?.reduce((sum, req) => sum + (req.budget || 0), 0) || 0;
      const avgSecurityScore = auditRequests?.reduce((sum, req) => sum + (req.security_score || 0), 0) / (auditRequests?.length || 1) || 0;

      setDashboardData({
        auditRequests: auditRequests || [],
        completedAudits: completedCount || 0,
        totalSpent,
        securityScore: Math.round(avgSecurityScore),
        recentActivity: recentActivity || [],
        upcomingDeadlines: auditRequests?.filter(req => req.deadline && new Date(req.deadline) > new Date()).slice(0, 3) || []
      });

    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [user]);

  const handleAnalyticsClick = () => {
    navigate('/analytics');
  };

  const handleNewAuditClick = () => {
    navigate('/request-audit');
  };

  if (loading) {
    return <LoadingDashboardContent />;
  }

  if (error) {
    return (
      <div className="container py-8">
        <Alert className="mb-6">
          <AlertDescription className="flex items-center justify-between">
            <span>{error}</span>
            <Button variant="outline" size="sm" onClick={fetchDashboardData}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div data-testid="dashboard-main" className="container py-8 space-y-6">
      <EnhancedWelcomeMessage />
      
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-brand-gradient">
            Welcome back, {userProfile?.full_name || user?.email || 'User'}
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your security audits and track project progress
          </p>
          <div className="mt-4 max-w-md">
            <EnhancedProgressBar
              value={dashboardData?.completedAudits || 0}
              max={10}
              label="Platform Journey"
              variant="success"
              milestones={[
                { value: 1, label: 'First Audit', completed: (dashboardData?.completedAudits || 0) >= 1 },
                { value: 5, label: 'Regular User', completed: (dashboardData?.completedAudits || 0) >= 5 },
                { value: 10, label: 'Power User', completed: (dashboardData?.completedAudits || 0) >= 10 }
              ]}
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            size="sm" 
            variant="outline" 
            className="gap-2" 
            data-testid="dashboard-analytics-button"
            onClick={handleAnalyticsClick}
          >
            <TrendingUp className="h-4 w-4" />
            Analytics
          </Button>
          <Button 
            size="sm" 
            className="gap-2" 
            data-testid="dashboard-action-button"
            onClick={handleNewAuditClick}
          >
            <Plus className="h-4 w-4" />
            New Audit Request
          </Button>
        </div>
      </div>

      <DashboardStats 
        data={{
          activeAudits: dashboardData?.auditRequests.filter(req => req.status === 'in_progress').length || 0,
          completedAudits: dashboardData?.completedAudits || 0,
          totalSpent: dashboardData?.totalSpent || 0,
          securityScore: dashboardData?.securityScore || 0
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ProjectsOverview 
            auditRequests={dashboardData?.auditRequests || []}
            onRefresh={fetchDashboardData}
          />
          <RecentActivity 
            activities={dashboardData?.recentActivity || []}
          />
        </div>
        
        <div className="space-y-6">
          <QuickActions />
          <SecurityInsights 
            securityScore={dashboardData?.securityScore || 0}
            auditRequests={dashboardData?.auditRequests || []}
          />
          <UpcomingDeadlines 
            deadlines={dashboardData?.upcomingDeadlines || []}
          />
        </div>
      </div>

      {showActionModal && (
        <div data-testid="action-modal">
          {/* Modal content */}
        </div>
      )}
    </div>
  );
};

const LoadingDashboardContent = () => (
  <div className="container py-8 space-y-6">
    <Skeleton className="h-24 w-full" />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => (
        <Skeleton key={i} className="h-24" />
      ))}
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Skeleton className="h-96" />
        <Skeleton className="h-64" />
      </div>
      <div className="space-y-6">
        <Skeleton className="h-48" />
        <Skeleton className="h-48" />
        <Skeleton className="h-48" />
      </div>
    </div>
  </div>
);
