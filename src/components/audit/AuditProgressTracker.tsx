
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, AlertCircle, MessageSquare } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import type { AuditProgress, AuditMessage } from '@/types/auditor';

interface AuditProgressTrackerProps {
  auditRequestId: string;
}

const AUDIT_PHASES = [
  { key: 'initial_review', label: 'Initial Review', description: 'Reviewing project documentation and scope' },
  { key: 'static_analysis', label: 'Static Analysis', description: 'Running automated security tools' },
  { key: 'manual_review', label: 'Manual Review', description: 'Line-by-line code examination' },
  { key: 'testing', label: 'Testing', description: 'Functional and security testing' },
  { key: 'report_draft', label: 'Report Draft', description: 'Preparing preliminary findings' },
  { key: 'final_report', label: 'Final Report', description: 'Delivering final audit report' },
  { key: 'completed', label: 'Completed', description: 'Audit successfully completed' }
];

export function AuditProgressTracker({ auditRequestId }: AuditProgressTrackerProps) {
  const [progress, setProgress] = useState<AuditProgress | null>(null);
  const [messages, setMessages] = useState<AuditMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProgressData();
    setupRealtimeSubscription();
  }, [auditRequestId]);

  const fetchProgressData = async () => {
    try {
      setLoading(true);

      // Fetch progress data
      const { data: progressData, error: progressError } = await supabase
        .from('audit_progress')
        .select('*')
        .eq('audit_request_id', auditRequestId)
        .single();

      if (progressError && progressError.code !== 'PGRST116') {
        throw progressError;
      }

      // Fetch recent messages
      const { data: messagesData, error: messagesError } = await supabase
        .from('audit_messages')
        .select('*')
        .eq('audit_request_id', auditRequestId)
        .order('created_at', { ascending: false })
        .limit(5);

      if (messagesError) throw messagesError;

      setProgress(progressData);
      setMessages(messagesData || []);
    } catch (error) {
      console.error('Error fetching progress data:', error);
    } finally {
      setLoading(false);
    }
  };

  const setupRealtimeSubscription = () => {
    const subscription = supabase
      .channel(`audit_progress_${auditRequestId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'audit_progress',
          filter: `audit_request_id=eq.${auditRequestId}`,
        },
        () => {
          fetchProgressData();
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'audit_messages',
          filter: `audit_request_id=eq.${auditRequestId}`,
        },
        () => {
          fetchProgressData();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  };

  const getCurrentPhaseIndex = () => {
    if (!progress) return 0;
    return AUDIT_PHASES.findIndex(phase => phase.key === progress.current_phase);
  };

  const getPhaseStatus = (phaseIndex: number) => {
    const currentIndex = getCurrentPhaseIndex();
    if (phaseIndex < currentIndex) return 'completed';
    if (phaseIndex === currentIndex) return 'current';
    return 'pending';
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!progress) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-gray-500">
            <Clock className="h-8 w-8 mx-auto mb-2" />
            <p>Audit has not started yet</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Audit Progress</CardTitle>
          <CardDescription>
            Track the current status and progress of your security audit
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm text-gray-600">{progress.progress_percentage}%</span>
              </div>
              <Progress value={progress.progress_percentage} className="h-3" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">Milestones</span>
                </div>
                <p className="text-2xl font-bold text-blue-600">
                  {progress.milestones_completed}/{progress.total_milestones}
                </p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">Days Active</span>
                </div>
                <p className="text-2xl font-bold text-green-600">
                  {progress.actual_start_date ? 
                    Math.ceil((new Date().getTime() - new Date(progress.actual_start_date).getTime()) / (1000 * 60 * 60 * 24)) 
                    : 0
                  }
                </p>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <MessageSquare className="h-4 w-4 text-purple-600" />
                  <span className="text-sm font-medium">Communications</span>
                </div>
                <p className="text-2xl font-bold text-purple-600">{messages.length}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Audit Phases</h4>
              <div className="space-y-3">
                {AUDIT_PHASES.map((phase, index) => {
                  const status = getPhaseStatus(index);
                  return (
                    <div key={phase.key} className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        status === 'completed' ? 'bg-green-100 text-green-600' :
                        status === 'current' ? 'bg-blue-100 text-blue-600' :
                        'bg-gray-100 text-gray-400'
                      }`}>
                        {status === 'completed' ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : status === 'current' ? (
                          <Clock className="h-4 w-4" />
                        ) : (
                          <div className="w-2 h-2 bg-current rounded-full" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className={`font-medium ${
                            status === 'current' ? 'text-blue-600' : ''
                          }`}>
                            {phase.label}
                          </span>
                          {status === 'current' && (
                            <Badge variant="outline" className="text-xs">Current</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{phase.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {progress.notes && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h5 className="font-medium mb-2">Latest Update</h5>
                <p className="text-sm text-gray-700">{progress.notes}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {messages.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Communications</CardTitle>
            <CardDescription>
              Latest messages from your audit team
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {messages.map((message) => (
                <div key={message.id} className="border-l-4 border-l-blue-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={message.message_type === 'system' ? 'secondary' : 'outline'}>
                      {message.message_type}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {new Date(message.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm">{message.content}</p>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Communications
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
