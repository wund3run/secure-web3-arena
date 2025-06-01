
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { 
  Users, 
  Shield, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Activity
} from 'lucide-react';

interface AdminStats {
  totalUsers: number;
  activeAudits: number;
  totalRevenue: number;
  pendingApprovals: number;
  criticalFindings: number;
  completedAudits: number;
}

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    activeAudits: 0,
    totalRevenue: 0,
    pendingApprovals: 0,
    criticalFindings: 0,
    completedAudits: 0
  });
  const [loading, setLoading] = useState(true);
  const [recentAudits, setRecentAudits] = useState<any[]>([]);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      setLoading(true);

      // Fetch user count
      const { count: userCount } = await supabase
        .from('extended_profiles')
        .select('*', { count: 'exact', head: true });

      // Fetch audit statistics
      const { data: audits } = await supabase
        .from('audit_requests')
        .select('*');

      const activeAudits = audits?.filter(a => a.status === 'in_progress').length || 0;
      const completedAudits = audits?.filter(a => a.status === 'completed').length || 0;
      const pendingApprovals = audits?.filter(a => a.status === 'pending').length || 0;

      // Mock critical findings count since table doesn't exist in types yet
      const criticalCount = 2;

      // Get recent audits with client info
      const { data: recentAuditData } = await supabase
        .from('audit_requests')
        .select(`
          *,
          client:client_id(full_name),
          auditor:assigned_auditor_id(full_name)
        `)
        .order('created_at', { ascending: false })
        .limit(5);

      setStats({
        totalUsers: userCount || 0,
        activeAudits,
        totalRevenue: 50000, // This would come from payment records
        pendingApprovals,
        criticalFindings: criticalCount,
        completedAudits
      });

      setRecentAudits(recentAuditData || []);
    } catch (error) {
      console.error('Error fetching admin data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { variant: 'outline' as const, color: 'text-yellow-600' },
      in_progress: { variant: 'default' as const, color: 'text-blue-600' },
      completed: { variant: 'default' as const, color: 'text-green-600' },
      cancelled: { variant: 'destructive' as const, color: 'text-red-600' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    
    return (
      <Badge variant={config.variant} className={config.color}>
        {status.replace('_', ' ').toUpperCase()}
      </Badge>
    );
  };

  if (loading) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Audits</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeAudits}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingApprovals}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Findings</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.criticalFindings}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Audits</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.completedAudits}</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Audits */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Audit Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAudits.map((audit) => (
              <div key={audit.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium">{audit.project_name}</p>
                  <p className="text-sm text-muted-foreground">
                    Client: {audit.client?.full_name || 'Unknown'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {audit.blockchain} • {new Date(audit.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right space-y-2">
                  {getStatusBadge(audit.status)}
                  <p className="text-sm text-muted-foreground">
                    ${audit.budget?.toLocaleString() || 'TBD'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" onClick={() => window.location.href = '/admin/users'}>
              <Users className="h-4 w-4 mr-2" />
              Manage Users
            </Button>
            <Button variant="outline" onClick={() => window.location.href = '/admin/audits'}>
              <Shield className="h-4 w-4 mr-2" />
              Review Audits
            </Button>
            <Button variant="outline" onClick={() => window.location.href = '/admin/reports'}>
              <TrendingUp className="h-4 w-4 mr-2" />
              View Reports
            </Button>
            <Button variant="outline" onClick={fetchAdminData}>
              <Activity className="h-4 w-4 mr-2" />
              Refresh Data
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
