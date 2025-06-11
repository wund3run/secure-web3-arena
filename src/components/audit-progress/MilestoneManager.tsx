
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { CheckCircle, Clock, Plus, Calendar } from 'lucide-react';
import { useAuditMilestones } from '@/hooks/useAuditMilestones';
import { format } from 'date-fns';

interface MilestoneManagerProps {
  auditRequestId: string;
  isAuditor: boolean;
}

export const MilestoneManager: React.FC<MilestoneManagerProps> = ({ auditRequestId, isAuditor }) => {
  const { milestones, isLoading, updateMilestoneStatus, createMilestone } = useAuditMilestones(auditRequestId);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newMilestone, setNewMilestone] = useState({
    title: '',
    description: '',
    due_date: '',
  });

  const handleCreateMilestone = async () => {
    if (!newMilestone.title) return;

    try {
      await createMilestone(newMilestone);
      setNewMilestone({ title: '', description: '', due_date: '' });
      setIsCreateDialogOpen(false);
    } catch (error) {
      console.error('Failed to create milestone:', error);
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'completed':
        return 'default';
      case 'in_progress':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'in_progress':
        return <Clock className="h-4 w-4 text-blue-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  if (isLoading) {
    return <div className="animate-pulse h-64 bg-muted rounded-lg" />;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Milestones
            </CardTitle>
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
                      <Label htmlFor="due_date">Due Date</Label>
                      <Input
                        id="due_date"
                        type="date"
                        value={newMilestone.due_date}
                        onChange={(e) => setNewMilestone(prev => ({ ...prev, due_date: e.target.value }))}
                      />
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
            {milestones.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No milestones created yet</p>
            ) : (
              milestones.map(milestone => (
                <div key={milestone.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-start gap-3 flex-1">
                    {getStatusIcon(milestone.status)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{milestone.title}</h4>
                        <Badge variant={getStatusBadgeVariant(milestone.status)}>
                          {milestone.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      {milestone.description && (
                        <p className="text-sm text-muted-foreground mb-2">{milestone.description}</p>
                      )}
                      {milestone.due_date && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          Due: {format(new Date(milestone.due_date), 'MMM dd, yyyy')}
                        </div>
                      )}
                    </div>
                  </div>
                  {isAuditor && milestone.status !== 'completed' && (
                    <div className="flex items-center gap-2">
                      {milestone.status === 'pending' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateMilestoneStatus(milestone.id, 'in_progress')}
                        >
                          Start
                        </Button>
                      )}
                      {milestone.status === 'in_progress' && (
                        <Button
                          size="sm"
                          onClick={() => updateMilestoneStatus(milestone.id, 'completed')}
                        >
                          Complete
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
