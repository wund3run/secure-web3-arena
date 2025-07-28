import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { 
  ShieldCheck, 
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';

interface Project {
  id: string;
  name: string;
  status: 'active' | 'completed' | 'pending';
  securityScore: number;
  issuesFound: number;
  criticalIssues: number;
  progress: number;
  lastUpdate: string;
}

interface EnhancedProjectsOverviewProps {
  userId: string;
  className?: string;
  limit?: number;
}

export function EnhancedProjectsOverview({ 
  userId, 
  className,
  limit = 5
}: EnhancedProjectsOverviewProps) {
  // Mock data - in real implementation this would fetch from API
  const projects: Project[] = [
    {
      id: 'proj-1',
      name: 'DeFi Lending Protocol',
      status: 'active',
      securityScore: 78,
      issuesFound: 12,
      criticalIssues: 3,
      progress: 65,
      lastUpdate: '2 days ago'
    },
    {
      id: 'proj-2',
      name: 'NFT Marketplace',
      status: 'completed',
      securityScore: 92,
      issuesFound: 5,
      criticalIssues: 0,
      progress: 100,
      lastUpdate: '1 week ago'
    },
    {
      id: 'proj-3',
      name: 'DAO Governance',
      status: 'pending',
      securityScore: 0,
      issuesFound: 0,
      criticalIssues: 0,
      progress: 0,
      lastUpdate: 'Not started'
    }
  ];

  const getStatusBadge = (status: Project['status']) => {
    switch (status) {
      case 'active':
        return <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-200">Active</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-200">Completed</Badge>;
      case 'pending':
        return <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-200">Pending</Badge>;
      default:
        return null;
    }
  };

  const getSecurityScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-amber-500';
    return score > 0 ? 'text-red-500' : 'text-muted-foreground';
  };

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Your Projects</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {projects.slice(0, limit).map(project => (
            <div key={project.id} className="border rounded-md p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium">{project.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    {getStatusBadge(project.status)}
                    <span className="text-xs text-muted-foreground">Updated {project.lastUpdate}</span>
                  </div>
                </div>
                <div className={cn(
                  "text-lg font-bold", 
                  getSecurityScoreColor(project.securityScore)
                )}>
                  {project.securityScore > 0 ? project.securityScore : '–'}/100
                </div>
              </div>
              
              <div className="mt-3">
                <div className="flex justify-between text-xs mb-1">
                  <span>Audit Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-1" />
              </div>
              
              <div className="flex items-center gap-4 mt-3 text-xs">
                <div className="flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3 text-amber-500" />
                  <span>{project.issuesFound} issues</span>
                </div>
                {project.criticalIssues > 0 ? (
                  <div className="flex items-center gap-1 text-red-500">
                    <AlertTriangle className="h-3 w-3" />
                    <span>{project.criticalIssues} critical</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-green-500">
                    <CheckCircle className="h-3 w-3" />
                    <span>No critical issues</span>
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {projects.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <ShieldCheck className="h-8 w-8 mx-auto mb-3 opacity-40" />
              <p>No security projects found</p>
              <p className="text-xs mt-1">Start a new security audit to protect your assets</p>
            </div>
          )}
        </div>
        
        {projects.length > limit && (
          <div className="mt-4 text-center">
            <button className="text-sm text-primary font-medium hover:underline">
              View all {projects.length} projects
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
