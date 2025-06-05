
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Star, 
  DollarSign, 
  Clock, 
  Trophy, 
  TrendingUp, 
  Calendar, 
  Award,
  Briefcase,
  Users,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  BookOpen
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { EnhancedWelcomeMessage } from '../EnhancedWelcomeMessage';
import { AuditorService, type AuditorPerformanceMetrics, type ActiveAudit, type AuditorOpportunity } from '@/services/auditorService';

export function EnhancedAuditorDashboard() {
  const { user, userProfile } = useAuth();
  const [performanceMetrics, setPerformanceMetrics] = useState<AuditorPerformanceMetrics>({
    totalEarnings: 0,
    completedAudits: 0,
    averageRating: 0,
    responseTime: 0,
    successRate: 0,
    pendingPayments: 0
  });
  const [activeAudits, setActiveAudits] = useState<ActiveAudit[]>([]);
  const [opportunities, setOpportunities] = useState<AuditorOpportunity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      loadDashboardData();
    }
  }, [user?.id]);

  const loadDashboardData = async () => {
    if (!user?.id) return;
    
    setLoading(true);
    try {
      const [metrics, audits, opps] = await Promise.all([
        AuditorService.getPerformanceMetrics(user.id),
        AuditorService.getActiveAudits(user.id),
        AuditorService.getOpportunities(user.id)
      ]);

      setPerformanceMetrics(metrics);
      setActiveAudits(audits);
      setOpportunities(opps);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyForOpportunity = async (opportunityId: string) => {
    if (!user?.id) return;
    
    const success = await AuditorService.applyForOpportunity(opportunityId, user.id);
    if (success) {
      // Refresh opportunities to remove the applied one
      const updatedOpportunities = await AuditorService.getOpportunities(user.id);
      setOpportunities(updatedOpportunities);
    }
  };

  if (loading) {
    return (
      <div className="container py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-6 space-y-6">
      <EnhancedWelcomeMessage />

      {/* Performance Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ${performanceMetrics.totalEarnings.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              +${Math.round(performanceMetrics.pendingPayments).toLocaleString()} pending
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {performanceMetrics.averageRating.toFixed(1)}
            </div>
            <div className="flex items-center mt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-3 w-3 ${
                    star <= performanceMetrics.averageRating
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Audits</CardTitle>
            <Trophy className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceMetrics.completedAudits}</div>
            <p className="text-xs text-muted-foreground">
              {performanceMetrics.successRate}% success rate
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceMetrics.responseTime}h</div>
            <p className="text-xs text-muted-foreground">Average response time</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active-audits" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="active-audits">Active Audits</TabsTrigger>
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="development">Development</TabsTrigger>
        </TabsList>

        <TabsContent value="active-audits" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Active Projects</h3>
            <Button asChild variant="outline">
              <Link to="/marketplace">
                <Briefcase className="mr-2 h-4 w-4" />
                Browse More Projects
              </Link>
            </Button>
          </div>

          {activeAudits.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <Briefcase className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No Active Audits</h3>
                <p className="text-muted-foreground mb-4">
                  You don't have any active audits. Browse opportunities to get started!
                </p>
                <Button asChild>
                  <Link to="/marketplace">Browse Opportunities</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {activeAudits.map((audit) => (
                <Card key={audit.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{audit.project_name}</CardTitle>
                      <Badge variant={audit.status === 'in_progress' ? 'default' : 'secondary'}>
                        {audit.current_phase}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Client: {audit.client_name}</span>
                      <span>•</span>
                      <span>Due: {new Date(audit.deadline).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>${audit.payment_amount.toLocaleString()}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Progress</span>
                          <span>{audit.progress}%</span>
                        </div>
                        <Progress value={audit.progress} className="h-2" />
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge variant={audit.complexity === 'High' ? 'destructive' : 'outline'}>
                          {audit.complexity} Complexity
                        </Badge>
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/audit/${audit.id}`}>
                            Continue Audit
                            <ArrowRight className="ml-2 h-3 w-3" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="opportunities" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Available Opportunities</h3>
            <Button asChild variant="outline">
              <Link to="/marketplace">
                <Users className="mr-2 h-4 w-4" />
                View All Projects
              </Link>
            </Button>
          </div>

          {opportunities.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No New Opportunities</h3>
                <p className="text-muted-foreground mb-4">
                  Check back later for new audit opportunities that match your expertise.
                </p>
                <Button asChild variant="outline">
                  <Link to="/profile">Update Your Skills</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {opportunities.map((opportunity) => (
                <Card key={opportunity.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{opportunity.project_name}</CardTitle>
                        <p className="text-sm text-muted-foreground">by {opportunity.client_name}</p>
                      </div>
                      <Badge variant="secondary">${opportunity.budget.toLocaleString()}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {opportunity.description}
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex gap-2">
                        <Badge variant="outline">{opportunity.blockchain}</Badge>
                        <Badge variant="outline">{opportunity.complexity}</Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {opportunity.estimated_duration} days
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        Deadline: {new Date(opportunity.deadline).toLocaleDateString()}
                      </span>
                      <Button 
                        size="sm" 
                        onClick={() => handleApplyForOpportunity(opportunity.id)}
                      >
                        Apply Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Earnings Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Total Earned</span>
                  <span className="font-semibold text-green-600">
                    ${performanceMetrics.totalEarnings.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Pending Payments</span>
                  <span className="font-semibold text-orange-600">
                    ${Math.round(performanceMetrics.pendingPayments).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Average per Audit</span>
                  <span className="font-semibold">
                    ${performanceMetrics.completedAudits > 0 
                      ? Math.round(performanceMetrics.totalEarnings / performanceMetrics.completedAudits).toLocaleString()
                      : '0'}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Success Rate</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{performanceMetrics.successRate}%</span>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Avg. Response Time</span>
                  <span className="font-semibold">{performanceMetrics.responseTime}h</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Client Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{performanceMetrics.averageRating.toFixed(1)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="development" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Professional Development
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Smart Contract Security</span>
                  <Badge>Expert</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>DeFi Protocols</span>
                  <Badge variant="secondary">Advanced</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Cross-Chain Security</span>
                  <Badge variant="outline">Intermediate</Badge>
                </div>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link to="/profile">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Update Skills
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Learning Resources
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link to="/guidelines">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Audit Guidelines
                  </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link to="/resources">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Security Resources
                  </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link to="/community">
                    <Users className="mr-2 h-4 w-4" />
                    Community Forum
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
