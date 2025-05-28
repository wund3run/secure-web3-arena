
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/auth';
import { toast } from 'sonner';

export interface DashboardStats {
  totalAudits: number;
  activeAudits: number;
  completedAudits: number;
  pendingAudits: number;
  totalEarnings?: number;
  averageRating?: number;
  securityScore?: number;
  vulnerabilitiesFixed?: number;
}

export interface RecentActivity {
  id: string;
  type: 'audit_request' | 'audit_completed' | 'message' | 'proposal';
  title: string;
  description: string;
  timestamp: Date;
  status?: string;
}

export function useDashboardData() {
  const { user, getUserType } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalAudits: 0,
    activeAudits: 0,
    completedAudits: 0,
    pendingAudits: 0,
  });
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const userType = getUserType();

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    fetchDashboardData();
  }, [user, userType]);

  const fetchDashboardData = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      if (userType === 'auditor') {
        await fetchAuditorData();
      } else if (userType === 'project_owner') {
        await fetchProjectOwnerData();
      } else if (userType === 'admin') {
        await fetchAdminData();
      }

      await fetchRecentActivity();
    } catch (err: any) {
      console.error('Failed to fetch dashboard data:', err);
      setError(err.message);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const fetchAuditorData = async () => {
    // Fetch audits assigned to this auditor
    const { data: audits, error } = await supabase
      .from('audit_requests')
      .select('*')
      .eq('assigned_auditor_id', user?.id);

    if (error) throw error;

    const activeAudits = audits?.filter(a => a.status === 'in_progress').length || 0;
    const completedAudits = audits?.filter(a => a.status === 'completed').length || 0;
    const pendingAudits = audits?.filter(a => a.status === 'pending').length || 0;

    setStats({
      totalAudits: audits?.length || 0,
      activeAudits,
      completedAudits,
      pendingAudits,
      totalEarnings: 45231, // Mock data for now
      averageRating: 4.8,
    });
  };

  const fetchProjectOwnerData = async () => {
    // Fetch audit requests created by this user
    const { data: requests, error } = await supabase
      .from('audit_requests')
      .select('*')
      .eq('client_id', user?.id);

    if (error) throw error;

    const activeAudits = requests?.filter(r => r.status === 'in_progress').length || 0;
    const completedAudits = requests?.filter(r => r.status === 'completed').length || 0;
    const pendingAudits = requests?.filter(r => r.status === 'pending').length || 0;

    setStats({
      totalAudits: requests?.length || 0,
      activeAudits,
      completedAudits,
      pendingAudits,
      securityScore: 92,
      vulnerabilitiesFixed: 28,
    });
  };

  const fetchAdminData = async () => {
    // Fetch platform-wide statistics
    const { data: allAudits, error: auditsError } = await supabase
      .from('audit_requests')
      .select('*');

    const { data: allUsers, error: usersError } = await supabase
      .from('extended_profiles')
      .select('*');

    if (auditsError) throw auditsError;

    const activeAudits = allAudits?.filter(a => a.status === 'in_progress').length || 0;
    const completedAudits = allAudits?.filter(a => a.status === 'completed').length || 0;
    const pendingAudits = allAudits?.filter(a => a.status === 'pending').length || 0;

    setStats({
      totalAudits: allAudits?.length || 0,
      activeAudits,
      completedAudits,
      pendingAudits,
      totalEarnings: 125430,
    });
  };

  const fetchRecentActivity = async () => {
    // Fetch recent activity based on user type
    if (userType === 'auditor') {
      const { data: audits } = await supabase
        .from('audit_requests')
        .select('*')
        .eq('assigned_auditor_id', user?.id)
        .order('updated_at', { ascending: false })
        .limit(5);

      const activities: RecentActivity[] = audits?.map(audit => ({
        id: audit.id,
        type: 'audit_request' as const,
        title: audit.project_name,
        description: `${audit.status === 'completed' ? 'Completed' : 'Working on'} ${audit.blockchain} audit`,
        timestamp: new Date(audit.updated_at),
        status: audit.status,
      })) || [];

      setRecentActivity(activities);
    } else if (userType === 'project_owner') {
      const { data: requests } = await supabase
        .from('audit_requests')
        .select('*')
        .eq('client_id', user?.id)
        .order('updated_at', { ascending: false })
        .limit(5);

      const activities: RecentActivity[] = requests?.map(request => ({
        id: request.id,
        type: 'audit_request' as const,
        title: request.project_name,
        description: `Audit request ${request.status}`,
        timestamp: new Date(request.updated_at),
        status: request.status,
      })) || [];

      setRecentActivity(activities);
    }
  };

  return {
    stats,
    recentActivity,
    loading,
    error,
    refetch: fetchDashboardData,
  };
}
