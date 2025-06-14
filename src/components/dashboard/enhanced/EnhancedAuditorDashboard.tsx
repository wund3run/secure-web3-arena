import React, { useState } from 'react';
import { useAuth } from '@/contexts/auth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  Users, 
  Briefcase, 
  Target, 
  Shield, 
  Brain,
  MessageSquare,
  FileCode,
  Calendar
} from 'lucide-react';

// Import existing components
import { EnhancedRecentActivity } from '../widgets/enhanced/EnhancedRecentActivity';
import { EnhancedSecurityInsights } from '../widgets/enhanced/EnhancedSecurityInsights';
import { AuditorWorkspace } from './AuditorWorkspace';
import { ProjectMarketplace } from './ProjectMarketplace';
import { TechnicalToolsHub } from './technical-tools/TechnicalToolsHub';
import { AIMatchingEngine } from './ai-matching/AIMatchingEngine';
import { ProfessionalDevelopmentHub } from './professional-development/ProfessionalDevelopmentHub';

// Import new components
import { CollaborationHub } from './collaboration/CollaborationHub';
import { SmartContractAnalyzer } from './smart-analysis/SmartContractAnalyzer';
import { AuditLifecycleManager } from './audit-lifecycle/AuditLifecycleManager';

export const EnhancedAuditorDashboard = () => {
  const { user, userProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock dashboard metrics
  const dashboardMetrics = {
    activeAudits: 3,
    completedAudits: 12,
    totalEarnings: 45000,
    securityScore: 94,
    responseTime: '< 24h',
    clientSatisfaction: 4.8
  };

  const recentActivity = [
    {
      id: '1',
      title: 'Code review completed',
      description: 'Finished security analysis for DeFi protocol',
      timestamp: '2 hours ago',
      type: 'completion'
    },
    {
      id: '2',
      title: 'New project assigned',
      description: 'NFT marketplace audit - high priority',
      timestamp: '5 hours ago',
      type: 'assignment'
    },
    {
      id: '3',
      title: 'Vulnerability discovered',
      description: 'Critical reentrancy issue found in smart contract',
      timestamp: '1 day ago',
      type: 'finding'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome back, {userProfile?.display_name || userProfile?.full_name || 'Auditor'}!
          </h1>
          <p className="text-muted-foreground">
            Your comprehensive security auditing workspace is ready. Let's secure some Web3 projects today.
          </p>
        </div>
        <Badge variant="secondary" className="flex items-center gap-2">
          <Shield className="h-4 w-4" />
          Security Expert
        </Badge>
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Simplified: 5 main tabs, clear labels, no duplicate 'Projects' */}
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="workspace" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            Workspace
          </TabsTrigger>
          <TabsTrigger value="marketplace" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Marketplace
          </TabsTrigger>
          <TabsTrigger value="collaboration" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Collaboration
          </TabsTrigger>
          <TabsTrigger value="tools-growth" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Tools & Growth
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Audits</CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardMetrics.activeAudits}</div>
                <p className="text-xs text-muted-foreground">Currently in progress</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed Audits</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardMetrics.completedAudits}</div>
                <p className="text-xs text-muted-foreground">Successfully finished</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${dashboardMetrics.totalEarnings.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Lifetime earnings</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity and Security Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <EnhancedRecentActivity userId={user?.id || ''} />
            <EnhancedSecurityInsights userId={user?.id || ''} />
          </div>
        </TabsContent>

        {/* Workspace Tab */}
        <TabsContent value="workspace">
          <AuditorWorkspace />
        </TabsContent>

        {/* Marketplace Tab */}
        <TabsContent value="marketplace">
          <ProjectMarketplace />
        </TabsContent>

        {/* Collaboration Tab */}
        <TabsContent value="collaboration">
          <CollaborationHub />
        </TabsContent>

        {/* Tools & Growth Tab, combining analyzer/lifecycle/tools/development for clarity */}
        <TabsContent value="tools-growth">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <SmartContractAnalyzer />
              <AuditLifecycleManager />
            </div>
            <div>
              <TechnicalToolsHub />
              <ProfessionalDevelopmentHub />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
