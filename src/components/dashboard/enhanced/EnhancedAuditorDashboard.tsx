import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LoadingState } from '@/components/ui/loading-states';
import { 
  Shield, 
  Brain, 
  Target, 
  TrendingUp, 
  Users, 
  Clock, 
  FileText, 
  Download, 
  Copy, 
  Play, 
  Loader2, 
  Eye, 
  Settings, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Zap,
  BarChart3,
  PieChart,
  Calendar,
  Award,
  Star,
  Globe,
  Code,
  MessageSquare,
  Building2,
  Network,
  Lightbulb,
  Sparkles,
  BookOpen,
  Home,
  Plus,
  ArrowRight,
  DollarSign,
  AlertCircle,
  Trophy
} from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/auth";
import { Tables } from "@/integrations/supabase/types";
import AuditorProjectBrowser from "@/components/auditor-parameters/AuditorProjectBrowser";
import AuditorNavigationGuide from "@/components/navigation/AuditorNavigationGuide";
import { NewAuditorOnboarding } from "@/components/onboarding/NewAuditorOnboarding";
import { PersonalizedWelcome } from "@/components/onboarding/PersonalizedWelcome";
import { PersonalizedWelcomeRefined } from "@/components/onboarding/PersonalizedWelcomeRefined";

// Types for real data
type AuditRequest = Tables<'audit_requests'>;
type AuditorProfile = Tables<'auditor_profiles'>;
type AuditProgress = Tables<'audit_progress'>;
type AuditFinding = Tables<'audit_findings'>;

interface AuditProject {
  id: string;
  name: string;
  client: string;
  status: string;
  progress: number;
  priority: string;
  deadline: string;
  teamSize: number;
  vulnerabilities: number;
  revenue: number;
  aiAssisted: boolean;
}

interface PerformanceMetrics {
  totalAudits: number;
  completedAudits: number;
  averageScore: number;
  clientSatisfaction: number;
  aiAdoption: number;
  efficiencyGain: number;
  accuracy: number;
  responseTime: number;
}

interface RecentActivity {
  id: string;
  type: string;
  title: string;
  description: string;
  timestamp: Date;
  priority: string;
}

interface LearningProgress {
  id: string;
  skill: string;
  progress: number;
  level: string;
  nextMilestone: string;
  estimatedCompletion: string;
}

