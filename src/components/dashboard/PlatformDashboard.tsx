
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, Shield, TrendingUp, Clock, DollarSign, 
  CheckCircle, AlertTriangle, Star, Activity 
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/auth';
import { EnhancedAuditRequestForm } from '@/components/audit-request/EnhancedAuditRequestForm';
import { AuditorOnboardingForm } from '@/components/auditor/AuditorOnboardingForm';
import { AuditProgressTracker } from '@/components/audit/AuditProgressTracker';

interface PlatformMetrics {
  total_auditors: number;
  active_audits: number;
  completed_audits: number;
  pending_requests: number;
  avg_completion_time: number;
  success_rate: number;
}

export function PlatformDashboard() {
  const { user, userProfile } = useAuth();
  const [metrics, setMetrics] = useState<PlatformMetrics>({
    total_auditors: 0,
    active_audits: 0,
    completed_audits: 0,
    pending_requests: 0,
    avg_completion_time: 14,
    success_rate: 98.5
  });
  const [userAudits, setUserAudits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch platform metrics
      const [auditorsResult, auditsResult, requestsResult] = await Promise.all([
        supabase.from('auditor_profiles').select('id', { count: 'exact' }).eq('verification_status', 'verified'),
        supabase.from('audit_requests').select('id, status', { count: 'exact' }),
        supabase.from('audit_requests').select('id', { count: 'exact' }).eq('status', 'pending')
      ]);

      const totalAuditors = auditorsResult.count || 0;
      const totalAudits = auditsResult.count || 0;
      const completedAudits = auditsResult.data?.filter(a => a.status === 'completed').length || 0;
      const activeAudits = auditsResult.data?.filter(a => a.status === 'in_progress').length || 0;
      const pendingRequests = requestsResult.count || 0;

      setMetrics({
        total_auditors: totalAuditors,
        active_audits: activeAudits,
        completed_audits: completedAudits,
        pending_requests: pendingRequests,
        avg_completion_time: 14,
        success_rate: completedAudits > 0 ? (completedAudits / totalAudits) * 100 : 98.5
      });

      // Fetch user's audit requests if authenticated
      if (user) {
        const { data: userAuditData } = await supabase
          .from('audit_requests')
          .select(`
            *,
            auditor_profiles (
              business_name,
              verification_status
            ),
            audit_progress (
              progress_percentage,
              current_phase
            )
          `)
          .eq('client_id', user.id)
          .order('created_at', { ascending: false });

        setUserAudits(userAuditData || []);
      }

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const MetricCard = ({ icon: Icon, title, value, description, trend }: any) => (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
          <Icon className="h-8 w-8 text-muted-foreground" />
        </div>
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <span>{description}</span>
          {trend && (
            <Badge variant="outline" className="text-xs">
              {trend}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardContent className="pt-6">
                <div className="h-20 bg-gray-200 rounded animate-pulse" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Platform Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          icon={Shield}
          title="Verified Auditors"
          value={metrics.total_auditors}
          description="Active security professionals"
          trend="+12% this month"
        />
        <MetricCard
          icon={Activity}
          title="Active Audits"
          value={metrics.active_audits}
          description="Currently in progress"
          trend="Real-time"
        />
        <MetricCard
          icon={CheckCircle}
          title="Completed Audits"
          value={metrics.completed_audits}
          description="Successfully delivered"
          trend={`${metrics.success_rate}% success rate`}
        />
        <MetricCard
          icon={Clock}
          title="Avg. Completion"
          value={`${metrics.avg_completion_time} days`}
          description="Time to delivery"
          trend="Industry leading"
        />
      </div>

      {/* Main Dashboard Content */}
      <Tabs defaultValue={user ? "my-audits" : "request-audit"} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="request-audit">Request Audit</TabsTrigger>
          <TabsTrigger value="become-auditor">Become Auditor</TabsTrigger>
          {user && <TabsTrigger value="my-audits">My Audits</TabsTrigger>}
          <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
        </TabsList>

        <TabsContent value="request-audit" className="space-y-4">
          <EnhancedAuditRequestForm />
        </TabsContent>

        <TabsContent value="become-auditor" className="space-y-4">
          <AuditorOnboardingForm onSuccess={() => fetchDashboardData()} />
        </TabsContent>

        {user && (
          <TabsContent value="my-audits" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>My Audit Requests</CardTitle>
                <CardDescription>
                  Track the progress of your security audits
                </CardDescription>
              </CardHeader>
              <CardContent>
                {userAudits.length === 0 ? (
                  <div className="text-center py-8">
                    <Shield className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No audits yet</h3>
                    <p className="text-gray-600 mb-4">Get started by requesting your first security audit.</p>
                    <Button onClick={() => document.querySelector('[value="request-audit"]')?.click()}>
                      Request Audit
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {userAudits.map((audit) => (
                      <Card key={audit.id} className="border-l-4 border-l-blue-500">
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h3 className="font-semibold">{audit.project_name}</h3>
                              <p className="text-sm text-gray-600">{audit.blockchain} • {audit.audit_scope}</p>
                            </div>
                            <Badge variant={
                              audit.status === 'completed' ? 'default' :
                              audit.status === 'in_progress' ? 'secondary' :
                              audit.status === 'pending' ? 'outline' : 'destructive'
                            }>
                              {audit.status.replace('_', ' ')}
                            </Badge>
                          </div>
                          
                          {audit.audit_progress && (
                            <div className="mb-4">
                              <div className="flex items-center justify-between text-sm mb-1">
                                <span>Progress</span>
                                <span>{audit.audit_progress.progress_percentage}%</span>
                              </div>
                              <Progress value={audit.audit_progress.progress_percentage} className="h-2" />
                            </div>
                          )}

                          <div className="flex gap-2">
                            {audit.status === 'in_progress' && (
                              <Button size="sm" variant="outline">
                                <AuditProgressTracker auditRequestId={audit.id} />
                              </Button>
                            )}
                            <Button size="sm">View Details</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        )}

        <TabsContent value="marketplace" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Marketplace</CardTitle>
              <CardDescription>
                Discover verified auditors and browse completed audits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="border-dashed">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <Shield className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                      <h3 className="font-semibold mb-1">Smart Contract Audits</h3>
                      <p className="text-sm text-gray-600 mb-3">Comprehensive security reviews</p>
                      <Badge>From $2,000</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-dashed">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <TrendingUp className="h-8 w-8 mx-auto text-green-600 mb-2" />
                      <h3 className="font-semibold mb-1">DeFi Protocol Audits</h3>
                      <p className="text-sm text-gray-600 mb-3">Specialized DeFi security</p>
                      <Badge>From $5,000</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-dashed">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <Star className="h-8 w-8 mx-auto text-purple-600 mb-2" />
                      <h3 className="font-semibold mb-1">NFT Marketplace Audits</h3>
                      <p className="text-sm text-gray-600 mb-3">NFT platform security</p>
                      <Badge>From $3,000</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
