
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Eye,
  Filter,
  Search,
  Download
} from 'lucide-react';

interface AuditRequest {
  id: string;
  project_name: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'critical';
  created_at: string;
  deadline: string;
  progress: number;
  assigned_auditor?: string;
}

const mockAudits: AuditRequest[] = [
  {
    id: '1',
    project_name: 'DeFi Lending Protocol',
    status: 'in_progress',
    priority: 'high',
    created_at: '2024-01-15',
    deadline: '2024-02-15',
    progress: 65,
    assigned_auditor: 'Sarah Chen'
  },
  {
    id: '2',
    project_name: 'NFT Marketplace',
    status: 'pending',
    priority: 'medium',
    created_at: '2024-01-20',
    deadline: '2024-02-20',
    progress: 0
  },
  {
    id: '3',
    project_name: 'Cross-chain Bridge',
    status: 'completed',
    priority: 'critical',
    created_at: '2024-01-10',
    deadline: '2024-02-10',
    progress: 100,
    assigned_auditor: 'Alex Rodriguez'
  }
];

export const AuditManagement = () => {
  const [audits, setAudits] = useState<AuditRequest[]>(mockAudits);
  const [filteredAudits, setFilteredAudits] = useState<AuditRequest[]>(mockAudits);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  useEffect(() => {
    let filtered = audits;

    if (statusFilter !== 'all') {
      filtered = filtered.filter(audit => audit.status === statusFilter);
    }

    if (priorityFilter !== 'all') {
      filtered = filtered.filter(audit => audit.priority === priorityFilter);
    }

    setFilteredAudits(filtered);
  }, [audits, statusFilter, priorityFilter]);

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: 'default',
      in_progress: 'default',
      completed: 'default',
      cancelled: 'destructive'
    } as const;

    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      in_progress: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };

    return (
      <Badge variant={variants[status as keyof typeof variants]} className={colors[status as keyof typeof colors]}>
        {status.replace('_', ' ')}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const colors = {
      low: 'bg-gray-100 text-gray-800',
      medium: 'bg-blue-100 text-blue-800',
      high: 'bg-orange-100 text-orange-800',
      critical: 'bg-red-100 text-red-800'
    };

    return (
      <Badge variant="outline" className={colors[priority as keyof typeof colors]}>
        {priority}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Audit Management</h2>
          <p className="text-muted-foreground">
            Monitor and manage all audit requests across the platform
          </p>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4">
          <div>
            <label className="text-sm font-medium">Status</label>
            <select 
              className="ml-2 border rounded px-2 py-1"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">Priority</label>
            <select 
              className="ml-2 border rounded px-2 py-1"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="all">All Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Audit List */}
      <div className="grid gap-4">
        {filteredAudits.map((audit) => (
          <Card key={audit.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="text-lg font-semibold">{audit.project_name}</h3>
                    {getStatusBadge(audit.status)}
                    {getPriorityBadge(audit.priority)}
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                    <div>
                      <span className="font-medium">Created:</span>
                      <br />
                      {new Date(audit.created_at).toLocaleDateString()}
                    </div>
                    <div>
                      <span className="font-medium">Deadline:</span>
                      <br />
                      {new Date(audit.deadline).toLocaleDateString()}
                    </div>
                    <div>
                      <span className="font-medium">Auditor:</span>
                      <br />
                      {audit.assigned_auditor || 'Unassigned'}
                    </div>
                    <div>
                      <span className="font-medium">Progress:</span>
                      <br />
                      <div className="flex items-center gap-2 mt-1">
                        <Progress 
                          value={audit.progress} 
                          className="h-2 flex-1" 
                          indicatorClassName="bg-primary"
                        />
                        <span className="text-xs">{audit.progress}%</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAudits.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No audits found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters to see more results.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
