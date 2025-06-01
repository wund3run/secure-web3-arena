
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, Pause, Clock, Plus } from 'lucide-react';
import { useTimeTracking } from '@/hooks/useTimeTracking';
import { useAuditMilestones } from '@/hooks/useAuditMilestones';
import { formatDistanceToNow, format } from 'date-fns';

interface TimeTrackerProps {
  auditRequestId: string;
  isAuditor: boolean;
}

export const TimeTracker: React.FC<TimeTrackerProps> = ({ auditRequestId, isAuditor }) => {
  const { timeEntries, activeEntry, loading, startTimer, stopTimer, getTotalTime, getBillableTime } = useTimeTracking(auditRequestId);
  const { milestones } = useAuditMilestones(auditRequestId);
  const [isStartDialogOpen, setIsStartDialogOpen] = useState(false);
  const [timerConfig, setTimerConfig] = useState({
    activity_type: '',
    description: '',
    milestone_id: '',
  });

  const handleStartTimer = async () => {
    if (!timerConfig.activity_type) return;

    try {
      await startTimer(
        timerConfig.activity_type,
        timerConfig.description,
        timerConfig.milestone_id || undefined
      );
      setTimerConfig({ activity_type: '', description: '', milestone_id: '' });
      setIsStartDialogOpen(false);
    } catch (error) {
      console.error('Failed to start timer:', error);
    }
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  const totalMinutes = getTotalTime();
  const billableMinutes = getBillableTime();

  if (loading) {
    return <div className="animate-pulse h-64 bg-muted rounded-lg" />;
  }

  return (
    <div className="space-y-6">
      {/* Timer Controls */}
      {isAuditor && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Time Tracking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                {activeEntry ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                      <span className="font-medium">Timer Active</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {activeEntry.activity_type} - Started {formatDistanceToNow(new Date(activeEntry.start_time), { addSuffix: true })}
                    </p>
                    {activeEntry.description && (
                      <p className="text-sm">{activeEntry.description}</p>
                    )}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No active timer</p>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                {activeEntry ? (
                  <Button onClick={() => stopTimer()} variant="destructive">
                    <Pause className="h-4 w-4 mr-2" />
                    Stop Timer
                  </Button>
                ) : (
                  <Dialog open={isStartDialogOpen} onOpenChange={setIsStartDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Play className="h-4 w-4 mr-2" />
                        Start Timer
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Start Time Tracking</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="activity_type">Activity Type</Label>
                          <Select value={timerConfig.activity_type} onValueChange={(value) => setTimerConfig(prev => ({ ...prev, activity_type: value }))}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select activity type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="code_review">Code Review</SelectItem>
                              <SelectItem value="vulnerability_analysis">Vulnerability Analysis</SelectItem>
                              <SelectItem value="documentation">Documentation</SelectItem>
                              <SelectItem value="testing">Testing</SelectItem>
                              <SelectItem value="report_writing">Report Writing</SelectItem>
                              <SelectItem value="client_communication">Client Communication</SelectItem>
                              <SelectItem value="research">Research</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label htmlFor="milestone">Related Milestone (Optional)</Label>
                          <Select value={timerConfig.milestone_id} onValueChange={(value) => setTimerConfig(prev => ({ ...prev, milestone_id: value }))}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select milestone" />
                            </SelectTrigger>
                            <SelectContent>
                              {milestones.milestones.map(milestone => (
                                <SelectItem key={milestone.id} value={milestone.id}>
                                  {milestone.title}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            value={timerConfig.description}
                            onChange={(e) => setTimerConfig(prev => ({ ...prev, description: e.target.value }))}
                            placeholder="What are you working on?"
                          />
                        </div>
                        
                        <Button onClick={handleStartTimer} className="w-full">
                          Start Timer
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Time Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Time Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{formatDuration(totalMinutes)}</div>
              <div className="text-sm text-muted-foreground">Total Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{formatDuration(billableMinutes)}</div>
              <div className="text-sm text-muted-foreground">Billable Time</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Time Entries */}
      <Card>
        <CardHeader>
          <CardTitle>Time Entries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {timeEntries.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No time entries yet</p>
            ) : (
              timeEntries.map(entry => (
                <div key={entry.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{entry.activity_type.replace('_', ' ')}</span>
                      {entry.billable && <Badge variant="outline" className="text-xs">Billable</Badge>}
                      {!entry.end_time && <Badge variant="default" className="text-xs">Active</Badge>}
                    </div>
                    {entry.description && (
                      <p className="text-sm text-muted-foreground mb-1">{entry.description}</p>
                    )}
                    <div className="text-sm text-muted-foreground">
                      {format(new Date(entry.start_time), 'MMM dd, yyyy HH:mm')}
                      {entry.end_time && ` - ${format(new Date(entry.end_time), 'HH:mm')}`}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">
                      {entry.duration_minutes ? formatDuration(entry.duration_minutes) : 'Running...'}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