export function EnhancedAuditorDashboard() {
  // State management
  const [activeTab, setActiveTab] = useState('dashboard');
  const [projects, setProjects] = useState<AuditProject[]>([]);
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    totalAudits: 0,
    completedAudits: 0,
    averageScore: 0,
    clientSatisfaction: 0,
    aiAdoption: 0,
    efficiencyGain: 0,
    accuracy: 0,
    responseTime: 0
  });
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [learningProgress, setLearningProgress] = useState<LearningProgress[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [auditorProfile, setAuditorProfile] = useState<AuditorProfile | null>(null);
  const [isNewUser, setIsNewUser] = useState(false);
  const [feedbackList, setFeedbackList] = useState<any[]>([]);
  const [feedbackLoading, setFeedbackLoading] = useState(true);
  const [averageRating, setAverageRating] = useState<number | null>(null);

  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchRealData();
    }
  }, [user]);

  const fetchRealData = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      // Fetch auditor profile
      const { data: profile, error: profileError } = await supabase
        .from('auditor_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        console.error('Error fetching auditor profile:', profileError);
      }

      setAuditorProfile(profile);

      // Check if this is a new user (no profile exists)
      const isNewAuditor = !profile;
      setIsNewUser(isNewAuditor);

      if (isNewAuditor) {
        // For new users, initialize with empty data
        setProjects([]);
        setMetrics({
          totalAudits: 0,
          completedAudits: 0,
          averageScore: 0,
          clientSatisfaction: 0,
          aiAdoption: 0,
          efficiencyGain: 0,
          accuracy: 0,
          responseTime: 0
        });
        setRecentActivity([]);
        setLearningProgress([]);
        setIsLoading(false);
        return;
      }

      // Fetch real audit data for existing auditors
      const [auditRequestsResponse, progressResponse, findingsResponse] = await Promise.all([
        supabase
          .from('audit_requests')
          .select('*')
          .eq('assigned_auditor_id', user.id)
          .order('created_at', { ascending: false }),
        supabase
          .from('audit_progress')
          .select('*')
          .eq('auditor_id', user.id)
          .order('updated_at', { ascending: false }),
        supabase
          .from('audit_findings')
          .select('*')
          .eq('auditor_id', user.id)
          .order('created_at', { ascending: false })
      ]);

      const { data: auditRequests } = auditRequestsResponse;
      const { data: auditProgressData } = progressResponse;
      const { data: findings } = findingsResponse;

      // Transform real data into dashboard format
      const transformedProjects: AuditProject[] = (auditRequests || []).map(request => ({
        id: request.id,
        name: request.project_name || 'Unnamed Project',
        client: request.client_id || 'Unknown Client',
        status: request.status || 'pending',
        progress: getProgressForRequest(request.id, auditProgressData || []),
        priority: request.urgency_level || 'medium',
        deadline: request.deadline || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        teamSize: 1,
        vulnerabilities: (findings || []).filter(f => f.audit_request_id === request.id).length,
        revenue: request.budget || 0,
        aiAssisted: true
      }));

      // Calculate real metrics
      const realMetrics: PerformanceMetrics = {
        totalAudits: auditRequests?.length || 0,
        completedAudits: auditRequests?.filter(r => r.status === 'completed').length || 0,
        averageScore: calculateAverageScore(findings || []),
        clientSatisfaction: 95, // Could be calculated from client feedback
        aiAdoption: 100, // Assuming all audits use AI tools
        efficiencyGain: calculateEfficiencyGain(auditProgressData || []),
        accuracy: calculateAccuracy(findings || []),
        responseTime: 1.2 // Could be calculated from response times
      };

      // Create recent activity from real data
      const realActivity: RecentActivity[] = [
        ...createActivityFromFindings(findings || []),
        ...createActivityFromProgress(auditProgressData || []),
        ...createActivityFromRequests(auditRequests || [])
      ].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()).slice(0, 10);

      setProjects(transformedProjects);
      setMetrics(realMetrics);
      setRecentActivity(realActivity);
      
      // Initialize learning progress for existing users
      setLearningProgress([
        {
          id: '1',
          skill: 'Smart Contract Security',
          progress: Math.min(((findings || []).length * 10), 100),
          level: getSkillLevel((findings || []).length),
          nextMilestone: 'Advanced vulnerability detection',
          estimatedCompletion: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        }
      ]);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast({
        title: "Error loading dashboard",
        description: "Please refresh the page to try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchFeedback = async () => {
      if (!user) return;
      setFeedbackLoading(true);
      const { data, error } = await supabase
        .from('audit_feedback')
        .select('*')
        .in('audit_request_id', projects.filter(p => p.status === 'completed').map(p => p.id));
      if (!error && data) {
        setFeedbackList(data);
        if (data.length > 0) {
          setAverageRating(
            Math.round((data.reduce((sum, f) => sum + (f.rating || 0), 0) / data.length) * 10) / 10
          );
        } else {
          setAverageRating(null);
        }
      }
      setFeedbackLoading(false);
    };
    if (projects.length > 0) fetchFeedback();
  }, [user, projects]);

  // Helper functions for data transformation
  const getProgressForRequest = (requestId: string, progressData: AuditProgress[]): number => {
    const progress = progressData.find(p => p.audit_request_id === requestId);
    if (!progress) return 0;
    
    const phases = progress.phase_details as any;
    if (!phases || typeof phases !== 'object') return 0;
    
    const totalSteps = Object.keys(phases).length;
    const completedSteps = Object.values(phases).filter((step: any) => step?.completed).length;
    
    return totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;
  };

  const calculateAverageScore = (findings: AuditFinding[]): number => {
    if (findings.length === 0) return 0;
    const criticalCount = findings.filter(f => f.severity === 'critical').length;
    const highCount = findings.filter(f => f.severity === 'high').length;
    const totalFindings = findings.length;
    
    // Simple scoring: fewer critical/high severity findings = higher score
    const score = Math.max(0, 100 - (criticalCount * 20) - (highCount * 10) - (totalFindings * 2));
    return Math.round(score);
  };

  const calculateEfficiencyGain = (progressData: AuditProgress[]): number => {
    // Simple calculation based on progress completion rate
    if (progressData.length === 0) return 0;
    
    const completedPhases = progressData.filter(p => {
      const phases = p.phase_details as any;
      return phases && Object.values(phases).some((step: any) => step?.completed);
    }).length;
    
    return Math.min(Math.round((completedPhases / progressData.length) * 50), 50);
  };

  const calculateAccuracy = (findings: AuditFinding[]): number => {
    if (findings.length === 0) return 100;
    
    // Assume high accuracy if vulnerabilities are being found and documented
    const validFindings = findings.filter(f => f.description && f.description.length > 20).length;
    return Math.round((validFindings / findings.length) * 100);
  };

  const getSkillLevel = (findingsCount: number): string => {
    if (findingsCount < 5) return 'beginner';
    if (findingsCount < 15) return 'intermediate';
    return 'advanced';
  };

  const createActivityFromFindings = (findings: AuditFinding[]): RecentActivity[] => {
    return findings.slice(0, 3).map((finding, index) => ({
      id: `finding-${finding.id}`,
      type: 'vulnerability_found',
      title: `${finding.severity?.toUpperCase()} Vulnerability Detected`,
      description: finding.title || 'Vulnerability found in smart contract',
      timestamp: new Date(finding.created_at || Date.now() - index * 3600000),
      priority: finding.severity === 'critical' ? 'high' : 'medium'
    }));
  };

  const createActivityFromProgress = (progressData: AuditProgress[]): RecentActivity[] => {
    return progressData.slice(0, 2).map((progress, index) => ({
      id: `progress-${progress.id}`,
      type: 'audit_progress',
      title: `Audit Phase Updated`,
      description: `Progress updated for audit request`,
      timestamp: new Date(progress.updated_at || Date.now() - index * 7200000),
      priority: 'medium'
    }));
  };

  const createActivityFromRequests = (requests: AuditRequest[]): RecentActivity[] => {
    return requests.slice(0, 2).map((request, index) => ({
      id: `request-${request.id}`,
      type: request.status === 'completed' ? 'audit_completed' : 'audit_assigned',
      title: request.status === 'completed' ? 'Audit Completed' : 'New Audit Assigned',
      description: `${request.project_name} - ${request.client_id}`,
      timestamp: new Date(request.updated_at || Date.now() - index * 14400000),
      priority: 'high'
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in_progress': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'on_hold': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  // Empty State Component for existing users with no data
  const EmptyDashboard = () => (
    <div className="space-y-6">
      <div className="text-center py-12">
        <Shield className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to Start Auditing</h3>
        <p className="text-gray-600 mb-6">
          Your profile is complete! Browse available projects to begin your auditing journey.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild>
            <Link to="/auditor/opportunities">
              <Globe className="h-4 w-4 mr-2" />
              Browse Projects
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/phase4">
              <Shield className="h-4 w-4 mr-2" />
              AI Tools
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-2 rounded-md bg-blue-100">
                <FileText className="h-4 w-4 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Audits</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-2 rounded-md bg-green-100">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-2 rounded-md bg-yellow-100">
                <Star className="h-4 w-4 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Rating</p>
                <p className="text-2xl font-bold text-gray-900">-</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-2 rounded-md bg-purple-100">
                <DollarSign className="h-4 w-4 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Earnings</p>
                <p className="text-2xl font-bold text-gray-900">$0</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 rounded"></div>
              ))}
            </div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
          <div>
              <h1 className="text-2xl font-bold text-gray-900">Auditor Dashboard</h1>
              <p className="text-gray-600">
                {isNewUser 
                  ? "Welcome! Let's get you started with your first audit project." 
                  : `Welcome back! You have ${metrics.totalAudits} total audits.`
                }
            </p>
          </div>
            {!isNewUser && auditorProfile && (
              <div className="flex items-center space-x-4">
                <Badge variant="outline" className="px-3 py-1">
                  <Shield className="h-4 w-4 mr-1" />
                  {auditorProfile.availability_status || 'Available'}
                </Badge>
              </div>
            )}
          </div>
        </div>
        </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            <TabsTrigger value="navigation">Navigation Guide</TabsTrigger>
            <TabsTrigger value="ai-tools">AI Tools</TabsTrigger>
            <TabsTrigger value="feedback">Feedback & Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            {isNewUser ? <PersonalizedWelcomeRefined /> : (
              projects.length === 0 ? <EmptyDashboard /> : (
                <div className="space-y-6">
                  {/* Overview Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
                      <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                            <p className="text-sm font-medium text-gray-600">Active Audits</p>
                            <p className="text-2xl font-bold text-gray-900">{projects.length}</p>
                  </div>
                          <div className="bg-blue-100 rounded-full p-3">
                            <Shield className="h-6 w-6 text-blue-600" />
                          </div>
                </div>
              </CardContent>
            </Card>

            <Card>
                      <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                            <p className="text-sm font-medium text-gray-600">Completed Audits</p>
                            <p className="text-2xl font-bold text-gray-900">{projects.filter(p => p.status === 'completed').length}</p>
                  </div>
                          <div className="bg-green-100 rounded-full p-3">
                            <CheckCircle className="h-6 w-6 text-green-600" />
                          </div>
                </div>
              </CardContent>
            </Card>

            <Card>
                      <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                            <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                            <p className="text-2xl font-bold text-gray-900">
                              ${projects.reduce((sum, p) => sum + p.revenue, 0).toLocaleString()}
                    </p>
                  </div>
                          <div className="bg-yellow-100 rounded-full p-3">
                            <DollarSign className="h-6 w-6 text-yellow-600" />
                          </div>
                </div>
              </CardContent>
            </Card>

            <Card>
                      <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                            <p className="text-sm font-medium text-gray-600">Success Rate</p>
                            <p className="text-2xl font-bold text-gray-900">
                              {Math.round((projects.filter(p => p.status === 'completed').length / projects.length) * 100)}%
                            </p>
                  </div>
                          <div className="bg-purple-100 rounded-full p-3">
                            <TrendingUp className="h-6 w-6 text-purple-600" />
                          </div>
                </div>
              </CardContent>
            </Card>
                  </div>

                  {/* Active Projects */}
                    <Card>
                      <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <Trophy className="h-5 w-5 text-yellow-600" />
                          Active Projects
                        </span>
                        <Button variant="outline" size="sm" asChild>
                          <Link to="/auditor/opportunities">
                            View All
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Link>
                        </Button>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                        {projects.slice(0, 3).map((project) => (
                          <div key={project.id} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-semibold text-gray-900">{project.name}</h3>
                              <Badge className={`px-2 py-1 text-xs ${getStatusColor(project.status)}`}>
                                {project.status.replace('_', ' ')}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                {project.client}
                          </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {new Date(project.deadline).toLocaleDateString()}
                            </div>
                              <div className="flex items-center gap-1">
                                <AlertCircle className={`h-4 w-4 ${getPriorityColor(project.priority)}`} />
                                {project.priority} priority
                          </div>
                              <div className="flex items-center gap-1">
                                <DollarSign className="h-4 w-4" />
                                ${project.revenue.toLocaleString()}
                            </div>
                          </div>
                            <div className="mt-3">
                              <div className="flex items-center justify-between text-sm mb-1">
                                <span>Progress</span>
                                <span>{project.progress}%</span>
                            </div>
                              <Progress value={project.progress} className="h-2" />
                          </div>
                          </div>
                        ))}
                        </div>
                      </CardContent>
                    </Card>

                  {/* Recent Activity */}
                  {recentActivity.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Clock className="h-5 w-5 text-blue-600" />
                          Recent Activity
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {recentActivity.slice(0, 5).map((activity) => (
                            <div key={activity.id} className="flex items-start gap-3">
                              <div className={`w-2 h-2 rounded-full mt-2 ${
                                activity.priority === 'high' ? 'bg-red-400' :
                                activity.priority === 'medium' ? 'bg-yellow-400' : 'bg-green-400'
                              }`} />
                              <div className="flex-1">
                                <p className="font-medium text-gray-900">{activity.title}</p>
                                <p className="text-sm text-gray-600">{activity.description}</p>
                                <p className="text-xs text-gray-500 mt-1">
                                  {activity.timestamp.toLocaleDateString()} at {activity.timestamp.toLocaleTimeString()}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                              )}
                            </div>
              )
            )}
          </TabsContent>

          <TabsContent value="opportunities">
            <AuditorProjectBrowser />
              </TabsContent>

          <TabsContent value="navigation">
            <AuditorNavigationGuide />
          </TabsContent>

          <TabsContent value="ai-tools">
                    <Card>
                      <CardHeader>
                <CardTitle>AI-Powered Audit Tools</CardTitle>
                <p className="text-gray-600">
                  Access advanced AI tools for comprehensive security analysis
                </p>
                      </CardHeader>
                      <CardContent>
                <Button asChild>
                  <Link to="/phase4">
                    <Shield className="h-4 w-4 mr-2" />
                    Open AI Tools Dashboard
                  </Link>
                </Button>
                      </CardContent>
                    </Card>
          </TabsContent>

          <TabsContent value="feedback">
                    <Card>
                      <CardHeader>
                <CardTitle>Feedback & Reviews</CardTitle>
                {averageRating !== null && (
                  <div className="flex items-center gap-2 mt-2">
                    <span className="font-medium">Average Rating:</span>
                    <span className="flex gap-1">
                      {[1,2,3,4,5].map(n => (
                        <Star key={n} className={n <= Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-300'} fill={n <= Math.round(averageRating) ? 'currentColor' : 'none'} />
                      ))}
                    </span>
                    <span className="text-sm text-gray-500">({averageRating})</span>
                        </div>
                )}
                    </CardHeader>
                    <CardContent>
                {feedbackLoading ? (
                  <div>Loading feedback...</div>
                ) : feedbackList.length === 0 ? (
                  <div className="text-center text-gray-500 py-8">No feedback received yet.</div>
                ) : (
                  <div className="space-y-6">
                    {feedbackList.map(fb => (
                      <div key={fb.id} className="border rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                          {[1,2,3,4,5].map(n => (
                            <Star key={n} className={n <= fb.rating ? 'text-yellow-400' : 'text-gray-300'} fill={n <= fb.rating ? 'currentColor' : 'none'} />
                          ))}
                          <span className="text-xs text-gray-500 ml-2">{new Date(fb.created_at).toLocaleDateString()}</span>
                          </div>
                        <div className="mb-1"><span className="font-semibold">Comments:</span> {fb.comment || '—'}</div>
                        <div className="mb-1"><span className="font-semibold">What did you like most?</span> {fb.like_most || '—'}</div>
                        <div className="mb-1"><span className="font-semibold">What could be improved?</span> {fb.improve || '—'}</div>
                        {fb.screenshot_url && (
                          <div className="mt-2"><img src={fb.screenshot_url} alt="Feedback Screenshot" className="max-w-xs rounded border" /></div>
                        )}
                        </div>
                    ))}
                          </div>
                )}
                    </CardContent>
                  </Card>
              </TabsContent>
          </Tabs>
      </div>
    </div>
  );
}

export default EnhancedAuditorDashboard;
