
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  FileText, 
  MessageCircle,
  Eye 
} from 'lucide-react';
import { useRealtimeSync } from '@/hooks/useRealtimeSync';

interface AuditPhase {
  id: string;
  name: string;
  status: 'pending' | 'in_progress' | 'completed' | 'blocked';
  progress: number;
  estimated_completion: string;
  findings?: number;
  notes?: string;
}

interface LiveAuditProgressProps {
  auditId: string;
  onMessageClick?: () => void;
  onViewDetails?: () => void;
}

export const LiveAuditProgress: React.FC<LiveAuditProgressProps> = ({
  auditId,
  onMessageClick,
  onViewDetails,
}) => {
  const [phases, setPhases] = useState<AuditPhase[]>([
    {
      id: '1',
      name: 'Initial Assessment',
      status: 'completed',
      progress: 100,
      estimated_completion: 'Completed',
      findings: 3,
    },
    {
      id: '2',
      name: 'Code Review',
      status: 'in_progress',
      progress: 65,
      estimated_completion: '2 hours',
      findings: 5,
      notes: 'Found potential reentrancy vulnerability in withdraw function',
    },
    {
      id: '3',
      name: 'Security Testing',
      status: 'pending',
      progress: 0,
      estimated_completion: '4 hours',
    },
    {
      id: '4',
      name: 'Report Generation',
      status: 'pending',
      progress: 0,
      estimated_completion: '1 hour',
    },
  ]);

  const [overallProgress, setOverallProgress] = useState(41);
  const { isConnected } = useRealtimeSync();

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setPhases(prev => prev.map(phase => {
        if (phase.status === 'in_progress' && phase.progress < 100) {
          const newProgress = Math.min(phase.progress + Math.random() * 5, 100);
          return { ...phase, progress: newProgress };
        }
        return phase;
      }));
      
      // Update overall progress
      setOverallProgress(prev => Math.min(prev + Math.random() * 2, 90));
    }, 5000);

    return () => clearInterval(interval);
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
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in_progress':
        return 'bg-blue-500';
      case 'blocked':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            Live Audit Progress
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
          </CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onMessageClick}>
              <MessageCircle className="h-4 w-4 mr-2" />
              Message Auditor
            </Button>
            <Button variant="outline" size="sm" onClick={onViewDetails}>
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Overall Progress</span>
            <span>{Math.round(overallProgress)}%</span>
          </div>
          <Progress value={overallProgress} className="h-2" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {phases.map((phase, index) => (
          <div key={phase.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getStatusIcon(phase.status)}
                <span className="font-medium">{phase.name}</span>
                {phase.findings !== undefined && phase.findings > 0 && (
                  <Badge variant="outline" className="text-xs">
                    {phase.findings} findings
                  </Badge>
                )}
              </div>
              <span className="text-sm text-muted-foreground">
                {phase.estimated_completion}
              </span>
            </div>
            
            {phase.status !== 'pending' && (
              <Progress value={phase.progress} className="h-1" />
            )}
            
            {phase.notes && (
              <div className="flex items-start gap-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-md">
                <FileText className="h-4 w-4 text-yellow-600 mt-0.5" />
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  {phase.notes}
                </p>
              </div>
            )}
            
            {index < phases.length - 1 && (
              <div className="flex justify-center">
                <div className={`w-px h-4 ${phase.status === 'completed' ? 'bg-green-500' : 'bg-gray-300'}`} />
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
