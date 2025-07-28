import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Target,
  Users,
  Shield,
  Zap,
  FileText,
  HeadphonesIcon,
  Activity,
  Database,
  MessageSquare,
  Rocket,
  LucideIcon
} from 'lucide-react';

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in_progress' | 'pending' | 'blocked';
  priority: 'critical' | 'high' | 'medium';
  icon: LucideIcon;
  dueDate?: string;
  assignedTo?: string;
  notes?: string;
}

interface LaunchPhase {
  id: string;
  name: string;
  description: string;
  week: string;
  status: 'completed' | 'current' | 'upcoming';
  userCount?: number;
  goals: string[];
}

export const PreLaunchDashboard = () => {
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([]);
  const [launchPhases, setLaunchPhases] = useState<LaunchPhase[]>([]);
  const [overallProgress, setOverallProgress] = useState(0);

  useEffect(() => {
    // Initialize checklist items
    const items: ChecklistItem[] = [
      {
        id: 'features',
        title: 'Critical Path Features',
        description: 'All core features implemented and tested',
        status: 'completed',
        priority: 'critical',
        icon: Target,
        assignedTo: 'Development Team'
      },
      {
        id: 'security',
        title: 'Security Audit',
        description: 'Completed with no critical issues',
        status: 'in_progress',
        priority: 'critical',
        icon: Shield,
        dueDate: '2025-06-08',
        assignedTo: 'Security Team'
      },
      {
        id: 'performance',
        title: 'Performance Testing',
        description: 'Meets target metrics (< 2s load time)',
        status: 'completed',
        priority: 'critical',
        icon: Zap,
        assignedTo: 'QA Team'
      },
      {
        id: 'legal',
        title: 'Legal Compliance',
        description: 'Terms, Privacy Policy, GDPR compliance',
        status: 'pending',
        priority: 'critical',
        icon: FileText,
        dueDate: '2025-06-10',
        assignedTo: 'Legal Team'
      },
      {
        id: 'support',
        title: 'Customer Support',
        description: 'Processes and team established',
        status: 'in_progress',
        priority: 'high',
        icon: HeadphonesIcon,
        assignedTo: 'Support Team'
      },
      {
        id: 'monitoring',
        title: 'Monitoring Systems',
        description: 'Alerting and monitoring active',
        status: 'completed',
        priority: 'critical',
        icon: Activity,
        assignedTo: 'DevOps Team'
      },
      {
        id: 'backup',
        title: 'Backup & Recovery',
        description: 'Disaster recovery tested',
        status: 'completed',
        priority: 'critical',
        icon: Database,
        assignedTo: 'Infrastructure Team'
      },
      {
        id: 'feedback',
        title: 'Beta Feedback',
        description: 'Critical feedback incorporated',
        status: 'pending',
        priority: 'high',
        icon: MessageSquare,
        notes: 'Waiting for beta user responses'
      }
    ];

    const phases: LaunchPhase[] = [
      {
        id: 'soft_launch',
        name: 'Soft Launch',
        description: 'Limited beta with selected users',
        week: 'Week 11',
        status: 'current',
        userCount: 50,
        goals: [
          'Test real-world usage patterns',
          'Identify critical bugs',
          'Validate user experience',
          'Stress test infrastructure'
        ]
      },
      {
        id: 'feedback_integration',
        name: 'Feedback Integration',
        description: 'Address critical feedback and issues',
        week: 'Week 12',
        status: 'upcoming',
        goals: [
          'Fix critical bugs reported',
          'Improve user experience',
          'Optimize performance',
          'Finalize documentation'
        ]
      },
      {
        id: 'public_launch',
        name: 'Public Launch',
        description: 'Full marketing launch',
        week: 'Week 13',
        status: 'upcoming',
        goals: [
          'Execute marketing campaign',
          'Handle increased traffic',
          'Onboard new users',
          'Monitor system stability'
        ]
      }
    ];

    setChecklistItems(items);
    setLaunchPhases(phases);

    // Calculate progress
    const completed = items.filter(item => item.status === 'completed').length;
    const progress = (completed / items.length) * 100;
    setOverallProgress(Math.round(progress));
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in_progress':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'blocked':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500">Complete</Badge>;
      case 'in_progress':
        return <Badge className="bg-blue-500">In Progress</Badge>;
      case 'blocked':
        return <Badge variant="error">Blocked</Badge>;
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'critical':
        return <Badge variant="error">Critical</Badge>;
      case 'high':
        return <Badge className="bg-orange-500">High</Badge>;
      default:
        return <Badge variant="secondary">Medium</Badge>;
    }
  };

  const getPhaseStatus = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500">Completed</Badge>;
      case 'current':
        return <Badge className="bg-blue-500">Current</Badge>;
      default:
        return <Badge variant="outline">Upcoming</Badge>;
    }
  };

  const criticalItemsRemaining = checklistItems.filter(
    item => item.priority === 'critical' && item.status !== 'completed'
  ).length;

  const isLaunchReady = criticalItemsRemaining === 0;

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div>
          <h2 className="text-3xl font-bold flex items-center justify-center gap-2">
            <Rocket className="h-8 w-8 text-primary" />
            Pre-Launch Dashboard
          </h2>
          <p className="text-muted-foreground">Track your progress towards production launch</p>
        </div>

        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="text-4xl font-bold text-primary">{overallProgress}%</div>
          </div>
          <Progress value={overallProgress} className="h-4 mb-2" />
          <p className="text-sm text-muted-foreground">
            {checklistItems.filter(i => i.status === 'completed').length} of {checklistItems.length} items complete
          </p>
        </div>

        {isLaunchReady ? (
          <Alert className="max-w-2xl mx-auto bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <AlertDescription className="text-green-800">
              🎉 <strong>Launch Ready!</strong> All critical items are completed. You're ready for production deployment!
            </AlertDescription>
          </Alert>
        ) : (
          <Alert className="max-w-2xl mx-auto">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>{criticalItemsRemaining} critical item{criticalItemsRemaining !== 1 ? 's' : ''} remaining</strong> before launch readiness.
            </AlertDescription>
          </Alert>
        )}
      </div>

      <Tabs defaultValue="checklist" className="w-full">
        <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto">
          <TabsTrigger value="checklist">Launch Checklist</TabsTrigger>
          <TabsTrigger value="timeline">Launch Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="checklist" className="space-y-4">
          <div className="grid gap-4">
            {checklistItems.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="flex items-center gap-2">
                          <Icon className="h-5 w-5 text-muted-foreground" />
                          {getStatusIcon(item.status)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{item.title}</h4>
                            {getPriorityBadge(item.priority)}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                          
                          <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                            {item.assignedTo && (
                              <span>👤 {item.assignedTo}</span>
                            )}
                            {item.dueDate && (
                              <span>📅 Due: {item.dueDate}</span>
                            )}
                          </div>
                          
                          {item.notes && (
                            <p className="text-xs text-muted-foreground mt-2 italic">{item.notes}</p>
                          )}
                        </div>
                      </div>
                      <div className="ml-4">
                        {getStatusBadge(item.status)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-6">
          {launchPhases.map((phase, index) => (
            <Card key={phase.id} className={`${phase.status === 'current' ? 'border-blue-500 shadow-lg' : ''}`}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                      phase.status === 'completed' ? 'bg-green-500' : 
                      phase.status === 'current' ? 'bg-blue-500' : 'bg-gray-400'
                    }`}>
                      {index + 1}
                    </div>
                    {phase.name}
                  </span>
                  <div className="flex items-center gap-2">
                    {getPhaseStatus(phase.status)}
                    <Badge variant="outline">{phase.week}</Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{phase.description}</p>
                
                {phase.userCount && (
                  <div className="flex items-center gap-2 mb-4">
                    <Users className="h-4 w-4" />
                    <span className="text-sm font-medium">{phase.userCount} Beta Users</span>
                  </div>
                )}
                
                <div>
                  <h5 className="font-medium mb-2">Key Goals:</h5>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    {phase.goals.map((goal, idx) => (
                      <li key={idx}>{goal}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      <div className="text-center">
        <Button 
          size="lg" 
          className={`${isLaunchReady ? 'bg-green-600 hover:bg-green-700' : ''}`}
          disabled={!isLaunchReady}
        >
          <Rocket className="mr-2 h-4 w-4" />
          {isLaunchReady ? 'Launch to Production' : `${criticalItemsRemaining} Critical Items Remaining`}
        </Button>
      </div>
    </div>
  );
};
