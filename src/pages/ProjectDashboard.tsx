import React, { useState } from 'react';
import { useAuth } from '@/contexts/auth';
import { Helmet } from 'react-helmet-async';
import { ProductionLayout } from '@/components/layout/ProductionLayout';
import { HawklyCard, ProgressIndicator, LiveMetric, SecurityBadge } from '@/components/ui/hawkly-components';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
  MessageSquare,
  Filter,
  SortAsc,
  Activity
} from 'lucide-react';
import DisputeList from '@/components/disputes/DisputeList';
import RaiseDisputeModal from '@/components/disputes/RaiseDisputeModal';

const ProjectDashboard: React.FC = () => {
  const { user, userProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('active');
  const [showDisputeModal, setShowDisputeModal] = useState(false);
  const [disputeRefreshKey, setDisputeRefreshKey] = useState(0);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Enhanced projects data
  const projects = [
    {
      id: '1',
      name: 'DeFi Lending Protocol',
      status: 'in_progress',
      auditor: 'Alex Rodriguez',
      auditorAvatar: '/api/placeholder/32/32',
      auditorRating: 4.9,
      securityLevel: 'enterprise',
      progress: 65,
      budget: '$15,000',
      timeline: '3 weeks',
      submittedDate: '2024-01-15',
      expectedCompletion: '2024-02-05',
      blockchain: 'Ethereum',
      scope: ['Smart Contract Security', 'Gas Optimization'],
      lastUpdate: '2 hours ago',
      trend: 'up'
    },
    // Other project data can be added here
  ];

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'matching': return 'text-[#ffd553]';
      case 'in_progress': return 'text-[#32d9fa]';
      case 'completed': return 'text-[#2de08e]';
      case 'cancelled': return 'text-[#fc3574]';
      default: return 'text-[#8391ad]';
    }
  };

  const activeProjects = projects.filter(p => p.status === 'in_progress' || p.status === 'matching');
  const completedProjects = projects.filter(p => p.status === 'completed');

  // Enhanced statistics with new metrics
  const stats = {
    totalProjects: projects.length,
    activeProjects: activeProjects.length,
    completedProjects: completedProjects.length,
    totalSpent: projects.reduce((sum, p) => sum + parseInt(p.budget.replace(/[$,]/g, '')), 0),
    averageRating: projects
      .filter(p => p.auditorRating)
      .reduce((sum, p) => sum + p.auditorRating, 0) / completedProjects.length || 0,
    onTimeCompletion: completedProjects
      .filter(p => new Date(p.submittedDate) <= new Date(p.expectedCompletion))
      .length / completedProjects.length * 100
  };

  const renderProjectCard = (project: any) => (
    <HawklyCard 
      key={project.id} 
      variant="glass" 
      elevation="subtle"
      interactive
      className="hover:shadow-lg transition-all duration-200"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">{project.name}</h3>
            <div className="flex items-center gap-3">
              <SecurityBadge 
                level={project.securityLevel} 
                verified={true} 
                size="sm" 
              />
              <span className={getStatusColor(project.status)}>
                {project.status === 'in_progress' ? 'In Progress' :
                 project.status === 'completed' ? 'Completed' :
                 'Finding Auditor'}
              </span>
            </div>
          </div>
          <Button variant="outline" size="sm" className="gap-2 bg-[#272e43] border-[#23283e] text-[#32d9fa]">
            <Eye className="w-4 h-4" />
            View
          </Button>
        </div>
        
        {project.auditor ? (
          <div className="flex items-center gap-3 p-3 bg-[#272e43] rounded-lg mb-4">
            <img 
              src={project.auditorAvatar} 
              alt={project.auditor}
              className="w-8 h-8 rounded-full border border-[#23283e]"
            />
            <div className="flex-1">
              <p className="font-medium text-white">{project.auditor}</p>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-[#ffd553] text-[#ffd553]" />
                <span className="text-xs text-[#8391ad]">{project.auditorRating}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-sm text-[#8391ad] mb-4">
            <Users className="h-4 w-4" />
            <span>{project.applicants} auditors applied</span>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 mb-4">
          <LiveMetric
            label="Budget"
            value={project.budget}
            trend={project.trend}
          />
          <LiveMetric
            label="Timeline"
            value={project.timeline}
            trend="stable"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-[#8391ad]">Progress</span>
            <span className="text-white font-medium">{project.progress}%</span>
          </div>
          <ProgressIndicator 
            value={project.progress} 
            max={100}
            glowEffect={project.progress > 75}
          />
        </div>
      </div>
    </HawklyCard>
  );

  return (
    <>
      <Helmet>
        <title>Project Dashboard - Hawkly</title>
      </Helmet>
      <ProductionLayout>
        <div className="container mx-auto py-8 space-y-8 bg-[#0a0d16]">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">Project Dashboard</h1>
              <p className="text-[#8391ad] mt-1">Manage your security audit projects</p>
            </div>
            <Button 
              size="lg" 
              className="gap-2 bg-[#a879ef] hover:bg-[#9165d8] text-white"
            >
              <Plus className="w-5 h-5" />
              New Project
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <HawklyCard variant="glass" elevation="subtle">
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[#8391ad] text-sm">Active Projects</p>
                    <p className="text-2xl font-bold text-white mt-1">{stats.activeProjects}</p>
                  </div>
                  <div className="rounded-full p-2 bg-[#272e43]">
                    <Activity size={20} className="text-[#32d9fa]" />
                  </div>
                </div>
                <div className="mt-4">
                  <ProgressIndicator 
                    value={stats.activeProjects} 
                    max={stats.totalProjects} 
                    glowEffect 
                  />
                </div>
              </div>
            </HawklyCard>

            <HawklyCard variant="glass" elevation="subtle">
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[#8391ad] text-sm">Success Rate</p>
                    <p className="text-2xl font-bold text-white mt-1">
                      {stats.onTimeCompletion.toFixed(1)}%
                    </p>
                  </div>
                  <div className="rounded-full p-2 bg-[#272e43]">
                    <CheckCircle size={20} className="text-[#2de08e]" />
                  </div>
                </div>
                <div className="mt-4">
                  <ProgressIndicator 
                    value={stats.onTimeCompletion} 
                    max={100}
                    glowEffect={stats.onTimeCompletion > 90}
                  />
                </div>
              </div>
            </HawklyCard>

            <HawklyCard variant="glass" elevation="subtle">
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[#8391ad] text-sm">Total Value</p>
                    <p className="text-2xl font-bold text-white mt-1">
                      ${(stats.totalSpent / 1000).toFixed(1)}k
                    </p>
                  </div>
                  <div className="rounded-full p-2 bg-[#272e43]">
                    <DollarSign size={20} className="text-[#a879ef]" />
                  </div>
                </div>
                <div className="mt-4">
                  <LiveMetric
                    label="Monthly Growth"
                    value="+12.5%"
                    trend="up"
                  />
                </div>
              </div>
            </HawklyCard>

            <HawklyCard variant="glass" elevation="subtle">
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[#8391ad] text-sm">Avg Rating</p>
                    <p className="text-2xl font-bold text-white mt-1">
                      {stats.averageRating.toFixed(1)}
                    </p>
                  </div>
                  <div className="rounded-full p-2 bg-[#272e43]">
                    <Star size={20} className="text-[#ffd553]" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i}
                        size={16}
                        className={i < Math.round(stats.averageRating) 
                          ? "fill-[#ffd553] text-[#ffd553]" 
                          : "text-[#272e43]"
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>
            </HawklyCard>
          </div>

          <Tabs defaultValue={activeTab} className="space-y-6" onValueChange={setActiveTab}>
            <div className="flex justify-between items-center">
              <TabsList className="bg-[#1e2332]">
                <TabsTrigger value="active" className="data-[state=active]:bg-[#272e43]">
                  Active Projects
                </TabsTrigger>
                <TabsTrigger value="completed" className="data-[state=active]:bg-[#272e43]">
                  Completed
                </TabsTrigger>
                <TabsTrigger value="all" className="data-[state=active]:bg-[#272e43]">
                  All Projects
                </TabsTrigger>
              </TabsList>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2 bg-[#272e43] border-[#23283e]">
                  <Filter className="w-4 h-4" />
                  Filter
                </Button>
                <Button variant="outline" size="sm" className="gap-2 bg-[#272e43] border-[#23283e]">
                  <SortAsc className="w-4 h-4" />
                  Sort
                </Button>
              </div>
            </div>

            <TabsContent value="active" className="space-y-4">
              {activeProjects.map(renderProjectCard)}
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              {completedProjects.map(renderProjectCard)}
            </TabsContent>

            <TabsContent value="all" className="space-y-4">
              {projects.map(renderProjectCard)}
            </TabsContent>
          </Tabs>
        </div>
      </ProductionLayout>
      
      {showDisputeModal && (
        <RaiseDisputeModal
          projectId={projects[0]?.id || ''}
          raisedById={user?.id || ''}
          againstId={projects[0]?.auditor || ''}
          onClose={() => setShowDisputeModal(false)}
          onDisputeRaised={() => setDisputeRefreshKey(key => key + 1)}
        />
      )}
    </>
  );
};

export default ProjectDashboard;
