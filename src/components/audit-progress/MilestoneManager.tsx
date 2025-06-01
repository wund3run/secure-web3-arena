
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Plus, CheckCircle, Clock, AlertCircle, XCircle, Play } from 'lucide-react';
import { format } from 'date-fns';
import { useAuditMilestones, type AuditMilestone } from '@/hooks/useAuditMilestones';
import { useAuth } from '@/contexts/auth';

interface MilestoneManagerProps {
  auditRequestId: string;
  isAuditor: boolean;
}

export const MilestoneManager: React.FC<MilestoneManagerProps> = ({ auditRequestId, isAuditor }) => {
  const { user } = useAuth();
  const { milestones, loading, createMilestone, updateMilestone, completeMilestone, approveMilestone } = useAuditMilestones(auditRequestId);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newMilestone, setNewMilestone] = useState({
    title: '',
    description: '',
    due_date: undefined as Date | undefined,
    time_estimate_hours: 0,
    approval_required: false,
  });

  const getStatusIcon = (status: AuditMilestone['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in_progress':
        return <Play className="h-4 w-4 text-blue-500" />;
      case 'blocked':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-gray-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: AuditMilestone['status']) => {
    switch (status) {
      case 'completed':
        return 'default';
      case 'in_progress':
        return 'secondary';
      case 'blocked':
        return 'destructive';
      case 'cancelled':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const handleCreateMilestone = async () => {
    if (!newMilestone.title) return;

    try {
      await createMilestone({
        audit_request_id: auditRequestId,
        title: newMilestone.title,
        description: newMilestone.description,
        order_index: milestones.length + 1,
        status: 'pending',
        due_date: newMilestone.due_date?.toISOString(),
        approval_required: newMilestone.approval_required,
        deliverables: [],
        time_estimate_hours: newMilestone.time_estimate_hours,
      });

      setNewMilestone({
        title: '',
        description: '',
        due_date: undefined,
        time_estimate_hours: 0,
        approval_required: false,
      });
      setIsCreateDialogOpen(false);
    } catch (error) {
      console.error('Failed to create milestone:', error);
    }
  };

  const handleStatusChange = async (milestoneId: string, newStatus: AuditMilestone['status']) => {
    await updateMilestone(milestoneId, { status: newStatus });
  };

  const completedMilestones = milestones.filter(m => m.status === 'completed').length;
  const totalMilestones = milestones.length;
  const progressPercentage = totalMilestones > 0 ? (completedMilestones / totalMilestones) * 100 : 0;

  if (loading) {
    return <div className="animate-pulse space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-20 bg-muted rounded-lg" />
      ))}
    </div>;
  }

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Milestone Progress</CardTitle>
            {isAuditor && (
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Milestone
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Milestone</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={newMilestone.title}
                        onChange={(e) => setNewMilestone(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Milestone title"
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={newMilestone.description}
                        onChange={(e) => setNewMilestone(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Milestone description"
                      />
                    </div>
                    <div>
                      <Label>Due Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {newMilestone.due_date ? format(newMilestone.due_date, 'PPP') : 'Select date'}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={newMilestone.due_date}
                            onSelect={(date) => setNewMilestone(prev => ({ ...prev, due_date: date }))}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div>
                      <Label htmlFor="time_estimate">Time Estimate (hours)</Label>
                      <Input
                        id="time_estimate"
                        type="number"
                        value={newMilestone.time_estimate_hours}
                        onChange={(e) => setNewMilestone(prev => ({ ...prev, time_estimate_hours: parseInt(e.target.value) || 0 }))}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="approval_required"
                        checked={newMilestone.approval_required}
                        onChange={(e) => setNewMilestone(prev => ({ ...prev, approval_required: e.target.checked }))}
                      />
                      <Label htmlFor="approval_required">Requires client approval</Label>
                    </div>
                    <Button onClick={handleCreateMilestone} className="w-full">
                      Create Milestone
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-2xl font-bold text-primary">{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="w-full" />
            <div className="text-sm text-muted-foreground">
              {completedMilestones} of {totalMilestones} milestones completed
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Milestones List */}
      <div className="space-y-4">
        {milestones.map((milestone, index) => (
          <Card key={milestone.id} className="relative">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {getStatusIcon(milestone.status)}
                    <h3 className="font-medium">{milestone.title}</h3>
                    <Badge variant={getStatusColor(milestone.status)}>
                      {milestone.status.replace('_', ' ')}
                    </Badge>
                  </div>
                  
                  {milestone.description && (
                    <p className="text-sm text-muted-foreground mb-3">{milestone.description}</p>
                  )}
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    {milestone.due_date && (
                      <span>Due: {format(new Date(milestone.due_date), 'MMM dd, yyyy')}</span>
                    )}
                    {milestone.time_estimate_hours && (
                      <span>Estimated: {milestone.time_estimate_hours}h</span>
                    )}
                    {milestone.actual_time_hours && (
                      <span>Actual: {milestone.actual_time_hours}h</span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {isAuditor && milestone.status !== 'completed' && (
                    <Select
                      value={milestone.status}
                      onValueChange={(value) => handleStatusChange(milestone.id, value as AuditMilestone['status'])}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="blocked">Blocked</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                  
                  {isAuditor && milestone.status !== 'completed' && (
                    <Button 
                      size="sm" 
                      onClick={() => completeMilestone(milestone.id)}
                      variant="outline"
                    >
                      Complete
                    </Button>
                  )}
                  
                  {!isAuditor && milestone.approval_required && milestone.status === 'completed' && !milestone.approved_at && (
                    <Button 
                      size="sm" 
                      onClick={() => approveMilestone(milestone.id)}
                      variant="default"
                    >
                      Approve
                    </Button>
                  )}
                </div>
              </div>
              
              {milestone.approval_required && milestone.approved_at && (
                <div className="mt-3 p-2 bg-green-50 rounded text-sm text-green-700">
                  ✓ Approved on {format(new Date(milestone.approved_at), 'MMM dd, yyyy')}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
