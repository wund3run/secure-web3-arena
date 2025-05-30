import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  MessageCircle, 
  CheckCircle,
  AlertTriangle,
  Star,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '@/contexts/auth/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { OnboardingTutorial } from '@/components/onboarding/OnboardingTutorial';

interface DashboardStats {
  totalAudits: number;
  activeAudits: number;
  completedAudits: number;
  totalEarnings: number;
  averageRating: number;
  responseTime: number;
}

export function EnhancedUserDashboard() {
  const { user } = useAuth();
  const [userType, setUserType] = useState<'client' | 'auditor' | null>(null);
  const [stats, setStats] = useState<DashboardStats>({
    totalAudits: 0,
    activeAudits: 0,
    completedAudits: 0,
    totalEarnings: 0,
    averageRating: 0,
    responseTime: 0
  });
  const [showTutorial, setShowTutorial] = useState(false);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const loadUserData = async () => {
      try {
        // Get user role
        const { data: roleData } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .eq('is_active', true)
          .single();

        const userRole = roleData?.role;
        setUserType(userRole === 'auditor' ? 'auditor' : 'client');

        // Check if first time user
        const hasSeenTutorial = localStorage.getItem(`hawkly_tutorial_${user.id}`);
        if (!hasSeenTutorial) {
          setShowTutorial(true);
        }

        // Load stats based on user type
        if (userRole === 'auditor') {
          await loadAuditorStats();
        } else {
          await loadClientStats();
        }

        await loadRecentActivity();
      } catch (error) {
        console.error('Failed to load user data:', error);
        setError('Failed to load user data');
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [user]);

  const loadAuditorStats = async () => {
    try {
      // Get auditor profile
      const { data: auditorProfile } = await supabase
        .from('auditor_profiles')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      // Get audit requests assigned to this auditor
      const { data: audits } = await supabase
        .from('audit_requests')
        .select('*')
        .eq('assigned_auditor_id', user?.id);

      // Get reviews
      const { data: reviews } = await supabase
        .from('auditor_reviews')
        .select('rating')
        .eq('auditor_id', user?.id);

      const activeAudits = audits?.filter(a => ['assigned', 'in_progress'].includes(a.status)).length || 0;
      const completedAudits = audits?.filter(a => a.status === 'completed').length || 0;
      const avgRating = reviews?.length ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;

      setStats({
        totalAudits: audits?.length || 0,
        activeAudits,
        completedAudits,
        totalEarnings: completedAudits * 5000, // Mock calculation
        averageRating: avgRating,
        responseTime: auditorProfile?.response_time_hours || 24
      });
    } catch (error) {
      console.error('Failed to load auditor stats:', error);
      setError('Failed to load auditor stats');
    }
  };

  const loadClientStats = async () => {
    try {
      // Get audit requests by this client
      const { data: audits } = await supabase
        .from('audit_requests')
        .select('*')
        .eq('client_id', user?.id);

      const activeAudits = audits?.filter(a => ['pending', 'assigned', 'in_progress'].includes(a.status)).length || 0;
      const completedAudits = audits?.filter(a => a.status === 'completed').length || 0;
      const totalSpent = audits?.reduce((sum, audit) => sum + (audit.budget || 0), 0) || 0;

      setStats({
        totalAudits: audits?.length || 0,
        activeAudits,
        completedAudits,
        totalEarnings: totalSpent,
        averageRating: 4.8, // Mock client satisfaction
        responseTime: 2 // Mock average response time from auditors
      });
    } catch (error) {
      console.error('Failed to load client stats:', error);
      setError('Failed to load client stats');
    }
  };

  const loadRecentActivity = async () => {
    try {
      // Get recent notifications
      const { data: notifications } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })
        .limit(5);

      setRecentActivity(notifications || []);
    } catch (error) {
      console.error('Failed to load recent activity:', error);
      setError('Failed to load recent activity');
    }
  };

  const handleTutorialComplete = () => {
    setShowTutorial(false);
    localStorage.setItem(`hawkly_tutorial_${user?.id}`, 'completed');
  };

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    // Trigger data reload
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-6 text-center space-y-4">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto" />
            <div>
              <h3 className="font-semibold text-lg">Unable to Load Dashboard</h3>
              <p className="text-sm text-muted-foreground mt-1">{error}</p>
            </div>
            <Button onClick={handleRetry}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      {showTutorial && userType && (
        <OnboardingTutorial
          userType={userType}
          onComplete={handleTutorialComplete}
        />
      )}

      <div className="container mx-auto p-6 space-y-6">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Welcome back! 👋
            </h1>
            <p className="text-muted-foreground">
              {userType === 'auditor' 
                ? 'Ready to secure the next Web3 project?' 
                : 'Let\'s get your project audited by experts.'}
            </p>
          </div>
          <Button 
            onClick={() => setShowTutorial(true)}
            variant="outline"
          >
            View Tutorial
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {userType === 'auditor' ? 'Total Audits' : 'Projects Submitted'}
                  </p>
                  <p className="text-3xl font-bold">{stats.totalAudits}</p>
                </div>
                <Shield className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Active Projects
                  </p>
                  <p className="text-3xl font-bold">{stats.activeAudits}</p>
                </div>
                <Clock className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {userType === 'auditor' ? 'Total Earned' : 'Total Invested'}
                  </p>
                  <p className="text-3xl font-bold">${stats.totalEarnings.toLocaleString()}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {userType === 'auditor' ? 'Rating' : 'Satisfaction'}
                  </p>
                  <div className="flex items-center gap-1">
                    <p className="text-3xl font-bold">{stats.averageRating.toFixed(1)}</p>
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  </div>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {userType === 'auditor' ? (
                <>
                  <Button className="w-full justify-start" variant="outline">
                    <Shield className="h-4 w-4 mr-2" />
                    View Available Projects
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Clock className="h-4 w-4 mr-2" />
                    Update Availability
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Star className="h-4 w-4 mr-2" />
                    Update Profile
                  </Button>
                </>
              ) : (
                <>
                  <Button className="w-full justify-start">
                    <Shield className="h-4 w-4 mr-2" />
                    Request New Audit
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message Auditors
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    View Reports
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              {recentActivity.length > 0 ? (
                <div className="space-y-3">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                      <div className="flex-1">
                        <p className="font-medium">{activity.title}</p>
                        <p className="text-sm text-muted-foreground">{activity.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(activity.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      {!activity.is_read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-4">
                  No recent activity
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Progress Section */}
        {userType === 'auditor' && (
          <Card>
            <CardHeader>
              <CardTitle>Profile Completion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Profile Setup</span>
                  <Badge variant="secondary">80%</Badge>
                </div>
                <Progress value={80} />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm">Basic Information</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm">Skills & Experience</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    <span className="text-sm">Portfolio Upload</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}
