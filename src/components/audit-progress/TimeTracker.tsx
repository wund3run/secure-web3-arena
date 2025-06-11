
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, Pause, Plus, Clock } from 'lucide-react';
import { useTimeTracking } from '@/hooks/useTimeTracking';
import { format } from 'date-fns';

interface TimeTrackerProps {
  auditRequestId: string;
  isAuditor: boolean;
}

export const TimeTracker: React.FC<TimeTrackerProps> = ({ auditRequestId, isAuditor }) => {
  const { 
    timeEntries, 
    activeEntry, 
    totalHours, 
    isLoading, 
    addTimeEntry, 
    startTimer, 
    stopTimer, 
    getTotalTime, 
    getBillableTime 
  } = useTimeTracking(auditRequestId);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newEntry, setNewEntry] = useState({
    hours: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
  });
  const [timerActivity, setTimerActivity] = useState('');
  const [timerDescription, setTimerDescription] = useState('');

  const handleAddTimeEntry = async () => {
    if (!newEntry.hours) return;

    try {
      await addTimeEntry(parseFloat(newEntry.hours), newEntry.description, newEntry.date);
      setNewEntry({ hours: '', description: '', date: new Date().toISOString().split('T')[0] });
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error('Failed to add time entry:', error);
    }
  };

  const handleStartTimer = async () => {
    if (!timerActivity) return;

    try {
      await startTimer(timerActivity, timerDescription);
      setTimerActivity('');
      setTimerDescription('');
    } catch (error) {
      console.error('Failed to start timer:', error);
    }
  };

  const handleStopTimer = async () => {
    try {
      await stopTimer();
    } catch (error) {
      console.error('Failed to stop timer:', error);
    }
  };

  const formatDuration = (minutes: number | undefined) => {
    if (!minutes) return '0h 0m';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  if (isLoading) {
    return <div className="animate-pulse h-64 bg-muted rounded-lg" />;
  }

  return (
    <div className="space-y-6">
      {/* Timer Section */}
      {isAuditor && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Time Tracker
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeEntry ? (
                <div className="flex items-center justify-between p-4 border rounded-lg bg-green-50">
                  <div>
                    <p className="font-medium">Timer Running</p>
                    <p className="text-sm text-muted-foreground">
                      Activity: {activeEntry.activity_type}
                    </p>
                    {activeEntry.description && (
                      <p className="text-sm text-muted-foreground">
                        {activeEntry.description}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Started: {format(new Date(activeEntry.start_time), 'HH:mm')}
                    </p>
                  </div>
                  <Button onClick={handleStopTimer} variant="destructive">
                    <Pause className="h-4 w-4 mr-2" />
                    Stop Timer
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="activity">Activity Type</Label>
                      <Select value={timerActivity} onValueChange={setTimerActivity}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select activity" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="code_review">Code Review</SelectItem>
                          <SelectItem value="testing">Testing</SelectItem>
                          <SelectItem value="documentation">Documentation</SelectItem>
                          <SelectItem value="research">Research</SelectItem>
                          <SelectItem value="communication">Communication</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="timer_description">Description (Optional)</Label>
                      <Input
                        id="timer_description"
                        value={timerDescription}
                        onChange={(e) => setTimerDescription(e.target.value)}
                        placeholder="What are you working on?"
                      />
                    </div>
                  </div>
                  <Button onClick={handleStartTimer} disabled={!timerActivity}>
                    <Play className="h-4 w-4 mr-2" />
                    Start Timer
                  </Button>
                </div>
              )}
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <p className="text-2xl font-bold">{formatDuration(getTotalTime())}</p>
              <p className="text-sm text-muted-foreground">Total Time</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <p className="text-2xl font-bold">{formatDuration(getBillableTime())}</p>
              <p className="text-sm text-muted-foreground">Billable Time</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <p className="text-2xl font-bold">{timeEntries.length}</p>
              <p className="text-sm text-muted-foreground">Time Entries</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Time Entries List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Time Entries</CardTitle>
            {isAuditor && (
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Entry
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Time Entry</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="hours">Hours</Label>
                      <Input
                        id="hours"
                        type="number"
                        step="0.25"
                        value={newEntry.hours}
                        onChange={(e) => setNewEntry(prev => ({ ...prev, hours: e.target.value }))}
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={newEntry.description}
                        onChange={(e) => setNewEntry(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="What did you work on?"
                      />
                    </div>
                    <div>
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={newEntry.date}
                        onChange={(e) => setNewEntry(prev => ({ ...prev, date: e.target.value }))}
                      />
                    </div>
                    <Button onClick={handleAddTimeEntry} className="w-full">
                      Add Time Entry
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {timeEntries.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No time entries recorded yet</p>
            ) : (
              timeEntries.map(entry => (
                <div key={entry.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline">
                        {entry.activity_type || 'Manual Entry'}
                      </Badge>
                      {entry.billable !== false && (
                        <Badge variant="secondary">Billable</Badge>
                      )}
                    </div>
                    {entry.description && (
                      <p className="text-sm text-muted-foreground mb-2">{entry.description}</p>
                    )}
                    <div className="text-xs text-muted-foreground">
                      {entry.start_time && entry.end_time ? (
                        <>
                          {format(new Date(entry.start_time), 'MMM dd, HH:mm')} - 
                          {format(new Date(entry.end_time), 'HH:mm')}
                        </>
                      ) : (
                        format(new Date(entry.created_at), 'MMM dd, yyyy')
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      {entry.duration_minutes ? 
                        formatDuration(entry.duration_minutes) : 
                        `${entry.hours}h`
                      }
                    </p>
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
