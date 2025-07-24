
import React, { useState } from 'react';
import { useAuth } from '@/contexts/auth';
import { Helmet } from 'react-helmet-async';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  DollarSign, 
  FileText, 
  Users,
  Star,
  Calendar,
  Eye,
  MessageSquare
} from 'lucide-react';
import DisputeList from '@/components/disputes/DisputeList';
import RaiseDisputeModal from '@/components/disputes/RaiseDisputeModal';

const ProjectDashboard = () => {
  const { user, userProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('active');
  const [showDisputeModal, setShowDisputeModal] = useState(false);
  const [disputeRefreshKey, setDisputeRefreshKey] = useState(0);

  // Mock data for projects
  const projects = [
    {
      id: '1',
      name: 'DeFi Lending Protocol',
      status: 'in_progress',
      auditor: 'Alex Rodriguez',
      auditorAvatar: '/api/placeholder/32/32',
      auditorRating: 4.9,
      progress: 65,
      budget: '$15,000',
      timeline: '3 weeks',
      submittedDate: '2024-01-15',
      expectedCompletion: '2024-02-05',
      blockchain: 'Ethereum',
      scope: ['Smart Contract Security', 'Gas Optimization'],
      lastUpdate: '2 hours ago'
    },
    {
      id: '2',
      name: 'NFT Marketplace V2',
      status: 'matching',
      auditor: null,
      progress: 10,
      budget: '$8,000',
      timeline: '2 weeks',
      submittedDate: '2024-01-20',
      expectedCompletion: '2024-02-10',
      blockchain: 'Polygon',
      scope: ['Smart Contract Security', 'NFT Standards'],
      applicants: 7,
      lastUpdate: '1 day ago'
    },
    {
      id: '3',
      name: 'Cross-Chain Bridge',
      status: 'completed',
      auditor: 'Sarah Chen',
      auditorAvatar: '/api/placeholder/32/32',
      auditorRating: 4.8,
      progress: 100,
      budget: '$25,000',
      timeline: '4 weeks',
      submittedDate: '2023-12-01',
      expectedCompletion: '2023-12-29',
      completedDate: '2023-12-28',
      blockchain: 'Multi-chain',
      scope: ['Bridge Security', 'Multi-chain'],
      finalRating: 5,
      lastUpdate: '1 week ago'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'matching': return 'secondary';
      case 'in_progress': return 'default';
      case 'completed': return 'default';
      case 'cancelled': return 'destructive';
      default: return 'outline';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'matching': return 'Finding Auditor';
      case 'in_progress': return 'In Progress';
      case 'completed': return 'Completed';
      case 'cancelled': return 'Cancelled';
      default: return status;
    }
  };

  const activeProjects = projects.filter(p => p.status === 'in_progress' || p.status === 'matching');
  const completedProjects = projects.filter(p => p.status === 'completed');
  const allProjects = projects;

  const stats = {
    totalProjects: projects.length,
    activeProjects: activeProjects.length,
    completedProjects: completedProjects.length,
    totalSpent: projects.reduce((sum, p) => sum + parseInt(p.budget.replace(/[$,]/g, '')), 0)
  };

  const renderProjectCard = (project: any) => (
    <Card key={project.id} className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{project.name}</CardTitle>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant={getStatusColor(project.status) as any}>
                {getStatusText(project.status)}
              </Badge>
              <span className="text-sm text-muted-foreground">{project.blockchain}</span>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-1" />
            View
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {project.auditor && (
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <img 
              src={project.auditorAvatar} 
              alt={project.auditor}
              className="w-8 h-8 rounded-full"
            />
            <div className="flex-1">
              <p className="font-medium text-sm">{project.auditor}</p>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-muted-foreground">{project.auditorRating}</span>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              <MessageSquare className="h-4 w-4" />
            </Button>
          </div>
        )}

        {project.status === 'matching' && (
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="font-medium text-blue-900">Finding the perfect auditor</p>
            <p className="text-sm text-blue-700 mt-1">
              {project.applicants} auditors have applied
            </p>
            <Button variant="outline" size="sm" className="mt-2">
              Review Applications
            </Button>
          </div>
        )}

        {project.status === 'in_progress' && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-muted-foreground">{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-2" />
          </div>
        )}

        {project.status === 'completed' && project.finalRating && (
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="font-medium text-green-900">Audit Complete</span>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-4 w-4 ${i < project.finalRating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                />
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-green-600" />
            <span>{project.budget}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-blue-600" />
            <span>{project.timeline}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-purple-600" />
            <span>
              {project.status === 'completed' ? 
                `Completed ${project.completedDate}` : 
                `Due ${project.expectedCompletion}`
              }
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-orange-600" />
            <span>{project.scope.length} scope areas</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {project.scope.map((item: string) => (
            <Badge key={item} variant="outline" className="text-xs">
              {item}
            </Badge>
          ))}
        </div>

        <div className="text-xs text-muted-foreground">
          Last updated: {project.lastUpdate}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <>
      <Helmet>
        <title>Project Dashboard | Hawkly</title>
        <meta name="description" content="Manage your security audit projects" />
      </Helmet>

      <StandardLayout title="Project Dashboard" description="Manage your security audit projects">
        <div className="container py-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold">Project Dashboard</h1>
              <p className="text-muted-foreground mt-2">
                Welcome back, {userProfile?.full_name || user?.email}
              </p>
            </div>
            <Button asChild>
              <a href="/submit-project">
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </a>
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-2xl font-bold">{stats.totalProjects}</p>
                    <p className="text-sm text-muted-foreground">Total Projects</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-orange-600" />
                  <div>
                    <p className="text-2xl font-bold">{stats.activeProjects}</p>
                    <p className="text-sm text-muted-foreground">Active Projects</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-2xl font-bold">{stats.completedProjects}</p>
                    <p className="text-sm text-muted-foreground">Completed</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="text-2xl font-bold">${stats.totalSpent.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Total Invested</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Projects Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="active">Active Projects ({activeProjects.length})</TabsTrigger>
              <TabsTrigger value="completed">Completed ({completedProjects.length})</TabsTrigger>
              <TabsTrigger value="all">All Projects ({allProjects.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="mt-6">
              {activeProjects.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {activeProjects.map(renderProjectCard)}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">No active projects</h3>
                    <p className="text-muted-foreground mb-4">
                      Submit your first project to get started with security audits.
                    </p>
                    <Button asChild>
                      <a href="/submit-project">Submit Project</a>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="completed" className="mt-6">
              {completedProjects.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {completedProjects.map(renderProjectCard)}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">No completed projects yet</h3>
                    <p className="text-muted-foreground">
                      Your completed audits will appear here.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="all" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {allProjects.map(renderProjectCard)}
              </div>
            </TabsContent>
          </Tabs>

          {/* Disputes Section */}
          <div className="mt-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-accent-cyan">Disputes</h2>
              <Button onClick={() => setShowDisputeModal(true)} variant="default">Raise Dispute</Button>
            </div>
            <DisputeList key={disputeRefreshKey} projectId={projects[0]?.id || ''} onViewDispute={() => {}} />
            {showDisputeModal && (
              <RaiseDisputeModal
                projectId={projects[0]?.id || ''}
                raisedById={user?.id || 'user-123'}
                againstId={'auditor-456'} // TODO: Use real auditor ID when available
                onClose={() => {
                  setShowDisputeModal(false);
                  setDisputeRefreshKey((k) => k + 1);
                }}
              />
            )}
          </div>
        </div>
      </StandardLayout>
    </>
  );
};

export default ProjectDashboard;
